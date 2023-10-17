import { twMerge } from "tailwind-merge";
import { BaseButton } from "./BaseButton";
import  ArrowIcon  from "./ArrowIcon";

export default function ResourceButton() {
    return (
      <BaseButton className={twMerge('flex justify-between items-center')}>
        Health Resources
        <ArrowIcon />
      </BaseButton>
    );
  }