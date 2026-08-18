import type { Metadata } from "next";
import { Geist, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import EmailVerificationBanner from "@/components/EmailVerificationBanner";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "structui — The Component Marketplace & Code Ecosystem",
  description:
    "structui is the premier marketplace for developers to discover, copy, and monetize production-ready React components, Tailwind templates, and fullstack kits.",
  icons: {
    icon: [
      { url: "/icons/structui-icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} ${bricolage.variable} antialiased`}>
        <AuthProvider>
          <EmailVerificationBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
