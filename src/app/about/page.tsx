"use client";

import { motion } from "framer-motion";
import { Target, Eye, BookOpen, Award, Users, Globe2 } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutPage() {
  const { locale, t } = useLanguage();

  return (
    <section className="section-padding bg-neutral-50/60 min-h-screen">
      <Container>
        <SectionHeading
          tag={locale === "zh" ? "中心简介与办学理念" : "Về Chúng Tôi"}
          title={locale === "zh" ? "越中教育合作与赴华留学中心" : t.about.title}
          subtitle={
            locale === "zh"
              ? "致力于推动中越两国高校学术深度合作、CSC与CIS国家级全额奖学金推荐及高层次国际化人才培养"
              : "Cầu nối giáo dục, giao lưu văn hóa và xét duyệt học bổng du học Trung Quốc uy tín hàng đầu khu vực phía Nam."
          }
        />

        {/* Intro */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed">
            {locale === "zh"
              ? "越中教育合作与留学中心直属于胡志明市开放大学（HCMCOU），是越中两国高等教育多边合作的示范平台，长期致力于为越南广大学子打通直录中方重点名校、申请中国政府全额奖学金的绿色通道。"
              : "Trung Tâm Hợp Tác Giáo Dục & Du Học Việt - Trung là đơn vị trực thuộc Trường Đại học Mở TP.HCM, có sứ mệnh đẩy mạnh hợp tác giáo dục quốc tế, đào tạo Hán ngữ HSK và chắp cánh ước mơ nhận học bổng toàn phần du học Trung Quốc cho hàng nghìn học sinh, sinh viên mỗi năm."}
          </p>
        </div>

        {/* Mission / Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: locale === "zh" ? "中心使命" : t.about.mission,
              text: locale === "zh"
                ? "筑牢中越文化学术交流桥梁，协助更多越南优秀学子通过全额奖学金入读中国双一流顶尖高校，培养精通中文、具备国际视野与实战技能的青年栋梁。"
                : "Xây dựng cầu nối giáo dục và văn hóa bền vững giữa Việt Nam và Trung Quốc. Hỗ trợ tối đa sinh viên tiếp cận các gói học bổng toàn phần CSC, CIS và đào tạo nguồn nhân lực chất lượng cao.",
            },
            {
              icon: Eye,
              title: locale === "zh" ? "发展愿景" : t.about.vision,
              text: locale === "zh"
                ? "建设成为越南南部最具公信力与录取率第一的赴华留学官方直选基地，在CSC全奖申请、汉语言学术规范及中越双学位联培领域树立行业典范。"
                : "Trở thành trung tâm kiểu mẫu hàng đầu về tư vấn du học Trung Quốc, liên kết đào tạo đại học và cấp học bổng toàn phần uy tín hàng đầu Việt Nam.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 hover:border-[#84150e] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#84150e] flex items-center justify-center mb-6 border border-red-100">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4 text-[#84150e]">
                {item.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Award,
              title: locale === "zh" ? "官方直招合作授权" : "Đại diện tuyển sinh chính thức",
              desc: locale === "zh"
                ? "直签中方近百所985/211及省部共建大学，享有奖学金专项推荐名额。"
                : "Ký kết hợp tác trực tiếp với hơn 120 trường đại học trọng điểm hàng đầu Trung Quốc.",
            },
            {
              icon: Users,
              title: locale === "zh" ? "权威资深导师团队" : "Đội ngũ chuyên gia hàng đầu",
              desc: locale === "zh"
                ? "100%导师具备留华硕博背景或中方高校教学经验，1对1指导文书。"
                : "100% chuyên gia tốt nghiệp thạc sĩ, tiến sĩ tại Trung Quốc, luyện phỏng vấn 1-1.",
            },
            {
              icon: Globe2,
              title: locale === "zh" ? "签证通过率 99.8%" : "Tỷ lệ đỗ Visa 99.8%",
              desc: locale === "zh"
                ? "协助全套JW202/X1签证正规办理，行前安全培训与在华跟踪服务。"
                : "Hỗ trợ xin thư mời, mẫu JW202 và nộp visa du học với tỷ lệ đỗ gần như tuyệt đối.",
            },
          ].map((h, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-neutral-200 bg-white shadow-sm hover:border-[#84150e] transition-all group"
            >
              <h.icon className="w-8 h-8 text-[#84150e] mb-3" />
              <h4 className="font-heading font-bold text-base text-neutral-900 group-hover:text-[#84150e] transition-colors mb-2">
                {h.title}
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* History / Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-md"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
            <BookOpen className="w-7 h-7 text-[#84150e]" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-extrabold mb-4 text-[#84150e]">
            {locale === "zh" ? "发展历程与合作成果" : t.about.history}
          </h3>
          <div className="text-neutral-700 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>
              {locale === "zh"
                ? "在胡志明市开放大学国际化战略引领下，越中教育合作与留学中心稳步发展，已成功输送数千名越南学子赴北京大学、清华大学、复旦大学、上海交通大学、华东师范大学、武汉大学等中方顶尖学府深造。"
                : "Được thành lập trong khuôn khổ chiến lược quốc tế hóa giáo dục của Trường Đại học Mở TP.HCM, Trung Tâm Du Học Việt - Trung đã từng bước phát triển và trở thành điểm tựa vững chắc cho hàng nghìn sinh viên chinh phục học bổng toàn phần du học Trung Quốc mỗi năm."}
            </p>
            <p>
              {locale === "zh"
                ? "中心持续深化与中方教育主管部门及各省市高校合作，定期举办中国高等教育展、越中文化艺术节、HSK考务冲刺班及学术研讨会，为两国青年互学互鉴搭建广阔舞台。"
                : "Trung tâm liên tục mở rộng các chỉ tiêu học bổng toàn phần CSC, CIS, tổ chức ngày hội thông tin du học, diễn đàn giao lưu văn hóa và các chuyến trao đổi học thuật thực tế, tạo điều kiện thuận lợi nhất để sinh viên Việt Nam tiếp cận nền giáo dục tiên tiến của Trung Quốc."}
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
