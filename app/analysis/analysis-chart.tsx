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
import { useEffect, useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function AnalysisChart() {
  const [chartData, setChartData] = useState([
    { month: "January", desktop: 186, status: "up" },
    { month: "February", desktop: 305, status: "up" },
    { month: "March", desktop: 237, status: "down" },
    { month: "April", desktop: 73, status: "down" },
    { month: "May", desktop: 209, status: "up" },
    { month: "June", desktop: 214, status: "up" },
  ]);

  //   useEffect(() => {
  //     // every 5 seconds add dummy data to setChartData
  //     const interval = setInterval(() => {
  //       setChartData((prevData) => [
  //         ...prevData,
  //         {
  //           // let month be random for now
  //           month: Math.random().toString(36).substring(7),
  //           desktop: Math.floor(Math.random() * 300),
  //         },
  //       ]);
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Improvement analysis</CardTitle>
        <CardDescription>Improving</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.browser}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.status === "up" ? "#10b981" : "#ef4444"}
                  />
                );
              }}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
