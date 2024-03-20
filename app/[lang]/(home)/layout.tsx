import "../globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderComponent from "../../components/Header";
import ChatwootWidget from "../../components/ChatSupport";
import { getServerSession } from "next-auth";
import { useTranslation } from "@/app/i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "SmartFormX",
};

export default async function RootLayout({
  children,
  params: {
    lng
  }
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng:string
  }
}>) {
  const { t } = await useTranslation(lng, "home")
  const s = await getServerSession();
  const user = s?.user;
  return (
    <div
      className={
        inter.className + " flex flex-col h-screen w-full overflow-hidden p-4"
      }
    >
      <HeaderComponent lang={lng} my_info_text={t("header.my-info")} signout_text={t("header.sign-out")} />
      {children}

      <ChatwootWidget
        name={user?.name ?? ""}
        plan={user?.plan ?? ""}
        uid={user?.id ?? ""}
      />
    </div>
  );
}
