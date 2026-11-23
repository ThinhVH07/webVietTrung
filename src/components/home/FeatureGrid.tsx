"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Award, Sparkles, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Program } from "@/data/programs";
import { programs as defaultPrograms } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FeatureGrid() {
  const { locale } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // Khởi tạo ngay với dữ liệu ban đầu, không để rỗng khiến màn hình bị nhấp nháy skeleton
  const [programList, setProgramList] = useState<Program[]>(defaultPrograms);
  const [loading, setLoading] = useState(defaultPrograms.length === 0);

  useEffect(() => {
    fetchProgramsFromSheet().then((data) => {
      if (data && data.length > 0) {
        setProgramList(data);
      }
      setLoading(false);
    });
  }, []);

  const tabs =
    locale === "zh"
      ? [
          { id: "all", label: "全部留学项目" },
          { id: "korean", label: "🇨🇳 CSC 政府全额奖学金" },
          { id: "japanese", label: "🇨🇳 CIS 国际中文教师奖" },
          { id: "exchange", label: "🔄 越中校际交换生" },
        ]
      : locale === "en"
      ? [
          { id: "all", label: "All Programs" },
          { id: "korean", label: "🇨🇳 CSC Government Scholarship" },
          { id: "japanese", label: "🇨🇳 CIS Chinese Teachers" },
          { id: "exchange", label: "🔄 Student Exchange" },
        ]
      : [
          { id: "all", label: "Tất Cả Chương Trình" },
          { id: "korean", label: "🇨🇳 Học Bổng CSC / Chính Phủ" },
          { id: "japanese", label: "🇨🇳 Học Bổng CIS / Hán Ngữ" },
          { id: "exchange", label: "🔄 Trao Đổi Sinh Viên" },
        ];

  const filteredPrograms = programList.filter((p) => {
    const matchesTab = activeTab === "all" || p.category === activeTab;
    const titleText =
      locale === "zh"
        ? p.titleZh || p.title
        : locale === "en"
        ? p.titleEn || p.title
        : p.title;
    const descText =
      locale === "zh"
        ? p.descriptionZh || p.description
        : locale === "en"
        ? p.descriptionEn || p.description
        : p.description;
    const matchesSearch =
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      descText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getBadgeText = (p: Program) => {
    if (locale === "zh" && p.badgeZh) return p.badgeZh;
    if (locale === "vi" && p.badgeVi) return p.badgeVi;
    if (p.category === "korean") {
      return locale === "zh"
        ? "CSC全额奖学金"
        : locale === "en"
        ? "Full CSC Scholarship"
        : "Học bổng Toàn phần CSC";
    }
    if (p.category === "japanese") {
      return locale === "zh"
        ? "CIS中文师资奖"
        : locale === "en"
        ? "CIS Scholarship"
        : "Học bổng CIS Khổng Tử";
    }
    return locale === "zh"
      ? "双向学分互认"
      : locale === "en"
      ? "Credit Exchange"
      : "Công nhận tín chỉ";
  };

  const getLocationText = (p: Program) => {
    if (locale === "zh" && p.locationZh) return p.locationZh;
    if (locale === "vi" && p.locationVi) return p.locationVi;
    return locale === "zh"
      ? "中国重点合作高校"
      : locale === "en"
      ? "Partner Universities in China"
      : "Đại học đối tác Trung Quốc";
  };

  return (
    <section className="section-padding bg-white" id="hoc-bong">
      <Container>
        <SectionHeading
          tag={
            locale === "zh"
              ? "中方高校重点奖学金与语言项目"
              : locale === "en"
              ? "Featured Scholarships & Language Programs"
              : "Học Bổng Trọng Điểm & Ngôn Ngữ"
          }
          title={
            locale === "zh"
              ? "赴华奖学金与留学项目精选"
              : locale === "en"
              ? "FEATURED SCHOLARSHIPS & PROGRAMS"
              : "HỌC BỔNG & CHƯƠNG TRÌNH NỔI BẬT"
          }
          subtitle={
            locale === "zh"
              ? "精选2026-2027年度中国教育部CSC全额奖学金、国际中文教师奖学金（CIS）及重点大学名校直通项目"
              : locale === "en"
              ? "Discover the latest CSC full scholarships, CIS Confucius scholarships, and HSK training programs for 2026 - 2027"
              : "Khám phá các chương trình học bổng toàn phần CSC, học bổng Khổng Tử CIS và đào tạo HSK mới nhất cho năm 2026 - 2027"
          }
        />

        {/* Lucky Star Style Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 border-b border-neutral-200 pb-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 px-3 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  isActive
                    ? "text-[#84150e]"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#84150e] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Filter Input */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            aria-label="Lọc nhanh học bổng hoặc trường"
            placeholder={
              locale === "zh"
                ? "输入关键词筛选奖学金或高校名称..."
                : locale === "en"
                ? "Quick filter by scholarship, university, or major..."
                : "Lọc nhanh theo tên học bổng, trường hoặc chuyên ngành..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2.5 rounded-full border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all shadow-sm"
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-neutral-50 border border-neutral-200"
              />
            ))}
          </div>
        ) : (
          <div
            key={activeTab + locale}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-300"
          >
            {filteredPrograms.map((program: Program, index: number) => {
              const badgeText = getBadgeText(program);
              const locationText = getLocationText(program);

              const title =
                locale === "zh"
                  ? program.titleZh || program.title
                  : locale === "en"
                  ? program.titleEn || program.title
                  : program.title;
              const desc =
                locale === "zh"
                  ? program.descriptionZh || program.description
                  : locale === "en"
                  ? program.descriptionEn || program.description
                  : program.description;

              return (
                <div
                  key={program.slug}
                  className="group rounded-2xl bg-white border border-neutral-200 hover:border-[#84150e] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5 relative"
                >
                  {/* Top Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#84150e]/95 backdrop-blur-md text-white text-[11px] font-extrabold shadow-md tracking-wider border border-white/20">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {badgeText}
                    </span>
                  </div>

                  {/* Thumbnail / Header block with Real University Campus Image */}
                  <div>
                    <div className="aspect-[16/10] bg-neutral-900 relative overflow-hidden border-b border-neutral-100">
                      {program.image ? (
                        <Image
                          src={program.image}
                          alt={title}
                          fill
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={80}
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 via-rose-50 to-amber-50 flex items-center justify-center">
                          <span className="text-4xl">🇨🇳</span>
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                      {/* Category tag on bottom-left of the image */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                          {program.category === "korean"
                            ? locale === "zh"
                              ? "中国政府奖学金 CSC"
                              : locale === "en"
                              ? "CSC Scholarship"
                              : "Học bổng CSC"
                            : program.category === "japanese"
                            ? locale === "zh"
                              ? "国际中文教师奖 CIS"
                              : locale === "en"
                              ? "CIS Scholarship"
                              : "Học bổng CIS"
                            : locale === "zh"
                            ? "校际交换生"
                            : locale === "en"
                            ? "Exchange Program"
                            : "Trao đổi sinh viên"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="font-heading text-lg font-bold text-neutral-900 group-hover:text-[#84150e] transition-colors leading-snug mb-2 line-clamp-2">
                        {title}
                      </h3>

                      <div className="ls-divider mb-3" />

                      <p className="text-neutral-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                        {desc}
                      </p>

                      {/* Meta information */}
                      <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#84150e] shrink-0" />
                          <span className="font-medium truncate">
                            {locationText}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#84150e] shrink-0" />
                          <span>
                            {locale === "zh"
                              ? "学制时长: "
                              : locale === "en"
                              ? "Duration: "
                              : "Thời lượng: "}
                            <strong className="text-neutral-800">
                              {program.duration}
                            </strong>
                          </span>
                        </div>
                        {program.features[0] && (
                          <div className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-[#84150e] shrink-0" />
                            <span>
                              {locale === "zh"
                                ? "核心优势: "
                                : locale === "en"
                                ? "Benefit: "
                                : "Ưu đãi: "}
                              <strong className="text-neutral-800">
                                {program.features[0]}
                              </strong>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl border border-[#84150e] text-[#84150e] hover:bg-[#84150e] hover:text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>
                        {locale === "zh"
                          ? "查看奖学金详情"
                          : locale === "en"
                          ? "View Scholarship Details"
                          : "Xem Chi Tiết Học Bổng"}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all button */}
        <div className="text-center mt-12">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#84150e] hover:bg-[#6b0f0a] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
          >
            <span>
              {locale === "zh"
                ? "查看全部赴华奖学金与项目"
                : locale === "en"
                ? "View All Scholarships & Programs"
                : "Xem Tất Cả Chương Trình & Học Bổng"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
