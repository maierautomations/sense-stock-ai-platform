import { useState } from "react";
import { SmartCommandInput } from "@/components/analysis/SmartCommandInput";
import { EnhancedAnalysisResults } from "@/components/analysis/EnhancedAnalysisResults";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardQuickActions } from "@/components/dashboard/DashboardQuickActions";
import { useAnalysisCommands } from "@/hooks/useAnalysisCommands";
import { useAnalysisResults } from "@/hooks/useAnalysisResults";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { submitAnalysis } = useAnalysisCommands();
  const { analysisResults, isLoading: loadingResults, fetchAnalysisResults } = useAnalysisResults();

  const handleAnalysisSubmit = async (command: string) => {
    setIsLoading(true);
    const success = await submitAnalysis(command);
    if (success) {
      fetchAnalysisResults();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to your StockSense AI Dashboard
          </h1>
          <p className="text-muted-foreground">
            Analyze stocks with advanced AI and make informed investment decisions.
          </p>
        </div>

        {/* Quick Stats */}
        <DashboardStats analysisResults={analysisResults} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Smart Command Input */}
          <div className="lg:col-span-2">
            <SmartCommandInput
              onSubmit={handleAnalysisSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Analysis Results */}
          <div>
            <EnhancedAnalysisResults
              results={analysisResults}
              onRefresh={fetchAnalysisResults}
              isLoading={loadingResults}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <DashboardQuickActions />
      </main>
    </div>
  );
};

export default Dashboard;