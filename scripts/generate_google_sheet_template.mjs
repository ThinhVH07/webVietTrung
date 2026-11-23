import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

// 1. Tab STATS (Số liệu thống kê dưới Hero)
const statsData = [
  {
    key: "stat_students",
    value: 2468,
    suffix: "+",
    label_vi: "Người dùng / Học viên",
    label_zh: "累计咨询学子",
    note: "Vị trí: Cột 1 - Thanh thống kê dưới Banner Hero",
  },
  {
    key: "stat_success",
    value: 345,
    suffix: "+",
    label_vi: "Apply thành công",
    label_zh: "奖学金申请成功",
    note: "Vị trí: Cột 2 - Thanh thống kê dưới Banner Hero",
  },
  {
    key: "stat_partners",
    value: 120,
    suffix: "+",
    label_vi: "Trường đại học đối tác",
    label_zh: "中方合作高校",
    note: "Vị trí: Cột 3 - Thanh thống kê dưới Banner Hero",
  },
  {
    key: "stat_scholarships",
    value: 138,
    suffix: "+",
    label_vi: "Suất học bổng đã trao",
    label_zh: "全额奖学金名额",
    note: "Vị trí: Cột 4 - Thanh thống kê dưới Banner Hero",
  },
];

// 2. Tab TIMELINE (Quy trình 4 bước xếp chồng)
const timelineData = [
  {
    step: "01",
    tag_vi: "GIAI ĐOẠN 01",
    tag_zh: "第一阶段 · 评估",
    location_vi: "Bắc Kinh · Cố Cung Hoàng Gia",
    location_zh: "北京 · 故宫紫禁城",
    title_vi: "Tiếp Nhận Tư Vấn & Định Hướng Chọn Trường",
    title_zh: "前期评估与目标选校",
    desc_vi: "Chuyên gia đánh giá học lực, điểm GPA, nguyện vọng ngành học và điều kiện tài chính để xây dựng lộ trình chọn trường đại học Trung Quốc tối ưu nhất (hệ thống trường Top 985, 211).",
    desc_zh: "根据学子学业均分（GPA）、专业背景与个人志向，科学匹配985/211及省部共建重点高校，定制最优奖学金申请策略与全套升学方案。",
    highlights_vi: "Đánh giá năng lực GPA & tài chính 1-1, Định hướng đúng trường Top 985 & 211, Xây dựng chiến lược tối ưu đỗ học bổng",
    highlights_zh: "1对1学术背景诊断与GPA测评, 匹配985/211顶尖重点大学, 量身定制专属全额奖学金方案",
    image: "/images/landscapes/china-beijing.jpg",
    note: "Vị trí: Thẻ 01 - Section Quy trình thẻ xếp chồng (Trang chủ)",
  },
  {
    step: "02",
    tag_vi: "GIAI ĐOẠN 02",
    tag_zh: "第二阶段 · 语言",
    location_vi: "Quế Lâm · Non Nước Hữu Tình",
    location_zh: "桂林 · 山水甲天下",
    title_vi: "Đào Tạo Hán Ngữ & Luyện Thi HSK, HSKK Cấp Tốc",
    title_zh: "汉语言强化与HSK冲刺",
    desc_vi: "Tham gia các khóa đào tạo tiếng Trung cùng giảng viên bản ngữ giàu kinh nghiệm, cam kết chuẩn đầu ra chứng chỉ HSK 4 - HSK 6 và HSKK phục vụ xét duyệt học bổng toàn phần.",
    desc_zh: "母语专家名师授课，强化听说读写，冲刺攻克HSK 4-6级及HSKK高级口语，确保顺利达到各大高校录取硬性语言标准。",
    highlights_vi: "Giảng viên bản ngữ giảng dạy trực tiếp, Lộ trình tinh gọn cấp tốc từ 3 - 6 tháng, Cam kết chuẩn đầu ra HSK 4 - 6 & HSKK",
    highlights_zh: "资深中方母语名师面对面指导, 3-6个月高效集训提分冲刺, 保过达标高校硬性语言门槛",
    image: "/images/landscapes/china-guilin.jpg",
    note: "Vị trí: Thẻ 02 - Section Quy trình thẻ xếp chồng (Trang chủ)",
  },
  {
    step: "03",
    tag_vi: "GIAI ĐOẠN 03",
    tag_zh: "第三阶段 · 申报",
    location_vi: "Thượng Hải · Phồn Hoa Hiện Đại",
    location_zh: "上海 · 外滩与现代都市",
    title_vi: "Hoàn Thiện Hồ Sơ & Nộp Học Bổng CSC / CIS",
    title_zh: "文书润色与奖学金申办",
    desc_vi: "Dịch thuật công chứng chuyên nghiệp, chuẩn hóa Kế hoạch học tập (Study Plan / SOP), kết nối xin thư giới thiệu giáo sư danh tiếng và hoàn thiện hồ sơ trên cổng học bổng quốc gia.",
    desc_zh: "专业团队指导撰写极具竞争力的个人陈述（SOP/Study Plan）、联系教授出具官方推荐信，并在CSC/CIS国家官网完成规范提交。",
    highlights_vi: "Viết Kế hoạch học tập (Study Plan / SOP) chuẩn, Hỗ trợ xin thư giới thiệu từ Giáo sư, Apply trực tiếp cổng CSC / CIS & trường",
    highlights_zh: "教授级团队深度精修SOP研习计划, 名校博导/教授权威推荐信背书, 中国国家级奖学金官网直报跟踪",
    image: "/images/landscapes/china-shanghai.jpg",
    note: "Vị trí: Thẻ 03 - Section Quy trình thẻ xếp chồng (Trang chủ)",
  },
  {
    step: "04",
    tag_vi: "GIAI ĐOẠN 04",
    tag_zh: "第四阶段 · 启航",
    location_vi: "Trương Gia Giới · Kỳ Quan Thiên Nhiên",
    location_zh: "张家界 · 奇山胜境",
    title_vi: "Luyện Phỏng Vấn 1-1, Nhận Visa & Xuất Cảnh",
    title_zh: "名校面试通关与行前迎新",
    desc_vi: "Luyện phỏng vấn 1-1 trực tiếp với đại diện trường Trung Quốc, hỗ trợ nhận thư mời, biểu mẫu JW202/201 và làm thủ tục Visa du học. Hướng dẫn xuất cảnh & đồng hành 24/7.",
    desc_zh: "中方考官1对1进行全真模拟面试与答辩指导；协助办理录取通知书、JW202/201表及赴华签证；提供抵华接机与全天候学业生活支持。",
    highlights_vi: "Mô phỏng phỏng vấn 1-1 với giảng viên, Hỗ trợ Visa & JW202 với tỷ lệ đỗ 99.8%, Đón sân bay, nhận KTX & đồng hành 24/7",
    highlights_zh: "中方考官全真模拟面试与答辩辅导, 全程协助JW202表与签证申请 (99.8%), 抵华接机入住与在华学业全天候关怀",
    image: "/images/landscapes/china-zhangjiajie.jpg",
    note: "Vị trí: Thẻ 04 - Section Quy trình thẻ xếp chồng (Trang chủ)",
  },
];

