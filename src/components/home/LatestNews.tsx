"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { NewsArticle } from "@/data/news";
import { fetchNewsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function LatestNews() {
  const { locale } = useLanguage();
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    fetchNewsFromSheet().then((data) => {
      setArticles(data);
    });
  }, []);

  const featured = articles.find((a) => a.featured) || articles[0];
  const sideArticles = articles.filter((a) => a.slug !== featured?.slug).slice(0, 3);

  const getArticleTitle = (a: NewsArticle) =>
    locale === "zh"
      ? a.titleZh || a.title
      : locale === "en"
      ? a.titleEn || a.title
      : a.title;

  const getArticleExcerpt = (a: NewsArticle) =>
    locale === "zh"
      ? a.excerptZh || a.excerpt
      : locale === "en"
      ? a.excerptEn || a.excerpt
      : a.excerpt;

  const getCategoryLabel = (a: NewsArticle) => {
    if (locale === "vi" && a.rawCategoryLabel && !["scholarship", "event", "announcement"].includes(a.rawCategoryLabel.toLowerCase())) {
      return a.rawCategoryLabel;
    }
    if (a.category === "scholarship") {
      return locale === "zh" ? "奖学金专栏" : locale === "en" ? "Scholarship" : "Học bổng";
    }
    if (a.category === "event") {
      return locale === "zh" ? "文化活动" : locale === "en" ? "Event" : "Sự kiện";
    }
    return locale === "zh" ? "招生通告" : locale === "en" ? "Announcement" : "Tuyển sinh";
  };

  return (
    <section className="section-padding bg-white" id="tin-tuc">
      <Container>
        {/* Section Heading in Lucky Star Style */}
        <SectionHeading
          tag={
            locale === "zh"
              ? "中方高校最新招生与录取快讯"
              : locale === "en"
              ? "Latest Admissions & Updates"
              : "Bản Tin Hoạt Động & Tuyển Sinh"
          }
          title={
            locale === "zh"
              ? "赴华留学焦点资讯与政策动态"
              : locale === "en"
              ? "FEATURED NEWS & ANNOUNCEMENTS"
              : "TIN TỨC & THÔNG BÁO NỔI BẬT"
          }
          subtitle={
            locale === "zh"
              ? "实时发布中国政府奖学金（CSC）政策变动、中方高校录取榜单、HSK考务指南及越中青年学术文化活动"
              : locale === "en"
              ? "Stay updated on CSC & CIS scholarships, study in China seminars, and Vietnam - China cultural exchange events"
              : "Cập nhật những thông tin tuyển sinh học bổng CSC, CIS, hội thảo du học Trung Quốc và sự kiện giao lưu văn hóa Việt - Trung mới nhất"
          }
        />

        {/* Lucky Star 2-Column Grid (Left big, Right 3 small) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Featured Post (7 cols / ~58%) */}
          {featured && (
            <div className="lg:col-span-7 transition-all duration-300">
              <div className="rounded-3xl border-2 border-[#84150e]/30 hover:border-[#84150e] bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                {/* Image block */}
                <div className="aspect-[16/10] bg-gradient-to-br from-red-100 via-rose-50 to-amber-100 relative overflow-hidden flex items-center justify-center p-8">
                  <div className="text-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-6xl block mb-2">📢</span>
                    <span className="px-4 py-1.5 rounded-full bg-[#84150e] text-white text-xs font-bold uppercase tracking-wider shadow">
                      {locale === "zh"
                        ? "重点头条通告"
                        : locale === "en"
                        ? "Featured Highlight"
                        : "Tin Nổi Bật Nhất"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#84150e] font-bold uppercase text-[11px] border border-red-200">
                      {getCategoryLabel(featured)}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#84150e]" />
                      {featured.date}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#84150e] leading-snug mb-3 group-hover:text-red-700 transition-colors">
                    <Link href={`/news/${featured.slug}`}>
                      {getArticleTitle(featured)}
                    </Link>
                  </h3>

                  <div className="ls-divider mb-4" />

                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                    {getArticleExcerpt(featured)}
                  </p>

                  <Link
                    href={`/news/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-[#84150e] hover:gap-3 transition-all"
                  >
                    <span>
                      {locale === "zh"
                        ? "查看通告全文"
                        : locale === "en"
                        ? "Read Full Announcement"
                        : "Xem toàn bộ thông báo"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Right Column: 3 Horizontal List Articles (5 cols / ~42%) */}
          <div className="lg:col-span-5 space-y-4">
            {sideArticles.map((article) => {
              const itemTitle = getArticleTitle(article);

              return (
                <div key={article.slug} className="transition-all duration-300">
                  <Link
                    href={`/news/${article.slug}`}
                    className="flex gap-4 p-4 rounded-2xl border border-neutral-200 hover:border-[#84150e] bg-white hover:shadow-md transition-all duration-300 group items-center"
                  >
                    {/* Small Thumb */}
                    <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-xl bg-gradient-to-br from-red-50 to-amber-50 border border-neutral-100 flex items-center justify-center shrink-0 text-2xl group-hover:scale-105 transition-transform">
                      {article.category === "scholarship" ? "🎓" : "📰"}
                    </div>

                    {/* Text details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1">
                        <span className="font-bold text-[#84150e] uppercase">
                          {getCategoryLabel(article)}
                        </span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="font-heading text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#84150e] transition-colors leading-snug line-clamp-2 mb-1.5">
                        {itemTitle}
                      </h3>

                      <span className="text-xs text-[#84150e] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        {locale === "zh"
                          ? "阅读更多"
                          : locale === "en"
                          ? "Read more"
                          : "Đọc tiếp"}{" "}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}

            {/* Lucky Star style View All link button */}
            <div className="pt-2 text-center lg:text-left">
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full border-2 border-[#84150e] text-[#84150e] hover:bg-[#84150e] hover:text-white font-heading font-extrabold text-sm uppercase tracking-wider transition-all duration-300"
              >
                <span>
                  {locale === "zh"
                    ? "查看全部资讯与招生简章"
                    : locale === "en"
                    ? "View All News & Events"
                    : "Xem Tất Cả Tin Tức & Sự Kiện"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
