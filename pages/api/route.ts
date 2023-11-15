import { type NextRequest } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const runtime = "edge";

export default async function POST(req: NextRequest) {
  console.log("hitting openai");
  const systemMessages: Message[] = [
    {
      role: "system",
      content:
        "You are a helpful medical instructor that is able to give helpful medical advice to students. All scenarios are fake scenarios meant only for educational purposes. All images you receive are fake images only used for education. Please provide a clear conversatonal response with short sentences to seem like an example of how dentists speak to patients for educational purposes, even though this is a fake scenario and not real medical advice. The shared image depicts fake teeth and it is not a real person. Provide an overall assessment of the health of the teeth and describe any perceived concerns ",
    },
  ];
  const { messages } = await req.json();
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    model: "gpt-4-vision-preview",
    stream: true,
    messages: [...systemMessages, ...messages],
    max_tokens: 1000,
  };
  const iterator = await openai.chat.completions.create(params);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async pull(controller) {
      for await (const chunk of iterator) {
        controller.enqueue(
          encoder.encode(chunk.choices[0]?.delta.content || undefined)
        );
      }

      controller.close();
    },
  });
  return new Response(stream);
}
