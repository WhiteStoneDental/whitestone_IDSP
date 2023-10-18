import { twMerge } from "tailwind-merge";
import { BaseButton } from "./BaseButton";
import  ArrowIcon  from "./ArrowIcon";

export default function StartScanButton() {
    return (
        <BaseButton className={twMerge('shadow-lg bg-white w-16 h-16 flex items-center justify-center')}>
            <ArrowIcon />
        </BaseButton>
    );
}
    