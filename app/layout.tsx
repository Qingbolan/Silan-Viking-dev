import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://silan.dev"),
  title: {
    default: "Silan.dev — AI systems research workbench",
    template: "%s",
  },
  description:
    "Silan Hu builds and studies AI systems. Here he shares what he tested, what changed his mind, and what another researcher or engineer can reuse.",
  alternates: {
    canonical: "https://silan.dev",
  },
  openGraph: {
    title: "Silan.dev",
    description:
      "Questions, evidence, experiments, decisions, failures, and revisions behind Silan Hu's AI systems work.",
    url: "https://silan.dev",
    siteName: "Silan.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silan.dev",
    description:
      "A public AI systems research workbench for tested claims and reusable artifacts.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
