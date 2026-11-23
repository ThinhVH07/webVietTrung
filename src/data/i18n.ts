export type Locale = "vi" | "zh" | "en";

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    programs: string;
    news: string;
    faculty: string;
    admissions: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  sections: {
    features: string;
    latestNews: string;
    stats: string;
    partners: string;
    cta: string;
    ctaSub: string;
    ctaButton: string;
  };
  about: {
    title: string;
    mission: string;
    vision: string;
    history: string;
  };
  programs: {
    title: string;
    all: string;
    korean: string; // Used for CSC / General China scholarship
    japanese: string; // Used for CIS / Chinese Language
    exchange: string; // Used for Exchange
    duration: string;
    viewDetails: string;
  };
  news: {
    title: string;
    readMore: string;
    viewAll: string;
  };
  faculty: {
    title: string;
  };
  admissions: {
    title: string;
    timeline: string;
    form: string;
    fullName: string;
    email: string;
    phone: string;
    program: string;
    message: string;
    submit: string;
  };
  contact: {
    title: string;
    formTitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    info: string;
    address: string;
    phone: string;
    officeHours: string;
    officeHoursValue: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    programs: string;
    contactInfo: string;
    copyright: string;
  };
  stats: {
    students: string;
    programs: string;
    partners: string;
    years: string;
  };
}

