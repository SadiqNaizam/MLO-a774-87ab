import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 40 },
  { month: 'Feb', closedWon: 80, closedLost: 55 },
  { month: 'March', closedWon: 50, closedLost: 70 },
  { month: 'April', closedWon: 25, closedLost: 40 },
  { month: 'May', closedWon: 68, closedLost: 30 },
  { month: 'June', closedWon: 82, closedLost: 10 },
  { month: 'July', closedWon: 60, closedLost: 45 },
  { month: 'August', closedWon: 30, closedLost: 95 },
];

interface LeadsTrackingProps {
  className?: string;
}

const LeadsTracking: React.FC<LeadsTrackingProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <div className="mt-2 flex items-baseline space-x-6">
                <div>
                    <span className="text-3xl font-bold text-foreground">680</span>
                    <span className="ml-1 text-xs text-muted-foreground">total closed</span>
                </div>
                <div>
                    <span className="text-3xl font-bold text-foreground">70</span>
                    <span className="ml-1 text-xs text-muted-foreground">total lost</span>
                </div>
            </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground -mt-1">
              <CalendarDays className="mr-1 h-3 w-3" />
              Last 6 months
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem>Last 12 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={leadsTrackingData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} dy={10} style={{ fontSize: '0.75rem', fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tickLine={false} axisLine={false} style={{ fontSize: '0.75rem', fill: 'hsl(var(--muted-foreground))' }} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: 'var(--radius)'}}
                labelStyle={{ color: 'hsl(var(--card-foreground))'}}
              />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '10px' }}
                formatter={(value, entry) => <span className="text-xs text-muted-foreground ml-1">{value}</span>}
              />
              <defs>
                <linearGradient id="closedWonArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="closedWon" stroke="#10B981" fillOpacity={1} fill="url(#closedWonArea)" strokeWidth={2} name="Closed won" dot={{ r: 4, strokeWidth: 2, fill: '#10B981' }} activeDot={{ r: 6, fill: '#10B981', stroke: 'hsl(var(--background))', strokeWidth: 2 }}/>
              <Line type="monotone" dataKey="closedLost" stroke="#EF4444" strokeWidth={2} name="Closed lost" dot={{ r: 4, strokeWidth: 2, fill: '#EF4444' }} activeDot={{ r: 6, fill: '#EF4444', stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTracking;
