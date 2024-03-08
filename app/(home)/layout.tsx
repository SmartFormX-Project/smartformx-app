import "../globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderComponent from "../components/Header";

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
    <div
      className={
        inter.className + " flex flex-col h-screen w-full overflow-hidden p-4"
      }
    >
      <HeaderComponent />
      {children}
    </div>
  );
}
