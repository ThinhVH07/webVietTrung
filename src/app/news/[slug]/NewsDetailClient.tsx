"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import type { NewsArticle } from "@/data/news";
import { fetchNewsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NewsDetailClient({
  initialArticle,
  slug,
}: {
  initialArticle?: NewsArticle;
  slug?: string;
}) {
  const { locale, t } = useLanguage();
  const [article, setArticle] = useState<NewsArticle | undefined>(
    initialArticle
  );
  const [loading, setLoading] = useState(!initialArticle);

  useEffect(() => {
    fetchNewsFromSheet().then((list) => {
      const targetSlug = slug || initialArticle?.slug;
      const found = list.find((a) => a.slug === targetSlug);
      if (found) {
        setArticle(found);
      }
      setLoading(false);
    });
  }, [slug, initialArticle]);

  if (loading && !article) {
    return (
      <section className="section-padding bg-white">
        <Container className="max-w-4xl text-center py-20 text-neutral-500">
          {locale === "zh"
            ? "正在加载资讯内容..."
            : locale === "en"
            ? "Loading article..."
            : "Đang tải nội dung bài viết..."}
        </Container>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="section-padding bg-white">
        <Container className="max-w-4xl text-center py-20">
          <h1 className="font-heading text-2xl font-bold text-neutral-800 mb-4">
            {locale === "zh"
              ? "未找到该文章"
              : locale === "en"
              ? "Article not found"
              : "Không tìm thấy bài viết"}
          </h1>
          <Button href="/news" size="md">
            <ArrowLeft className="w-4 h-4" /> {t.nav.news}
          </Button>
        </Container>
      </section>
    );
  }

  const title =
    locale === "zh"
      ? article.titleZh || article.title
      : locale === "en"
      ? article.titleEn || article.title
      : article.title;

  const excerpt =
    locale === "zh"
      ? article.excerptZh || article.excerpt
      : locale === "en"
      ? article.excerptEn || article.excerpt
      : article.excerpt;

  const content =
    locale === "zh"
      ? article.contentZh || article.content
      : locale === "en"
      ? article.contentEn || article.content
      : article.content;

  const categoryLabel =
    locale === "vi" &&
    article.rawCategoryLabel &&
    !["scholarship", "event", "announcement"].includes(
      article.rawCategoryLabel.toLowerCase()
    )
      ? article.rawCategoryLabel
      : article.category === "scholarship"
      ? locale === "zh"
        ? "奖学金专栏"
        : locale === "en"
        ? "Scholarship"
        : "Học bổng"
      : article.category === "event"
      ? locale === "zh"
        ? "文化活动"
        : locale === "en"
        ? "Event"
        : "Sự kiện"
      : locale === "zh"
      ? "招生通告"
      : locale === "en"
      ? "Announcement"
      : "Tuyển sinh";

  return (
    <section className="section-padding bg-white">
      <Container className="max-w-4xl">
        <Button href="/news" variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4" />{" "}
          {locale === "zh"
            ? "返回留学资讯"
            : locale === "en"
            ? "Back to News"
            : t.nav.news}
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-red-50 text-[#84150e] font-bold text-xs border border-red-200 uppercase">
              {categoryLabel}
            </span>
            <span className="text-sm text-neutral-500 flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#84150e]" />
              {article.date}
            </span>
          </div>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(
                  locale === "zh"
                    ? "链接已复制到剪贴板！"
                    : locale === "en"
                    ? "Link copied to clipboard!"
                    : "Đã sao chép liên kết vào bộ nhớ tạm!"
                );
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />{" "}
            {locale === "zh" ? "分享" : locale === "en" ? "Share" : "Chia sẻ"}
          </button>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight">
          {title}
        </h1>

        <div className="aspect-[2/1] rounded-3xl bg-gradient-to-br from-[#84150e] via-[#9c1b1f] to-[#5c0f0a] shadow-xl flex flex-col items-center justify-center p-8 text-white mb-10 text-center border border-red-500/20">
          <span className="text-5xl mb-3">📢</span>
          <p className="text-xl font-heading font-bold max-w-lg">{title}</p>
        </div>

        <div className="prose prose-neutral prose-lg max-w-none text-neutral-800 leading-relaxed space-y-6">
          {excerpt && (
            <p className="text-xl font-medium text-neutral-700 leading-relaxed border-l-4 border-[#84150e] pl-4 py-1 italic bg-red-50/50 rounded-r-xl">
              {excerpt}
            </p>
          )}

          <p className="whitespace-pre-line">{content}</p>

          <p>
            {locale === "zh"
              ? "越中教育合作与留学中心依托胡志明市开放大学雄厚办学实力，长期与中国国家留学基金委（CSC）及近百所中方重点大学保持紧密合作，定期组织高校巡讲、全真面试演练、个人陈述专业修改等公益辅导活动，助力学子高概率斩获中国名校全额奖学金。"
              : locale === "en"
              ? "In order to provide the best support for students wishing to study at leading universities in China, the Vietnam - China Education & Study Abroad Center regularly organizes specialized consultation sessions, dossier reviews, and free assistance for CSC and CIS scholarship applications."
              : "Nhằm mục tiêu tạo điều kiện tốt nhất cho học viên và sinh viên có nguyện vọng học tập tại các trường đại học hàng đầu Trung Quốc, Trung Tâm Du Học Việt - Trung thường xuyên tổ chức các buổi tư vấn chuyên sâu, thẩm định hồ sơ và hỗ trợ hoàn thiện đơn ứng tuyển học bổng CSC, CIS hoàn toàn miễn phí."}
          </p>

          <h2 className="text-2xl font-bold font-heading text-[#84150e] mt-8 mb-4">
            {locale === "zh"
              ? "联系咨询与材料初审"
              : locale === "en"
              ? "Contact & Application Support"
              : "Thông tin liên hệ & Hỗ trợ hồ sơ"}
          </h2>
          <p>
            {locale === "zh"
              ? "关于中方高校申请资格、专业目录、语言要求及奖学金申报细则，欢迎广大学子及家长随时联系中心招生办公室或通过官方热线进行深度一对一咨询。"
              : locale === "en"
              ? "For any inquiries regarding scholarship eligibility or guidance on preparing your study abroad application, students and parents are welcome to contact our Center Office or hotline directly for prompt assistance."
              : "Mọi thắc mắc về điều kiện xét tuyển học bổng hoặc hướng dẫn chuẩn bị hồ sơ du học Trung Quốc, quý phụ huynh và học viên vui lòng liên hệ trực tiếp qua Văn phòng Trung tâm hoặc đường dây nóng để được giải đáp kịp thời."}
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Tag className="w-4 h-4 text-[#84150e]" />
            <span>
              {locale === "zh"
                ? "资讯分类:"
                : locale === "en"
                ? "Category:"
                : "Chủ đề:"}{" "}
              {categoryLabel}
            </span>
          </div>
          <Button href="/admissions" size="md">
            {locale === "zh"
              ? "立即申请咨询"
              : locale === "en"
              ? "Apply for Consultation"
              : "Đăng ký tư vấn ngay"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
