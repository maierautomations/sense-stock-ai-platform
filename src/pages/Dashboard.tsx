import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Search, BarChart3, Clock, DollarSign, LogOut, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const recentAnalyses = [
    { symbol: "AAPL", analysis: "Buy", confidence: 95, timestamp: "2 hours ago" },
    { symbol: "TSLA", analysis: "Hold", confidence: 78, timestamp: "5 hours ago" },
    { symbol: "GOOGL", analysis: "Buy", confidence: 89, timestamp: "1 day ago" },
  ];

  const marketStats = [
    { label: "Analyses Today", value: "12", icon: BarChart3 },
    { label: "Accuracy Rate", value: "94%", icon: TrendingUp },
    { label: "Total Saved", value: "$2,340", icon: DollarSign },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stock Analysis Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Analyze Stock</span>
                </CardTitle>
                <CardDescription>
                  Enter a stock symbol to get AI-powered analysis and recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter stock symbol (e.g., AAPL, TSLA, GOOGL)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button>
                    <Brain className="h-4 w-4 mr-2" />
                    Analyze
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Analysis Ready</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter a stock symbol above to receive comprehensive AI analysis including 
                    technical indicators, sentiment analysis, and price predictions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Analyses */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Analyses</span>
                </CardTitle>
                <CardDescription>
                  Your latest stock analysis results.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAnalyses.map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium text-foreground">{analysis.symbol}</div>
                      <Badge 
                        variant={analysis.analysis === "Buy" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {analysis.analysis}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">
                        {analysis.confidence}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {analysis.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  View All Analyses
                </Button>
              </CardContent>
            </Card>
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