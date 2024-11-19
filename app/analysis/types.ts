import { BaseMessage } from "@langchain/core/messages";

export type FeedQuestion = {
  question: string;
  messages: BaseMessage[];
};

type FinalOutput = {
  status: string;
  score: number;
  comment: string;
  hint: string;
};

export type ModelResponse = {
  messages: BaseMessage[];
  final_output: FinalOutput;
  thread_id: string;
};

export type ChartData = {
  status: string;
  score: number;
  comment: string;
  code: string;
  time: string;
  improving: boolean;
  hint: string;
};
