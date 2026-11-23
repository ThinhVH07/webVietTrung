"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import type { Program } from "@/data/programs";
import { fetchProgramsFromSheet } from "@/lib/googleSheets";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AdmissionsPage() {
  const { locale, t } = useLanguage();
  const [programOptions, setProgramOptions] = useState<Program[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchProgramsFromSheet().then((data) => {
      setProgramOptions(data);
    });
  }, []);

  const timelineSteps = locale === "zh" ? [
    {
      step: 1,
      title: "选校定专与学术评估",
      desc: "根据个人GPA、科研或学术特长，由中方留学顾问1对1精准匹配985/211目标高校及CSC全奖专业。",
    },
    {
      step: 2,
      title: "在线提交初审档案",
      desc: "提交成绩单、毕业证书公证件及有效语言成绩（HSK/雅思/托福）由中心专家委员会进行学术合规预审。",
    },
    {
      step: 3,
      title: "文书润色与导师推荐",
      desc: "专业导师深度修改个人陈述（SOP/Study Plan），联络中方知名教授出具正式推荐信。",
    },
    {
      step: 4,
      title: "高校面试与录取出函",
      desc: "参加中方高校全真模拟面试辅导，顺利获取《录取通知书》及官方签证表格《JW202/201》。",
    },
  ] : [
    {
      step: 1,
      title: "Tư vấn & Thẩm định học bạ",
      desc: "Đánh giá điểm trung bình GPA, năng lực tiếng Trung và nguyện vọng để định hướng trường đại học Trung Quốc và gói học bổng CSC, CIS phù hợp nhất.",
    },
    {
      step: 2,
      title: "Nộp hồ sơ trực tuyến",
      desc: "Cung cấp bảng điểm, bằng tốt nghiệp dịch thuật công chứng và chứng chỉ HSK để chuyên gia rà soát tính hợp lệ theo quy định CSC.",
    },
    {
      step: 3,
      title: "Hoàn thiện bài luận & Thư giới thiệu",
      desc: "Được cố vấn 1-1 viết bài Kế hoạch học tập (Study Plan / SOP), xin thư giới thiệu từ Phó Giáo sư / Giáo sư trường đối tác.",
    },
    {
      step: 4,
      title: "Luyện phỏng vấn & Nhận JW202",
      desc: "Luyện phỏng vấn 1-1 với giáo viên bản xứ, nhận Thư mời nhập học chính thức và mẫu JW202 để nộp visa du học Trung Quốc X1/X2.",
    },
  ];

  const faqs = locale === "zh" ? [
    {
      q: "申请中国政府奖学金（CSC）需要什么语言门槛？",
      a: "中文授课专业本科/硕士通常要求HSK 4级210分以上或HSK 5级180分以上；英文授课需提供雅思6.0/托福80分以上。若未达标，可先申请1年制汉语补习奖学金。",
    },
    {
      q: "中国全额奖学金包含哪些具体待遇？",
      a: "中国政府全额奖学金（CSC）包含免全额学费、免校内留学生公寓住宿费、提供综合医疗保险，并按月发放生活补助（本科2500元、硕士3000元、博士3500元）。",
    },
    {
      q: "胡志明市开放大学（HCMCOU）学子有何专项扶持政策？",
      a: "胡志明市开放大学在读生享有中方合作高校优先免试推荐权、学分双向互认机制及中心语言考培15%-20%专项助学补贴。",
    },
  ] : [
    {
      q: "Chưa biết tiếng Trung hoặc chưa có chứng chỉ HSK có xin được học bổng không?",
      a: "Hoàn toàn được. Bạn có thể đăng ký hệ 1 năm học tiếng (Học bổng CIS hoặc 1 năm tiếng bổ túc CSC) trước khi vào chuyên ngành, hoặc tham gia khóa luyện thi HSK cấp tốc tại Trung tâm.",
    },
    {
      q: "Học bổng toàn phần du học Trung Quốc (CSC / CIS) bao gồm những gì?",
      a: "Bao gồm 100% học phí suốt khóa học, miễn phí phòng ký túc xá sinh viên quốc tế, bảo hiểm y tế toàn diện và trợ cấp sinh hoạt phí hàng tháng từ 2.500 đến 3.500 NDT (khoảng 8.5 - 12 triệu VNĐ/tháng).",
    },
    {
      q: "Sinh viên Trường Đại học Mở TP.HCM có ưu đãi gì khi du học qua Trung tâm?",
      a: "Sinh viên HCMCOU được ưu tiên xét chọn vào các chương trình trao đổi sinh viên công nhận tín chỉ, được giảm 15-20% học phí các khóa luyện thi HSK và hỗ trợ xin thư giới thiệu từ Ban Giám hiệu.",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={locale === "zh" ? "中方高校官方直录流程" : "Tuyển Sinh & Lộ Trình Học Bổng"}
          title={locale === "zh" ? "赴华留学招生指南与奖学金申请" : t.admissions.title}
          subtitle={
            locale === "zh"
              ? "标准化透明申办流程，中方高校招生委员会官方授权推荐，助您高效斩获中国名校录取通知"
              : "Quy trình ứng tuyển học bổng du học Trung Quốc tinh gọn, minh bạch cùng sự đồng hành 1-1 từ đội ngũ chuyên gia giàu kinh nghiệm."
          }
        />

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <h3 className="font-heading text-2xl font-bold text-center mb-10 text-[#84150e]">
            {locale === "zh" ? "中方奖学金申办四步标准化路线" : t.admissions.timeline}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-neutral-200 hover:border-[#84150e] rounded-3xl p-6 text-center relative shadow-sm hover:shadow-lg transition-all group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#84150e] text-white flex items-center justify-center mx-auto mb-4 font-heading font-black text-lg shadow-md shadow-red-900/20">
                  {s.step}
                </div>
                <h4 className="font-heading font-bold text-base text-neutral-900 group-hover:text-[#84150e] transition-colors mb-2">
                  {s.title}
                </h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto mb-20">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.08)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#84150e]" />
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-[#84150e] mb-2">
                {locale === "zh" ? "赴华留学与奖学金在线申请表" : t.admissions.form}
              </h3>
              <p className="text-neutral-600 text-xs sm:text-sm">
                {locale === "zh"
                  ? "请如实填写您的基本信息，中方资深规划导师将为您免费评估GPA并出具选校建议"
                  : "Điền thông tin bên dưới để được chuyên viên hỗ trợ thẩm định học bạ và tư vấn học bổng miễn phí."}
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-red-50/60 rounded-2xl border border-red-100">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-heading text-xl font-bold text-neutral-900 mb-2">
                  {locale === "zh" ? "报名成功！" : "Đăng Ký Thành Công!"}
                </h4>
                <p className="text-neutral-600 text-sm mb-4">
                  {locale === "zh"
                    ? "中心老师将尽快与您联系，请保持电话或微信/Zalo畅通。"
                    : "Chuyên viên tư vấn học bổng Trung Quốc sẽ liên hệ bạn sớm nhất."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-full bg-[#84150e] text-white text-xs font-bold"
                >
                  {locale === "zh" ? "返回重新填写" : "Quay lại"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t.admissions.fullName}
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  placeholder={locale === "zh" ? "例如：阮文安" : "Nguyễn Văn A"}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t.admissions.email}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="email@example.com"
                  />
                  <Input
                    label={t.admissions.phone}
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="0901234567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="program"
                    className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5"
                  >
                    {t.admissions.program} <span className="text-[#84150e]">*</span>
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={form.program}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-[#84150e] text-sm bg-white text-neutral-900 cursor-pointer"
                  >
                    <option value="">
                      {locale === "zh" ? "-- 请选择意向留学项目 --" : "-- Chọn chương trình học bổng quan tâm --"}
                    </option>
                    {programOptions.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {locale === "zh"
                          ? p.titleZh || p.title
                          : locale === "en"
                          ? p.titleEn || p.title
                          : p.title}
                      </option>
                    ))}
                  </select>
                </div>

                <Textarea
                  label={t.admissions.message}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    locale === "zh"
                      ? "简述您的学历背景、目前HSK成绩、意向专业或目标院校..."
                      : "GPA hiện tại, trình độ HSK hoặc trường đại học Trung Quốc mong muốn..."
                  }
                  rows={3}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4"
                  disabled={submitted}
                >
                  {t.admissions.submit}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FAQs in Lucky Star style */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-center mb-8 text-[#84150e]">
            {locale === "zh" ? "赴华留学与奖学金常见问题 (FAQ)" : "Câu Hỏi Thường Gặp (FAQ)"}
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-[#84150e] transition-colors"
              >
                <h4 className="font-heading font-bold text-base text-neutral-900 mb-2 flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-[#84150e] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-neutral-600 text-sm pl-7.5 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
