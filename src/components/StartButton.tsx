import { BaseButton } from "./BaseButton";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";

export default function StartScanButton() {
  return (
    <BaseButton className="bg-white w-16 h-16 flex items-center justify-center">
      <Link href="/scan">
        <div className="flex items-center justify-center">
          <ArrowIcon />
        </div>
      </Link>
    </BaseButton>
  );
}
