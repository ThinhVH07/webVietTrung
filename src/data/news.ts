export interface NewsArticle {
  slug: string;
  title: string;
  titleZh?: string;
  titleEn: string;
  excerpt: string;
  excerptZh?: string;
  excerptEn: string;
  content: string;
  contentZh?: string;
  contentEn?: string;
  category: "announcement" | "event" | "scholarship";
  rawCategoryLabel?: string;
  date: string;
  image: string;
  featured: boolean;
}

// Dữ liệu tin tức được tải động 100% từ Google Sheets (tab: news) thông qua biến môi trường NEXT_PUBLIC_GOOGLE_SHEET_API_URL
export const newsArticles: NewsArticle[] = [];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}
