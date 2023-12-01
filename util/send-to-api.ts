export const submitImage = async (
  url: string,
  message: string,
  image: string
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: message,
              },
              {
                type: "image_url",
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
      }).length.toString(),
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message,
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok || res.body === null) {
    throw new Error(res.statusText);
  }

  const reader = res.body.getReader();

  return makeStreamAsyncIterator(reader);
};

async function* makeStreamAsyncIterator(
  reader: ReadableStreamDefaultReader<Uint8Array>
): AsyncGenerator<string, void, undefined> {
  const textDecoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    const chunkAsString = textDecoder.decode(value);
    if (done) break;
    yield chunkAsString;
  }
}
