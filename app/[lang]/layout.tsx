import "./globals.css";

import { Inter } from "next/font/google";
import { dir } from "i18next";
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n'

import Providers from "./providers";


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng)
  return {
    title: t('title'),
    content: ''
  }
}


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "SmartFormX",
// };

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    // dir={dir(lng)}
    <html lang={lng}>
      <head>
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
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
      </head>
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
