import Link from 'next/link';
import Image from 'next/image';
import Home from '@/../public/Home.svg'
import Settings from '@/../public/Settings.svg'
import Resources from '@/../public/Resources.svg'

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white text-black flex justify-between p-4 shadow-t border-t border-black-10">
      <Link href="/settings">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-home text-2xl mb-1"></i>
          <Image src={Settings} alt="Settings icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
      <Link href="/home">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-search text-2xl mb-1"></i>
          <Image src={Home} alt="Home icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
      <Link href="/resources">
        <div className="flex flex-col items-center text-sm">
          <i className="fas fa-user text-2xl mb-1"></i>
          <Image src={Resources} alt="Resources icon" className="w-8 h-8 mb-1" />
        </div>
      </Link>
    </nav>
  );
};
