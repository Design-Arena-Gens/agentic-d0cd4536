import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatPT Atlas',
  description: 'A lightweight chat experience with an atlas-inspired UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
