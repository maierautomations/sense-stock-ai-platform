import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardHeader = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">StockSense AI</span>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex">
              Dashboard
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Welcome back, {user?.email?.split('@')[0]}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};