import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/home">
      <div>
        <Image
          src="/image/Logo2.png"
          alt="WhiteStone Logo"
          width={250}
          height={250}
          className="mb-4"
        />
      </div>
    </Link>
  );
}
