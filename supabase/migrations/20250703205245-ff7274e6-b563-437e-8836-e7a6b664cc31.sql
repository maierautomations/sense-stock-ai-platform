-- Create portfolio holdings table
CREATE TABLE public.portfolio_holdings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  company_name VARCHAR(255),
  shares DECIMAL(18,8) NOT NULL CHECK (shares > 0),
  purchase_price DECIMAL(18,2) NOT NULL CHECK (purchase_price > 0),
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure user can't have duplicate holdings for same symbol on same date
  UNIQUE(user_id, symbol, purchase_date)
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_holdings ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio holdings
CREATE POLICY "Users can view their own portfolio holdings" 
ON public.portfolio_holdings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolio holdings" 
ON public.portfolio_holdings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio holdings" 
ON public.portfolio_holdings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own portfolio holdings" 
ON public.portfolio_holdings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_portfolio_holdings_updated_at
BEFORE UPDATE ON public.portfolio_holdings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_portfolio_holdings_user_id ON public.portfolio_holdings(user_id);
CREATE INDEX idx_portfolio_holdings_symbol ON public.portfolio_holdings(symbol);
CREATE INDEX idx_portfolio_holdings_user_symbol ON public.portfolio_holdings(user_id, symbol);