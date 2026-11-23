"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { NewsArticle } from "@/data/news";
import { fetchNewsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsPage() {
  const { locale, t } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchNewsFromSheet().then((data) => {
      setArticles(data);
    });
  }, []);

  const getCategoryLabel = (a: NewsArticle) => {
    if (
      locale === "vi" &&
      a.rawCategoryLabel &&
      !["scholarship", "event", "announcement"].includes(
        a.rawCategoryLabel.toLowerCase()
      )
    ) {
      return a.rawCategoryLabel;
    }
    if (a.category === "scholarship") {
      return locale === "zh"
        ? "奖学金"
        : locale === "en"
        ? "Scholarship"
        : "Học bổng";
    }
    if (a.category === "event") {
      return locale === "zh"
        ? "文化活动"
        : locale === "en"
        ? "Event"
        : "Sự kiện";
    }
    return locale === "zh"
      ? "招生通告"
      : locale === "en"
      ? "Announcement"
      : "Tuyển sinh";
  };

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={
            locale === "zh"
              ? "最新招生与活动动态"
              : locale === "en"
              ? "Latest Admissions & Activities"
              : "Bản Tin Hoạt Động & Tuyển Sinh"
          }
          title={
            locale === "zh"
              ? "留学资讯与通告"
              : locale === "en"
              ? "NEWS & EVENTS"
              : "TIN TỨC & SỰ KIỆN"
          }
          subtitle={
            locale === "zh"
              ? "实时更新中国政府奖学金（CSC）、国际中文教师奖学金（CIS）招生简章、学术讲座及中越文化交流活动。"
              : locale === "en"
              ? "Stay updated on admissions, full scholarships, thematic seminars, and upcoming cultural exchange events."
              : "Cập nhật thông tin tuyển sinh, học bổng, hội thảo chuyên đề và các sự kiện giao lưu văn hóa sắp diễn ra."
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => {
            const titleText =
              locale === "zh"
                ? article.titleZh || article.title
                : locale === "en"
                ? article.titleEn || article.title
                : article.title;

            const excerptText =
              locale === "zh"
                ? article.excerptZh || article.excerpt
                : locale === "en"
                ? article.excerptEn || article.excerpt
                : article.excerpt;

            const catLabel = getCategoryLabel(article);

            return (
              <div
                key={article.slug}
                className="group rounded-2xl bg-white border border-neutral-200 hover:border-[#84150e] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
              >
                <div>
                  <div
                    className={`aspect-[16/10] flex flex-col items-center justify-center p-6 text-center border-b border-neutral-100 ${
                      article.featured
                        ? "bg-gradient-to-br from-[#84150e] to-[#5c0f0a] text-white"
                        : "bg-gradient-to-br from-red-50 via-rose-50 to-amber-50 text-neutral-800"
                    }`}
                  >
                    <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-500">
                      {article.category === "scholarship" ? "🎓" : "📰"}
                    </span>
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        article.featured ? "text-amber-300" : "text-[#84150e]"
                      }`}
                    >
                      {catLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#84150e] font-extrabold text-xs border border-red-200">
                        {catLabel}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#84150e]" />
                        {article.date}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-lg text-neutral-900 group-hover:text-[#84150e] transition-colors mb-2 line-clamp-2 leading-snug">
                      {titleText}
                    </h3>

                    <div className="ls-divider mb-3" />

                    <p className="text-neutral-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {excerptText}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/news/${article.slug}`}
                    className="w-full py-2.5 px-4 rounded-full border border-[#84150e] text-[#84150e] hover:bg-[#84150e] hover:text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <span>{t.news.readMore}</span>
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
