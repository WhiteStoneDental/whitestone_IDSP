export const submitImage = async (
  url: string,
  image: string,
  message?: string
) => {
  let messages = [];

  if (message) {
    messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message || null,
          },
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ];
  } else {
    messages = [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: image,
            },
          },
        ],
      },
    ];
  }
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages
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
