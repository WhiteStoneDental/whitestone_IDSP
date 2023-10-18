import Link from "next/link";
import Image from "next/image";

export default function ResourceNavButton() {
    return (
        <Link href="">
            <div>
                <Image
                    src="/image/ResourceButton.png"
                    alt="Home Button"
                    width={40}
                    height={40}
                    className=""
                />
            </div>
        </Link>
    );
}