import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, BarChart3, PieChart } from "lucide-react";

interface FundamentalAnalysisViewProps {
  analysisData: any;
}

export const FundamentalAnalysisView = ({ analysisData }: FundamentalAnalysisViewProps) => {
  const analysisText = analysisData?.analysis || '';

  // Extract financial metrics from the German analysis text
  const extractMetrics = (text: string) => {
    const metrics = [];
    
    // Look for common financial ratios and values
    const patterns = [
      { name: 'Market Cap', pattern: /Marktkapitalisierung.*?([0-9,.]+ (Mrd|Mio))/i, unit: '' },
      { name: 'Revenue', pattern: /Umsatz.*?([0-9,.]+ (Mrd|Mio))/i, unit: '' },
      { name: 'P/E Ratio', pattern: /KGV.*?([0-9,.]+)/i, unit: '' },
      { name: 'Profit Margin', pattern: /Gewinnmarge.*?([0-9,.]+ ?%)/i, unit: '' },
      { name: 'ROE', pattern: /ROE.*?([0-9,.]+ ?%)/i, unit: '' },
      { name: 'Debt Ratio', pattern: /Verschuldung.*?([0-9,.]+ ?%)/i, unit: '' }
    ];

    patterns.forEach(pattern => {
      const match = text.match(pattern.pattern);
      if (match) {
        metrics.push({
          name: pattern.name,
          value: match[1],
          unit: pattern.unit
        });
      }
    });

    return metrics;
  };

  // Extract qualitative assessments
  const extractAssessments = (text: string) => {
    const assessments = [];
    
    if (text.includes('stark') || text.includes('solide') || text.includes('robust')) {
      assessments.push({ category: 'Financial Health', rating: 'Strong', color: 'text-success' });
    }
    if (text.includes('Wachstum') || text.includes('growth')) {
      assessments.push({ category: 'Growth Potential', rating: 'Positive', color: 'text-success' });
    }
    if (text.includes('Risiko') || text.includes('Unsicherheit')) {
      assessments.push({ category: 'Risk Level', rating: 'Moderate', color: 'text-warning' });
    }
    if (text.includes('Bewertung') || text.includes('bewertet')) {
      assessments.push({ category: 'Valuation', rating: 'Fair', color: 'text-info' });
    }

    return assessments;
  };

  const metrics = extractMetrics(analysisText);
  const assessments = extractAssessments(analysisText);

  return (
    <div className="space-y-4">
      {/* Financial Metrics Grid */}
      {metrics.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Key Financial Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-muted/20 border-border/30">
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">{metric.name}</div>
                  <div className="text-lg font-bold text-foreground">{metric.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Qualitative Assessments */}
      {assessments.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Assessment Overview
          </h4>
          <div className="space-y-2">
            {assessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                <span className="text-sm text-foreground">{assessment.category}</span>
                <Badge variant="outline" className={assessment.color}>
                  {assessment.rating}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Analysis Text */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Detailed Analysis</h4>
        <div className="bg-muted/20 p-4 rounded-lg border border-border/30">
          <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {analysisText}
          </div>
        </div>
      </div>
    </div>
  );
};