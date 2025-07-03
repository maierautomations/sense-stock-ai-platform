import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Brain, TrendingUp, Mail, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "API Documentation", href: "/docs" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Trading Guide", href: "/guide" },
        { label: "Market Insights", href: "/insights" },
        { label: "Webinars", href: "/webinars" },
        { label: "Community", href: "/community" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Security", href: "/security" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/stocksenseai", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/stocksenseai", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/stocksenseai", label: "GitHub" },
    { icon: Mail, href: "mailto:hello@stocksense.ai", label: "Email" }
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated with Market Insights
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get weekly market analysis, trading tips, and exclusive insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary-dark">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>

        <Separator />

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Logo and Description */}
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Brain className="h-8 w-8 text-primary" />
                  <TrendingUp className="h-4 w-4 text-primary-light absolute -bottom-1 -right-1" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  StockSense AI
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Professional stock analysis powered by AI. Get comprehensive insights 
                in seconds, not hours.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} StockSense AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground">
                Made with ❤️ for traders worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;