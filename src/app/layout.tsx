import type { Metadata } from "next";
import "./globals.css";
import { work__sans } from "../utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Course-app",
  description: "Nền tảng lập trình vui vẻ hong quạo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${work__sans.className}`}>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors position="top-right" />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
