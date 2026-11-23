
"use client";

import { useEffect, useState } from "react";
import { Send, CheckCircle2, Phone, Mail, User, BookOpen } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Program } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CTABanner() {
  const { locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [programOptions, setProgramOptions] = useState<Program[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    program: "",
    notes: "",
  });

  useEffect(() => {
    fetchProgramsFromSheet().then((data) => {
      setProgramOptions(data);
      if (data.length > 0) {
        setFormData((prev) => ({
          ...prev,
          program: prev.program || data[0].title,
        }));
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-neutral-50 to-white relative" id="tu-van">
      <Container>
        {/* Lucky Star Header Card Wrapper */}
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            tag={
              locale === "zh"
                ? "官方在线咨询通道"
                : locale === "en"
                  ? "24/7 Admissions & Consultation"
                  : "Hỗ Trợ Tuyển Sinh & Tư Vấn 24/7"
            }
            title={
              locale === "zh"
                ? "预约赴华留学专家一对一评估"
                : locale === "en"
                  ? "REGISTER FOR SCHOLARSHIP CONSULTATION"
                  : "ĐĂNG KÝ TƯ VẤN HỌC BỔNG DU HỌC TRUNG QUỐC"
            }
            subtitle={
              locale === "zh"
                ? "资深中越留学评估专家将在15分钟内与您联系，针对您的GPA与学术背景深度定制CSC/CIS名校申办方案"
                : locale === "en"
                  ? "Our experienced advisors will review your profile and contact you within 15 minutes with a personalized CSC/CIS scholarship roadmap"
                  : "Đội ngũ chuyên gia giàu kinh nghiệm sẽ phân tích hồ sơ và liên hệ tư vấn lộ trình học bổng CSC, CIS cho bạn trong vòng 15 phút"
            }
          />

          {/* Lucky Star Style Card with Shadow */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.10)] relative overflow-hidden transition-all duration-300">
            {/* Top red line decorative */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#84150e]" />

            {/* Subtitle with vertical red bar (Lucky Star signature) */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-6 bg-[#84150e] rounded-full shrink-0" />
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#84150e]">
                {locale === "zh"
                  ? "填写申请信息（导师将在15分钟内响应）"
                  : locale === "en"
                    ? "Online Consultation Registration Form"
                    : "Thông Tin Đăng Ký Tư Vấn Trực Tuyến"}
              </h3>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-red-50/60 rounded-2xl border border-red-100">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  {locale === "zh"
                    ? "提交成功！"
                    : locale === "en"
                      ? "Registration Successful!"
                      : "Đăng Ký Thành Công!"}
                </h4>
                <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
                  {locale === "zh"
                    ? `感谢您，${formData.fullName} 同学。中心专业留学规划导师将尽快通过联系方式 ${formData.phone} 与您取得联系并提供材料清单。`
                    : locale === "en"
                      ? `Thank you, ${formData.fullName}. Our scholarship advisor will contact you at ${formData.phone} shortly.`
                      : `Cảm ơn bạn ${formData.fullName}. Chuyên viên tư vấn của Trung Tâm Du Học Việt - Trung sẽ liên hệ qua số điện thoại ${formData.phone} trong thời gian sớm nhất.`}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#84150e] text-white text-xs font-bold uppercase tracking-wider"
                >
                  {locale === "zh"
                    ? "提交另一份申请"
                    : locale === "en"
                      ? "Submit another request"
                      : "Gửi yêu cầu khác"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="cta-fullName"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      {locale === "zh"
                        ? "申请人姓名 *"
                        : locale === "en"
                          ? "Full Name *"
                          : "Họ và Tên *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <input
                        id="cta-fullName"
                        type="text"
                        required
                        placeholder={
                          locale === "zh"
                            ? "阮文安 / Nguyen Van A"
                            : "Nguyễn Văn A"
                        }
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="cta-phone"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      {locale === "zh"
                        ? "联系电话 / 微信 / Zalo *"
                        : locale === "en"
                          ? "Phone / Zalo *"
                          : "Số Điện Thoại / Zalo *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <input
                        id="cta-phone"
                        type="tel"
                        required
                        placeholder="0901 234 567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="cta-email"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      {locale === "zh"
                        ? "电子邮箱"
                        : locale === "en"
                          ? "Email Address"
                          : "Địa Chỉ Email"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <input
                        id="cta-email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Program of interest (Loaded dynamically from Google Sheets) */}
                  <div>
                    <label
                      htmlFor="cta-program"
                      className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                    >
                      {locale === "zh"
                        ? "意向咨询项目 *"
                        : locale === "en"
                          ? "Program of Interest *"
                          : "Chương Trình Quan Tâm *"}
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      <select
                        id="cta-program"
                        value={formData.program}
                        onChange={(e) =>
                          setFormData({ ...formData, program: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white cursor-pointer"
                      >
                        {programOptions.length === 0 && (
                          <option value="">
                            {locale === "zh"
                              ? "-- 请选择意向项目 --"
                              : locale === "en"
                                ? "-- Select a program --"
                                : "-- Chọn chương trình quan tâm --"}
                          </option>
                        )}
                        {programOptions.map((p) => {
                          const label =
                            locale === "zh"
                              ? p.titleZh || p.title
                              : locale === "en"
                                ? p.titleEn || p.title
                                : p.title;
                          return (
                            <option key={p.slug} value={p.slug}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label
                    htmlFor="cta-notes"
                    className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                  >
                    {locale === "zh"
                      ? "学术背景或意向专业咨询"
                      : locale === "en"
                        ? "Your Questions or Study Goals"
                        : "Nguyện Vọng Hoặc Câu Hỏi Cần Giải Đáp"}
                  </label>
                  <textarea
                    id="cta-notes"
                    rows={3}
                    placeholder={
                      locale === "zh"
                        ? "例如：当前GPA为3.2/4.0，已有HSK 5级210分，希望申请上海交通大学或华东师范大学国际中文教育或商科全奖..."
                        : locale === "en"
                          ? "E.g., Current GPA 8.0, HSK 4, interested in full CSC scholarships in Beijing or Shanghai..."
                          : "Ví dụ: Em đã có HSK 4, GPA 8.0, muốn tìm hiểu học bổng toàn phần CSC tại Bắc Kinh hoặc Thượng Hải..."
                    }
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-4 py-3 text-sm rounded-xl border border-neutral-300 focus:border-[#84150e] focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit button (Lucky Star style) */}
                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-full bg-[#84150e] hover:bg-[#6b0f0a] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  >
                    <span>
                      {locale === "zh"
                        ? "立即提交免费咨询申请"
                        : locale === "en"
                          ? "Submit Consultation Request"
                          : "Gửi Đăng Ký Tư Vấn Ngay"}
                    </span>
                    <Send className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-neutral-600 mt-2.5 font-medium">
                    {locale === "zh"
                      ? "我们严格保护申请者个人隐私与申请档案安全"
                      : locale === "en"
                        ? "100% privacy protection guaranteed"
                        : "Cam kết bảo mật 100% thông tin cá nhân theo quy định"}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