// 3. Tab PARTNERS (Danh sách Đại học đối tác)
const partnersData = [
  {
    id: "peking-univ",
    name_vi: "Đại học Bắc Kinh (Peking University)",
    name_zh: "北京大学 (Peking University)",
    location: "Bắc Kinh / 北京",
    rank: "C9 League • Top 1 Trung Quốc",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "tsinghua-univ",
    name_vi: "Đại học Thanh Hoa (Tsinghua University)",
    name_zh: "清华大学 (Tsinghua University)",
    location: "Bắc Kinh / 北京",
    rank: "C9 League • Hàng đầu Châu Á",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "sjtu",
    name_vi: "Đại học Giao thông Thượng Hải (SJTU)",
    name_zh: "上海交通大学 (Shanghai Jiao Tong)",
    location: "Thượng Hải / 上海",
    rank: "C9 League • Top 3 Trung Quốc",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "ecnu",
    name_vi: "Đại học Sư phạm Hoa Đông (ECNU)",
    name_zh: "华东师范大学 (East China Normal)",
    location: "Thượng Hải / 上海",
    rank: "Dự án 985 • Top 1 Giáo dục Hán ngữ",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "sus",
    name_vi: "Đại học Thể thao Thượng Hải (SUS)",
    name_zh: "上海体育大学 (Shanghai Univ of Sport)",
    location: "Thượng Hải / 上海",
    rank: "Song Nhất Lưu • Đối tác chiến lược",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "whu",
    name_vi: "Đại học Vũ Hán (Wuhan University)",
    name_zh: "武汉大学 (Wuhan University)",
    location: "Vũ Hán / 武汉",
    rank: "Dự án 985 • ĐH Đẹp nhất Trung Quốc",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "bfsu",
    name_vi: "Đại học Ngoại ngữ Bắc Kinh (BFSU)",
    name_zh: "北京外国语大学 (Beijing Foreign Studies)",
    location: "Bắc Kinh / 北京",
    rank: "Dự án 211 • Cái nôi Ngoại giao",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
  {
    id: "cqu",
    name_vi: "Đại học Trùng Khánh (Chongqing University)",
    name_zh: "重庆大学 (Chongqing University)",
    location: "Trùng Khánh / 重庆",
    rank: "Dự án 985 • Trọng điểm Tây Nam",
    note: "Vị trí: Logo & thẻ trường đối tác ở cuối trang chủ",
  },
];

// 4. Tab SITE_CONFIG (Cấu hình chung, thông tin liên hệ toàn website)
const siteConfigData = [
  {
    key: "phone",
    name: "Hotline tư vấn tuyển sinh",
    value_vi: "(028) 3930 0089",
    value_zh: "(028) 3930 0089",
    note: "Hiển thị trên: Top Bar (đầu trang), Footer, Nút liên hệ nổi bên phải màn hình",
  },
  {
    key: "email",
    name: "Email tiếp nhận hồ sơ",
    value_vi: "viettrung@ou.edu.vn",
    value_zh: "viettrung@ou.edu.vn",
    note: "Hiển thị trên: Top Bar, Footer, Trang Liên hệ",
  },
  {
    key: "address",
    name: "Địa chỉ trung tâm",
    value_vi: "97 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM",
    value_zh: "胡志明市第三郡武氏六坊武文秦街97号",
    note: "Hiển thị trên: Top Bar, Footer, Trang Giới thiệu & Liên hệ",
  },
  {
    key: "opening_hours",
    name: "Giờ làm việc",
    value_vi: "Thứ 2 – Thứ 6: 08:00 – 17:30 | Thứ 7: 08:00 – 12:00",
    value_zh: "周一至周五: 08:00 – 17:30 | 周六: 08:00 – 12:00",
    note: "Hiển thị trên: Trang Liên hệ và Footer",
  },
  {
    key: "facebook_url",
    name: "Đường dẫn Facebook Fanpage",
    value_vi: "https://facebook.com/duhocviettrung",
    value_zh: "https://facebook.com/duhocviettrung",
    note: "Nút biểu tượng Facebook ở Footer và nút mạng xã hội nổi",
  },
  {
    key: "zalo_url",
    name: "Đường dẫn Zalo tư vấn",
    value_vi: "https://zalo.me/duhocviettrung",
    value_zh: "https://zalo.me/duhocviettrung",
    note: "Nút biểu tượng Zalo ở Footer và nút nhắn tin nhanh",
  },
  {
    key: "youtube_url",
    name: "Kênh YouTube du học",
    value_vi: "https://youtube.com/@duhocviettrung",
    value_zh: "https://youtube.com/@duhocviettrung",
    note: "Nút biểu tượng YouTube ở Footer",
  },
];

// 5. Tab PROGRAMS (Chương trình & Học bổng)
const programsData = [
  {
    slug: "hoc-bong-chinh-phu-trung-quoc-csc",
    title: "Học bổng Chính phủ Trung Quốc (CSC)",
    titleZh: "中国政府奖学金 (CSC)",
    category: "korean",
    description: "Học bổng toàn phần danh giá nhất do Bộ Giáo dục Trung Quốc cấp: Miễn 100% học phí, miễn ký túc xá, bảo hiểm y tế và cấp sinh hoạt phí hàng tháng từ 2.500 đến 3.500 NDT/tháng.",
    descriptionZh: "中国教育部国家留学基金委全额奖学金：免除全额学费、免校内住宿费、享受综合医疗保险，并按月发放生活补助（本科2500元/月，硕士3000元/月，博士3500元/月）。",
    duration: "1 - 4 năm",
    image: "/images/programs/campus-beijing.jpg",
    features: "Miễn 100% học phí & KTX, Trợ cấp 2.500 - 3.500 NDT/tháng, Hệ Đại học/Thạc sĩ/Tiến sĩ, Bảo hiểm y tế toàn diện",
    badgeVi: "Học bổng Toàn phần CSC",
    badgeZh: "CSC全额奖学金",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
  {
    slug: "hoc-bong-giao-vien-han-ngu-cis",
    title: "Học bổng Giáo viên Hán ngữ Quốc tế (CIS)",
    titleZh: "国际中文教师奖学金 (CIS / 孔子学院奖学金)",
    category: "japanese",
    description: "Học bổng danh giá dành cho hệ 1 năm tiếng, cử nhân và thạc sĩ chuyên ngành Giáo dục Hán ngữ Quốc tế. Tài trợ toàn bộ học phí, ký túc xá và sinh hoạt phí 2.500 - 3.000 NDT/tháng.",
    descriptionZh: "教育部中外语言交流合作中心设立，面向有志于中文教学的优秀学子，资助一学年研修、中文国际教育本科与硕士，免学费住宿并提供丰厚生活补助。",
    duration: "1 - 3 năm",
    image: "/images/programs/campus-shanghai.jpg",
    features: "Hệ 1 năm tiếng / Đại học / Thạc sĩ, Trợ cấp 2.500 - 3.000 NDT/tháng, Cam kết đầu ra chuẩn HSK, Cơ hội giảng dạy quốc tế",
    badgeVi: "Học bổng CIS Khổng Tử",
    badgeZh: "CIS国际中文教师奖",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
  {
    slug: "dao-tao-han-ngu-luyen-thi-hsk",
    title: "Đào tạo Hán ngữ & Luyện thi HSK 1 - 6 Cấp Tốc",
    titleZh: "汉语言综合培训与HSK 1-6级考前冲刺",
    category: "japanese",
    description: "Khóa đào tạo tiếng Trung chuẩn phổ thông từ cơ bản đến nâng cao. Đội ngũ giảng viên bản ngữ hướng dẫn chiến thuật đạt điểm cao HSK 4, HSK 5, HSK 6 và HSKK.",
    descriptionZh: "由母语资深教师与专业导师联合授课，系统提升听说读写技能，传授高分应试策略，助您快速攻克HSK 4-6级及HSKK口语难关。",
    duration: "3 - 6 tháng",
    image: "/images/programs/campus-hsk.jpg",
    features: "Giảng viên bản ngữ giàu kinh nghiệm, Cam kết chuẩn đầu ra HSK 4-6, Luyện thi HSKK chuyên sâu, Hỗ trợ apply học bổng",
    badgeVi: "Đào tạo chuẩn HSK 1-6",
    badgeZh: "HSK金牌冲刺体系",
    locationVi: "Đại học Mở TP.HCM & Online",
    locationZh: "胡志明市开放大学及线上",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
  {
    slug: "hoc-bong-vanh-dai-va-con-duong",
    title: "Học bổng Một Vành Đai và Con Đường",
    titleZh: "“一带一路”国际学生专项奖学金",
    category: "korean",
    description: "Chương trình học bổng ưu tiên dành riêng cho sinh viên Việt Nam tại các trường đại học trọng điểm Trung Quốc trong khuôn khổ hợp tác kinh tế - giáo dục Vành đai và Con đường.",
    descriptionZh: "面向“一带一路”倡议沿线重点生源国设立的专项高校奖学金，支持工程、商贸、经济、科技与人文领域的跨学科拔尖人才培养。",
    duration: "2 - 4 năm",
    image: "/images/programs/campus-belt-road.jpg",
    features: "Ưu tiên sinh viên Việt Nam, Miễn 100% học phí, Top 100 đại học Trung Quốc, Hỗ trợ visa du học nhanh",
    badgeVi: "Học bổng Toàn phần CSC",
    badgeZh: "一带一路专项奖",
    locationVi: "Đại học đối tác Trung Quốc",
    locationZh: "中国重点合作高校",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
  {
    slug: "hoc-bong-thanh-pho-thuong-hai-sgs",
    title: "Học bổng Chính phủ Thành phố Thượng Hải (SGS)",
    titleZh: "上海市政府外国留学生奖学金 (SGS - A/B类)",
    category: "korean",
    description: "Học bổng danh giá Loại A (Toàn phần) và Loại B (Miễn học phí) học tập tại các trường đại học hàng đầu Thượng Hải: ĐH Thể thao Thượng Hải, ĐH Giao thông, ĐH Sư phạm Hoa Đông.",
    descriptionZh: "上海市教委专项奖学金，涵盖A类全奖（学费+住宿+生活费）与B类免学费奖，助力学子入读上海交通大学、华东师范大学、上海体育大学等名校。",
    duration: "1 - 4 năm",
    image: "/images/programs/campus-sgs.jpg",
    features: "Học tập tại Thượng Hải phồn hoa, Miễn 100% học phí, Cơ hội việc làm đa quốc gia, Trợ cấp sinh hoạt phí hàng tháng",
    badgeVi: "Học bổng SGS Thượng Hải",
    badgeZh: "SGS上海市全额奖",
    locationVi: "Thượng Hải, Trung Quốc",
    locationZh: "中国 · 上海",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
  {
    slug: "chuong-trinh-trao-doi-viet-trung",
    title: "Chương trình Trao đổi Sinh viên Việt - Trung",
    titleZh: "越中高校校际交换生与学分互认项目",
    category: "exchange",
    description: "Chương trình trao đổi sinh viên học kỳ quốc tế với các trường đại học danh tiếng tại Bắc Kinh, Thượng Hải, Trùng Khánh, Quảng Châu. Công nhận chuyển đổi tín chỉ song phương.",
    descriptionZh: "胡志明市开放大学与北京、上海、重庆、广州等多所知名大学联合开展的校际交换生项目，学分双向互认，沉浸式体验当代中国发展。",
    duration: "1 - 2 học kỳ",
    image: "/images/programs/campus-exchange.jpg",
    features: "Công nhận tín chỉ tương đương, Thời gian 1 - 2 học kỳ, Trải nghiệm văn hóa thực tế, Chi phí sinh hoạt tối ưu",
    badgeVi: "Công nhận tín chỉ",
    badgeZh: "双向学分互认",
    locationVi: "Bắc Kinh / Thượng Hải / Quảng Châu",
    locationZh: "北京 / 上海 / 广州",
    note: "Vị trí: Lưới học bổng trang chủ và trang /programs",
  },
];

// 6. Tab NEWS (Tin tức & Sự kiện)
const newsData = [
  {
    slug: "thong-bao-hoc-bong-csc-2026-2027",
    title: "Thông báo tuyển sinh Học bổng Chính phủ Trung Quốc (CSC) niên khóa 2026 - 2027",
    titleZh: "2026-2027学年中国政府奖学金（CSC）申请招募正式启动",
    category: "scholarship",
    date: "10/10/2026",
    excerpt: "Trung tâm mở cổng tiếp nhận hồ sơ ứng tuyển học bổng toàn phần CSC: miễn 100% học phí, miễn ký túc xá và cấp sinh hoạt phí tới 3.500 NDT/tháng cho các hệ Cử nhân, Thạc sĩ, Tiến sĩ.",
    excerptZh: "中心全面开启2026-2027学年CSC全额奖学金申请通道：免除学费及住宿费，并享受最高每月3500元生活补贴，名额有限，择优推荐。",
    content: "Trung tâm Du học & Hợp tác Việt - Trung chính thức tiếp nhận hồ sơ xét tuyển Học bổng Chính phủ Trung Quốc (CSC) năm học 2026 - 2027. Học sinh, sinh viên quan tâm vui lòng liên hệ sớm để được hỗ trợ thẩm định học bạ và viết bài luận.",
    contentZh: "越中教育合作与留学中心正式开启2026-2027学年中国政府奖学金（CSC）材料初审与推荐通道。欢迎有意赴华攻读本、硕、博学位的学子预约导师进行1对1评估与文书指导。",
    featured: "TRUE",
    image: "/images/placeholder/news-1.jpg",
    note: "Vị trí: Bài viết nổi bật - Section Tin tức trang chủ & trang /news",
  },
  {
    slug: "tuyen-sinh-hoc-bong-giao-vien-han-ngu-cis",
    title: "Tuyển sinh Học bổng Giáo viên Hán ngữ Quốc tế (CIS) 1 năm tiếng & Thạc sĩ",
    titleZh: "2026年国际中文教师奖学金（CIS）一学年研修与硕士申请指南",
    category: "scholarship",
    date: "28/09/2026",
    excerpt: "Cơ hội nhận học bổng toàn phần dành cho sinh viên chuyên ngành tiếng Trung, Hán ngữ thương mại hoặc có chứng chỉ HSK 3 - HSK 5.",
    excerptZh: "面向中文专业或持有效HSK成绩的优秀青年，资助一学年语言研修生及国际中文教育硕士，免学费住宿并提供生活补贴。",
    content: "Chương trình học bổng CIS do Bộ Giáo dục Trung Quốc cấp nhằm đào tạo đội ngũ giảng viên tiếng Trung chất lượng cao trên toàn cầu.",
    contentZh: "国际中文教师奖学金（CIS）致力于培养各国本土优秀中文师资，资助全额学费、住宿费及每月2500-3000元生活津贴。",
    featured: "FALSE",
    image: "/images/placeholder/news-2.jpg",
    note: "Vị trí: Section Tin tức trang chủ & trang /news",
  },
  {
    slug: "le-hoi-giao-luu-van-hoa-viet-trung",
    title: "Lễ hội Giao lưu Văn hóa & Trải nghiệm Trà Đạo, Thư Pháp Việt - Trung 2026",
    titleZh: "2026年“越中同心”青年文化艺术节：茶道、书法与学术体验日",
    category: "event",
    date: "15/09/2026",
    excerpt: "Sự kiện giao lưu văn hóa thường niên quy tụ đại diện các trường đại học đối tác Trung Quốc, giảng viên bản xứ và sinh viên HCMCOU.",
    excerptZh: "年度中越青年文化交流盛会，汇聚中方合作高校代表、母语外教及广大学子，现场展示传统茶艺、书法创作与留学咨询。",
    content: "Lễ hội mang đến không gian trải nghiệm văn hóa độc đáo với các gian hàng nghệ thuật Hán ngữ, ẩm thực truyền thống và góc tư vấn du học 1-1.",
    contentZh: "本次文化节设有传统茶道品鉴、软笔书法体验、汉服展示及中方高校1对1留学招生咨询展位。",
    featured: "FALSE",
    image: "/images/placeholder/news-3.jpg",
    note: "Vị trí: Section Tin tức trang chủ & trang /news",
  },
  {
    slug: "lich-thi-hsk-hskk-2026",
    title: "Lịch thi HSK, HSKK Quốc tế và Khóa ôn thi cấp tốc quý IV/2026",
    titleZh: "2026年第四季度HSK与HSKK国际中文水平考试日程安排及冲刺班",
    category: "announcement",
    date: "01/09/2026",
    excerpt: "Thông tin chi tiết về các đợt thi HSK 3 - HSK 6 trên máy tính và khai giảng khóa luyện đề thực chiến chuẩn cấu trúc mới.",
    excerptZh: "发布第四季度机考HSK 3-6级及HSKK考期，同步开设考前全真模拟试题强化冲刺班，助考生快速达到录取分数线。",
    content: "Khóa luyện thi HSK tại Trung tâm được giảng dạy bởi các chuyên gia giàu kinh nghiệm, cam kết chuẩn đầu ra phục vụ nộp hồ sơ du học.",
    contentZh: "中心HSK冲刺班由资深考培名师授课，针对阅读、听力及书写难点专项突破，助力考生高分通关。",
    featured: "FALSE",
    image: "/images/placeholder/news-4.jpg",
    note: "Vị trí: Section Tin tức trang chủ & trang /news",
  },
];

// 7. Tab FACULTY (Đội ngũ Giảng viên & Chuyên gia)
const facultyData = [
  {
    name: "PGS.TS. Nguyễn Văn A",
    nameZh: "阮文安 副教授/博士",
    title: "Giám đốc Trung tâm",
    titleZh: "中心主任",
    specialization: "Hợp tác Giáo dục Quốc tế",
    specializationZh: "国际教育合作与治理",
    bio: "Hơn 20 năm kinh nghiệm trong quản lý giáo dục quốc tế và hợp tác đào tạo song phương Việt - Trung.",
    bioZh: "深耕国际高等教育管理逾20年，长期致力于推动中越双边教育交流与高校合作办学。",
    image: "/images/placeholder/faculty-1.jpg",
    note: "Vị trí: Trang /faculty (Đội ngũ giảng viên)",
  },
  {
    name: "GS. Vương Chí Vĩ (Wang Zhiwei)",
    nameZh: "王志伟 教授",
    title: "Cố vấn Học bổng CSC & Du học Trung Quốc",
    titleZh: "中国政府奖学金（CSC）首席评估专家",
    specialization: "Cố vấn Học bổng Toàn phần",
    specializationZh: "奖学金申请与专业规划",
    bio: "Nguyên giảng viên Đại học Bắc Kinh, chuyên gia cố vấn hồ sơ xét duyệt học bổng CSC và CIS.",
    bioZh: "原北京大学教授，长期担任CSC与CIS奖学金评审顾问，精通中国重点高校申请规则与学术推荐。",
    image: "/images/placeholder/faculty-2.jpg",
    note: "Vị trí: Trang /faculty (Đội ngũ giảng viên)",
  },
  {
    name: "TS. Trương Lệ Na (Zhang Lina)",
    nameZh: "张丽娜 博士",
    title: "Trưởng bộ phận Đào tạo Hán ngữ & HSK",
    titleZh: "汉语言培训与HSK教学研发主管",
    specialization: "Luyện thi HSK 5-6 & HSKK",
    specializationZh: "国际中文教学法与HSK实战",
    bio: "Tiến sĩ Ngôn ngữ học ứng dụng ĐH Sư phạm Hoa Đông, nguyên giám khảo kỳ thi HSK quốc tế.",
    bioZh: "华东师范大学应用语言学博士，原HSK国际考官，独创HSK高分应试与听说速成训练法。",
    image: "/images/placeholder/faculty-3.jpg",
    note: "Vị trí: Trang /faculty (Đội ngũ giảng viên)",
  },
];

// Khởi tạo Workbook
const workbook = XLSX.utils.book_new();

// Thêm các sheets vào workbook
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(siteConfigData), "site_config");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(statsData), "stats");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(timelineData), "timeline");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(partnersData), "partners");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(programsData), "programs");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(newsData), "news");
XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(facultyData), "faculty");

// Đường dẫn lưu file
const outputPath = path.resolve("D:/demoweb-ou-vhn/web-du-hoc-viet-trung.xlsx");
XLSX.writeFile(workbook, outputPath);

// Xuất các file CSV rời cho từng tab
const csvDir = path.resolve("D:/demoweb-ou-vhn/google-sheets-csv");
if (!fs.existsSync(csvDir)) {
  fs.mkdirSync(csvDir, { recursive: true });
}

const sheets = [
  { name: "site_config", data: siteConfigData },
  { name: "stats", data: statsData },
  { name: "timeline", data: timelineData },
  { name: "partners", data: partnersData },
  { name: "programs", data: programsData },
  { name: "news", data: newsData },
  { name: "faculty", data: facultyData },
];

sheets.forEach(({ name, data }) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  fs.writeFileSync(path.join(csvDir, `${name}.csv`), csv, "utf8");
});

console.log(`✓ Đã tạo thành công file Excel mẫu tại: ${outputPath}`);
console.log(`✓ Đã tạo các file CSV rời tại: ${csvDir}`);
