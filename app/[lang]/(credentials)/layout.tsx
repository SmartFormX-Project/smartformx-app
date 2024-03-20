import react from "react";

export const metadata = {
  title: "SmartFormX",
  description: "Page description",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="grow">{children}</main>;
}
