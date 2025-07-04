import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Send, Lightbulb } from "lucide-react";

interface SmartCommandInputProps {
  onSubmit: (command: string) => void;
  isLoading: boolean;
}

export const SmartCommandInput = ({ onSubmit, isLoading }: SmartCommandInputProps) => {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onSubmit(command.trim());
      setCommand("");
    }
  };

  const suggestions = [
    "Tesla chart analysis",
    "Apple fundamental review", 
    "NVIDIA insider activity",
    "Microsoft news sentiment",
    "Amazon full analysis"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>Smart Analysis Command</span>
        </CardTitle>
        <CardDescription>
          Type your analysis request using natural language - specify any stock symbol and analysis type
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            placeholder='e.g., "Tesla chart analysis" or "NVDA full analysis"'
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!command.trim() || isLoading}>
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Quick examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-xs h-7 px-2 bg-muted/50 hover:bg-muted"
                onClick={() => setCommand(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};