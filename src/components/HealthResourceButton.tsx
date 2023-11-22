import { BaseButton } from "./BaseButton";
import ArrowIcon from "./ArrowIcon";
import Link from "next/link";

export default function ResourceButton() {
  return (
    <Link href="/resources">
    <BaseButton className="flex justify-between items-center text-black">
      Go to Health Resources
      <ArrowIcon />
    </BaseButton>
    </Link>
  );
}
