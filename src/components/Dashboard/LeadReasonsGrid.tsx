import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Reason {
  id: string;
  percentage: number;
  text: string;
}

const reasonsLostData: Reason[] = [
  { id: 'proposalUnclear1', percentage: 40, text: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, text: 'However venture pursuit' },
  { id: 'other', percentage: 10, text: 'Other' },
  { id: 'proposalUnclear2', percentage: 30, text: 'The proposal is unclear' }, 
];

interface OtherDataPoint {
  id: string;
  value: string | number;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataStats: OtherDataPoint[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'conversionTime', value: 12, label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads', hasInfo: true, infoText: 'Leads that have not been contacted in X days.' },
];

interface LeadReasonsGridProps {
  className?: string;
}

const LeadReasonsGrid: React.FC<LeadReasonsGridProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-6">Reasons of leads lost</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {reasonsLostData.map((reason) => (
              <div key={reason.id}>
                <p className="text-4xl font-bold text-foreground">{reason.percentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-6">Other data</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 md:gap-y-0">
            {otherDataStats.map((stat) => (
              <div key={stat.id}>
                <p className="text-4xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <p className="text-sm text-muted-foreground leading-tight">{stat.label}</p>
                  {stat.hasInfo && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 text-muted-foreground ml-1.5 cursor-help shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{stat.infoText || 'Additional information.'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadReasonsGrid;
