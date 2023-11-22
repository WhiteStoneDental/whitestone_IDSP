export const submitImage = async (
  url: string,
  message: string,
  image: string,
  base64?: boolean
) => {
  const imageString = base64 ? `data:image/jpeg;base64,${image}` : image;
  console.log(imageString)
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
                url: imageString,
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
