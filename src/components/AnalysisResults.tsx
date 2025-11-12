import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface AnalysisResultsProps {
  result: {
    credibilityScore: number;
    verdict: string;
    analysis: string;
    indicators: string[];
  };
}

const AnalysisResults = ({ result }: AnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return "bg-success";
    if (score >= 40) return "bg-warning";
    return "bg-destructive";
  };

  const getIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="w-12 h-12 text-success" />;
    if (score >= 40) return <AlertTriangle className="w-12 h-12 text-warning" />;
    return <AlertCircle className="w-12 h-12 text-destructive" />;
  };

  return (
    <section className="px-6 py-16 -mt-16">
      <div className="max-w-5xl mx-auto">
        <Card className="p-8 shadow-[var(--shadow-lg)] border-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-6 mb-8">
            {getIcon(result.credibilityScore)}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Credibility Score</h2>
                <span className={`text-4xl font-bold ${getScoreColor(result.credibilityScore)}`}>
                  {result.credibilityScore}%
                </span>
              </div>
              <Progress value={result.credibilityScore} className="h-3" />
            </div>
          </div>

          <div className="mb-6">
            <Badge
              variant={result.credibilityScore >= 70 ? "default" : "destructive"}
              className="text-lg px-4 py-2"
            >
              {result.verdict}
            </Badge>
          </div>

          <div className="prose prose-sm max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-2">Analysis</h3>
            <p className="text-muted-foreground">{result.analysis}</p>
          </div>

          {result.indicators && result.indicators.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Indicators</h3>
              <div className="space-y-2">
                {result.indicators.map((indicator, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${getScoreBg(result.credibilityScore)}`} />
                    <p className="text-sm">{indicator}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default AnalysisResults;
