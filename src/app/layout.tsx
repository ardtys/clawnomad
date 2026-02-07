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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Claw-Nomad | Autonomous AI Agent Protocol",
    description: "Deploy AI agents that move seamlessly between Web2 services, blockchain networks, and Moltworld.",
    images: ["/logo.png"],
    type: "website",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-terminal-darker text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
