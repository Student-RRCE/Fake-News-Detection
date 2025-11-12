import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AnalysisResults from "@/components/AnalysisResults";
import BrowserExtension from "@/components/BrowserExtension";
import MultilingualSupport from "@/components/MultilingualSupport";
import FeedbackForm from "@/components/FeedbackForm";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <HeroSection 
        onAnalysisResult={setAnalysisResult}
        isAnalyzing={isAnalyzing}
        setIsAnalyzing={setIsAnalyzing}
      />
      
      {analysisResult && (
        <AnalysisResults result={analysisResult} />
      )}
      
      <BrowserExtension />
      <MultilingualSupport />
      <FeedbackForm />
      
      <footer className="py-8 text-center text-muted-foreground border-t border-border">
        <p>© 2025 Fake News Detection System | Empowering awareness, one click at a time.</p>
      </footer>
    </div>
  );
};

export default Index;
