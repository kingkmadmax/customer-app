import { Source_Serif_4 } from 'next/font/google';
import './globals.css';
import {Header} from '@/components/homepage/header';

// Configure the font
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],           // Add other subsets if needed (e.g., 'latin-ext')
  weight: ['400', '500', '600', '700'], // Choose the weights you need
  style: ['normal', 'italic'],  // Optional: include italic
  display: 'swap',              // Good for reducing layout shift
  variable: '--font-source-serif', // Recommended for Tailwind or global use
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body>
        <Header/>
        {children}
        </body>
    </html>
  );
}