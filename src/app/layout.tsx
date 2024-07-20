import "styles/globals.css";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import Navbar from "components/Navbar";

import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Thryft Ship Take Home Project",
  description:
    "Submission for the Thryft Ship take home project as part of their SWE internship application.",
  authors: [
    {
      name: "Rayhan Noufal Arayilakath",
      url: "https://rayhanadev.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
