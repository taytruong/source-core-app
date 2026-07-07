import './globals.css';

import { viVN } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/src/shared/components/ui/tooltip';

import { UserProvider } from '../shared/contexts';
import { quicksand } from '../shared/utils';

export const metadata: Metadata = {
  title: 'Course-app',
  description: 'Nền tảng lập trình vui vẻ hong quạo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={viVN}
      appearance={{
        variables: {
          fontFamily: quicksand.style.fontFamily,
          fontSize: '15px',
        },
      }}
    >
      <html lang="en">
        <body className={`${quicksand.className}`}>
          <TooltipProvider>
            <UserProvider>{children}</UserProvider>
            <SpeedInsights />
            <Analytics />
          </TooltipProvider>
          <Toaster
            richColors
            position="top-right"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
