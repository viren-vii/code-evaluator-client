"use client";

import React from "react";
import Analysis from "./analysis";
import CodeEditor from "./code-editor";
import { useMutation } from "@tanstack/react-query";
import { getEvaluation, initBot } from "./actions";
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

let prevCode = "";

export default function Home() {
  const [code, setCode] = React.useState<string>(
    "# Welcome to PyCode Evaluator!\n# Submit your question to start writing code"
  );

  const [disableEditor, setDisableEditor] = React.useState<boolean>(true);

  const [messages, setMessages] = React.useState<BaseMessage[]>([]);
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [threadId, setThreadId] = React.useState<string>("");

  const { mutate: getCodeEvaluation } = useMutation({
    mutationFn: async () => {
      if (prevCode === code || disableEditor) return;
      const res = await getEvaluation({ messages, code, thread_id: threadId });
      const codeUsed = code;
      return { data: res, codeUsed };
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to get evaluation");
    },
    onSuccess(res) {
      if (!res) return;
      setMessages(res.data.messages);
      setChartData((prev) => [
        ...prev,
        {
          code: res.codeUsed,
          time: new Date().toLocaleTimeString(),
          ...res.data.final_output,
          improving: res.data.final_output.score > prev[prev.length - 1]?.score,
        },
      ]);
      prevCode = code;
    },
  });

  const { mutate: init } = useMutation({
    mutationFn: async () => {
      const res = await initBot();
      return res;
    },
    onSuccess(res) {
      setMessages(res.messages);
      toast.success("Bot initialized");
      if (res.thread_id) setThreadId(res.thread_id);
    },
  });

  React.useEffect(() => {
    init();
  }, []);

  return (
    <>
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
            messages={messages}
            threadId={threadId}
            setChartData={setChartData}
          />
        </div>
      </div>
    </>
  );
}

