import { BaseButton } from "./BaseButton";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";

export default function PastScan() {
  return (
    <Link href="/history">
      <BaseButton className="bg-white w-16 h-16 flex items-center justify-center">
        <div className="flex items-center justify-center">
          <ArrowIcon />
        </div>
      </BaseButton>
    </Link>
  );
}
