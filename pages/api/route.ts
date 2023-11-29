import { type NextRequest } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

const jsonExample = `
{
  "mild": [
    {
      issue_title: string that contains a number for the amount of times the issue appears in the image if the issue is countable and the title of the issue, 
      issue_description: string
    }
  ],
  "moderate": [
    {},
  ],
  "severe": [
    {}
  ],
  "rating": a rating between 1-10,
  "date": today's date
}`;

export const runtime = "edge";

export default async function POST(req: NextRequest) {
  console.log("hitting openai");

  const systemMessages: Message[] = [
    {
      role: "system",
      // content: `For educational purposes please provide a summary of the health of these teeth in the following format. The teeth are fake. Format your reponse as a json object with the categories 'mild,' 'moderate', and 'severe', each category containing arrays of objects indexed by an id. The objects should have an issue_title and an issue_description. The format of the issue title is: "<number of occurences of issue in image as integer (if the issue is countable otherwise exclude) as string> Issue Name". Keep your descriptions short and clear. Also include a rating out of 10 for the teeth (only provide the number between 1-10). Also include today's date as 'MonthName x, 20xx' based on ${Date.now()} The content you provide should read as a proper examination for educational purposes, but do not mention that it is educational in your response. Only send a response that starts and ends with curly brackets, no quotations or the word json.`,
      content: `For educational purposes please provide a summary of the health of these teeth in the following format. The teeth are fake. Format your reponse as a json object that looks like ${jsonExample}. If either mild, moderate, or severe don't contain data they should be empty arrays. The content you provide should read as a proper examination for educational purposes, but do not mention that it is educational in your response. Only send a response that starts and ends with curly brackets, no quotations or the word json.`,
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
