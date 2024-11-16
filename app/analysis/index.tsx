import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { AnalysisChart } from "./analysis-chart";

const Question = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea placeholder="Please enter the question" />
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

function Analysis() {
  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto">
      <Question />
      <AnalysisChart />
    </div>
  );
}

export default Analysis;
