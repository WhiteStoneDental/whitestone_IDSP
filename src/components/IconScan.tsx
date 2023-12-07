export default function HistoryIcon({ size = 32, color = 'currentColor' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 48 48"
    >
      <path d="m0 0h48v48h-48z" fill="#fff" fillOpacity=".01" />
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      >
        <path d="m33 6h9v9m0 18v9h-9m-18 0h-9v-9m0-18v-9h9" />
        <path d="m10 24h28" />
      </g>
    </svg>
  );
}
