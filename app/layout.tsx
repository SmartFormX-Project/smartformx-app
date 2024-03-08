import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import HeaderComponent from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "SmartFormX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + ""
        }
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
