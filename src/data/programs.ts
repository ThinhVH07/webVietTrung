export interface Program {
  slug: string;
  title: string;
  titleZh?: string;
  titleEn: string;
  category: "korean" | "japanese" | "exchange" | "csc" | "cis";
  description: string;
  descriptionZh?: string;
  descriptionEn: string;
  duration: string;
  image: string;
  features: string[];
  badgeVi?: string;
  badgeZh?: string;
  locationVi?: string;
  locationZh?: string;
}

// Dữ liệu ban đầu sẵn sàng hiển thị ngay tức thì (0ms), sau đó sẽ tự động đồng bộ ngầm với Google Sheets
export const programs: Program[] = [
  {
    slug: "hoc-bong-chinh-phu-trung-quoc-csc",
    title: "Học bổng Chính phủ Trung Quốc (CSC)",
    titleEn: "Chinese Government Scholarship (CSC)",
    titleZh: "中国政府奖学金 (CSC)",
    category: "korean",
    description: "Học bổng toàn phần danh giá nhất do Bộ Giáo dục Trung Quốc cấp: Miễn 100% học phí, miễn ký túc xá, bảo hiểm y tế và cấp sinh hoạt phí hàng tháng từ 2.500 đến 3.500 NDT/tháng.",
    descriptionEn: "The most prestigious full scholarship granted by CSC: 100% tuition waiver, free accommodation, medical insurance, and monthly stipend up to 3,500 RMB.",
    descriptionZh: "中国教育部国家留学基金委全额奖学金：免除全额学费、免校内住宿费、享受综合医疗保险，并按月发放生活补助（本科2500元/月，硕士3000元/月，博士3500元/月）。",
    duration: "1 - 4 năm",
    image: "/images/programs/campus-beijing.jpg",
    features: [
      "Miễn 100% học phí & KTX",
      "Trợ cấp 2.500 - 3.500 NDT/tháng",
      "Hệ Đại học/Thạc sĩ/Tiến sĩ",
      "Bảo hiểm y tế toàn diện",
    ],
    badgeVi: "Học bổng Toàn phần CSC",
    badgeZh: "CSC全额奖学金",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
  },
  {
    slug: "hoc-bong-giao-vien-han-ngu-cis",
    title: "Học bổng Giáo viên Hán ngữ Quốc tế (CIS)",
    titleEn: "International Chinese Language Teachers Scholarship (CIS)",
    titleZh: "国际中文教师奖学金 (CIS / 孔子学院奖学金)",
    category: "japanese",
    description: "Học bổng danh giá dành cho hệ 1 năm tiếng, cử nhân và thạc sĩ chuyên ngành Giáo dục Hán ngữ Quốc tế. Tài trợ toàn bộ học phí, ký túc xá và sinh hoạt phí 2.500 - 3.000 NDT/tháng.",
    descriptionEn: "Scholarship for 1-year language immersion, Bachelor and Master of International Chinese Education: free tuition, dormitory, and monthly stipend.",
    descriptionZh: "教育部中外语言交流合作中心设立，面向有志于中文教学的优秀学子，资助一学年研修、中文国际教育本科与硕士，免学费住宿并提供丰厚生活补助。",
    duration: "1 - 3 năm",
    image: "/images/programs/campus-shanghai.jpg",
    features: [
      "Hệ 1 năm tiếng / Đại học / Thạc sĩ",
      "Trợ cấp 2.500 - 3.000 NDT/tháng",
      "Cam kết đầu ra chuẩn HSK",
      "Cơ hội giảng dạy quốc tế",
    ],
    badgeVi: "Học bổng CIS Khổng Tử",
    badgeZh: "CIS国际中文教师奖",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
  },
  {
    slug: "dao-tao-han-ngu-luyen-thi-hsk",
    title: "Đào tạo Hán ngữ & Luyện thi HSK 1 - 6 Cấp Tốc",
    titleEn: "Chinese Language & Intensive HSK 1-6 Preparation",
    titleZh: "汉语言综合培训与HSK 1-6级考前冲刺",
    category: "japanese",
    description: "Khóa đào tạo tiếng Trung chuẩn phổ thông từ cơ bản đến nâng cao. Đội ngũ giảng viên bản ngữ hướng dẫn chiến thuật đạt điểm cao HSK 4, HSK 5, HSK 6 và HSKK.",
    descriptionEn: "Comprehensive standard Chinese training from beginner to advanced. Master HSK 4-6 and HSKK with native instructors.",
    descriptionZh: "由母语资深教师与专业导师联合授课，系统提升听说读写技能，传授高分应试策略，助您快速攻克HSK 4-6级及HSKK口语难关。",
    duration: "3 - 6 tháng",
    image: "/images/programs/campus-hsk.jpg",
    features: [
      "Giảng viên bản ngữ giàu kinh nghiệm",
      "Cam kết chuẩn đầu ra HSK 4-6",
      "Luyện thi HSKK chuyên sâu",
      "Hỗ trợ apply học bổng",
    ],
    badgeVi: "Đào tạo chuẩn HSK 1-6",
    badgeZh: "HSK金牌冲刺体系",
    locationVi: "Đại học Mở TP.HCM & Online",
    locationZh: "胡志明市开放大学及线上",
  },
  {
    slug: "hoc-bong-vanh-dai-va-con-duong",
    title: "Học bổng Một Vành Đai và Con Đường",
    titleEn: "Belt and Road Initiative Scholarship",
    titleZh: "“一带一路”国际学生专项奖学金",
    category: "korean",
    description: "Chương trình học bổng ưu tiên dành riêng cho sinh viên Việt Nam tại các trường đại học trọng điểm Trung Quốc trong khuôn khổ hợp tác kinh tế - giáo dục Vành đai và Con đường.",
    descriptionEn: "Dedicated scholarship program for students from Belt and Road countries, fully funding top Chinese university programs.",
    descriptionZh: "面向“一带一路”倡议沿线重点生源国设立的专项高校奖学金，支持工程、商贸、经济、科技与人文领域的跨学科拔尖人才培养。",
    duration: "2 - 4 năm",
    image: "/images/programs/campus-belt-road.jpg",
    features: [
      "Ưu tiên sinh viên Việt Nam",
      "Miễn 100% học phí",
      "Top 100 đại học Trung Quốc",
      "Hỗ trợ visa du học nhanh",
    ],
    badgeVi: "Học bổng Toàn phần CSC",
    badgeZh: "一带一路专项奖",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
  },
  {
    slug: "hoc-bong-thanh-pho-thuong-hai-sgs",
    title: "Học bổng Chính phủ Thành phố Thượng Hải (SGS)",
    titleEn: "Shanghai Government Scholarship (SGS)",
    titleZh: "上海市政府外国留学生奖学金 (SGS - A/B类)",
    category: "korean",
    description: "Học bổng danh giá Loại A (Toàn phần) và Loại B (Miễn học phí) học tập tại các trường đại học hàng đầu Thượng Hải: ĐH Thể thao Thượng Hải, ĐH Giao thông, ĐH Sư phạm Hoa Đông.",
    descriptionEn: "Type A (Full) and Type B (Tuition) scholarships to study in Shanghai's premier universities: ECNU, SJTU, SUS, etc.",
    descriptionZh: "上海市教委专项奖学金，涵盖A类全奖（学费+住宿+生活费）与B类免学费奖，助力学子入读上海交通大学、华东师范大学、上海体育大学等名校。",
    duration: "1 - 4 năm",
    image: "/images/programs/campus-sgs.jpg",
    features: [
      "Học tập tại Thượng Hải phồn hoa",
      "Miễn 100% học phí",
      "Cơ hội việc làm đa quốc gia",
      "Trợ cấp sinh hoạt phí hàng tháng",
    ],
    badgeVi: "Học bổng SGS Thượng Hải",
    badgeZh: "SGS上海市全额奖",
    locationVi: "Thượng Hải, Trung Quốc",
    locationZh: "中国 · 上海",
  },
  {
    slug: "chuong-trinh-trao-doi-viet-trung",
    title: "Chương trình Trao đổi Sinh viên Việt - Trung",
    titleEn: "Vietnam - China Student Exchange Program",
    titleZh: "越中高校校际交换生与学分互认项目",
    category: "exchange",
    description: "Chương trình trao đổi sinh viên học kỳ quốc tế với các trường đại học danh tiếng tại Bắc Kinh, Thượng Hải, Trùng Khánh, Quảng Châu. Công nhận chuyển đổi tín chỉ song phương.",
    descriptionEn: "International semester student exchange at partner universities in Beijing, Shanghai, Chongqing, and Guangzhou with credit recognition.",
    descriptionZh: "胡志明市开放大学与北京、上海、重庆、广州等多所知名大学联合开展的校际交换生项目，学分双向互认，沉浸式体验当代中国发展。",
    duration: "1 - 2 học kỳ",
    image: "/images/programs/campus-exchange.jpg",
    features: [
      "Công nhận tín chỉ tương đương",
      "Thời gian 1 - 2 học kỳ",
      "Trải nghiệm văn hóa thực tế",
      "Chi phí sinh hoạt tối ưu",
    ],
    badgeVi: "Công nhận tín chỉ",
    badgeZh: "双向学分互认",
    locationVi: "Bắc Kinh / Thượng Hải / Quảng Châu",
    locationZh: "北京 / 上海 / 广州",
  },
];

export function getProgramsByCategory(category?: string): Program[] {
  if (!category || category === "all") return programs;
  return programs.filter((p) => p.category === category);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find((p) => p.slug === slug);
}
