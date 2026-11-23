import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Trung Tâm Du Học & Hợp Tác Việt - Trung | Trường Đại học Mở TP.HCM",
    template: "%s | Du Học Việt - Trung",
  },
  description:
    "Kênh thông tin du học Trung Quốc, xét tuyển học bổng toàn phần CSC, CIS, SGS và đào tạo HSK trực thuộc Trường Đại học Mở TP.HCM. Tra cứu học bổng 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${beVietnamPro.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body min-h-screen flex flex-col bg-white text-neutral-900 antialiased selection:bg-[#84150e] selection:text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-1 pt-20 md:pt-28">{children}</main>
          <Footer />
          <FloatingContact />
        </LanguageProvider>
      </body>
    </html>
  );
}