export const translations: Record<Locale, TranslationSchema> = {
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      programs: "Chương trình & Học bổng",
      news: "Tin tức",
      faculty: "Đội ngũ",
      admissions: "Tuyển sinh",
      contact: "Liên hệ",
    },
    hero: {
      title: "Trung Tâm Du Học & Hợp Tác Việt - Trung",
      subtitle: "Cầu nối giáo dục, giao lưu văn hóa và học bổng du học Trung Quốc hàng đầu",
      cta1: "Tra cứu học bổng",
      cta2: "Liên hệ tư vấn",
    },
    sections: {
      features: "Học bổng & Chương trình nổi bật",
      latestNews: "Tin tức & Thông báo mới nhất",
      stats: "Con số ấn tượng",
      partners: "Trường Đại học Đối tác",
      cta: "Sẵn sàng chinh phục ước mơ du học Trung Quốc?",
      ctaSub: "Đăng ký ngay để nhận tư vấn học bổng CSC, CIS và lộ trình du học miễn phí từ chuyên gia",
      ctaButton: "Đăng ký tư vấn ngay",
    },
    about: {
      title: "Giới thiệu Trung tâm",
      mission: "Sứ mệnh",
      vision: "Tầm nhìn",
      history: "Lịch sử hình thành",
    },
    programs: {
      title: "Chương trình & Học bổng du học Trung Quốc",
      all: "Tất cả",
      korean: "Học bổng CSC / Chính phủ",
      japanese: "Học bổng CIS / Hán ngữ",
      exchange: "Trao đổi sinh viên Việt - Trung",
      duration: "Thời lượng",
      viewDetails: "Xem chi tiết",
    },
    news: {
      title: "Tin tức & Tuyển sinh du học",
      readMore: "Xem chi tiết",
      viewAll: "Xem tất cả tin tức",
    },
    faculty: {
      title: "Đội ngũ chuyên gia & Giảng viên Hán ngữ",
    },
    admissions: {
      title: "Quy trình tuyển sinh & Hồ sơ học bổng",
      timeline: "Lộ trình 5 bước ứng tuyển",
      form: "Đăng ký tư vấn du học trực tuyến",
      fullName: "Họ và tên",
      email: "Email",
      phone: "Số điện thoại / Zalo",
      program: "Chương trình học bổng quan tâm",
      message: "Nguyện vọng hoặc câu hỏi",
      submit: "Gửi đăng ký tư vấn",
    },
    contact: {
      title: "Liên hệ hợp tác & Tuyển sinh",
      formTitle: "Gửi yêu cầu tư vấn cho chúng tôi",
      name: "Họ và tên",
      email: "Email",
      subject: "Chủ đề",
      message: "Nội dung",
      send: "Gửi tin nhắn",
      info: "Thông tin liên hệ",
      address: "Địa chỉ",
      phone: "Điện thoại",
      officeHours: "Giờ làm việc",
      officeHoursValue: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    },
    footer: {
      description: "Trung tâm Hợp tác Giáo dục & Du học Việt - Trung trực thuộc Trường Đại học Mở TP.HCM. Chuyên tư vấn học bổng CSC, CIS, SGS, đào tạo HSK và kết nối du học Trung Quốc uy tín.",
      quickLinks: "Liên kết nhanh",
      programs: "Học bổng nổi bật",
      contactInfo: "Thông tin liên hệ",
      copyright: "© 2026 Trung Tâm Du Học Việt - Trung - Trường Đại học Mở TP.HCM",
    },
    stats: {
      students: "Học viên",
      programs: "Chương trình",
      partners: "Đại học đối tác",
      years: "Năm kinh nghiệm",
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "中心概况",
      programs: "留学项目与奖学金",
      news: "留学资讯",
      faculty: "师资队伍",
      admissions: "招生指南",
      contact: "联系我们",
    },
    hero: {
      title: "越中教育合作与赴华留学中心",
      subtitle: "搭建越中教育文化交流桥梁，提供全方位中国政府奖学金（CSC）与赴华留学服务",
      cta1: "查询中国奖学金",
      cta2: "在线咨询申请",
    },
    sections: {
      features: "热门留学项目与奖学金",
      latestNews: "最新招生与活动动态",
      stats: "核心发展成果",
      partners: "中国知名合作高校",
      cta: "准备开启赴华留学之旅？",
      ctaSub: "立即填写表单，享受专业导师为您量身定制的中国奖学金申请方案与行前指导",
      ctaButton: "立即申请免费咨询",
    },
    about: {
      title: "关于中心",
      mission: "中心使命",
      vision: "发展愿景",
      history: "发展历程",
    },
    programs: {
      title: "赴华留学与汉语言项目",
      all: "全部项目",
      korean: "中国政府奖学金 (CSC)",
      japanese: "国际中文教师奖学金 (CIS)",
      exchange: "越中高校校际交换生",
      duration: "学制时长",
      viewDetails: "查看项目详情",
    },
    news: {
      title: "留学资讯与动态",
      readMore: "阅读全文",
      viewAll: "查看全部资讯",
    },
    faculty: {
      title: "专家团队与汉语言教师",
    },
    admissions: {
      title: "招生录取与奖学金流程",
      timeline: "申请五步流程",
      form: "在线报名咨询表",
      fullName: "姓名",
      email: "电子邮箱",
      phone: "联系电话 / 微信 / Zalo",
      program: "意向项目",
      message: "咨询留言或学术背景",
      submit: "提交申请",
    },
    contact: {
      title: "联系我们",
      formTitle: "在线留言咨询",
      name: "姓名",
      email: "电子邮箱",
      subject: "咨询主题",
      message: "留言内容",
      send: "发送留言",
      info: "联系方式",
      address: "中心地址",
      phone: "咨询热线",
      officeHours: "办公时间",
      officeHoursValue: "周一至周五: 8:00 - 17:00",
    },
    footer: {
      description: "胡志明市开放大学直属越中教育合作与留学中心，致力于推动中越两国高等教育合作、CSC及CIS奖学金申请、HSK考培与学生交流。",
      quickLinks: "快捷导航",
      programs: "重点奖学金",
      contactInfo: "联系信息",
      copyright: "© 2026 越中教育合作与留学中心 - 胡志明市开放大学 版权所有",
    },
    stats: {
      students: "累计服务学子",
      programs: "精品项目",
      partners: "中方合作大学",
      years: "办学经验",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Programs & Scholarships",
      news: "News",
      faculty: "Faculty",
      admissions: "Admissions",
      contact: "Contact",
    },
    hero: {
      title: "Vietnam - China Education & Study Abroad Center",
      subtitle: "Bridging Vietnam and China: Premier Scholarships and Higher Education Exchange",
      cta1: "Search Scholarships",
      cta2: "Contact Us",
    },
    sections: {
      features: "Featured Scholarships & Programs",
      latestNews: "Latest News & Announcements",
      stats: "Our Impact",
      partners: "Partner Universities in China",
      cta: "Ready to Study in China?",
      ctaSub: "Register now for free consultation on CSC, CIS scholarships and application roadmap",
      ctaButton: "Get Free Consultation",
    },
    about: {
      title: "About Us",
      mission: "Our Mission",
      vision: "Our Vision",
      history: "Our History",
    },
    programs: {
      title: "Study Abroad Programs in China",
      all: "All",
      korean: "Chinese Government Scholarship (CSC)",
      japanese: "International Chinese Language Teacher (CIS)",
      exchange: "Vietnam - China Student Exchange",
      duration: "Duration",
      viewDetails: "View Details",
    },
    news: {
      title: "News & Events",
      readMore: "Read More",
      viewAll: "View All",
    },
    faculty: {
      title: "Faculty & Experts",
    },
    admissions: {
      title: "Admissions Information",
      timeline: "5-Step Roadmap",
      form: "Online Registration Form",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      program: "Program of Interest",
      message: "Message",
      submit: "Submit Application",
    },
    contact: {
      title: "Contact Us",
      formTitle: "Send Us a Message",
      name: "Full Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      info: "Contact Information",
      address: "Address",
      phone: "Phone",
      officeHours: "Office Hours",
      officeHoursValue: "Monday - Friday: 8:00 AM - 5:00 PM",
    },
    footer: {
      description: "Vietnam - China Education Cooperation and Study in China Center under HCMCOU. Specializing in CSC, CIS, provincial scholarships and HSK training.",
      quickLinks: "Quick Links",
      programs: "Scholarships",
      contactInfo: "Contact",
      copyright: "© 2026 Vietnam - China Education Center - HCMC Open University",
    },
    stats: {
      students: "Students",
      programs: "Programs",
      partners: "Partner Universities",
      years: "Years Active",
    },
  },
};

export type TranslationKeys = TranslationSchema;
