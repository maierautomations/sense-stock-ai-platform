import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";

interface AnalysisSummaryProps {
  analysisData: any;
  analysisType: string;
  symbol: string;
}

export const AnalysisSummary = ({ analysisData, analysisType, symbol }: AnalysisSummaryProps) => {
  // Extract key insights from the analysis text
  const extractKeyInsights = (text: string) => {
    if (!text || typeof text !== 'string') return [];
    
    const insights = [];
    
    // Look for common financial indicators
    if (text.includes('bullish') || text.includes('positiv')) {
      insights.push({ type: 'positive', text: 'Positive outlook identified' });
    }
    if (text.includes('bearish') || text.includes('negativ')) {
      insights.push({ type: 'negative', text: 'Negative signals detected' });
    }
    if (text.includes('risk') || text.includes('Risiko')) {
      insights.push({ type: 'warning', text: 'Risk factors present' });
    }
    
    return insights.slice(0, 3); // Limit to 3 insights
  };

  const analysisText = analysisData?.analysis || '';
  const insights = extractKeyInsights(analysisText);

  // Extract first paragraph or first 200 characters as summary
  const getSummary = (text: string) => {
    if (!text || typeof text !== 'string') return 'Analysis completed successfully.';
    
    const firstParagraph = text.split('\n')[0];
    return firstParagraph.length > 200 
      ? firstParagraph.substring(0, 200) + '...'
      : firstParagraph;
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-success/10 text-success border-success/20';
      case 'negative':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-info/10 text-info border-info/20';
    }
  };

  return (
    <div className="space-y-3">
      {/* Summary Text */}
      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
        <p className="text-sm leading-relaxed text-foreground">
          {getSummary(analysisText)}
        </p>
      </div>

      {/* Key Insights */}
      {insights.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Key Insights</h4>
          <div className="flex flex-wrap gap-2">
            {insights.map((insight, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md border text-xs ${getInsightColor(insight.type)}`}
              >
                {getInsightIcon(insight.type)}
                <span>{insight.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-muted/30 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Analysis Type</div>
          <div className="text-sm font-medium">{analysisType.replace('_', ' ').toUpperCase()}</div>
        </div>
        <div className="bg-muted/30 p-2 rounded-lg">
          <div className="text-xs text-muted-foreground">Symbol</div>
          <div className="text-sm font-medium">{symbol}</div>
        </div>
      </div>
    </div>
  );
};