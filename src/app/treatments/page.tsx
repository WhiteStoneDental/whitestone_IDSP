import { useTheme } from "next-themes";

export default function TreatmentsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Treatments</h1>
    </div>
  );
}
