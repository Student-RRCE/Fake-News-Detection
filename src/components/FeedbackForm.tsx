import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !feedback) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-feedback", {
        body: { name, email, feedback },
      });

      if (error) throw error;

      toast({
        title: "Feedback Submitted",
        description: "Thank you for helping us improve!",
      });

      setName("");
      setEmail("");
      setFeedback("");
    } catch (error) {
      console.error("Feedback error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 py-20 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <MessageSquare className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Share Your Feedback</h2>
          <p className="text-xl text-muted-foreground">
            Help us improve our fake news detection. Your input matters.
          </p>
        </div>

        <Card className="p-8 shadow-[var(--shadow-lg)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or report issues..."
                className="mt-2 min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackForm;
