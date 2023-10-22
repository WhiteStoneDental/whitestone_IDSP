// src/components/FooterButtons.tsx

import Image from 'next/image';
import Link from 'next/link';

const FooterButtons = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white flex justify-between">
      <Link href="/settings">
        <div className="cursor-pointer w-8 h-8">
          <Image src="/image/SettingsButton.png" alt="Settings" width={32} height={32} />
        </div>
      </Link>
      <Link href="/home">
        <div className="cursor-pointer w-8 h-8">
          <Image src="/image/HomeButton.png" alt="Home" width={32} height={32} />
        </div>
      </Link>
      <Link href="/books">
        <div className="cursor-pointer w-8 h-8">
          <Image src="/image/ResourcesButton.png" alt="Books" width={32} height={32} />
        </div>
      </Link>
    </div>
  );
};

export default FooterButtons;
