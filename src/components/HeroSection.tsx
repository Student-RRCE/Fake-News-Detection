import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Shield, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface HeroSectionProps {
  onAnalysisResult: (result: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const HeroSection = ({ onAnalysisResult, isAnalyzing, setIsAnalyzing }: HeroSectionProps) => {
  const [inputText, setInputText] = useState("");
  const [url, setUrl] = useState("");
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!inputText && !url) {
      toast({
        title: "Input Required",
        description: "Please enter text or a URL to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("analyze-news", {
        body: { text: inputText, url: url },
      });

      if (error) throw error;

      onAnalysisResult(data);
      
      toast({
        title: "Analysis Complete",
        description: "Check the results below",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="relative px-6 pt-20 pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Verify News</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Fake-News-Detection
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combat misinformation with advanced AI technology. Analyze articles, social media posts, and claims in seconds.
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-8 border border-border animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Enter URL to Analyze</label>
              <Input
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="text-center text-muted-foreground">or</div>

            <div>
              <label className="block text-sm font-medium mb-2">Paste Text Content</label>
              <Textarea
                placeholder="Paste article text, social media post, or any content you want to verify..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[150px] resize-none"
              />
            </div>

            <Button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="w-full h-12 text-lg font-semibold"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Analyze Now
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span>Verified Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span>Questionable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span>Likely Fake</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
