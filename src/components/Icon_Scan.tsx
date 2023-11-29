import Link from "next/link";
import Image from "next/image";

export default function HistoryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path d="m0 0h48v48h-48z" fill="#fff" fill-opacity=".01" />
      <g
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="5"
      >
        <path d="m33 6h9v9m0 18v9h-9m-18 0h-9v-9m0-18v-9h9" />
        <path d="m10 24h28" />
      </g>
    </svg>
  );
}
