import { BaseButton } from "./BaseButton";
import ArrowIcon from "./ArrowIcon";

export default function PastScan() {
  return (
    <BaseButton className="flex justify-between items-center text-black dark:text-white">
      Go to see your previous scans
      <ArrowIcon />
    </BaseButton>
  );
}
