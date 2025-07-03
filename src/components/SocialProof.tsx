import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Building, Briefcase } from "lucide-react";

const SocialProof = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Portfolio Manager",
      company: "Quantum Capital",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: "StockSense AI has revolutionized our research process. What used to take our team 4 hours now takes 30 seconds. The accuracy is incredible and the insights are actionable.",
      highlight: "Saved 4 hours per analysis"
    },
    {
      name: "Michael Rodriguez",
      title: "Day Trader",
      company: "Independent",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: "The technical analysis features are spot-on. I've improved my win rate by 23% since using StockSense AI. The real-time sentiment analysis gives me an edge the market doesn't have.",
      highlight: "23% better win rate"
    },
    {
      name: "Emily Watson",
      title: "Investment Advisor",
      company: "WealthGuard Financial",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      rating: 5,
      content: "My clients love the comprehensive reports. The combination of fundamental and technical analysis with news sentiment gives them confidence in their investment decisions.",
      highlight: "Clients love the reports"
    }
  ];

  const companies = [
    { name: "Goldman Sachs", logo: "🏦" },
    { name: "Morgan Stanley", logo: "🏛️" },
    { name: "BlackRock", logo: "⚫" },
    { name: "Vanguard", logo: "🔺" },
    { name: "Fidelity", logo: "💎" },
    { name: "Charles Schwab", logo: "🏪" }
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "10,000+",
      label: "Analyses Generated",
      color: "text-primary"
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Average Rating",
      color: "text-warning"
    },
    {
      icon: Building,
      value: "500+",
      label: "Financial Firms",
      color: "text-success"
    },
    {
      icon: Briefcase,
      value: "1,000+",
      label: "Active Traders",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Trusted Worldwide
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Trusted by Leading Financial Professionals
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of traders, advisors, and fund managers who rely on StockSense AI for their investment decisions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-5 w-5 text-primary mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <Badge variant="secondary" className="mb-4">
                    {testimonial.highlight}
                  </Badge>
                  
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Company Logos */}
          <div className="text-center">
            <p className="text-muted-foreground mb-8">
              Trusted by professionals at leading financial institutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {companies.map((company, index) => (
                <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                  <span className="text-2xl">{company.logo}</span>
                  <span className="font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;