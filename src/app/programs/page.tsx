"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Program } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

const filters = [
  { key: "all", labelKey: "all" as const },
  { key: "korean", labelKey: "korean" as const },
  { key: "japanese", labelKey: "japanese" as const },
  { key: "exchange", labelKey: "exchange" as const },
];

export default function ProgramsPage() {
  const [active, setActive] = useState("all");
  const [programList, setProgramList] = useState<Program[]>([]);
  const { locale, t } = useLanguage();

  useEffect(() => {
    fetchProgramsFromSheet().then((data) => {
      setProgramList(data);
    });
  }, []);

  const filtered =
    active === "all"
      ? programList
      : programList.filter((p) => p.category === active);

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={
            locale === "zh"
              ? "全额奖学金与语言项目"
              : locale === "en"
              ? "Full Scholarships & Programs"
              : "Tra Cứu Học Bổng Toàn Phần"
          }
          title={
            locale === "zh"
              ? "赴华留学与汉语言项目"
              : locale === "en"
              ? "TRAINING PROGRAMS & SCHOLARSHIPS"
              : "CHƯƠNG TRÌNH ĐÀO TẠO & HỌC BỔNG"
          }
          subtitle={
            locale === "zh"
              ? "探索2026-2027学年中国政府奖学金（CSC）、国际中文教师奖学金（CIS）、HSK冲刺培训及校际交换生项目"
              : locale === "en"
              ? "Explore language courses, international certificate preparation, and study abroad - academic exchange programs for 2026 - 2027"
              : "Khám phá các khóa học ngôn ngữ, luyện thi chứng chỉ quốc tế và chương trình du học - trao đổi học thuật năm 2026 - 2027"
          }
        />

        {/* Filter Tabs in Lucky Star Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                active === f.key
                  ? "bg-[#84150e] text-white shadow-lg shadow-red-900/20"
                  : "bg-white text-neutral-700 hover:text-[#84150e] border border-neutral-200"
              }`}
            >
              {t.programs[f.labelKey]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((program) => {
              const titleText =
                locale === "zh"
                  ? program.titleZh || program.title
                  : locale === "en"
                  ? program.titleEn || program.title
                  : program.title;

              const descText =
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
                  <div>
                    {/* Real University Campus Thumbnail */}
                    <div className="aspect-[16/10] bg-neutral-100 relative overflow-hidden border-b border-neutral-100">
                      {program.image ? (
                        <Image
                          src={program.image}
                          alt={titleText}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-100 via-rose-50 to-amber-100 flex items-center justify-center">
                          <span className="text-4xl">🇨🇳</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                          {program.category === "korean"
                            ? locale === "zh"
                              ? "中国政府奖学金 CSC"
                              : locale === "en"
                              ? "CSC Government Scholarship"
                              : "Học Bổng Chính Phủ CSC"
                            : program.category === "japanese"
                            ? locale === "zh"
                              ? "国际中文教师奖 CIS"
                              : locale === "en"
                              ? "CIS Language Scholarship"
                              : "Học Bổng Hán Ngữ CIS"
                            : locale === "zh"
                            ? "越中高校校际交换"
                            : locale === "en"
                            ? "International Exchange"
                            : "Trao Đổi Quốc Tế"}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#84150e] font-extrabold text-xs border border-red-200">
                          {t.programs[
                            program.category as keyof typeof t.programs
                          ] || program.category}
                        </span>
                        <span className="text-xs text-neutral-500 flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#84150e]" />
                          {program.duration}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-lg text-neutral-900 group-hover:text-[#84150e] transition-colors mb-2 leading-snug line-clamp-2">
                        {titleText}
                      </h3>

                      <div className="ls-divider mb-3" />

                      <p className="text-neutral-600 text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed">
                        {descText}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-neutral-100">
                        {program.features.slice(0, 3).map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-neutral-600"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#84150e]" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="w-full py-2.5 px-4 rounded-full border-2 border-[#84150e] text-[#84150e] hover:bg-[#84150e] hover:text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                    >
                      <span>{t.programs.viewDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>
    </section>
  );
}
