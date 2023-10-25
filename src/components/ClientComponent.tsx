import Link from 'next/link';
import Image from 'next/image';

export default function ClientComponent() {
  return (
    //633x223
    //638X230
    <Link href="/home">
      <div>
        <Image
          src="/image/blackLogo.png"
          alt="WhiteStone Logo - Light"
          width={300}
          height={300}
          className="mb-4 dark:hidden"
        />
        <Image
          src="/image/whiteLogo.png"
          alt="WhiteStone Logo - Dark"
          width={300}
          height={300}
          className="mb-4 hidden dark:block"
        />
      </div>
    </Link>
  );
}
