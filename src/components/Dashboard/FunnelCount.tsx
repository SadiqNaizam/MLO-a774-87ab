import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
  textColor?: string; // Tailwind text color class e.g., 'text-red-700'
  tooltip?: string;
}

const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500', textColor: 'text-red-700' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-400', textColor: 'text-yellow-700', tooltip: 'average time on this stage' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'N/A', color: 'bg-indigo-500', textColor: 'text-indigo-700' }, // Image shows 'average time on this stage' for 'Qualified', 'In conversation' has no specific time in the list but the tooltip in image is on it.
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500', textColor: 'text-green-700' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-500', textColor: 'text-purple-700' },
];

const totalLeadsInFunnel = funnelStagesData.reduce((sum, stage) => sum + stage.count, 0);

interface FunnelCountProps {
  className?: string;
}

const FunnelCount: React.FC<FunnelCountProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-5xl font-bold text-foreground">600</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="mb-6">
          <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
            {funnelStagesData.map((stage) => (
              <div
                key={stage.id}
                className={cn('h-full', stage.color)}
                style={{ width: `${(stage.count / totalLeadsInFunnel) * 100}%` }}
              />
            ))}
          </div>
        </div>

        <ul className="space-y-3">
          {funnelStagesData.map((stage) => (
            <li key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn('w-3 h-3 rounded-sm', stage.color)}></div>
              <span className="text-foreground truncate">{stage.name}</span>
              <span className="text-muted-foreground justify-self-end">{stage.count}</span>
              <span className="text-muted-foreground justify-self-end">$ {stage.value}</span>
              {stage.tooltip ? (
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-muted-foreground justify-self-end cursor-default tabular-nums">{stage.time}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stage.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <span className="text-muted-foreground justify-self-end tabular-nums">{stage.time}</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelCount;
