import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Radka Zemanová - Skákací hrady",
  description: "Pronájem skákacích hradů pro vaše akce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="[--prechod:linear-gradient(90deg,#F34B6D_0%,#374091_100%)]">
        {children}
      </body>
    </html>
  );
}
