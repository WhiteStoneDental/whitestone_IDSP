import { BaseButton } from "./BaseButton";
import HistoryIcon from "./Icon_History";
import Link from "next/link";

export default function PastScan() {
  return (
    <Link href="/history">
      <BaseButton className="bg-white w-16 h-16 flex items-center justify-center ">
        <div className="flex items-center justify-center">
          <HistoryIcon />
        </div>
      </BaseButton>
    </Link>
  );
}
