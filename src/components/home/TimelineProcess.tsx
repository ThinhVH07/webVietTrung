"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserCheck, BookOpen, FileCheck, Award, CheckCircle2, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { fetchTimelineFromSheet, type TimelineStepData } from "@/lib/googleSheets";

const defaultIcons = [UserCheck, BookOpen, FileCheck, Award];

const initialTimeline: TimelineStepData[] = [
  {
    step: "01",
    tag_vi: "GIAI ĐOẠN 01",
    tag_zh: "第一阶段 · 评估",
    location_vi: "Bắc Kinh · Cố Cung Hoàng Gia",
    location_zh: "北京 · 故宫紫禁城",
    image: "/images/landscapes/china-beijing.jpg",
    title_vi: "Tiếp Nhận Tư Vấn & Định Hướng Chọn Trường",
    title_zh: "前期评估与目标选校",
    desc_vi: "Chuyên gia đánh giá học lực, điểm GPA, nguyện vọng ngành học và điều kiện tài chính để xây dựng lộ trình chọn trường đại học Trung Quốc tối ưu nhất (hệ thống trường Top 985, 211).",
    desc_zh: "根据学子学业均分（GPA）、专业背景与个人志向，科学匹配985/211及省部共建重点高校，定制最优奖学金申请策略与全套升学方案。",
    highlights_vi: [
      "Đánh giá năng lực GPA & tài chính 1-1",
      "Định hướng đúng trường Top 985 & 211",
      "Xây dựng chiến lược tối ưu đỗ học bổng",
    ],
    highlights_zh: [
      "1对1学术背景诊断与GPA测评",
      "匹配985/211顶尖重点大学",
      "量身定制专属全额奖学金方案",
    ],
  },
  {
    step: "02",
    tag_vi: "GIAI ĐOẠN 02",
    tag_zh: "第二阶段 · 语言",
    location_vi: "Quế Lâm · Non Nước Hữu Tình",
    location_zh: "桂林 · 山水甲天下",
    image: "/images/landscapes/china-guilin.jpg",
    title_vi: "Đào Tạo Hán Ngữ & Luyện Thi HSK, HSKK Cấp Tốc",
    title_zh: "汉语言强化与HSK冲刺",
    desc_vi: "Tham gia các khóa đào tạo tiếng Trung cùng giảng viên bản ngữ giàu kinh nghiệm, cam kết chuẩn đầu ra chứng chỉ HSK 4 - HSK 6 và HSKK phục vụ xét duyệt học bổng toàn phần.",
    desc_zh: "母语专家名师授课，强化听说读写，冲刺攻克HSK 4-6级及HSKK高级口语，确保顺利达到各大高校录取硬性语言标准。",
    highlights_vi: [
      "Giảng viên bản ngữ giảng dạy trực tiếp",
      "Lộ trình tinh gọn cấp tốc từ 3 - 6 tháng",
      "Cam kết chuẩn đầu ra HSK 4 - 6 & HSKK",
    ],
    highlights_zh: [
      "资深中方母语名师面对面指导",
      "3-6个月高效集训提分冲刺",
      "保过达标高校硬性语言门槛",
    ],
  },
  {
    step: "03",
    tag_vi: "GIAI ĐOẠN 03",
    tag_zh: "第三阶段 · 申报",
    location_vi: "Thượng Hải · Phồn Hoa Hiện Đại",
    location_zh: "上海 · 外滩与现代都市",
    image: "/images/landscapes/china-shanghai.jpg",
    title_vi: "Hoàn Thiện Hồ Sơ & Nộp Học Bổng CSC / CIS",
    title_zh: "文书润色与奖学金申办",
    desc_vi: "Dịch thuật công chứng chuyên nghiệp, chuẩn hóa Kế hoạch học tập (Study Plan / SOP), kết nối xin thư giới thiệu giáo sư danh tiếng và hoàn thiện hồ sơ trên cổng học bổng quốc gia.",
    desc_zh: "专业团队指导撰写极具竞争力的个人陈述（SOP/Study Plan）、联系教授出具官方推荐信，并在CSC/CIS国家官网完成规范提交。",
    highlights_vi: [
      "Viết Kế hoạch học tập (Study Plan / SOP) chuẩn",
      "Hỗ trợ xin thư giới thiệu từ Giáo sư",
      "Apply trực tiếp cổng CSC / CIS & trường",
    ],
    highlights_zh: [
      "教授级团队深度精修SOP研习计划",
      "名校博导/教授权威推荐信背书",
      "中国国家级奖学金官网直报跟踪",
    ],
  },
  {
    step: "04",
    tag_vi: "GIAI ĐOẠN 04",
    tag_zh: "第四阶段 · 启航",
    location_vi: "Trương Gia Giới · Kỳ Quan Thiên Nhiên",
    location_zh: "张家界 · 奇山胜境",
    image: "/images/landscapes/china-zhangjiajie.jpg",
    title_vi: "Luyện Phỏng Vấn 1-1, Nhận Visa & Xuất Cảnh",
    title_zh: "名校面试通关与行前迎新",
    desc_vi: "Luyện phỏng vấn 1-1 trực tiếp với đại diện trường Trung Quốc, hỗ trợ nhận thư mời, biểu mẫu JW202/201 và làm thủ tục Visa du học. Hướng dẫn xuất cảnh & đồng hành 24/7.",
    desc_zh: "中方考官1对1进行全真模拟面试与答辩指导；协助办理录取通知书、JW202/201表及赴华签证；提供抵华接机与全天候学业生活支持。",
    highlights_vi: [
      "Mô phỏng phỏng vấn 1-1 với giảng viên",
      "Hỗ trợ Visa & JW202 với tỷ lệ đỗ 99.8%",
      "Đón sân bay, nhận KTX & đồng hành 24/7",
    ],
    highlights_zh: [
      "中方考官全真模拟面试与答辩辅导",
      "全程协助JW202表与签证申请 (99.8%)",
      "抵华接机入住与在华学业全天候关怀",
    ],
  },
];

