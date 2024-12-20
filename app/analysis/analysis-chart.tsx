"use client";

import { CartesianGrid, Dot, Line, LineChart, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartData } from "./types";
import { ChartLineIcon } from "lucide-react";

const ImproveColor = "#10b981";
const DeclineColor = "#ef4444";

const chartConfig = {
  score: {
    label: "Score",
    color: "#18181b",
  },
} satisfies ChartConfig;

export const IntervalOptions = [
  {
    label: "5 seconds",
    value: 5000,
  },
  {
    label: "30 seconds",
    value: 10000,
  },
  {
    label: "1 minute",
    value: 60000,
  },
  {
    label: "5 minutes",
    value: 300000,
  },
];
export function AnalysisChart({
  setOpenSheet,
  setSheetContent,
  chartData,
  iterationInterval,
  setIterationInterval,
}: {
  setOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setSheetContent: React.Dispatch<React.SetStateAction<ChartData | undefined>>;
  chartData: ChartData[];
  iterationInterval: number;
  setIterationInterval: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>
              <div className="flex items-center gap-1">
                <ChartLineIcon className="w-4 h-4" />
                <span>Improvement analysis</span>
              </div>
            </CardTitle>
            <CardDescription>
              Click on any point on the chart to see the details
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs">Analysis interval</p>
            <Select
              value={iterationInterval.toString()}
              onValueChange={(val) => setIterationInterval(Number(val))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IntervalOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 18,
            }}
            onClick={(payload) => {
              if (payload && payload.activePayload?.[0].payload) {
                setOpenSheet(true);
                setSheetContent(payload.activePayload[0].payload);
              }
            }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="score"
              type="linear"
              stroke="var(--color-score)"
              isAnimationActive={false}
              strokeWidth={2}
              activeDot={{ r: 10, style: { cursor: "pointer" } }}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={Math.random()}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.improving ? ImproveColor : DeclineColor}
                  />
                );
              }}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
