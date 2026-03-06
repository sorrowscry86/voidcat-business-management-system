import type { Metadata } from 'next';
import { Inter, Crimson_Text, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const crimson = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson'
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'VoidCat BMS | AI-Human Collaborative Intelligence',
  description: 'The digital sanctuary for mystical business management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${crimson.variable} ${jetbrains.variable} font-mystical-sans min-h-screen bg-mystical-shadow relative`}>
        {/* Background Effects */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-voidcat-900/40 blur-[120px] rounded-full animate-cosmic-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-mystical-cosmic/30 blur-[120px] rounded-full animate-cosmic-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-voidcat-500/10 blur-[100px] rounded-full animate-mystical-pulse" />
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
