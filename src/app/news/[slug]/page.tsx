import { getNewsArticleBySlug } from "@/data/news";
import { fetchNewsFromSheet } from "@/lib/googleSheets";
import NewsDetailClient from "./NewsDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allNews = await fetchNewsFromSheet();
  const article =
    allNews.find((a) => a.slug === slug) || getNewsArticleBySlug(slug);
  if (!article) return { title: "Tin tức & Thông báo" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allNews = await fetchNewsFromSheet();
  const article =
    allNews.find((a) => a.slug === slug) || getNewsArticleBySlug(slug);

  return <NewsDetailClient initialArticle={article} slug={slug} />;
}
