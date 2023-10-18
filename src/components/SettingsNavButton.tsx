import Link from "next/link";
import Image from "next/image";

export default function SettingsNavButton() {
    return (
        <Link href="">
            <div>
                <Image
                    src="/image/SettingsButton.png"
                    alt="Settings Button"
                    width={40}
                    height={40}
                    className=""
                />
            </div>
        </Link>
    );
}