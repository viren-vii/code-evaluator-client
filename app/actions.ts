"use server";

import { BaseMessage } from "@langchain/core/messages";
import { ModelResponse } from "./analysis/types";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function getStatus() {
  const res = await fetch(`${SERVER_URL}`);
  return res.json();
}

export async function initBot() {
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
  ).json();
  console.log("========== BOT INITIALIZED ==========");
  return res;
}

export async function feedQuestion({
  question,
  messages,
  thread_id,
}: {
  question: string;
  messages: BaseMessage[];
  thread_id: string;
}) {
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/feed-question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, messages, thread_id }),
    })
  ).json();
  return res;
}

export async function getEvaluation({
  messages,
  code,
  thread_id,
}: {
  messages: BaseMessage[];
  code: string;
  thread_id: string;
}) {
  console.log("========== EVALUATING ==========");
  const res: ModelResponse = await (
    await fetch(`${SERVER_URL}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages, user_code_snippet: code, thread_id }),
    })
  ).json();

  console.log("========== EVALUATION DONE ==========");
  return res;
}
