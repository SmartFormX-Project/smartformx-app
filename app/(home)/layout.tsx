import ChatwootWidget from "@/components/ChatSupport";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getServerSession();
  const user = s?.user;

  return (
    <section className="flex flex-col bg-gradient-to-br from-indigo-50 via-white to-cyan-100 justify-center w-full h-screen  p-4">
        <Header
          freeBanner
        />
      {children}
      <ChatwootWidget
        name={user?.name ?? ""}
        plan={user?.plan ?? ""}
        uid={user?.id ?? ""}
      />
    </section>
  );
}
