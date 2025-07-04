-- Create enum for analysis types
CREATE TYPE public.analysis_type AS ENUM (
  'chart',
  'fundamental', 
  'insider',
  'news_sentiment',
  'full_analysis'
);

-- Create stock analyses table
CREATE TABLE public.stock_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  analysis_type analysis_type NOT NULL,
  command_text TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  request_data JSONB,
  result_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Add webhook URL to profiles table
ALTER TABLE public.profiles 
ADD COLUMN n8n_webhook_url TEXT;

-- Enable Row Level Security
ALTER TABLE public.stock_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for stock analyses
CREATE POLICY "Users can view their own stock analyses" 
ON public.stock_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stock analyses" 
ON public.stock_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stock analyses" 
ON public.stock_analyses 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stock analyses" 
ON public.stock_analyses 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stock_analyses_updated_at
BEFORE UPDATE ON public.stock_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_stock_analyses_user_id ON public.stock_analyses(user_id);
CREATE INDEX idx_stock_analyses_symbol ON public.stock_analyses(symbol);
CREATE INDEX idx_stock_analyses_status ON public.stock_analyses(status);
CREATE INDEX idx_stock_analyses_created_at ON public.stock_analyses(created_at DESC);
CREATE INDEX idx_stock_analyses_user_symbol_type ON public.stock_analyses(user_id, symbol, analysis_type);