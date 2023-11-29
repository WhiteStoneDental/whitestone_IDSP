"use server";

import { submitImage } from "@/../util/send-to-api";

export const getResponse = async (message: string, imageURL: string) => {
  try {
    // console.log(message);
    // console.log(imageURL);
    const streamIterator = await submitImage(process.env.API_PATH + "/route", message, imageURL);
    let result = "";
    for await (const chunk of streamIterator) {
      result += chunk;
    }
    return { response: result };
    // setResult(result);
  } catch (error) {
    console.error("Error submitting image:", error);
    return { error: "Error submitting image" };
    // setResult("Error submitting image");
  }
};