export default function TimelineProcess() {
  const { locale } = useLanguage();
  const [timelineList, setTimelineList] = useState<TimelineStepData[]>(initialTimeline);

  useEffect(() => {
    fetchTimelineFromSheet().then((data) => {
      if (data && data.length > 0) {
        setTimelineList(data);
      }
    });
  }, []);

  const steps = timelineList.map((item, index) => {
    const Icon = defaultIcons[index % defaultIcons.length];
    return {
      step: item.step,
      icon: Icon,
      tag: locale === "zh" ? item.tag_zh || item.tag_vi : item.tag_vi,
      location: locale === "zh" ? item.location_zh || item.location_vi : item.location_vi,
      image: item.image,
      title: locale === "zh" ? item.title_zh || item.title_vi : item.title_vi,
      desc: locale === "zh" ? item.desc_zh || item.desc_vi : item.desc_vi,
      highlights: locale === "zh" && item.highlights_zh?.length ? item.highlights_zh : item.highlights_vi,
    };
  });

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 via-neutral-100/60 to-neutral-50 relative" id="quy-trinh">
      {/* Decorative background lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-red-100/40 rounded-full blur-[140px]" />
      </div>

      <Container>
        {/* Section Heading */}
        <SectionHeading
          tag={locale === "zh" ? "赴华成功四步法" : "Lộ Trình Du Học Thành Công"}
          title={locale === "zh" ? "赴华留学与奖学金申办规范流程" : "QUY TRÌNH HỒ SƠ & LỘ TRÌNH DU HỌC TRUNG QUỐC"}
          subtitle={
            locale === "zh"
              ? "严格遵循中国教育部国际合作要求与高校录取规范，4步标准化服务，助学子圆梦中国顶尖学府"
              : "Quy trình 4 bước bài bản, chuyên nghiệp giúp học viên tự tin chinh phục học bổng toàn phần và visa du học Trung Quốc"
          }
        />

        {/* Sticky Cards Stacking Container (Matching video layout) */}
        <div className="relative max-w-5xl mx-auto mt-14 pb-20">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="sticky top-[75px] md:top-[105px] transition-all duration-300 mb-[16vh] md:mb-[24vh] last:mb-0"
                style={{
                  zIndex: 10 + index,
                }}
              >
                <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px] border border-white/25 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:shadow-[0_-12px_45px_rgba(0,0,0,0.45)] bg-neutral-950 text-white min-h-[380px] md:min-h-[420px] flex flex-col justify-between p-6 sm:p-8 md:p-12 group transition-all duration-500 hover:border-amber-400/40">
                  {/* Scenic Chinese Landscape Background Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    priority={index === 0}
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88]"
                  />

                  {/* Gradient Overlays: Ensure crisp text contrast while showcasing scenery */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/80 md:via-[#3b0805]/85 to-black/55 z-[1]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-neutral-950/40 z-[1]" />

                  {/* Subtle red-brand glow effect */}
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#84150e]/30 rounded-full blur-3xl pointer-events-none z-[1]" />

                  {/* Top Bar: Badges + Giant Watermark Step Number */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      {/* Step Stage Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#84150e] text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-400/30 shadow-md">
                        <Icon className="w-3.5 h-3.5" />
                        {item.tag}
                      </span>

                      {/* Location Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 font-medium text-xs border border-white/20">
                        <MapPin className="w-3.5 h-3.5 text-amber-300" />
                        {item.location}
                      </span>
                    </div>

                    {/* Giant Watermark Step Number */}
                    <div className="font-heading font-black text-6xl sm:text-7xl md:text-8xl leading-none text-white/20 select-none tracking-tighter group-hover:text-amber-400/30 transition-colors duration-500">
                      {item.step}
                    </div>
                  </div>

                  {/* Center Content: Title & Description */}
                  <div className="relative z-10 my-6 max-w-3xl">
                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3 drop-shadow-md group-hover:text-amber-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal drop-shadow-sm">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Bar: Key Highlights / Benefits Pills */}
                  <div className="relative z-10 pt-4 border-t border-white/15">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {item.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-neutral-100 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
