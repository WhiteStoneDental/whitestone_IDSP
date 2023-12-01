import { twMerge } from "tailwind-merge";

export default function ScanPrompt({
  message,
  imageURL,
  onMessageChange,
  onImageChange,
}: {
  message: string;
  imageURL: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        type="text"
        placeholder="What is your question"
        value={message}
        onChange={onMessageChange}
        className={twMerge(
          "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        )}
      />
      <input
        type="text"
        placeholder="Enter an image url"
        value={imageURL}
        onChange={onImageChange}
        className={twMerge(
          "w-full p-2 mb-4 border rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        )}
      />
    </>
  );
}
