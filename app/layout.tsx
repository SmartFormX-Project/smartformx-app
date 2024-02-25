import { Metadata } from "next";
// import { siteConfig } from "@/config/site";

import "@/styles/globals.css";
import Providers from "./providers";
import clsx from "clsx";
import { Poppins } from "next/font/google";
import Script from "next/script";


const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export const metadata: Metadata = {
	// title: {
	// 	default: siteConfig.name,
	// 	template: `%s - ${siteConfig.name}`,
	// },
	title: {
		default: "SmartFormX",
    template: `%s - SmartFormX`
		// template: `%s - ${siteConfig.name}`,
	},
	// description: siteConfig.description,
	// themeColor: [
	// 	{ media: "(prefers-color-scheme: light)", color: "white" },
	// 	{ media: "(prefers-color-scheme: dark)", color: "black" },
	// ],
	// icons: {
	// 	icon: "/favicon.ico",
	// 	shortcut: "/favicon-16x16.png",
	// 	apple: "/apple-touch-icon.png",
	// },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head >
      <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* <Script src={"https://www.googletagmanager.com/gtag/js?id="+process.env.NEXT_PUBLIC_GTM_ID} />
      <Script id="google-analytics">
        {`
         (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
         new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
         j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
         'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
         })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script> */}
      
        </head>
      <body
        suppressHydrationWarning={true}
        className={
          clsx(
          "poppins min-h-screen bg-background antialiased",
          poppins.className
        )
      }
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div>{children}</div>
        </Providers>
    
      </body>
    </html>
  );
}
