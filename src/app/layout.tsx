import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bem-vindo(a) ao Steam",
  description: "Os melhores games para PC estão aqui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link href="https://fonts.cdnfonts.com/css/motiva-sans" rel="stylesheet"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
