"use client";

import React from "react";
import Analysis from "./analysis";
import CodeEditor from "./code-editor";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { getEvaluation } from "./actions";
import { BaseMessage } from "@langchain/core/messages";
import { ChartData } from "./analysis/types";
import { toast } from "sonner";

const TitleBar = ({ title }: { title: string }) => {
  return (
    <div className="border-b-[1px] p-2 flex items-center justify-center bg-accent">
      <h1 className="font-semibold">{title}</h1>
    </div>
  );
};

const Tool = () => {
  return (
    <div className="fixed top-5 left-5">
      <Button size={"sm"}>eval</Button>
    </div>
  );
};

let prevCode = "";

export default function Home() {
  const [code, setCode] = React.useState<string>(
    "# Welcome to PyCode Evaluator!\n# Submit your question to start writing code"
  );

  const [disableEditor, setDisableEditor] = React.useState<boolean>(true);

  const [messages, setMessages] = React.useState<BaseMessage[]>([]);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  const { mutate: getCodeEvaluation } = useMutation({
    mutationFn: async () => {
      console.log(prevCode, code, disableEditor);
      if (prevCode === code || disableEditor) return;
      const res = await getEvaluation({ messages, code });
      return res;
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to get evaluation");
    },
    onSuccess(res) {
      if (!res) return;
      setMessages(res.messages);
      setChartData((prev) => [
        ...prev,
        {
          code,
          time: new Date().toLocaleTimeString(),
          ...res.final_output,
          improving: res.final_output.score > prev[prev.length - 1]?.score,
        },
      ]);
      prevCode = code;
    },
  });

  return (
    <>
      <Tool />
      <div className="h-full flex justify-between">
        <div className="flex flex-1 flex-col border-r-[1px]">
          <TitleBar title="Code editor" />
          <CodeEditor
            code={code}
            setCode={setCode}
            disableEditor={disableEditor}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <TitleBar title="Analysis" />
          <Analysis
            setDisableEditor={setDisableEditor}
            setCode={setCode}
            chartData={chartData}
            getCodeEvaluation={getCodeEvaluation}
            setMessages={setMessages}
          />
        </div>
      </div>
    </>
  );
}

