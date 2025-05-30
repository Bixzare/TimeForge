import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemePickerWrapper } from "@/components/wrappers/themePickerWrapper";
import TabTimer from "@/components/countdown/tab-timer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timeforge",
  description: "Pomodoro | productivity timer app",
  icons: {
    icon: "/hammer.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  overflow-x-hidden`}
      >
        <TabTimer/>
        <ThemePickerWrapper>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <NavBar/>
          {children}
        <Toaster/>
        </ThemeProvider>
        </ThemePickerWrapper>
      </body>
    </html>
  );
}
