import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    //633x223
    //638X230
    <Link href="/home">
      <div>
       
        <Image
          src="/image/whiteLogo.png"
          alt="WhiteStone Logo - Dark"
          width={450}
          height={65}
          className="mb-4 hidden dark:block"
        />
         <Image
          src="/image/blackLogo.png"
          alt="WhiteStone Logo - Light"
          width={450}
          height={65}
          className="mb-4 dark:hidden"
        />
      </div>
    </Link>
  );
}
