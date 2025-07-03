import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Star, Zap, Building2, Crown } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      icon: Star,
      price: { monthly: 0, annual: 0 },
      description: "Perfect for getting started with AI stock analysis",
      features: [
        "5 analyses per month",
        "Basic technical indicators",
        "News sentiment overview",
        "Community support",
        "Email alerts"
      ],
      limitations: [
        "Limited historical data",
        "Basic charts only"
      ],
      cta: "Get Started Free",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Pro",
      icon: Zap,
      price: { monthly: 29, annual: 23 },
      description: "Ideal for active traders and serious investors",
      features: [
        "100 analyses per month",
        "All technical indicators",
        "Complete fundamental analysis",
        "Advanced news sentiment",
        "Insider trading insights",
        "Priority support",
        "Historical data access",
        "Portfolio tracking",
        "Custom alerts",
        "PDF export"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
      variant: "default" as const
    },
    {
      name: "Business",
      icon: Building2,
      price: { monthly: 99, annual: 79 },
      description: "For teams and financial professionals",
      features: [
        "500 analyses per month",
        "All Pro features",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Advanced analytics",
        "White-label reports",
        "Dedicated support",
        "Custom training",
        "SLA guarantee"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      variant: "outline" as const
    }
  ];

  const getCurrentPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return 0;
    return Math.round((1 - plan.price.annual / plan.price.monthly) * 100);
  };

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Crown className="h-4 w-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose Your Analysis Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Start free and scale as you grow. All plans include our core AI analysis features.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'} hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-lg ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
                      <plan.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        ${getCurrentPrice(plan)}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-muted-foreground ml-1">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="line-through">${plan.price.monthly}/month</span>
                        <span className="text-success ml-2">Save {getSavings(plan)}%</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-4">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <Button 
                    className={`w-full mb-6 ${plan.popular ? 'bg-primary hover:bg-primary-dark' : ''}`}
                    variant={plan.variant}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-center space-x-3 opacity-60">
                        <div className="w-4 h-4 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              All plans include 7-day free trial • No setup fees • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;