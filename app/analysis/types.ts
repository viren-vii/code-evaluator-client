import { BaseMessage } from "@langchain/core/messages";

export type FeedQuestion = {
  question: string;
  messages: BaseMessage[];
};

type FinalOutput = {
  status: string;
  score: number;
  comment: string;
};

export type ModelResponse = {
  messages: BaseMessage[];
  final_output: FinalOutput;
};

export type ChartData = {
  status: string;
  score: number;
  comment: string;
  code: string;
  time: string;
  improving: boolean;
};
