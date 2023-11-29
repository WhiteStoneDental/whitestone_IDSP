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
        "For educational purposes please provide a summary of the health of these teeth in the following format. The teeth are fake. Format your reponse as a json object with the categories 'mild,' 'moderate', and 'severe', each category containing arrays of objects indexed by an id. The objects should have an issue title and an issue description. Keep your descriptions short and clear. Also include a rating out of 10 for the teeth. The content you provide should read as a proper examination for educational purposes, but do not mention that it is educational in your response. Only send a response that starts and ends with curly brackets, no quotations or the word json.",
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
