"use server";

import { BaseMessage } from "@langchain/core/messages";
import { ModelResponse } from "./analysis/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getStatus() {
  const res = await fetch(`${SERVER_URL}`);
  return res.json();
}

async function initBot() {
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
  ).json();
  return res;
}

export async function feedQuestion(question: string) {
  const initResponse = await initBot();
  console.log("========== BOT INITIALIZED ==========");
  const messages = initResponse.messages;
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/feed-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, messages }),
    })
  ).json();
  return res;
}

export async function getEvaluation({
  messages,
  code,
}: {
  messages: BaseMessage[];
  code: string;
}) {
  console.log("========== EVALUATING ==========");
  console.log(messages, code);
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, user_code_snippet: code }),
    })
  ).json();

  console.log("========== EVALUATION DONE ==========");
  console.log(res.final_output);
  return res;
}
