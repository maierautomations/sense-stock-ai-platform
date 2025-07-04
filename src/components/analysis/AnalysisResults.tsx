import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

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

interface AnalysisResultsProps {
  results: AnalysisResult[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const AnalysisResults = ({ results, onRefresh, isLoading }: AnalysisResultsProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'processing':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
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

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No analyses yet. Start by running your first analysis above!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Analysis Results</span>
            </CardTitle>
            <CardDescription>
              Your recent stock analysis results
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result) => (
          <div 
            key={result.id} 
            className="p-4 border rounded-lg space-y-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="font-medium text-foreground">{result.symbol}</div>
                <Badge variant="outline" className="text-xs">
                  {formatAnalysisType(result.analysis_type)}
                </Badge>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(result.status)}
                  <Badge variant={getStatusColor(result.status) as any} className="text-xs">
                    {result.status}
                  </Badge>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Command:</span> "{result.command_text}"
            </div>

            {result.status === 'failed' && result.error_message && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                <span className="font-medium">Error:</span> {result.error_message}
              </div>
            )}

            {result.status === 'completed' && result.result_data && (
              <div className="text-sm bg-green-50 p-3 rounded">
                <div className="font-medium text-green-800 mb-2">Analysis Complete</div>
                <pre className="text-xs text-green-700 whitespace-pre-wrap overflow-hidden">
                  {JSON.stringify(result.result_data, null, 2).slice(0, 200)}
                  {JSON.stringify(result.result_data, null, 2).length > 200 && '...'}
                </pre>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};