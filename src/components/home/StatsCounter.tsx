"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { fetchStatsFromSheet, getCachedStats, type StatItemData } from "@/lib/googleSheets";

const defaultStats: StatItemData[] = [
  { key: "stat_students", value: 9999, suffix: "+", label_vi: "Người dùng / Học viên", label_zh: "累计咨询学子" },
  { key: "stat_success", value: 345, suffix: "+", label_vi: "Apply thành công", label_zh: "奖学金申请成功" },
  { key: "stat_partners", value: 120, suffix: "+", label_vi: "Trường đại học đối tác", label_zh: "中方合作高校" },
  { key: "stat_scholarships", value: 138, suffix: "+", label_vi: "Suất học bổng đã trao", label_zh: "全额奖学金名额" },
];

function StatItem({
  value,
  suffix,
  label,
  isLast,
}: {
  value: number;
  suffix: string;
  label: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`relative py-6 px-4 text-center ${
        !isLast ? "md:border-r border-red-200/70" : ""
      }`}
    >
      <p className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-[#84150e] leading-tight tracking-tight mb-1">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="text-neutral-800 text-sm sm:text-base font-bold uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const { locale } = useLanguage();
  const [statsList, setStatsList] = useState<StatItemData[]>(defaultStats);

  useEffect(() => {
    // 1. Nạp tức thì từ cache nếu đã có và hợp lệ
    const cached = getCachedStats();
    if (cached && cached.length > 0 && cached[0].value !== 2468) {
      setStatsList(cached);
    }
    // 2. Fetch fresh từ Google Sheets và cập nhật ngay khi mạng phản hồi
    fetchStatsFromSheet().then((data) => {
      if (data && data.length > 0) {
        setStatsList(data);
      }
    });
  }, []);

  const stats = statsList.map((s) => ({
    value: s.value,
    suffix: s.suffix,
    label: locale === "zh" ? s.label_zh || s.label_vi : s.label_vi,
  }));

  return (
    <section className="bg-gradient-to-r from-red-50/90 via-rose-50/70 to-blue-50/60 border-y border-red-200/60 py-8 md:py-12">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-0 items-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="transition-transform duration-300 hover:-translate-y-1"
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isLast={i === stats.length - 1}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
