-- Create feedback table for storing user feedback
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert feedback
CREATE POLICY "Anyone can submit feedback"
  ON public.feedback
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read all feedback
CREATE POLICY "Service role can read all feedback"
  ON public.feedback
  FOR SELECT
  USING (auth.role() = 'service_role');
