import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertCircle, CheckCircle, Eye, Share, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { FundamentalAnalysisView } from "./FundamentalAnalysisView";
import { AnalysisSummary } from "./AnalysisSummary";
import { useState } from "react";

interface AnalysisResult {
  id: string;
  symbol: string;
  analysis_type: string;
  command_text: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result_data?: any;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

interface AnalysisCardProps {
  result: AnalysisResult;
  onViewDetails?: (result: AnalysisResult) => void;
}

export const AnalysisCard = ({ result, onViewDetails }: AnalysisCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'processing':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'failed':
        return 'destructive';
      case 'processing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatAnalysisType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderAnalysisContent = () => {
    if (result.status === 'failed' && result.error_message) {
      return (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
          <span className="font-medium">Error:</span> {result.error_message}
        </div>
      );
    }

    if (result.status === 'completed' && result.result_data) {
      return (
        <div className="space-y-4">
          <AnalysisSummary 
            analysisData={result.result_data} 
            analysisType={result.analysis_type}
            symbol={result.symbol}
          />
          
          {isExpanded && (
            <div className="space-y-4">
              {result.analysis_type === 'fundamental' && (
                <FundamentalAnalysisView analysisData={result.result_data} />
              )}
              
              {result.analysis_type !== 'fundamental' && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {typeof result.result_data.analysis === 'string' 
                      ? result.result_data.analysis 
                      : JSON.stringify(result.result_data, null, 2)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="font-bold text-lg text-foreground">{result.symbol}</div>
            </div>
            <Badge variant="outline" className="text-xs font-medium">
              {formatAnalysisType(result.analysis_type)}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {getStatusIcon(result.status)}
              <Badge variant={getStatusColor(result.status) as any} className="text-xs">
                {result.status}
              </Badge>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="italic">"{result.command_text}"</span>
          <span>{formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {renderAnalysisContent()}
        
        {result.status === 'completed' && result.result_data && (
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              {onViewDetails && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onViewDetails(result)}
                >
                  View Details
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};