import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useTheme } from 'next-themes';

export default function Home() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div>
      <div>Hello, this is a test page for next-themes</div>
      <div>Current theme: {theme}</div>
      <button onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
}

