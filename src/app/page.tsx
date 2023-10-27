import Logo from '@/components/Logo';

export default function Landing() {
  return (
    <div 
    className="h-screen flex flex-col items-center justify-center min-h-screen bg-[var(--mainphrase-bg)]"
    >
      <Logo />
      <div className="items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to WhiteStone</h1>
        <p className="text-sm">Your personal dental assistant</p>
      </div>
    </div>
  );
}
