import { BaseButton } from "./BaseButton";
import HistoryIcon from "./IconHistory";
import Link from "next/link";

export default function PastScan() {
  return (
    <Link href="/history">
      <BaseButton className="bg-white w-16 h-16 flex items-center justify-center dark:bg-gray-300">
        <div className="flex items-center justify-center">
          <HistoryIcon color="black" />
        </div>
      </BaseButton>
    </Link>
  );
}
