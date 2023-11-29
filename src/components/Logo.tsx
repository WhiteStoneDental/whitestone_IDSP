import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    //278x259
    <Link href="/home">
      <div>
       
        <Image
          src="/logo-dark.svg"
          alt="WhiteStone Logo - Dark"
          width={350}
          height={65}
          className="mb-4 hidden dark:block"
        />
         <Image
          src="logo-white.svg"
          alt="WhiteStone Logo - Light"
          width={350}
          height={65}
          className="mb-4 dark:hidden"
        />
      </div>
    </Link>
  );
}
