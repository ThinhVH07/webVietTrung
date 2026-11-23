import { getProgramBySlug } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import ProgramDetailClient from "./ProgramDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPrograms = await fetchProgramsFromSheet();
  const program =
    allPrograms.find((p) => p.slug === slug) || getProgramBySlug(slug);
  if (!program) return { title: "Chương trình & Học bổng" };
  return {
    title: program.title,
    description: program.description,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPrograms = await fetchProgramsFromSheet();
  const program =
    allPrograms.find((p) => p.slug === slug) || getProgramBySlug(slug);

  return <ProgramDetailClient initialProgram={program} slug={slug} />;
}
