"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Globe, Sparkles } from "lucide-react";
import Container from "./Container";
import { siteConfig, navItems } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-neutral-900 text-white mt-auto border-t-4 border-[#84150e]">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand & Lucky Star About block (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-[#84150e] flex items-center justify-center text-white font-heading font-black text-xl shadow-md">
                VTC
              </div>
              <div>
                <p className="font-heading font-extrabold text-base text-white tracking-wide">
                  {locale === "zh" ? "越中教育合作与留学中心" : "TRUNG TÂM DU HỌC VIỆT - TRUNG"}
                </p>
                <p className="font-heading font-semibold text-xs text-amber-400">
                  {locale === "zh" ? "胡志明市开放大学 (HCMCOU)" : "Trường Đại học Mở TP.HCM"}
                </p>
              </div>
            </div>

            {/* Lucky Star Style About Block with Left Red Border */}
            <div className="pl-4 border-l-4 border-[#9c1b1f] my-4 py-1">
              <p className="text-amber-300 font-bold text-sm mb-1">
                {locale === "zh" ? "官方直招与全奖申报平台" : "Kênh Du Học & Học Bổng Toàn Phần Uy Tín"}
              </p>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {locale === "zh"
                  ? "中越公立大学官方教育合作机构，专业指导中国政府奖学金（CSC）、国际中文教师奖学金（CIS）、上海市政府奖（SGS）及赴华签证办理。"
                  : "Đơn vị tiên phong kết nối hợp tác giáo dục, đào tạo Hán ngữ HSK và xét duyệt học bổng toàn phần du học Trung Quốc hàng đầu."}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#84150e] text-white flex items-center justify-center transition-colors shadow"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#84150e] text-white flex items-center justify-center transition-colors shadow"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#84150e] text-white flex items-center justify-center transition-colors shadow text-xs font-bold"
                aria-label="Zalo"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links with Red Arrow Prefix (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-[#84150e]">
              {locale === "zh" ? "快捷导航" : "Liên Kết Nhanh"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                    <span>{locale === "zh" ? item.labelZh : item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Scholarship Categories with Red Arrow (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-[#84150e]">
              {locale === "zh" ? "中方重点奖学金" : "Chương Trình & Học Bổng"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/programs"
                  className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span>{locale === "zh" ? "中国政府奖学金 (CSC全奖)" : "Học bổng Chính phủ Trung Quốc (CSC)"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span>{locale === "zh" ? "国际中文教师奖学金 (CIS)" : "Học bổng Giáo viên Hán ngữ (CIS)"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span>{locale === "zh" ? "上海市/北京市外国留学生奖学金" : "Học bổng Thượng Hải SGS & Bắc Kinh"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span>{locale === "zh" ? "汉语言培训与HSK 1-6级冲刺" : "Đào tạo Hán ngữ & Luyện thi HSK"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admissions"
                  className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-[#c62828] font-bold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                  <span>{locale === "zh" ? "签证办理(JW202)与申办流程" : "Quy trình xin Visa & Hồ sơ"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-white relative inline-block after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-8 after:h-0.5 after:bg-[#84150e]">
              {locale === "zh" ? "联系方式" : "Thông Tin Liên Hệ"}
            </h3>
            <ul className="space-y-3.5 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#e04848] shrink-0 mt-1" />
                <span>
                  {locale === "zh"
                    ? "胡志明市第三郡武氏六坊武文秦街97号"
                    : siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#e04848] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                  className="hover:text-white transition-colors font-semibold"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e04848] shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#e04848] shrink-0" />
                <span>ou.edu.vn / viettrung.ou.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950 py-4">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
            <p>
              {locale === "zh"
                ? "© 2026 越中教育合作与留学中心 - 胡志明市开放大学 版权所有"
                : "© 2026 Trung Tâm Du Học Việt - Trung - Trường Đại học Mở TP.HCM. All rights reserved."}
            </p>
            <p className="flex items-center gap-1">
              <span>{locale === "zh" ? "搭建中越教育友谊之桥" : "Đồng hành cùng du học sinh Việt - Trung"}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
