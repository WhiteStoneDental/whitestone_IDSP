"use client";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div>
      <h1>Page</h1>
      <p>Current theme: {resolvedTheme}</p>
      <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
}
