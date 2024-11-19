"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { ChartData } from "./types";
import { CircleCheckIcon, LightbulbIcon } from "lucide-react";

export default function DetailsCard({
  currentPoint,
}: {
  currentPoint: ChartData | undefined;
}) {
  return (
    <div className="flex gap-2">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              <CircleCheckIcon className="w-4 h-4" />
              <span>Status</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p
              className={`text-lg font-bold transition-all duration-300 ease-in-out px-4 py-1 rounded-3xl ${
                currentPoint
                  ? currentPoint.improving
                    ? "text-green-500 bg-green-500/10"
                    : "text-red-500 bg-red-500/10"
                  : "text-gray-500"
              }`}>
              {currentPoint
                ? currentPoint.improving
                  ? "Improving"
                  : "Not improving"
                : "No data available"}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-1">
              <LightbulbIcon className="w-4 h-4" />
              <span>Hint</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>{currentPoint?.hint || "No hint available"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
