"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Phone, Mail, MapPin, Sparkles } from "lucide-react";
import Container from "./Container";
import { navItems, siteConfig } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, toggleLocale } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar (Lucky Star style with Vietnam - China info) */}
      <div className="bg-[#84150e] text-white text-xs py-2 px-4 border-b border-red-900/30 hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 opacity-95">
                <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>
                  {locale === "zh"
                    ? "胡志明市第三郡武氏六坊武文秦街97号"
                    : "97 Võ Văn Tần, P. Võ Thị Sáu, Q.3, TP.HCM"}
                </span>
              </span>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>
                  {locale === "zh" ? "咨询热线:" : "Hotline:"} {siteConfig.phone}
                </span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{siteConfig.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {locale === "zh"
                    ? "2026-2027年度中国政府奖学金(CSC)申请通道已开启"
                    : "Học bổng Chính phủ Trung Quốc (CSC) 2026/2027 đang mở"}
                </span>
              </span>

              {/* Language Switcher between VI and ZH */}
              <div
                className="flex items-center gap-1 rounded-full bg-white/15 p-0.5 border border-white/30"
                role="group"
                aria-label="Chọn ngôn ngữ"
              >
                <Globe className="w-3.5 h-3.5 ml-2 text-amber-300" />
                {(["vi", "zh"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-colors cursor-pointer uppercase ${
                      locale === lang
                        ? "bg-white text-[#84150e] shadow-sm"
                        : "text-white hover:bg-white/20"
                    }`}
                  >
                    {lang === "zh" ? "中文" : "VI"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
      <div
        className={`bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-md py-2.5"
            : "border-b border-neutral-100 py-3.5"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between" aria-label="Menu chính">
            {/* Logo Vietnam - China */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#84150e] to-[#b31b1b] flex items-center justify-center text-white font-heading font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                VTC
              </div>
              <div>
                <p className="font-heading font-extrabold text-base leading-tight text-[#84150e] tracking-tight group-hover:text-red-700 transition-colors">
                  {locale === "zh"
                    ? "越中教育与留学中心"
                    : locale === "en"
                    ? "VIETNAM - CHINA STUDY"
                    : "DU HỌC VIỆT - TRUNG"}
                </p>
                <p className="font-heading font-bold text-[11px] text-neutral-600 uppercase tracking-wider">
                  {locale === "zh"
                    ? "胡志明市开放大学 (HCMCOU)"
                    : locale === "en"
                    ? "HCMC Open University"
                    : "Trường Đại học Mở TP.HCM"}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const label =
                  locale === "zh"
                    ? item.labelZh
                    : locale === "en"
                    ? item.labelEn
                    : item.label;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-2 text-sm font-bold tracking-wide transition-colors ${
                      isActive
                        ? "text-[#84150e]"
                        : "text-neutral-800 hover:text-[#84150e]"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-[3px] bg-[#84150e] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Action & Mobile Switcher */}
            <div className="flex items-center gap-3">
              <Link
                href="/programs"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#84150e] hover:bg-[#6b0f0a] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>
                  {locale === "zh"
                    ? "查询中国奖学金"
                    : locale === "en"
                    ? "Search Scholarships"
                    : "Tra Cứu Học Bổng"}
                </span>
              </Link>

              {/* Mobile Lang Button */}
              <button
                onClick={toggleLocale}
                className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#84150e] border border-red-200 bg-red-50"
                aria-label="Chuyển đổi ngôn ngữ"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{locale === "zh" ? "中文" : "VI"}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors"
                aria-label="Mở menu điều hướng"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#84150e]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl overflow-hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const label =
                  locale === "zh"
                    ? item.labelZh
                    : locale === "en"
                    ? item.labelEn
                    : item.label;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-red-50 text-[#84150e]"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-[#84150e]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-3 mt-2 border-t border-neutral-100 flex flex-col gap-2">
                <Link
                  href="/programs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center py-2.5 px-4 rounded-full bg-[#84150e] text-white font-bold text-sm uppercase tracking-wide"
                >
                  {locale === "zh"
                    ? "查询中国奖学金"
                    : locale === "en"
                    ? "Search Scholarships"
                    : "Tra Cứu Học Bổng"}
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
