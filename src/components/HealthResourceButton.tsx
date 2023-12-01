import { BaseButton } from "./BaseButton";
import ResourcesIcon from "./IconResources";
import Link from "next/link";

export default function ResourceButton() {
  return (
    <Link href="/resources">
      <BaseButton className="bg-white w-16 h-16 flex items-center justify-center dark:bg-gray-300">
        <div className="flex items-center justify-center">
          <ResourcesIcon />
        </div>
      </BaseButton>
    </Link>
  );
}
