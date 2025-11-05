import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nafasi | Engineering Equity",
  description: "Delivering AI-driven Technology Solutions for SMBs and Marginalized Communities",
  keywords: ["AI", "technology solutions", "SMB", "engineering equity", "software development"],
  authors: [{ name: "Nafasi" }],
  openGraph: {
    title: "Nafasi | Engineering Equity",
    description: "Delivering AI-driven Technology Solutions for SMBs and Marginalized Communities",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
