import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Calculator, Newspaper, Users, TrendingUp, DollarSign, Activity, Brain } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Technical Analysis",
      subtitle: "Chart Patterns & Indicators",
      description: "Advanced technical analysis with MACD, RSI, support/resistance levels, candlestick patterns, and volume analysis to identify optimal entry and exit points.",
      highlights: ["MACD & RSI Indicators", "Support/Resistance Levels", "Volume Analysis", "Trend Identification"]
    },
    {
      icon: Calculator,
      title: "Fundamental Analysis", 
      subtitle: "Financial Health & Valuation",
      description: "Comprehensive fundamental analysis including P/E ratios, ROE, debt levels, financial health scoring, and growth indicators for long-term value assessment.",
      highlights: ["P/E & ROE Ratios", "Debt Analysis", "Financial Health Score", "Growth Indicators"]
    },
    {
      icon: Newspaper,
      title: "News Sentiment",
      subtitle: "Market Sentiment & Impact",
      description: "Real-time sentiment analysis from financial news, social media monitoring, and market impact assessment to gauge market psychology and momentum.",
      highlights: ["Real-time Sentiment", "News Impact Analysis", "Social Media Monitoring", "Sentiment Scoring"]
    },
    {
      icon: Users,
      title: "Insider Activity",
      subtitle: "Management Buying & Selling",
      description: "Track insider trading patterns, management confidence levels, and transaction analysis to understand internal company sentiment and future prospects.",
      highlights: ["Management Trading", "Insider Sentiment", "Transaction Analysis", "Confidence Indicators"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Brain className="h-4 w-4 mr-2" />
              Powered by AI
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Four Analysis Types in One Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get institutional-quality research without the institutional price tag. 
              Our AI combines multiple data sources for comprehensive stock analysis.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {feature.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {feature.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm text-foreground font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-6 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm font-medium text-foreground">99% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">30 Second Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium text-foreground">Professional Grade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;