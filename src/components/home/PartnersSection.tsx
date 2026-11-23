"use client";

import { useEffect, useState } from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { fetchPartnersFromSheet, type PartnerData } from "@/lib/googleSheets";

const defaultPartners: PartnerData[] = [
  {
    id: "peking-univ",
    name_vi: "Đại học Bắc Kinh (Peking University)",
    name_zh: "北京大学 (Peking University)",
    location: "Bắc Kinh / 北京",
    rank: "C9 League • Top 1 Trung Quốc",
  },
  {
    id: "tsinghua-univ",
    name_vi: "Đại học Thanh Hoa (Tsinghua University)",
    name_zh: "清华大学 (Tsinghua University)",
    location: "Bắc Kinh / 北京",
    rank: "C9 League • Hàng đầu Châu Á",
  },
  {
    id: "sjtu",
    name_vi: "Đại học Giao thông Thượng Hải (SJTU)",
    name_zh: "上海交通大学 (Shanghai Jiao Tong)",
    location: "Thượng Hải / 上海",
    rank: "C9 League • Top 3 Trung Quốc",
  },
  {
    id: "ecnu",
    name_vi: "Đại học Sư phạm Hoa Đông (ECNU)",
    name_zh: "华东师范大学 (East China Normal)",
    location: "Thượng Hải / 上海",
    rank: "Dự án 985 • Top 1 Giáo dục Hán ngữ",
  },
  {
    id: "sus",
    name_vi: "Đại học Thể thao Thượng Hải (SUS)",
    name_zh: "上海体育大学 (Shanghai Univ of Sport)",
    location: "Thượng Hải / 上海",
    rank: "Song Nhất Lưu • Đối tác chiến lược",
  },
  {
    id: "whu",
    name_vi: "Đại học Vũ Hán (Wuhan University)",
    name_zh: "武汉大学 (Wuhan University)",
    location: "Vũ Hán / 武汉",
    rank: "Dự án 985 • ĐH Đẹp nhất Trung Quốc",
  },
  {
    id: "bfsu",
    name_vi: "Đại học Ngoại ngữ Bắc Kinh (BFSU)",
    name_zh: "北京外国语大学 (Beijing Foreign Studies)",
    location: "Bắc Kinh / 北京",
    rank: "Dự án 211 • Cái nôi Ngoại giao",
  },
  {
    id: "cqu",
    name_vi: "Đại học Trùng Khánh (Chongqing University)",
    name_zh: "重庆大学 (Chongqing University)",
    location: "Trùng Khánh / 重庆",
    rank: "Dự án 985 • Trọng điểm Tây Nam",
  },
];

export default function PartnersSection() {
  const { locale } = useLanguage();
  const [partnerList, setPartnerList] = useState<PartnerData[]>(defaultPartners);

  useEffect(() => {
    fetchPartnersFromSheet().then((data) => {
      if (data && data.length > 0) {
        setPartnerList(data);
      }
    });
  }, []);

  return (
    <section className="section-padding bg-white border-t border-neutral-100">
      <Container>
        <SectionHeading
          tag={locale === "zh" ? "中越高校国际合作网络" : "Mạng Lưới Giáo Dục Quốc Tế"}
          title={locale === "zh" ? "中国知名直签合作重点大学" : "ĐỐI TÁC TRƯỜNG ĐẠI HỌC DANH TIẾNG TRUNG QUỐC"}
          subtitle={
            locale === "zh"
              ? "与中国近百所“双一流”及省部共建公立大学保持长期官方合作与直录推荐，保障全额奖学金名额"
              : "Hợp tác chiến lược cùng hơn 120 trường đại học trọng điểm và Song Nhất Lưu tại Trung Quốc mang đến cơ hội học bổng CSC, CIS và chuyển tiếp tín chỉ tốt nhất"
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {partnerList.map((partner) => (
            <div
              key={partner.id}
              className="p-5 rounded-2xl border border-neutral-200/90 hover:border-[#84150e] bg-neutral-50/50 hover:bg-white flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="mb-3">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-[#84150e] font-bold text-[11px] mb-2 border border-red-100">
                  🇨🇳 {partner.location}
                </span>
                <p className="font-heading font-extrabold text-sm sm:text-base text-neutral-800 group-hover:text-[#84150e] transition-colors leading-snug">
                  {locale === "zh" ? partner.name_zh || partner.name_vi : partner.name_vi}
                </p>
              </div>
              <div className="pt-2 border-t border-neutral-200/50 text-[11px] text-neutral-500 font-semibold">
                {partner.rank}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
