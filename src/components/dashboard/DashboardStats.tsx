import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Clock } from "lucide-react";

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

interface DashboardStatsProps {
  analysisResults: AnalysisResult[];
}

export const DashboardStats = ({ analysisResults }: DashboardStatsProps) => {
  const totalAnalyses = analysisResults.length;
  const completedAnalyses = analysisResults.filter(r => r.status === 'completed').length;
  const pendingAnalyses = analysisResults.filter(r => r.status === 'pending' || r.status === 'processing').length;

  const marketStats = [
    { label: "Total Analyses", value: totalAnalyses.toString(), icon: BarChart3 },
    { label: "Completed", value: completedAnalyses.toString(), icon: TrendingUp },
    { label: "In Progress", value: pendingAnalyses.toString(), icon: Clock },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {marketStats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};