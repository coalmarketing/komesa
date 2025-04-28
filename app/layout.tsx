import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radka Zemanová - Skákací hrady | Pronájem skákacích hradů",
  description: "Profesionální pronájem skákacích hradů pro vaše akce, oslavy a události. Nabízíme široký výběr, bezpečnost a spolehlivost. Působíme v celé ČR.",
  keywords: "skákací hrady, pronájem skákacích hradů, dětské atrakce, oslavy, firemní akce, zábava pro děti",
  authors: [{ name: "Radka Zemanová" }],
  creator: "Radka Zemanová",
  publisher: "Radka Zemanová",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://komesa.cz",
  },
  openGraph: {
    title: "Radka Zemanová - Skákací hrady | Pronájem skákacích hradů",
    description: "Profesionální pronájem skákacích hradů pro vaše akce, oslavy a události. Působíme v celé ČR.",
    url: "https://komesa.cz",
    siteName: "Radka Zemanová - Skákací hrady",
    locale: "cs_CZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Radka Zemanová - Skákací hrady | Pronájem skákacích hradů",
    description: "Profesionální pronájem skákacích hradů pro vaše akce, oslavy a události. Působíme v celé ČR.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/RZ_logo_favicon-color.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo/RZ_logo_favicon-color.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F34B6D" />
        <meta name="format-detection" content="telephone=no" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="[--prechod:linear-gradient(90deg,#F34B6D_0%,#374091_100%)]">
        {children}
      </body>
    </html>
  );
}
