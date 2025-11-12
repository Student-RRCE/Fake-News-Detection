import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chrome, Globe, Download } from "lucide-react";

const BrowserExtension = () => {
  return (
    <section className="px-6 py-20 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Browser Extension</h2>
          <p className="text-xl text-muted-foreground">
            Verify news instantly while browsing any website
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-shadow">
            <Chrome className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Chrome Extension</h3>
            <p className="text-muted-foreground mb-6">
              One-click verification for Chrome and Chromium-based browsers. Highlight any text to check its credibility instantly.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Right-click context menu
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Instant analysis popup
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Works on social media
              </li>
            </ul>
            
          </Card>

          <Card className="p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-lg)] transition-shadow">
            <Globe className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Firefox Add-on</h3>
            <p className="text-muted-foreground mb-6">
              Full-featured add-on for Firefox with privacy-first approach. Verify content without leaving your browser.
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Privacy-focused design
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Keyboard shortcuts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Customizable alerts
              </li>
            </ul>
            
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BrowserExtension;
