import { BaseButton } from "./BaseButton";
import ScanIcon from "./IconScan";
import Link from "next/link";

export default function StartScanButton() {
  return (
    <BaseButton className="bg-white w-16 h-16 flex items-center justify-center dark:bg-gray-300">
      <Link href="/scan">
        <div className="flex items-center justify-center">
          <ScanIcon color="black" />
        </div>
      </Link>
    </BaseButton>
  );
}
