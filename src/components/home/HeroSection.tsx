"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles, CheckCircle2, Award, Globe, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function HeroSection() {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const quickTags = locale === "zh" ? [
    { label: "CSC全额奖学金", href: "/programs?filter=korean" },
    { label: "CIS中文教师奖", href: "/programs?filter=japanese" },
    { label: "上海市政府奖(SGS)", href: "/programs?filter=korean" },
    { label: "一带一路专项", href: "/programs?filter=korean" },
    { label: "校际交换生", href: "/programs?filter=exchange" },
    { label: "HSK保分班", href: "/programs?filter=japanese" },
  ] : [
    { label: "Học bổng CSC 100%", href: "/programs?filter=korean" },
    { label: "Học bổng CIS Khổng Tử", href: "/programs?filter=japanese" },
    { label: "Thượng Hải SGS", href: "/programs?filter=korean" },
    { label: "Vành Đai & Con Đường", href: "/programs?filter=korean" },
    { label: "Trao đổi sinh viên", href: "/programs?filter=exchange" },
    { label: "Luyện thi HSK 1-6", href: "/programs?filter=japanese" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
    window.location.href = `/programs?category=${selectedType}${query}`;
  };

  return (
    <section className="relative overflow-hidden bg-neutral-900 text-white py-16 md:py-24">
      {/* Background Scenic Image & Subtle Fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/great-wall.jpg"
          alt="Vạn Lý Trường Thành - Du học Trung Quốc"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Lớp gradient đỏ nhạt dần từ bên trái sang phải: bên trái ôm màu đỏ thương hiệu để chữ nổi bật, sang phải nhạt dần để lộ rõ toàn cảnh Vạn Lý Trường Thành */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#420906]/85 via-[#680f0a]/45 to-black/20" />
        {/* Lớp tối nhẹ phía dưới chân section để hòa màu mượt mà */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline & Search */}
          <div className="lg:col-span-7">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5c0f0a]/80 backdrop-blur-md border border-white/20 text-amber-300 text-xs sm:text-sm font-bold mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>
                {locale === "zh"
                  ? "越中教育交流与中国政府奖学金（CSC）官方咨询中心"
                  : "KÊNH THÔNG TIN DU HỌC TRUNG QUỐC & HỌC BỔNG CSC HÀNG ĐẦU"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black leading-[1.2] mb-5 tracking-tight text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
              {locale === "zh" ? (
                <>
                  越中教育合作与赴华留学{" "}
                  <span className="text-amber-300">全额奖学金中心</span>
                </>
              ) : (
                <>
                  Cầu Nối Du Học & Tra Cứu Học Bổng{" "}
                  <span className="text-amber-300">Việt - Trung Toàn Diện</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed max-w-2xl font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {locale === "zh"
                ? "24小时全景式检索中国知名高校全额奖学金（免学费、免住宿、每月发放生活补贴），提供专业升学与行前一站式规划。"
                : "Tra cứu tất cả học bổng Chính phủ Trung Quốc (CSC), học bổng Giáo viên Hán ngữ (CIS), học bổng Một Vành Đai và trao đổi học thuật 24/7."}
            </p>

            {/* Quick Search Bar (Lucky Star Style) */}
            <form
              onSubmit={handleSearch}
              className="bg-white p-2 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 mb-8 border-2 border-red-200/40 text-neutral-800"
            >
              <div className="flex items-center gap-2 px-3 w-full sm:w-auto sm:border-r border-neutral-200 py-1">
                <Globe className="w-4 h-4 text-[#84150e] shrink-0" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-transparent text-xs sm:text-sm font-bold text-neutral-800 focus:outline-none cursor-pointer w-full"
                  aria-label="Chọn hệ học bổng"
                >
                  <option value="all">
                    {locale === "zh" ? "全部奖学金类型" : "Tất cả học bổng"}
                  </option>
                  <option value="korean">
                    {locale === "zh" ? "🇨🇳 CSC 中国政府奖学金" : "🇨🇳 Học bổng Chính phủ (CSC)"}
                  </option>
                  <option value="japanese">
                    {locale === "zh" ? "🇨🇳 CIS 国际中文教师奖" : "🇨🇳 Học bổng Giáo viên Hán ngữ (CIS)"}
                  </option>
                  <option value="exchange">
                    {locale === "zh" ? "🔄 越中高校校际交换生" : "🔄 Trao đổi sinh viên Việt - Trung"}
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-3 flex-1 w-full py-1">
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder={
                    locale === "zh"
                      ? "搜索中方大学、专业名称或奖学金等级..."
                      : "Nhập tên trường Trung Quốc, ngành học, loại học bổng..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs sm:text-sm text-neutral-800 focus:outline-none placeholder:text-neutral-400"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#84150e] hover:bg-[#6b0f0a] text-white font-heading font-extrabold text-sm uppercase tracking-wider transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{locale === "zh" ? "查询奖学金" : "Tra Cứu"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Lucky Star Style Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold text-red-200 uppercase tracking-wide mr-1">
                {locale === "zh" ? "热搜标签:" : "Tìm kiếm phổ biến:"}
              </span>
              {quickTags.map((tag, idx) => (
                <Link
                  key={idx}
                  href={tag.href}
                  className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-[#84150e] text-xs font-semibold border border-white/25 hover:border-white transition-colors duration-200"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Vietnam - China Highlights */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="rounded-3xl bg-white text-neutral-900 shadow-2xl p-6 sm:p-8 border border-neutral-100 relative overflow-hidden">
                {/* Decorative header ribbon */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-[#84150e] to-red-600" />

                <div className="flex items-center justify-between mb-6 pt-1">
                  <div>
                    <span className="text-xs font-extrabold text-[#84150e] uppercase tracking-wider">
                      {locale === "zh" ? "中越公办高校合作示范基地" : "Trung Tâm Du Học Việt - Trung"}
                    </span>
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-neutral-900">
                      {locale === "zh" ? "2026年赴华留学直通车" : "Tuyển Sinh Du Học 2026"}
                    </h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-[#84150e] font-extrabold text-lg shadow-inner">
                    OU
                  </div>
                </div>

                {/* Key Points */}
                <div className="space-y-3.5 mb-6">
                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">
                        {locale === "zh"
                          ? "CSC & CIS 全额奖学金保障"
                          : "Học bổng toàn phần CSC & CIS 100%"}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {locale === "zh"
                          ? "全免学费、免费住宿，每月发放2500-3500元生活津贴"
                          : "Miễn học phí, KTX và trợ cấp 2.500 - 3.500 NDT/tháng"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">
                        {locale === "zh"
                          ? "中国签证（JW202/X1）通过率 99.8%"
                          : "Tỷ lệ đỗ Visa du học Trung Quốc 99.8%"}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {locale === "zh"
                          ? "1对1材料合规审查与高校面试真题深度模拟"
                          : "Luyện phỏng vấn 1-1, tối ưu hóa bài luận Study Plan"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
                    <Globe className="w-5 h-5 text-[#84150e] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-neutral-900">
                        {locale === "zh"
                          ? "HSK 4-6 考前冲刺与签约保过"
                          : "Khóa đào tạo Hán ngữ & Luyện thi HSK 1 - 6"}
                      </p>
                      <p className="text-xs text-neutral-600">
                        {locale === "zh"
                          ? "母语资深教授亲授，紧扣新HSK大纲，快速通关"
                          : "Giảng viên bản ngữ giàu kinh nghiệm, cam kết chuẩn đầu ra"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action CTA inside card */}
                <div className="pt-2">
                  <Link
                    href="#tu-van"
                    className="block w-full py-3.5 px-6 rounded-full bg-[#84150e] hover:bg-[#6b0f0a] text-white text-center font-heading font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                  >
                    {locale === "zh" ? "立即预约专家评估" : "Đăng Ký Tư Vấn Miễn Phí"}
                  </Link>
                  <p className="text-center text-[11px] text-neutral-600 mt-2 font-medium">
                    {locale === "zh"
                      ? "一对一保密咨询 • 15分钟内专业导师响应"
                      : "Cam kết bảo mật thông tin • Phản hồi trong 15 phút"}
                  </p>
                </div>
              </div>

              {/* Floating Badge (Lucky Star stats badge) */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-2xl shadow-2xl p-4 border border-neutral-100 flex items-center gap-3.5 text-neutral-900 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-[#84150e] text-white flex items-center justify-center font-black text-xl shadow-md">
                  ★
                </div>
                <div>
                  <p className="text-2xl font-black text-[#84150e] leading-none">
                    2,468+
                  </p>
                  <p className="text-xs font-semibold text-neutral-600 mt-1">
                    {locale === "zh" ? "赴华学子申请成功" : "Học viên apply thành công"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
