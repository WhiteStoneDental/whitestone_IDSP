// pages/api/createMessage.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function createMessage(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });

    if (!response.ok) {
      console.error('Response from OpenAI API not OK:', response);
      throw new Error(`Failed to send message. HTTP status ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data from OpenAI API:', data);

    if (Array.isArray(data.choices) && data.choices.length > 0) {
      res.status(200).json({ choices: data.choices });
    } else {
      console.error('Unexpected API response format:', data);
      res.status(500).json({ error: 'Internal Server Error. Unexpected API response format.' });
    }
  } catch (error) {
    console.error('Error in createMessage:', error);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
}
