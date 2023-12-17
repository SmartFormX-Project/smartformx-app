import { FaComments } from "react-icons/fa";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-gradient-to-br from-indigo-50 via-white to-cyan-100 justify-center w-full h-screen  p-4">
      {children}
    </section>
  );
}
