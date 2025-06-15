import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface SourceData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const sourcesData: SourceData[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F87171' }, // red-400
  { name: 'Behance', value: 1000, percentage: 20, color: '#FACC15' }, // yellow-400 - Adjusted from image for better distinction from Dribble
  { name: 'Instagram', value: 1000, percentage: 20, color: '#2DD4BF' }, // teal-400
  { name: 'Dribbble', value: 1000, percentage: 10, color: '#A3E635' }, // lime-400 - Differentiated from Behance
];

// Calculate total for percentages in pie chart if they don't sum to 100
const totalValue = sourcesData.reduce((acc, curr) => acc + curr.value, 0);
const chartData = sourcesData.map(s => ({ ...s, percentageActual: (s.value / totalValue) * 100 }));

interface SourcesOverviewProps {
  className?: string;
}

const SourcesOverview: React.FC<SourcesOverviewProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="space-y-2 text-sm mt-4">
        {payload.map((entry: any, index: number) => {
          const source = sourcesData.find(s => s.name === entry.payload.name);
          if (!source) return null;
          return (
            <li key={`item-${index}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: entry.color }}></span>
                <span className="text-foreground">{source.name}</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-3">$ {source.value.toLocaleString()}</span>
                 <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                       <span className="text-foreground w-10 text-right cursor-default">{source.percentage}%</span>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>from leads total</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              <CalendarDays className="mr-1 h-3 w-3" />
              Last 6 months
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-52 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50} // Donut chart
                fill="#8884d8"
                dataKey="value"
                strokeWidth={0} // No border between slices
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-4">
          <TabsList className="grid w-full grid-cols-3 h-9">
            <TabsTrigger value="leadsCame" className="text-xs px-1 py-1.5">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs px-1 py-1.5">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDeals" className="text-xs px-1 py-1.5">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>

        <CustomLegend payload={chartData.map(s => ({ payload: { name: s.name }, color: s.color }))} />

      </CardContent>
    </Card>
  );
};

export default SourcesOverview;
