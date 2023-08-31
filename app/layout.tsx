import type { Metadata } from 'next';
import { Josefin_Sans, Yeseva_One } from 'next/font/google';
import './globals.css';
import { CSSProperties } from 'react';

const josefinSans = Josefin_Sans({ subsets: ['latin'], variable: '--font-josefin-sans' });
const yesevaOne = Yeseva_One({ weight: '400', subsets: ['latin'], variable: '--font-yeseva-one' });

export const metadata: Metadata = {
  title: 'Gradient generator',
  description: 'generator css gradient based on an image',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="font-sans"
        style={
          {
            '--font-josefin-sans': josefinSans.style.fontFamily,
            '--font-yeseva-one': yesevaOne.style.fontFamily,
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
