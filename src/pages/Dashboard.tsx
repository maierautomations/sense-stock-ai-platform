import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, BarChart3, Clock, DollarSign, LogOut, Briefcase, LineChart, BookOpen, Users, Newspaper, Zap, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AnalysisModeCard } from "@/components/analysis/AnalysisModeCard";
import { SmartCommandInput } from "@/components/analysis/SmartCommandInput";
import { AnalysisResults } from "@/components/analysis/AnalysisResults";

interface AnalysisResult {
  id: string;
  symbol: string;
  analysis_type: string;
  command_text: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result_data?: any;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

const Dashboard = () => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const analysisModes = [
    {
      id: 'chart',
      title: 'Chart Analysis',
      description: 'Technical analysis with charts, patterns, and indicators',
      icon: LineChart,
      examples: ['Tesla chart', 'AAPL technical', 'NVDA patterns']
    },
    {
      id: 'fundamental',
      title: 'Fundamental Analysis', 
      description: 'Financial metrics, ratios, and company fundamentals',
      icon: BookOpen,
      examples: ['Apple fundamental', 'MSFT financials', 'Google ratios']
    },
    {
      id: 'insider',
      title: 'Insider Activity',
      description: 'Insider trading patterns and institutional movements',
      icon: Users,
      examples: ['Tesla insider', 'NVDA institutional', 'Amazon insider']
    },
    {
      id: 'news_sentiment',
      title: 'News Sentiment',
      description: 'Market sentiment analysis from news and social media',
      icon: Newspaper,
      examples: ['Apple sentiment', 'TSLA news', 'Bitcoin sentiment']
    },
    {
      id: 'full_analysis',
      title: 'Full Analysis',
      description: 'Comprehensive analysis combining all methods',
      icon: Zap,
      examples: ['Tesla full analysis', 'AAPL complete', 'NVDA full report']
    }
  ];

  const fetchAnalysisResults = async () => {
    if (!user) return;
    
    setLoadingResults(true);
    try {
      const { data, error } = await supabase
        .from('stock_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setAnalysisResults((data || []) as AnalysisResult[]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingResults(false);
    }
  };

  const parseCommand = (command: string) => {
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
    let analysisType = selectedMode || 'full_analysis';
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

  const handleAnalysisSubmit = async (command: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to run analysis",
        variant: "destructive",
      });
      return;
    }

    const { symbol, analysisType } = parseCommand(command);
    
    if (!symbol) {
      toast({
        title: "Error", 
        description: "Please include a stock symbol in your command",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('stock_analyses')
        .insert({
          user_id: user.id,
          symbol: symbol,
          analysis_type: analysisType as any,
          command_text: command,
          status: 'pending'
        });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Started",
          description: `Started ${analysisType.replace('_', ' ')} analysis for ${symbol}`,
        });
        fetchAnalysisResults();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysisResults();
  }, [user]);

  const totalAnalyses = analysisResults.length;
  const completedAnalyses = analysisResults.filter(r => r.status === 'completed').length;
  const pendingAnalyses = analysisResults.filter(r => r.status === 'pending' || r.status === 'processing').length;

  const marketStats = [
    { label: "Total Analyses", value: totalAnalyses.toString(), icon: BarChart3 },
    { label: "Completed", value: completedAnalyses.toString(), icon: TrendingUp },
    { label: "In Progress", value: pendingAnalyses.toString(), icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">StockSense AI</span>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">
                Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome back, {user?.email?.split('@')[0]}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to your StockSense AI Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analyze stocks with advanced AI and make informed investment decisions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {marketStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analysis Modes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Choose Analysis Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {analysisModes.map((mode) => (
              <AnalysisModeCard
                key={mode.id}
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
                examples={mode.examples}
                onSelect={() => setSelectedMode(mode.id)}
                isSelected={selectedMode === mode.id}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Smart Command Input */}
          <div className="lg:col-span-2">
            <SmartCommandInput
              onSubmit={handleAnalysisSubmit}
              isLoading={isLoading}
              selectedMode={selectedMode || undefined}
            />
          </div>

          {/* Analysis Results */}
          <div>
            <AnalysisResults
              results={analysisResults}
              onRefresh={fetchAnalysisResults}
              isLoading={loadingResults}
            />
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center space-y-2"
              onClick={() => navigate("/portfolio")}
            >
              <Briefcase className="h-6 w-6" />
              <span>Portfolio Tracker</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Market Trends</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Brain className="h-6 w-6" />
              <span>AI Insights</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <Search className="h-6 w-6" />
              <span>Stock Screener</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;