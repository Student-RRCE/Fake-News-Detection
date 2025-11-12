import { Card } from "@/components/ui/card";
import { Globe, Languages, Sparkles } from "lucide-react";

const MultilingualSupport = () => {
  const languages = [
    { name: "English", flag: "🇬🇧" },
    { name: "ಕನ್ನಡ (Kannada)", flag: "🇮🇳" },
    { name: "हिंदी (Hindi)", flag: "🇮🇳" },
    { name: "தமிழ் (Tamil)", flag: "🇮🇳" },
    { name: "తెలుగు (Telugu)", flag: "🇮🇳" },
  ];

  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Globe className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Multilingual Support</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Analyze content in multiple languages with native AI understanding
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-shadow">
            <Languages className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">5 Languages</h3>
            <p className="text-sm text-muted-foreground">
              Support for Indian regional languages with native AI processing
            </p>
          </Card>

          <Card className="p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-shadow">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Auto-Detection</h3>
            <p className="text-sm text-muted-foreground">
              Automatically identifies language and switches context
            </p>
          </Card>

          <Card className="p-6 text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-shadow">
            <Globe className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Cultural Context</h3>
            <p className="text-sm text-muted-foreground">
              Understands regional nuances and cultural references
            </p>
          </Card>
        </div>

        <Card className="p-8 shadow-[var(--shadow-card)]">
          <h3 className="text-xl font-semibold mb-6 text-center">Supported Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
              >
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Accurate analysis in English and major Indian languages
          </p>
        </Card>
      </div>
    </section>
  );
};

export default MultilingualSupport;
