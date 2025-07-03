import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Users, Star } from "lucide-react";

const Hero = () => {
  const [ticker, setTicker] = useState("");

  const handleAnalyze = () => {
    if (ticker.trim()) {
      console.log(`Analyzing ${ticker.toUpperCase()}`);
      // TODO: Implement analysis logic
    }
  };

  const popularStocks = ["AAPL", "TSLA", "MSFT", "GOOGL", "AMZN"];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            <Star className="h-4 w-4 mr-2 text-warning" />
            Trusted by 1,000+ traders and advisors
          </Badge>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Get Professional
            <span className="text-primary block">
              Stock Analysis
            </span>
            in 30 Seconds
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered platform combining technical, fundamental, news, and insider analysis 
            into one comprehensive report
          </p>

          {/* Demo Input Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter ticker (e.g., AAPL)"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  className="pl-10 h-12 text-lg"
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                />
              </div>
              <Button 
                onClick={handleAnalyze}
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary-dark text-white font-semibold"
              >
                Try Free Analysis
              </Button>
            </div>

            {/* Popular Stocks */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">Popular:</span>
              {popularStocks.map((stock) => (
                <button
                  key={stock}
                  onClick={() => setTicker(stock)}
                  className="text-sm px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {stock}
                </button>
              ))}
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-success" />
              <span>99% Analysis Accuracy</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>10,000+ Analyses Generated</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-warning" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;