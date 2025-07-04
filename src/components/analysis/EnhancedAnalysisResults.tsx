import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, RefreshCw, Filter, LayoutGrid, LayoutList } from "lucide-react";
import { AnalysisCard } from "./AnalysisCard";
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

interface EnhancedAnalysisResultsProps {
  results: AnalysisResult[];
  onRefresh: () => void;
  isLoading: boolean;
}

export const EnhancedAnalysisResults = ({ results, onRefresh, isLoading }: EnhancedAnalysisResultsProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredResults = results.filter(result => {
    if (filterStatus === 'all') return true;
    return result.status === filterStatus;
  });

  const getStatusCounts = () => {
    return {
      all: results.length,
      completed: results.filter(r => r.status === 'completed').length,
      pending: results.filter(r => r.status === 'pending' || r.status === 'processing').length,
      failed: results.filter(r => r.status === 'failed').length
    };
  };

  const statusCounts = getStatusCounts();

  if (results.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready for Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Start your first stock analysis using the smart command input above.
            </p>
            <div className="text-xs text-muted-foreground">
              Try commands like "Analyze AAPL fundamentals" or "Technical analysis for TSLA"
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Analysis Results</span>
            </CardTitle>
            <CardDescription>
              Your recent stock analysis results and insights
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
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
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1 w-fit">
          {[
            { key: 'all', label: 'All', count: statusCounts.all },
            { key: 'completed', label: 'Completed', count: statusCounts.completed },
            { key: 'pending', label: 'In Progress', count: statusCounts.pending },
            { key: 'failed', label: 'Failed', count: statusCounts.failed }
          ].map(filter => (
            <Button
              key={filter.key}
              variant={filterStatus === filter.key ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus(filter.key)}
              className="text-xs"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className={`space-y-6 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 space-y-0' : ''}`}>
          {filteredResults.map((result) => (
            <AnalysisCard
              key={result.id}
              result={result}
              onViewDetails={(result) => {
                // TODO: Implement detailed view modal
                console.log('View details for:', result);
              }}
            />
          ))}
        </div>

        {filteredResults.length === 0 && filterStatus !== 'all' && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No {filterStatus} analyses found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};