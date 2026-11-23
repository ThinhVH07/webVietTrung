export interface FacultyMember {
  name: string;
  nameZh?: string;
  nameEn: string;
  title: string;
  titleZh?: string;
  titleEn: string;
  bio: string;
  bioZh?: string;
  bioEn: string;
  image: string;
  specialization: string;
  specializationZh?: string;
}

export const facultyMembers: FacultyMember[] = [
  {
    name: "PGS.TS. Nguyễn Văn A",
    nameZh: "阮文安 副教授/博士",
    nameEn: "Assoc. Prof. Dr. Nguyen Van A",
    title: "Giám đốc Trung tâm",
    titleZh: "中心主任",
    titleEn: "Center Director",
    bio: "Hơn 20 năm kinh nghiệm trong quản lý giáo dục quốc tế và hợp tác đào tạo song phương Việt - Trung.",
    bioZh: "深耕国际高等教育管理逾20年，长期致力于推动中越双边教育交流与高校合作办学。",
    bioEn: "Over 20 years of experience in international education management and Vietnam - China cooperation.",
    image: "/images/placeholder/faculty-1.jpg",
    specialization: "Hợp tác Giáo dục Quốc tế",
    specializationZh: "国际教育合作与治理",
  },
  {
    name: "GS. Vương Chí Vĩ (Wang Zhiwei)",
    nameZh: "王志伟 教授",
    nameEn: "Prof. Wang Zhiwei",
    title: "Cố vấn Học bổng CSC & Du học Trung Quốc",
    titleZh: "中国政府奖学金（CSC）首席评估专家",
    titleEn: "Chief CSC Scholarship Advisor",
    bio: "Nguyên giảng viên Đại học Bắc Kinh, chuyên gia cố vấn hồ sơ xét duyệt học bổng CSC và CIS.",
    bioZh: "原北京大学教授，长期担任CSC与CIS奖学金评审顾问，精通中国重点高校申请规则与学术推荐。",
    bioEn: "Former Peking University professor, senior advisor on CSC and CIS scholarship review and application.",
    image: "/images/placeholder/faculty-2.jpg",
    specialization: "Cố vấn Học bổng Toàn phần",
    specializationZh: "奖学金申请与专业规划",
  },
  {
    name: "TS. Trương Lệ Na (Zhang Lina)",
    nameZh: "张丽娜 博士",
    nameEn: "Dr. Zhang Lina",
    title: "Trưởng bộ phận Đào tạo Hán ngữ & HSK",
    titleZh: "汉语言培训与HSK教学研发主管",
    titleEn: "Head of Chinese Language & HSK Training",
    bio: "Tiến sĩ Giáo dục Hán ngữ Quốc tế từ Đại học Sư phạm Hoa Đông (Thượng Hải), chuyên gia luyện thi HSK 5, HSK 6.",
    bioZh: "毕业于华东师范大学国际中文教育专业博士，具有12年HSK 5-6级及HSKK高分强化教学经验。",
    bioEn: "PhD in International Chinese Education from ECNU (Shanghai), expert in HSK 5-6 and HSKK preparation.",
    image: "/images/placeholder/faculty-3.jpg",
    specialization: "Hán ngữ & Luyện thi HSK 6",
    specializationZh: "国际中文教育与HSK考培",
  },
  {
    name: "ThS. Trần Thị Mai",
    nameZh: "陈氏梅 硕士",
    nameEn: "MA. Tran Thi Mai",
    title: "Giảng viên Hán ngữ Thương mại",
    titleZh: "商务汉语高级讲师",
    titleEn: "Business Chinese Instructor",
    bio: "Thạc sĩ tốt nghiệp Đại học Ngoại ngữ Bắc Kinh (BFSU), chuyên đào tạo tiếng Trung thương mại và phiên dịch.",
    bioZh: "北京外国语大学硕士，精通商务汉语谈判、国际贸易实操与中越经贸高级口笔译。",
    bioEn: "Master's graduate from Beijing Foreign Studies University, specializes in Business Chinese and translation.",
    image: "/images/placeholder/faculty-4.jpg",
    specialization: "Hán ngữ Thương mại & Đàm phán",
    specializationZh: "商务汉语与国际商贸",
  },
  {
    name: "ThS. Lý Vĩ Hào (Li Weihao)",
    nameZh: "李伟豪 硕士",
    nameEn: "MA. Li Weihao",
    title: "Chuyên gia Hướng dẫn Hồ sơ & Luyện Phỏng Vấn",
    titleZh: "留学文书导师与高校面试考官",
    titleEn: "Application Dossier & Interview Specialist",
    bio: "Tốt nghiệp Đại học Vũ Hán, hơn 8 năm hỗ trợ hàng trăm học viên chinh phục học bổng toàn phần du học Trung Quốc.",
    bioZh: "毕业于武汉大学，8年来指导数百名越南学子成功获得中国顶尖名校全额奖学金与签证。",
    bioEn: "Graduate of Wuhan University with 8+ years guiding students to win full Chinese scholarships.",
    image: "/images/placeholder/faculty-5.jpg",
    specialization: "Luyện phỏng vấn 1-1 & Viết SOP",
    specializationZh: "个人陈述（SOP）润色与面试指导",
  },
  {
    name: "ThS. Lê Minh Quân",
    nameZh: "黎明军 硕士",
    nameEn: "MA. Le Minh Quan",
    title: "Điều phối viên Chương trình Trao đổi Sinh viên",
    titleZh: "越中校际交流与交换生事务主管",
    titleEn: "Exchange Program Coordinator",
    bio: "Tốt nghiệp Đại học Trùng Khánh, phụ trách kết nối và hỗ trợ thủ tục chuyển đổi tín chỉ song phương Việt - Trung.",
    bioZh: "重庆大学硕士毕业，主管越中高校学分互认、学期交换生选拔与在华就读保障服务。",
    bioEn: "Chongqing University graduate coordinating student exchange and bilateral credit recognition.",
    image: "/images/placeholder/faculty-6.jpg",
    specialization: "Trao đổi Học thuật & Chuyển đổi Tín chỉ",
    specializationZh: "校际学术交换与学分互认",
  },
];
