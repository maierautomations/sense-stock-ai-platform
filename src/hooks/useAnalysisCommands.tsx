import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface AnalysisCommand {
  symbol: string;
  analysisType: string;
}

export const useAnalysisCommands = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const parseCommand = (command: string): AnalysisCommand => {
    const lowerCommand = command.toLowerCase();
    
    // Extract symbol (look for 3-5 uppercase letters or common patterns)
    const symbolMatch = command.match(/\b([A-Z]{1,5})\b/) || 
                       lowerCommand.match(/\b(tesla|apple|microsoft|amazon|google|nvidia|meta|netflix)\b/);
    
    let symbol = '';
    if (symbolMatch) {
      const matched = symbolMatch[1];
      // Convert company names to symbols
      const nameToSymbol: { [key: string]: string } = {
        'tesla': 'TSLA',
        'apple': 'AAPL', 
        'microsoft': 'MSFT',
        'amazon': 'AMZN',
        'google': 'GOOGL',
        'nvidia': 'NVDA',
        'meta': 'META',
        'netflix': 'NFLX'
      };
      symbol = nameToSymbol[matched.toLowerCase()] || matched.toUpperCase();
    }

    // Determine analysis type
    let analysisType = 'full_analysis';
    if (lowerCommand.includes('chart') || lowerCommand.includes('technical')) {
      analysisType = 'chart';
    } else if (lowerCommand.includes('fundamental') || lowerCommand.includes('financial')) {
      analysisType = 'fundamental';
    } else if (lowerCommand.includes('insider') || lowerCommand.includes('institutional')) {
      analysisType = 'insider';
    } else if (lowerCommand.includes('sentiment') || lowerCommand.includes('news')) {
      analysisType = 'news_sentiment';
    } else if (lowerCommand.includes('full') || lowerCommand.includes('complete')) {
      analysisType = 'full_analysis';
    }

    return { symbol, analysisType };
  };

  const submitAnalysis = async (command: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to run analysis",
        variant: "destructive",
      });
      return false;
    }

    const { symbol, analysisType } = parseCommand(command);
    
    if (!symbol) {
      toast({
        title: "Error", 
        description: "Please include a stock symbol in your command",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase.functions.invoke('trigger-analysis', {
        body: {
          symbol,
          analysis_type: analysisType,
          command_text: command,
          user_id: user.id
        }
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      } else if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Analysis Started",
          description: `Started ${analysisType.replace('_', ' ')} analysis for ${symbol}`,
        });
        return true;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return { submitAnalysis };
};