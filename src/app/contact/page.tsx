"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import LazySection from "@/components/ui/LazySection";

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert(locale === "zh" ? "您的留言已成功发送，导师将尽快回复！" : "Tin nhắn của bạn đã được gửi thành công!");
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 400);
  };

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={locale === "zh" ? "联系我们与校区到访" : "Kênh Liên Hệ Tuyển Sinh"}
          title={locale === "zh" ? "中越教育合作中心联系方式" : t.contact.title}
          subtitle={
            locale === "zh"
              ? "无论是中方高校合作洽谈、CSC奖学金申报咨询还是学术访问，我们随时竭诚为您服务"
              : "Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi câu hỏi của quý phụ huynh và học viên về du học Trung Quốc."
          }
        />

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Form — 7 cols */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#84150e]" />
              <h3 className="font-heading text-2xl font-bold mb-6 text-[#84150e]">
                {t.contact.formTitle}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label={t.contact.name}
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={locale === "zh" ? "阮文安" : "Nguyễn Văn A"}
                  />
                  <Input
                    label={t.contact.email}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                  />
                </div>
                <Input
                  label={t.contact.subject}
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder={
                    locale === "zh"
                      ? "咨询CSC中国政府奖学金 / HSK冲刺课程 / 校际交流..."
                      : "Cần tư vấn học bổng CSC / Khóa luyện thi HSK..."
                  }
                />
                <Textarea
                  label={t.contact.message}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={
                    locale === "zh"
                      ? "请详细写下您的咨询事项或合作意向..."
                      : "Nội dung chi tiết cần hỗ trợ..."
                  }
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-2"
                  disabled={submitted}
                >
                  {submitted ? (locale === "zh" ? "正在发送..." : "Đang gửi...") : t.contact.send}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map — 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-6 text-[#84150e]">
                {t.contact.info}
              </h3>
              <div className="space-y-5 mb-8">
                {[
                  {
                    icon: MapPin,
                    label: t.contact.address,
                    value: locale === "zh" ? "胡志明市第三郡武氏六坊武文秦街97号" : siteConfig.address,
                  },
                  {
                    icon: Phone,
                    label: t.contact.phone,
                    value: siteConfig.phone,
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: siteConfig.email,
                  },
                  {
                    icon: Clock,
                    label: t.contact.officeHours,
                    value: t.contact.officeHoursValue,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                      <item.icon className="w-5 h-5 text-[#84150e]" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-bold mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800 leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center gap-3">
                <span className="text-xs text-neutral-500 font-medium">
                  {locale === "zh" ? "关注我们:" : "Kết nối với chúng tôi:"}
                </span>
                <div className="flex gap-2">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-[#84150e] hover:bg-[#84150e] hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-[#84150e] hover:bg-[#84150e] hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map (Lazy loaded when scrolled into view) */}
            <LazySection minHeight="280px">
              <div className="rounded-3xl overflow-hidden border border-neutral-200 aspect-[16/10] shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241673892787!2d106.6896238!3d10.7787884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3069c9b5a7%3A0x6b4fb83a1523415!2zOTcgVsO1IFbEg24gVOG6p24sIFBoxrDhu51uZyA2LCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmggNzAwMDA!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HCMCOU Map"
                />
              </div>
            </LazySection>
          </div>
        </div>
      </Container>
    </section>
  );
}
