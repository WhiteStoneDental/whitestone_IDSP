import Link from 'next/link';
import { UserIcon } from '@heroicons/react/outline';

const LoginButton: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 m-5">
      {/* Login link with user icon */}
      <Link href="/login/">
        <div className="text-white text-xl mb-3 dark:text-black cursor-pointer flex items-center">
          <UserIcon className="h-6 w-6 mr-2" /> Log In
        </div>
      </Link>
    </div>
  );
};

export default LoginButton;
