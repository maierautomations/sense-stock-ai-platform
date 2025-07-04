import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface AnalysisModeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
  onSelect: () => void;
  isSelected: boolean;
}

export const AnalysisModeCard = ({ 
  title, 
  description, 
  icon: Icon, 
  examples, 
  onSelect, 
  isSelected 
}: AnalysisModeCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/30'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Examples:</p>
          <div className="flex flex-wrap gap-1">
            {examples.map((example, index) => (
              <span 
                key={index}
                className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
              >
                "{example}"
              </span>
            ))}
          </div>
        </div>
        <Button 
          variant={isSelected ? "default" : "outline"} 
          size="sm" 
          className="w-full mt-3"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? 'Selected' : 'Select Mode'}
        </Button>
      </CardContent>
    </Card>
  );
};