import { type ClassValue, clsx } from 'clsx';
import { Quicksand } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export { quicksand };
