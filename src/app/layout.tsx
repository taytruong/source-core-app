import './globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/src/shared/components/ui/tooltip';

import { UserProvider } from '../shared/contexts';
import { ReactQueryContext } from '../shared/contexts/react-query-context';
import { quicksand } from '../shared/utils';

export const metadata: Metadata = {
  title: 'Course-app',
  description:
    'Course-app is a platform for online learning, offering a wide range of courses and resources to help you achieve your learning goals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
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
            <ReactQueryContext>
              <UserProvider>
                <NuqsAdapter>{children}</NuqsAdapter>
              </UserProvider>
            </ReactQueryContext>
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
