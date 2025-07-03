import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, AlertTriangle, CheckCircle, Zap, Target, Shield, TrendingUp } from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    {
      icon: Clock,
      title: "Manual research takes 2-4 hours per stock",
      description: "Collecting data from multiple sources is time-consuming"
    },
    {
      icon: DollarSign,
      title: "Multiple expensive subscriptions needed",
      description: "Technical, fundamental, and news tools cost $200+ monthly"
    },
    {
      icon: AlertTriangle,
      title: "Inconsistent analysis quality",
      description: "Human bias and emotions affect investment decisions"
    },
    {
      icon: Target,
      title: "Missing critical insights",
      description: "Important signals get overlooked in manual analysis"
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: "4 analysis types in 30 seconds",
      description: "Get comprehensive reports faster than ever"
    },
    {
      icon: Shield,
      title: "Professional-grade data sources",
      description: "Institutional-quality data at fraction of the cost"
    },
    {
      icon: CheckCircle,
      title: "Consistent, unbiased insights",
      description: "AI eliminates human emotions from analysis"
    },
    {
      icon: TrendingUp,
      title: "Actionable recommendations",
      description: "Clear buy/sell/hold signals with confidence scores"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Problem Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Stop Spending Hours Researching Stocks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Traditional stock research is inefficient, expensive, and prone to human error
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((problem, index) => (
                <Card key={index} className="border-danger/20 bg-danger/5">
                  <CardContent className="p-6">
                    <problem.icon className="h-8 w-8 text-danger mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Get Everything in One AI-Powered Report
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our AI combines multiple data sources to deliver professional analysis instantly
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {solutions.map((solution, index) => (
                <Card key={index} className="border-success/20 bg-success/5 hover:bg-success/10 transition-colors">
                  <CardContent className="p-6">
                    <solution.icon className="h-8 w-8 text-success mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {solution.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;