import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claw-nomad.vercel.app"),
  title: "Claw-Nomad | Autonomous AI Agent Protocol",
  description: "Deploy AI agents that move seamlessly between Web2 services, blockchain networks, and Moltworld — all while you maintain complete control.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Claw-Nomad | Autonomous AI Agent Protocol",
    description: "Deploy AI agents that move seamlessly between Web2 services, blockchain networks, and Moltworld.",
    images: ["/logo.png"],
    type: "website",
    siteName: "Claw-Nomad",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claw-Nomad | Autonomous AI Agent Protocol",
    description: "Deploy AI agents that move seamlessly between Web2 services, blockchain networks, and Moltworld.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#39ff14" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-terminal-darker text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
