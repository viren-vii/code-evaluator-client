"use client";

import React from "react";
import { AnalysisChart, IntervalOptions } from "./analysis-chart";
import CodeSnippet from "./code-snippet";
import QuestionCard from "./question-card";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { feedQuestion } from "../actions";
import { ChartData } from "./types";
import { BaseMessage } from "@langchain/core/messages";

function Analysis({
  setDisableEditor,
  setCode,
  chartData,
  getCodeEvaluation,
  setMessages,
}: {
  setDisableEditor: React.Dispatch<React.SetStateAction<boolean>>;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  chartData: ChartData[];
  getCodeEvaluation: () => void;
  setMessages: React.Dispatch<React.SetStateAction<BaseMessage[]>>;
}) {
  const [openSheet, setOpenSheet] = React.useState(false);
  const [sheetContent, setSheetContent] = React.useState<ChartData | undefined>(
    undefined
  );

  const [iterationInterval, setIterationInterval] = React.useState<number>(
    IntervalOptions[0].value
  );

  const { mutate: submitQuestion } = useMutation({
    mutationFn: feedQuestion,
    onError: (error) => {
      console.error(error);
      toast.error("Failed to feed the question");
    },
    onSuccess(res) {
      setDisableEditor(false);
      setCode("");
      toast.success("Question has been fed successfully");
      setMessages(res.messages);
    },
  });

  console.log("UPDATING");

  React.useEffect(() => {
    const interval = setInterval(() => {
      getCodeEvaluation();
    }, iterationInterval);

    return () => clearInterval(interval);
  }, [iterationInterval]);

  return (
    <div className="p-6 flex flex-col gap-6 overflow-y-auto">
      <QuestionCard submitQuestion={submitQuestion} setCode={setCode} />
      <AnalysisChart
        setOpenSheet={setOpenSheet}
        setSheetContent={setSheetContent}
        iterationInterval={iterationInterval}
        setIterationInterval={setIterationInterval}
        chartData={chartData}
      />
      <CodeSnippet
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
        sheetContent={sheetContent}
      />
    </div>
  );
}

export default Analysis;
