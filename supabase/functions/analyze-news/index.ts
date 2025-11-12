import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, url } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const contentToAnalyze = url 
      ? `Analyze the content from this URL: ${url}. If you cannot access the URL, respond with a credibility analysis based on the URL structure and domain.`
      : text;

    console.log('Analyzing content:', contentToAnalyze.substring(0, 100));

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert fact-checker and fake news detector. Analyze the provided content for credibility, misinformation patterns, and factual accuracy. 
            
            Provide your analysis in the following JSON format:
            {
              "credibilityScore": <number 0-100>,
              "verdict": "<Verified|Questionable|Likely Fake>",
              "analysis": "<detailed explanation>",
              "indicators": ["<key indicator 1>", "<key indicator 2>", "<key indicator 3>"]
            }
            
            Consider these factors:
            - Source credibility and reputation
            - Presence of verifiable facts vs opinions
            - Language used (sensational, emotional, clickbait)
            - Citations and evidence
            - Consistency with established facts
            - Logical coherence
            - Bias indicators`
          },
          {
            role: 'user',
            content: contentToAnalyze
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;
    
    console.log('Raw AI response:', analysisText);

    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Try to extract JSON from the response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback response if parsing fails
      analysisResult = {
        credibilityScore: 50,
        verdict: "Questionable",
        analysis: analysisText,
        indicators: ["Unable to perform detailed analysis", "Please try again with different content"]
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-news function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Analysis failed',
        credibilityScore: 50,
        verdict: "Error",
        analysis: "An error occurred during analysis. Please try again.",
        indicators: []
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
