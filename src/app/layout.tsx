import type { Metadata } from "next";
import "../app/globals.css";
import { Providers } from "@/components/providers/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchModal } from "@/components/ui/SearchModal";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: "Q9 Labs — Premium Electronics Components & Parts",
    template: "%s | Q9 Labs",
  },
  description:
    "Premium electronics components and parts for makers, engineers, and innovators. Microcontrollers, sensors, motors, displays, and more with same-day shipping.",
  keywords: [
    "electronics",
    "components",
    "microcontrollers",
    "sensors",
    "arduino",
    "raspberry pi",
    "ESP32",
    "maker",
    "engineering",
  ],
  openGraph: {
    title: "Q9 Labs — Premium Electronics Components & Parts",
    description:
      "Premium electronics components and parts for makers, engineers, and innovators.",
    siteName: "Q9 Labs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Q9 Labs — Premium Electronics Components & Parts",
    description:
      "Premium electronics components and parts for makers, engineers, and innovators.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Header />
          <SearchModal />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
