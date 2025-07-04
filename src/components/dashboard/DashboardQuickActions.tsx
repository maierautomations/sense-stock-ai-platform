import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Brain, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center space-y-2"
          onClick={() => navigate("/portfolio")}
        >
          <Briefcase className="h-6 w-6" />
          <span>Portfolio Tracker</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
          <TrendingUp className="h-6 w-6" />
          <span>Market Trends</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
          <Brain className="h-6 w-6" />
          <span>AI Insights</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
          <Search className="h-6 w-6" />
          <span>Stock Screener</span>
        </Button>
      </div>
    </div>
  );
};