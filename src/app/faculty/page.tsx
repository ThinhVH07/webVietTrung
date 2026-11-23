"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { facultyMembers } from "@/data/faculty";
import type { FacultyMember } from "@/data/faculty";
import { fetchFacultyFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FacultyPage() {
  const { locale, t } = useLanguage();
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(facultyMembers);

  useEffect(() => {
    fetchFacultyFromSheet().then((data) => {
      if (data && data.length > 0) {
        setFacultyList(data);
      }
    });
  }, []);

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={locale === "zh" ? "权威师资与专家顾问" : "Đội Ngũ Chuyên Gia & Giảng Viên"}
          title={locale === "zh" ? "越中教育名师与中国奖学金导师团队" : t.faculty.title}
          subtitle={
            locale === "zh"
              ? "汇聚中越两国教授、留华博士、资深语言考官及文书评审专家，提供最权威的升学与学术指导"
              : "Đội ngũ giáo sư, tiến sĩ, thạc sĩ và chuyên gia ngôn ngữ Hán ngữ bản xứ giàu kinh nghiệm giảng dạy và xét duyệt học bổng du học Trung Quốc."
          }
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyList.map((member, i) => {
            const name = locale === "zh" ? (member.nameZh || member.name) : member.name;
            const title = locale === "zh" ? (member.titleZh || member.title) : member.title;
            const spec = locale === "zh" ? (member.specializationZh || member.specialization) : member.specialization;
            const bio = locale === "zh" ? (member.bioZh || member.bio) : member.bio;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-neutral-200 hover:border-[#84150e] rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 group"
              >
                <div>
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#84150e] to-[#b31b1b] flex items-center justify-center mb-6 shadow-lg shadow-red-900/20 text-white font-heading font-black text-2xl group-hover:scale-105 transition-transform">
                    {name.charAt(0)}
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-neutral-900 group-hover:text-[#84150e] transition-colors mb-1">
                    {name}
                  </h3>

                  <p className="text-[#84150e] text-sm font-bold mb-4">
                    {title}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-xs text-[#84150e] font-bold mb-4">
                    <GraduationCap className="w-3.5 h-3.5 text-[#84150e]" />
                    <span>{spec}</span>
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-500 font-semibold">
                  <Award className="w-4 h-4 text-[#84150e]" />
                  <span>{locale === "zh" ? "胡志明市开放大学直属师资" : "Giảng viên & Cố vấn HCMCOU"}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
