import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { PromptProvider } from "@/context/PromptContext";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HTML Email Template Generator",
  description: "Generate HTML email templates using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <body className={`${inter.className} p-0 bg-background text-foreground`}>
        <AppProvider>
          <PromptProvider>
            <SpeedInsights />
            {children}
          </PromptProvider>
        </AppProvider>
      </body>
    </html>
  );
}
