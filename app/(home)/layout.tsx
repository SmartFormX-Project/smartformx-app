import "../globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderComponent from "../components/Header";
import ChatwootWidget from "../components/ChatSupport";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "SmartFormX",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const s = await getServerSession();
  const user = s?.user;
  return (
    <div
      className={
        inter.className + " flex flex-col h-screen w-full overflow-hidden p-4"
      }
    >
      <HeaderComponent />
      {children}

      <ChatwootWidget
        name={user?.name ?? ""}
        plan={user?.plan ?? ""}
        uid={user?.id ?? ""}
      />
    </div>
  );
}
