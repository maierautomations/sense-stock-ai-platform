import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PortfolioHolding {
  id: string;
  symbol: string;
  company_name: string | null;
  shares: number;
  purchase_price: number;
  purchase_date: string;
  notes: string | null;
}

interface PortfolioTableProps {
  holdings: PortfolioHolding[];
  onHoldingDeleted: () => void;
}

export const PortfolioTable = ({ holdings, onHoldingDeleted }: PortfolioTableProps) => {
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock current prices - in real app, you'd fetch from an API
  const mockPrices: Record<string, number> = {
    AAPL: 175.50,
    TSLA: 245.30,
    GOOGL: 142.80,
    MSFT: 378.90,
    AMZN: 153.20,
    NVDA: 485.60,
  };

  const handleDelete = async (id: string) => {
    setLoadingDelete(id);
    try {
      const { error } = await supabase
        .from('portfolio_holdings')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Holding removed from portfolio",
        });
        onHoldingDeleted();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingDelete(null);
    }
  };

  const calculateMetrics = (holding: PortfolioHolding) => {
    const currentPrice = mockPrices[holding.symbol] || holding.purchase_price;
    const totalCost = holding.shares * holding.purchase_price;
    const currentValue = holding.shares * currentPrice;
    const gainLoss = currentValue - totalCost;
    const gainLossPercent = ((currentValue - totalCost) / totalCost) * 100;

    return {
      currentPrice,
      totalCost,
      currentValue,
      gainLoss,
      gainLossPercent,
    };
  };

  const portfolioSummary = holdings.reduce(
    (acc, holding) => {
      const metrics = calculateMetrics(holding);
      acc.totalCost += metrics.totalCost;
      acc.totalValue += metrics.currentValue;
      acc.totalGainLoss += metrics.gainLoss;
      return acc;
    },
    { totalCost: 0, totalValue: 0, totalGainLoss: 0 }
  );

  const portfolioGainLossPercent = portfolioSummary.totalCost > 0 
    ? ((portfolioSummary.totalValue - portfolioSummary.totalCost) / portfolioSummary.totalCost) * 100 
    : 0;

  if (holdings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No holdings in your portfolio yet</p>
            <p className="text-sm text-muted-foreground">
              Add your first stock holding to start tracking your portfolio performance
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              ${portfolioSummary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              ${portfolioSummary.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Gain/Loss
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-2xl font-bold flex items-center gap-1 ${
              portfolioSummary.totalGainLoss >= 0 ? 'text-success' : 'text-danger'
            }`}>
              {portfolioSummary.totalGainLoss >= 0 ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              ${Math.abs(portfolioSummary.totalGainLoss).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Portfolio Return
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`text-2xl font-bold ${
              portfolioGainLossPercent >= 0 ? 'text-success' : 'text-danger'
            }`}>
              {portfolioGainLossPercent >= 0 ? '+' : ''}{portfolioGainLossPercent.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Purchase Price</TableHead>
                <TableHead className="text-right">Current Price</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead className="text-right">Current Value</TableHead>
                <TableHead className="text-right">Gain/Loss</TableHead>
                <TableHead className="text-right">Return %</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((holding) => {
                const metrics = calculateMetrics(holding);
                const isPositive = metrics.gainLoss >= 0;
                
                return (
                  <TableRow key={holding.id}>
                    <TableCell className="font-medium">{holding.symbol}</TableCell>
                    <TableCell>{holding.company_name || '-'}</TableCell>
                    <TableCell className="text-right">{holding.shares}</TableCell>
                    <TableCell className="text-right">
                      ${holding.purchase_price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${metrics.currentPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${metrics.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      ${metrics.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={isPositive ? "default" : "destructive"} className="font-mono">
                        {isPositive ? '+' : ''}${metrics.gainLoss.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={isPositive ? "default" : "destructive"} className="font-mono">
                        {isPositive ? '+' : ''}{metrics.gainLossPercent.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(holding.id)}
                        disabled={loadingDelete === holding.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};