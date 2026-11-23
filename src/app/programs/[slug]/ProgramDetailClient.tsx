"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Clock, CheckCircle, Award, BookOpen, UserCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Program } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ProgramDetailClient({
  initialProgram,
  slug,
}: {
  initialProgram?: Program;
  slug?: string;
}) {
  const { locale, t } = useLanguage();
  const [program, setProgram] = useState<Program | undefined>(initialProgram);
  const [loading, setLoading] = useState(!initialProgram);

  useEffect(() => {
    fetchProgramsFromSheet().then((list) => {
      const targetSlug = slug || initialProgram?.slug;
      const found = list.find((p) => p.slug === targetSlug);
      if (found) {
        setProgram(found);
      }
      setLoading(false);
    });
  }, [slug, initialProgram]);

  if (loading && !program) {
    return (
      <section className="section-padding bg-white">
        <Container className="text-center py-20 text-neutral-500">
          {locale === "zh"
            ? "正在加载项目详情..."
            : locale === "en"
            ? "Loading program details..."
            : "Đang tải thông tin chương trình..."}
        </Container>
      </section>
    );
  }

  if (!program) {
    return (
      <section className="section-padding bg-white">
        <Container className="text-center py-20">
          <h1 className="font-heading text-2xl font-bold text-neutral-800 mb-4">
            {locale === "zh"
              ? "未找到该项目"
              : locale === "en"
              ? "Program not found"
              : "Không tìm thấy chương trình"}
          </h1>
          <Button href="/programs" size="md">
            <ArrowLeft className="w-4 h-4" /> {t.nav.programs}
          </Button>
        </Container>
      </section>
    );
  }

  const title =
    locale === "zh"
      ? program.titleZh || program.title
      : locale === "en"
      ? program.titleEn || program.title
      : program.title;
  const description =
    locale === "zh"
      ? program.descriptionZh || program.description
      : locale === "en"
      ? program.descriptionEn || program.description
      : program.description;

  return (
    <section className="section-padding bg-white">
      <Container>
        <Button href="/programs" variant="ghost" size="sm" className="mb-8">
          <ArrowLeft className="w-4 h-4" />{" "}
          {locale === "zh"
            ? "返回全部留学项目"
            : locale === "en"
            ? "Back to Programs"
            : t.nav.programs}
        </Button>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main content — 8 cols */}
          <div className="lg:col-span-8">
            <div className="aspect-[16/9] rounded-3xl relative overflow-hidden shadow-xl p-8 flex flex-col justify-between text-white mb-8 border border-red-500/20 bg-[#5c0f0a]">
              {program.image && (
                <>
                  <Image
                    src={program.image}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3e0704]/95 via-[#5c0f0a]/75 to-[#84150e]/50 pointer-events-none" />
                </>
              )}
              <div className="relative z-10 flex justify-between items-start">
                <Badge className="bg-white/95 text-[#84150e] border-none font-bold text-xs px-3 py-1">
                  {program.category === "korean"
                    ? locale === "zh"
                      ? "🇨🇳 中国政府奖学金 (CSC)"
                      : locale === "en"
                      ? "🇨🇳 CSC Government Scholarship"
                      : "🇨🇳 Học bổng Chính phủ CSC"
                    : program.category === "japanese"
                    ? locale === "zh"
                      ? "🇨🇳 国际中文教师奖 (CIS)"
                      : locale === "en"
                      ? "🇨🇳 CIS Chinese Language"
                      : "🇨🇳 Học bổng Hán ngữ CIS"
                    : locale === "zh"
                    ? "🔄 越中校际交换生"
                    : locale === "en"
                    ? "🔄 International Exchange"
                    : "🔄 Trao đổi quốc tế"}
                </Badge>
                <span className="text-sm bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full font-bold">
                  {program.duration}
                </span>
              </div>

              <div className="relative z-10">
                <h1 className="font-heading text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight drop-shadow-sm">
                  {title}
                </h1>
                <p className="text-red-100 text-sm sm:text-base max-w-2xl leading-relaxed drop-shadow-sm">
                  {description}
                </p>
              </div>
            </div>

            {/* Program Details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#84150e] mb-4">
                  {locale === "zh"
                    ? "项目深度解析"
                    : locale === "en"
                    ? "Program Overview"
                    : "Tổng quan chương trình học bổng"}
                </h2>
                <p className="text-neutral-700 leading-relaxed text-base">
                  {locale === "zh"
                    ? "本项目由中国国家留学基金委（CSC）或教育部语合中心联合各直属公立重点大学共同设立。中心依托胡志明市开放大学的权威公办背景，为申请学子提供学术初审、导师推荐、自述信（SOP）润色、面试全真模拟及在华全程学业护航服务。"
                    : locale === "en"
                    ? "This program is designed to equip students with comprehensive Chinese language skills and complete preparation for full scholarship applications to study in China, guided directly by experienced professors and native specialists."
                    : "Chương trình được thiết kế bài bản với mục tiêu trang bị kiến thức toàn diện về ngôn ngữ Hán ngữ, chuẩn bị hồ sơ ứng tuyển học bổng toàn phần du học Trung Quốc. Học viên sẽ được học tập trực tiếp cùng đội ngũ giảng viên giàu kinh nghiệm và các chuyên gia bản xứ."}
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold text-[#84150e] mb-4">
                  {locale === "zh"
                    ? "培养目标与核心收益"
                    : locale === "en"
                    ? "Training Objectives & Benefits"
                    : "Mục tiêu đào tạo & Lợi ích"}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Award,
                      title:
                        locale === "zh"
                          ? "国家级全额资助"
                          : locale === "en"
                          ? "100% Full Scholarship"
                          : "Tài trợ toàn phần 100%",
                      desc:
                        locale === "zh"
                          ? "全免学费及校内留学生公寓住宿费，享受按月生活补贴。"
                          : locale === "en"
                          ? "Full tuition waiver, free dormitory accommodation, and monthly living stipend."
                          : "Miễn 100% học phí, miễn phí ký túc xá và cấp sinh hoạt phí.",
                    },
                    {
                      icon: BookOpen,
                      title:
                        locale === "zh"
                          ? "高标准汉语言通关"
                          : locale === "en"
                          ? "Standardized HSK Mastery"
                          : "Chuẩn hóa Hán ngữ HSK",
                      desc:
                        locale === "zh"
                          ? "全面提升学术中文能力，无障碍融入中国高校专业课程。"
                          : locale === "en"
                          ? "Achieve HSK 4 - 6 certificates and communicate fluently in academic environments."
                          : "Tự tin thi đạt chứng chỉ HSK 4 - 6 và giao tiếp lưu loát.",
                    },
                    {
                      icon: UserCheck,
                      title:
                        locale === "zh"
                          ? "名校文凭与权威认证"
                          : locale === "en"
                          ? "Prestigious International Degree"
                          : "Văn bằng quốc tế danh giá",
                      desc:
                        locale === "zh"
                          ? "毕业获颁中国教育部及国际公认的正规高等教育学位证书。"
                          : locale === "en"
                          ? "Globally recognized diplomas accredited by the Ministry of Education."
                          : "Bằng cấp được Bộ Giáo dục và Đào tạo công nhận toàn cầu.",
                    },
                    {
                      icon: CheckCircle,
                      title:
                        locale === "zh"
                          ? "中越跨国高薪就业"
                          : locale === "en"
                          ? "Multinational Career Opportunities"
                          : "Cơ hội việc làm đa quốc gia",
                      desc:
                        locale === "zh"
                          ? "无缝对接中越两国大型外资跨国企业、科研机构与外事部门。"
                          : locale === "en"
                          ? "Direct career pathways at multinational corporations and universities."
                          : "Kết nối việc làm tại các tập đoàn đa quốc gia và trường đại học.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border border-neutral-200/80 bg-neutral-50/50"
                    >
                      <item.icon className="w-6 h-6 text-[#84150e] mb-2" />
                      <h3 className="font-heading font-bold text-sm text-neutral-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar — 4 cols */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 sticky top-28 shadow-sm">
              <h3 className="font-heading font-bold text-xl text-[#84150e] mb-6 pb-4 border-b border-neutral-200">
                {locale === "zh"
                  ? "项目录取速览"
                  : locale === "en"
                  ? "Scholarship Summary"
                  : "Thông tin học bổng"}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#84150e] shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500 font-medium">
                      {locale === "zh"
                        ? "学制时长"
                        : locale === "en"
                        ? "Duration"
                        : "Thời lượng"}
                    </p>
                    <p className="font-bold text-sm text-neutral-800">
                      {program.duration}
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="font-heading font-bold text-sm text-neutral-900 mb-3">
                {locale === "zh"
                  ? "重点资助与支持政策:"
                  : locale === "en"
                  ? "Key Benefits:"
                  : "Đặc quyền học bổng:"}
              </h4>
              <ul className="space-y-2.5 mb-8">
                {program.features.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-neutral-700"
                  >
                    <CheckCircle className="w-4 h-4 text-[#84150e] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button href="/admissions" size="lg" className="w-full">
                {locale === "zh"
                  ? "立即申请该奖学金"
                  : locale === "en"
                  ? "Apply Now"
                  : "Đăng ký tư vấn ngay"}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
