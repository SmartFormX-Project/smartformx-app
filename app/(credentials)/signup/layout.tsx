import Script from "next/script";
import "./style.css";
import dynamic from "next/dynamic";

export const metadata = {
title: `Cadastrar-se`,
// keywords: [
//     "Next.js",
//     "React",
//     "Tailwind CSS",
//     "Server Components",
//     "Radix UI",
//     "zod",
//   ],
//   authors: [
//     {
//       name: "Adefeso Qudus",
//       url: "https://qdus.netlify.app",
//     },
//   ],
//   creator: "Adefeso Qudus",
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
//   icons: {
//     icon: "/favicon.ico",
//   },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const CrispWithNoSSR = dynamic(
    () => import('../../../components/register/crisp')
  )
  return <div>
        <CrispWithNoSSR />
    {children}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-11457996099" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'AW-11457996099');
        `}
      </Script>
  </div>;
}
