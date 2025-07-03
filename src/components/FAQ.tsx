import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How accurate is StockSense AI's analysis?",
      answer: "Our AI models achieve 99% accuracy by combining multiple data sources including technical indicators, fundamental analysis, news sentiment, and insider trading data. We continuously train our models on historical and real-time market data to maintain high accuracy levels."
    },
    {
      question: "What data sources does StockSense AI use?",
      answer: "We aggregate data from leading financial providers including Bloomberg, Reuters, SEC filings, social media sentiment, technical chart data, and insider trading reports. All data is processed in real-time to ensure you get the most current insights."
    },
    {
      question: "How long does it take to generate an analysis?",
      answer: "Most analyses are generated within 30 seconds. Complex multi-factor analyses may take up to 60 seconds. Our AI processes thousands of data points instantly to deliver comprehensive reports faster than any manual analysis."
    },
    {
      question: "Can I export the analysis reports?",
      answer: "Yes! Pro and Business subscribers can export reports as PDFs, share them via email, or integrate with popular portfolio management tools. Free users can view analyses online but cannot export them."
    },
    {
      question: "Do you offer an API for developers?",
      answer: "Business plan subscribers get full API access with comprehensive documentation. You can integrate our analysis engine directly into your applications, trading platforms, or custom dashboards with real-time data feeds."
    },
    {
      question: "What happens if I exceed my analysis limit?",
      answer: "If you reach your monthly analysis limit, you can either upgrade your plan or wait until the next billing cycle. We'll send notifications when you're approaching your limit so you can plan accordingly."
    },
    {
      question: "Is my data and analysis history secure?",
      answer: "Absolutely. We use enterprise-grade encryption, secure data centers, and follow strict financial data compliance standards. Your analysis history and personal information are never shared with third parties."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period. No cancellation fees or long-term commitments required."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about StockSense AI and our analysis platform.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full text-left p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </button>
                
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openItems.includes(index) 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  )}
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions?
            </p>
            <a 
              href="mailto:support@stocksense.ai" 
              className="text-primary hover:text-primary-dark font-medium"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;