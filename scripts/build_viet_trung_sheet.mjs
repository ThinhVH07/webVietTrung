import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

const outDir = 'google-sheets-csv';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. HOME SHEET (Key - Value song ngữ y hệt mẫu WEB_Việt-Nhật)
const homeRows = [
  ['key', 'vi', 'zh', 'en'],
  ['badge', 'Đại học Mở TP.HCM', '胡志明市开放大学', 'Ho Chi Minh City Open University'],
  ['main_title', 'Cổng Thông Tin Du Học & Học Bổng Việt - Trung', '越中教育合作与赴华留学中心', 'Vietnam - China Education & Study Abroad Center'],
  ['subtitle', 'Cầu nối học thuật, săn học bổng toàn phần CSC, CIS & đào tạo Hán ngữ HSK uy tín hàng đầu', '打通直录中方重点名校、申请CSC/CIS全额奖学金的官方绿色通道', 'Bridging Academic Excellence & Chinese Government Scholarship (CSC / CIS) Pathways'],
  ['btn_explore', 'Khám phá học bổng', '浏览热门奖学金', 'Explore Scholarships'],
  ['btn_contact', 'Đăng ký tư vấn du học', '预约1对1留学咨询', 'Consultation Registration'],
  ['card_tag', 'Vietnam - China Academic & Study Abroad', '越中教育合作示范基地', 'Vietnam - China Academic & Study Abroad'],
  ['card_title', 'VIỆT NAM • TRUNG QUỐC', '越南 • 中国', 'VIETNAM • CHINA'],
  ['card_subtitle', 'Hợp tác giáo dục & Săn học bổng toàn phần', '全额奖学金申报与联合人才培养', 'Academic Partnership & Full Scholarship Program'],
  ['hero_banner_image', '/images/great-wall.jpg', '/images/great-wall.jpg', '/images/great-wall.jpg'],

  ['section_features_title', 'Chương trình học bổng & Đào tạo', '重点奖学金与语言培训体系', 'Scholarship Programs & Language Training'],
  ['section_stats_title', 'Thành tựu đào tạo & Du học', '办学成果与录取数据', 'Key Achievements & Scholarship Statistics'],

  // 4 cột Stats Counter
  ['stat_students_value', '9999', '9999', '9999'],
  ['stat_students_label', 'Người dùng / Học viên', '累计咨询学子', 'Registered Students'],
  ['stat_students_suffix', '+', '+', '+'],

  ['stat_success_value', '345', '345', '345'],
  ['stat_success_label', 'Apply thành công', '奖学金申请成功', 'Successful Applicants'],
  ['stat_success_suffix', '+', '+', '+'],

  ['stat_partners_value', '120', '120', '120'],
  ['stat_partners_label', 'Trường đại học đối tác', '中方合作高校', 'Partner Universities'],
  ['stat_partners_suffix', '+', '+', '+'],

  ['stat_scholarships_value', '138', '138', '138'],
  ['stat_scholarships_label', 'Suất học bổng toàn phần đã trao', '全额奖学金名额', 'Full Scholarships Awarded'],
  ['stat_scholarships_suffix', '+', '+', '+'],

  ['section_news_title', 'Tin tức & Cẩm nang du học', '留学动态与官方招募通告', 'Latest News & Scholarship Guides'],
  ['section_partners_title', 'Đại học đối tác tại Trung Quốc', '中方重点合作高校矩阵', 'Partner Universities in China'],
  ['btn_view_all', 'Tất cả tin tức', '查看全部新闻', 'View All News'],
  ['btn_read_more', 'Xem chi tiết', '查看详情', 'Read More'],

  ['cta_title', 'Bạn muốn săn học bổng toàn phần du học Trung Quốc?', '有志赴华攻读名校全额奖学金？', 'Ready to Win a Full Scholarship in China?'],
  ['cta_subtitle', 'Điền biểu mẫu trực tuyến để nhận thẩm định GPA và tư vấn chọn trường 1-1 miễn phí', '立即在线提交申请意向，专业导师为您定制1对1择校与文书精修方案', 'Fill out our online form for free GPA evaluation and 1-on-1 university selection'],
  ['cta_button', 'Đăng ký xét tuyển ngay', '立即预约评估', 'Apply Now'],

  ['contact_address', '97 Võ Văn Tần, Phường Võ Thị Sáu, Quận 3, TP.HCM', '胡志明市第三郡武氏六坊武文秦街97号', '97 Vo Van Tan St., Ward Vo Thi Sau, Dist. 3, HCMC'],
  ['contact_phone', '(028) 3930 0089', '(028) 3930 0089', '(028) 3930 0089'],
  ['contact_email', 'viettrung@ou.edu.vn', 'viettrung@ou.edu.vn', 'viettrung@ou.edu.vn'],
  ['contact_hours', 'Thứ 2 - Thứ 6: 08:00 - 17:30 | Thứ 7: 08:00 - 12:00', '周一至周五: 08:00 - 17:30 | 周六: 08:00 - 12:00', 'Mon - Fri: 08:00 - 17:30 | Sat: 08:00 - 12:00'],
  ['social_facebook', 'https://facebook.com/duhocviettrung', 'https://facebook.com/duhocviettrung', 'https://facebook.com/duhocviettrung'],
  ['social_youtube', 'https://youtube.com/@duhocviettrung', 'https://youtube.com/@duhocviettrung', 'https://youtube.com/@duhocviettrung'],
  ['social_zalo', 'https://zalo.me/duhocviettrung', 'https://zalo.me/duhocviettrung', 'https://zalo.me/duhocviettrung'],
];

// 2. ABOUT SHEET (Theo đúng mẫu WEB_Việt-Nhật: Mã nội dung, Tiếng Việt, Tiếng Trung, Tiếng Anh)
const aboutRows = [
  ['Mã nội dung', 'Tiếng Việt', 'Tiếng Trung', 'Tiếng Anh'],
  ['tieu_de_chinh', 'Về chúng tôi', '关于我们', 'About Us'],
  ['phu_de', 'Cầu nối giáo dục, giao lưu văn hóa và xét duyệt học bổng du học Trung Quốc uy tín hàng đầu khu vực phía Nam.', '致力于推动中越两国高校学术深度合作、CSC与CIS国家级全额奖学金推荐及高层次国际化人才培养。', 'Bridging education, cultural exchange, and top-tier Chinese scholarship placements in Southern Vietnam.'],
  ['mo_ta_chinh', 'Trung Tâm Hợp Tác Giáo Dục & Du Học Việt - Trung là đơn vị trực thuộc Trường Đại học Mở TP.HCM, có sứ mệnh đẩy mạnh hợp tác giáo dục quốc tế, đào tạo Hán ngữ HSK và chắp cánh ước mơ nhận học bổng toàn phần du học Trung Quốc cho hàng nghìn học sinh, sinh viên mỗi năm.', '越中教育合作与留学中心直属于胡志明市开放大学（HCMCOU），是越中两国高等教育多边合作的示范平台，长期致力于为越南广大学子打通直录中方重点名校、申请中国政府全额奖学金的绿色通道。', 'Vietnam - China Education & Study Abroad Center is an official unit under Ho Chi Minh City Open University (HCMCOU), dedicated to facilitating full scholarships and academic pathways to China.'],
  ['su_menh_tieu_de', 'Sứ mệnh', '中心使命', 'Our Mission'],
  ['su_menh_mo_ta', 'Xây dựng cầu nối giáo dục và văn hóa bền vững giữa Việt Nam và Trung Quốc. Hỗ trợ tối đa sinh viên tiếp cận các gói học bổng toàn phần CSC, CIS và đào tạo nguồn nhân lực chất lượng cao.', '筑牢中越文化学术交流桥梁，协助更多越南优秀学子通过全额奖学金入读中国双一流顶尖高校，培养精通中文、具备国际视野与实战技能的青年栋梁。', 'Building sustainable educational and cultural bridges between Vietnam and China. Empowering students with prestigious full scholarships.'],
  ['tam_nhin_tieu_de', 'Tầm nhìn', '发展愿景', 'Our Vision'],
  ['tam_nhin_mo_ta', 'Trở thành trung tâm kiểu mẫu hàng đầu về tư vấn du học Trung Quốc, liên kết đào tạo đại học và cấp học bổng toàn phần uy tín hàng đầu Việt Nam.', '建设成为越南南部最具公信力与录取率第一的赴华留学官方直选基地，在CSC全奖申请、汉语言学术规范及中越双学位联培领域树立行业典范。', 'To become Vietnam leading model center for China study abroad, scholarship placement, and university dual-degree programs.'],
  ['lich_su_tieu_de', 'Lịch sử hợp tác', '合作历程', 'Cooperation History'],
  ['lich_su_1', 'Được thành lập trong khuôn khổ chiến lược quốc tế hóa giáo dục của Trường Đại học Mở TP.HCM, Trung Tâm Du Học Việt - Trung là cầu nối tin cậy hàng đầu cho sinh viên Việt Nam tiếp cận các chương trình học bổng Chính phủ (CSC), học bổng Giáo viên Hán ngữ (CIS) và học bổng các trường đại học Top 100 Trung Quốc.', '依托胡志明市开放大学国际化办学战略，中心已成为越南学子直通中国政府奖学金（CSC）、国际中文教师奖学金（CIS）及中国百强重点大学的权威平台。', 'Established under the internationalization strategy of HCMCOU, the Center serves as a trusted bridge for Vietnamese students seeking China top scholarships.'],
  ['lich_su_2', 'Trung tâm liên tục mở rộng mạng lưới ký kết với hơn 120 trường đại học trọng điểm (Bắc Kinh, Thanh Hoa, Vũ Hán, Chiết Giang, Fudan), tổ chức các kỳ thi thử HSK/HSKK và hỗ trợ trọn gói từ làm hồ sơ đến khi sinh viên tốt nghiệp.', '中心已与逾120所中国重点高校（包括北京大学、清华大学、复旦大学、武汉大学等）建立深度合作，持续开展HSK考培并提供一站式行前与在华学业支持。', 'The Center continuously expands partnerships with over 120 prestigious Chinese universities, offering end-to-end guidance from application to graduation.'],
];

// 3. PROGRAMS SHEET (Theo chuẩn WEB_Việt-Nhật: slug, category, title, titleZh, titleEn, description...)
const programsRows = [
  [
    'slug', 'category', 'title', 'titleZh', 'titleEn',
    'description', 'descriptionZh', 'descriptionEn',
    'overview', 'overviewZh', 'overviewEn',
    'requirement', 'requirementZh', 'requirementEn',
    'duration', 'features', 'image',
    'badgeVi', 'badgeZh', 'locationVi', 'locationZh',
    'status', 'order'
  ],
  [
    'hoc-bong-chinh-phu-trung-quoc-csc', 'korean',
    'Học bổng Chính phủ Trung Quốc (CSC)', '中国政府奖学金 (CSC)', 'Chinese Government Scholarship (CSC)',
    'Học bổng toàn phần danh giá nhất do Bộ Giáo dục Trung Quốc cấp: Miễn 100% học phí, miễn ký túc xá, bảo hiểm y tế và cấp sinh hoạt phí hàng tháng từ 2.500 đến 3.500 NDT/tháng.',
    '中国教育部国家留学基金委全额奖学金：免除全额学费、免校内住宿费、享受综合医疗保险，并按月发放生活补助（本科2500元/月，硕士3000元/月，博士3500元/月）。',
    'Prestigious full scholarship funded by the Ministry of Education of China: 100% tuition waiver, free on-campus housing, medical insurance, and 2,500 - 3,500 RMB monthly stipend.',
    'Chương trình áp dụng cho các hệ Cử nhân 4 năm, Thạc sĩ 2-3 năm và Tiến sĩ 3-4 năm tại hơn 280 trường đại học trọng điểm thuộc đề án Song Nhất Lưu của Trung Quốc.',
    '支持双一流高水平大学攻读本科、硕士及博士学位，享有全方位学费与生活资助。',
    'Full degree studies across more than 280 premier Chinese universities with full tuition and living support.',
    'Tốt nghiệp THPT/Đại học, GPA >= 7.5, HSK 4 trở lên (hoặc IELTS 6.0 cho chương trình dạy bằng tiếng Anh).',
    '高中/本科学历，GPA 7.5以上，HSK 4级以上（英文授课需雅思6.0以上）。',
    'High School / Bachelor degree, GPA >= 7.5/10, HSK 4+ or IELTS 6.0+.',
    '1 - 4 năm',
    'Miễn 100% học phí & KTX, Trợ cấp 2.500 - 3.500 NDT/tháng, Hệ Đại học/Thạc sĩ/Tiến sĩ, Bảo hiểm y tế toàn diện',
    '/images/programs/campus-beijing.jpg',
    'Học bổng Toàn phần CSC', 'CSC全额奖学金', 'Đại học đối tác Trung Quốc', '中国重点合作高校',
    true, 1
  ],
  [
    'hoc-bong-giao-vien-han-ngu-cis', 'japanese',
    'Học bổng Giáo viên Hán ngữ Quốc tế (CIS)', '国际中文教师奖学金 (CIS / 孔子学院奖学金)', 'International Chinese Language Teachers Scholarship (CIS)',
    'Học bổng danh giá dành cho hệ 1 năm tiếng, cử nhân và thạc sĩ chuyên ngành Giáo dục Hán ngữ Quốc tế. Tài trợ toàn bộ học phí, ký túc xá và sinh hoạt phí 2.500 - 3.000 NDT/tháng.',
    '教育部中外语言交流合作中心设立，面向有志于中文教学的优秀学子，资助一学年研修、中文国际教育本科与硕士，免学费住宿并提供丰厚生活补助。',
    'Scholarship supporting 1-academic-year language study, Bachelor and Master degrees in Teaching Chinese to Speakers of Other Languages (TCSOL).',
    'Sinh viên theo học ngành Sư phạm tiếng Trung tại các trường đại học sư phạm hàng đầu như ECNU Thượng Hải, ĐH Sư phạm Bắc Kinh, ĐH Ngôn ngữ Bắc Kinh.',
    '在华东师范大学、北京师范大学等一流名校修读国际中文教育专业，享受全免学宿及月度津贴。',
    'Studies at top pedagogical universities with full tuition, dorm and monthly stipend.',
    'Độ tuổi 16 - 35, HSK 3 - HSK 5 tùy hệ (1 năm tiếng cần HSK 3 210 điểm + HSKK Sơ cấp; Thạc sĩ cần HSK 5 210 điểm + HSKK Trung cấp).',
    '年龄16-35周岁，持有效HSK及HSKK成绩（研修生需HSK3 210分+HSKK；硕士需HSK5 210分+HSKK中级）。',
    'Age 16-35, valid HSK and HSKK certificates (HSK 3-5 depending on degree level).',
    '1 - 3 năm',
    'Hệ 1 năm tiếng / Đại học / Thạc sĩ, Trợ cấp 2.500 - 3.000 NDT/tháng, Cam kết đầu ra chuẩn HSK, Cơ hội giảng dạy quốc tế',
    '/images/programs/campus-shanghai.jpg',
    'Học bổng CIS Khổng Tử', 'CIS国际中文教师奖', 'Đại học đối tác Trung Quốc', '中国重点合作高校',
    true, 2
  ],
  [
    'dao-tao-han-ngu-luyen-thi-hsk', 'japanese',
    'Đào tạo Hán ngữ & Luyện thi HSK 1 - 6 Cấp Tốc', '汉语言综合培训与HSK 1-6级考前冲刺', 'Comprehensive Chinese Language & HSK 1-6 Intensive Prep',
    'Khóa đào tạo tiếng Trung chuẩn phổ thông từ cơ bản đến nâng cao. Đội ngũ giảng viên bản ngữ hướng dẫn chiến thuật đạt điểm cao HSK 4, HSK 5, HSK 6 và HSKK.',
    '由母语资深教师与专业导师联合授课，系统提升听说读写技能，传授高分应试策略，助您快速攻克HSK 4-6级及HSKK口语难关。',
    'Standard mandarin courses from beginner to advanced. Master HSK 4-6 and HSKK oral exam skills under expert native teachers.',
    'Được thiết kế tinh gọn theo đề thi mới, rèn luyện kỹ năng nghe, đọc hiểu, viết luận và phản xạ phỏng vấn xin học bổng du học.',
    '针对新HSK大纲，系统训练听力、阅读、写作及面试答辩实操能力。',
    'Intensive curriculum focused on vocabulary, listening, reading comprehension, writing, and scholarship interview simulation.',
    'Dành cho học sinh, sinh viên và người đi làm từ chưa biết gì đến có nhu cầu nâng cấp chứng chỉ cấp tốc.',
    '零基础学员、在读大学生或有快速考证需求的社会青年。',
    'Open to all learners from beginner level to candidates seeking fast-track certificates.',
    '3 - 6 tháng',
    'Giảng viên bản ngữ giàu kinh nghiệm, Cam kết chuẩn đầu ra HSK 4-6, Luyện thi HSKK chuyên sâu, Hỗ trợ apply học bổng',
    '/images/programs/campus-hsk.jpg',
    'Đào tạo chuẩn HSK 1-6', 'HSK金牌冲刺体系', 'Đại học Mở TP.HCM & Online', '胡志明市开放大学及线上',
    true, 3
  ],
  [
    'hoc-bong-vanh-dai-va-con-duong', 'korean',
    'Học bổng Một Vành Đai và Con Đường', '“一带一路”国际学生专项奖学金', 'Belt and Road International Student Scholarship',
    'Chương trình học bổng ưu tiên dành riêng cho sinh viên Việt Nam tại các trường đại học trọng điểm Trung Quốc trong khuôn khổ hợp tác kinh tế - giáo dục Vành đai và Con đường.',
    '面向“一带一路”倡议沿线重点生源国设立的专项高校奖学金，支持工程、商贸、经济、科技与人文领域的跨学科拔尖人才培养。',
    'Special scholarship program prioritized for Vietnamese students in engineering, trade, business, technology, and humanities.',
    'Tài trợ toàn phần hoặc bán phần học phí và ký túc xá cho sinh viên theo học các ngành kỹ thuật, kinh tế, thương mại quốc tế, logistics và y khoa.',
    '重点资助理工科、国际贸易、现代物流与医学等国家急需紧缺专业。',
    'Full or partial tuition and housing coverage for high-demand majors.',
    'Học sinh tốt nghiệp THPT, GPA từ 7.0 trở lên, chứng chỉ HSK 4 hoặc học 1 năm dự bị tiếng.',
    '高中毕业以上，GPA 7.0以上，HSK 4级或修读1年预科。',
    'High school graduate, GPA >= 7.0/10, HSK 4 or 1-year preparatory Chinese.',
    '2 - 4 năm',
    'Ưu tiên sinh viên Việt Nam, Miễn 100% học phí, Top 100 đại học Trung Quốc, Hỗ trợ visa du học nhanh',
    '/images/programs/campus-belt-road.jpg',
    'Học bổng Toàn phần CSC', '一带一路专项奖', 'Đại học đối tác Trung Quốc', '中国重点合作高校',
    true, 4
  ],
  [
    'hoc-bong-thanh-pho-thuong-hai-sgs', 'korean',
    'Học bổng Thành phố Thượng Hải (SGS)', '上海市政府外国留学生奖学金 (SGS)', 'Shanghai Government Scholarship (SGS)',
    'Học bổng do chính quyền TP. Thượng Hải cấp cho du học sinh xuất sắc: Loại A (Toàn phần miễn học phí, KTX, bảo hiểm và trợ cấp 3.000 - 3.500 NDT/tháng); Loại B (Miễn học phí).',
    '上海市教委专项全额/半额奖学金：A类免学费、住宿费并按月发生活费（硕士3000元/月，博士3500元/月）；B类免除全额学费。',
    'Shanghai municipal scholarship for top candidates: Type A (Full tuition, dorm, insurance, and monthly stipend); Type B (Tuition waiver).',
    'Cơ hội học tập tại các đại học hàng đầu Thượng Hải: ĐH Giao thông Thượng Hải (SJTU), ĐH Fudan, ĐH Sư phạm Hoa Đông (ECNU), ĐH Đồng Tế (Tongji).',
    '覆盖复旦大学、上海交通大学、同济大学、华东师范大学等上海顶级名校。',
    'Placements at Shanghai top institutions including Fudan, SJTU, Tongji, and ECNU.',
    'Tốt nghiệp THPT/Đại học, GPA >= 8.0, HSK 5 trở lên đối với ngành dạy bằng tiếng Trung.',
    '学业优秀，GPA 8.0以上，中文授课需HSK 5级以上。',
    'Outstanding academic record, GPA >= 8.0/10, HSK 5+.',
    '3 - 4 năm',
    'Học tập tại Thượng Hải sầm uất, Trợ cấp lên đến 3.500 NDT/tháng, Bằng cấp quốc tế uy tín, Cơ hội thực tập tập đoàn đa quốc gia',
    '/images/programs/campus-sgs.jpg',
    'Học bổng TP. Thượng Hải', '上海市政府奖学金', 'Thượng Hải, Trung Quốc', '中国 · 上海',
    true, 5
  ],
  [
    'chuong-trinh-trao-doi-viet-trung', 'exchange',
    'Chương trình Trao đổi Sinh viên Quốc tế 1+3 & 2+2', '越中校际学分互认与“1+3 / 2+2”联合培养项目', 'Vietnam - China Student Exchange & 1+3 / 2+2 Articulation Program',
    'Mô hình liên kết đào tạo song phương giữa Đại học Mở TP.HCM và các trường đại học đối tác Trung Quốc. Công nhận tín chỉ tương đương, học 1-2 năm tại Việt Nam và chuyển tiếp sang Trung Quốc nhận bằng chính quy.',
    '胡志明市开放大学与中方高校学分互认联合培养项目，前1-2年在越修读基础课程，后2-3年赴华完成学业并获颁官方正规学位。',
    'Bilateral degree articulation program between HCMCOU and partner universities in China with full credit recognition and direct transfer.',
    'Tiết kiệm 50% chi phí so với du học tự túc toàn phần, đảm bảo 100% được cấp visa du học và chuyển tiếp thuận lợi.',
    '大幅节省留学成本，官方通道保障签证通过率与直升衔接。',
    'Saves up to 50% tuition expenses with seamless credit transfer and guaranteed visa sponsorship.',
    'Sinh viên đang theo học tại Trường Đại học Mở TP.HCM hoặc các trường đại học trong nước có nguyện vọng chuyển tiếp.',
    '本校在读生或有意修读越中双学位的高校学子。',
    'Enrolled university students seeking international study transfer.',
    '1 - 2 năm chuyển tiếp',
    'Bằng chính quy đại học Trung Quốc, Công nhận tín chỉ OU, Chi phí tiết kiệm 50%, Hỗ trợ thủ tục chuyển tiếp trọn gói',
    '/images/programs/campus-exchange.jpg',
    'Liên kết Quốc tế 2+2', '校际联合培养', 'Đại học Mở TP.HCM & Trung Quốc', '胡志明市开放大学与中方高校',
    true, 6
  ],
];

// 4. TIMELINE SHEET (Lộ trình 4 bước kèm phong cảnh Trung Quốc)
const timelineRows = [
  ['step', 'tag_vi', 'tag_zh', 'location_vi', 'location_zh', 'title_vi', 'title_zh', 'desc_vi', 'desc_zh', 'highlights_vi', 'highlights_zh', 'image', 'note'],
  [
    '01', 'GIAI ĐOẠN 01', '第一阶段 · 评估', 'Bắc Kinh · Cố Cung Hoàng Gia', '北京 · 故宫紫禁城',
    'Tiếp Nhận Tư Vấn & Định Hướng Chọn Trường', '前期评估与目标选校',
    'Chuyên gia đánh giá học lực, điểm GPA, nguyện vọng ngành học và điều kiện tài chính để xây dựng lộ trình chọn trường đại học Trung Quốc tối ưu nhất (hệ thống trường Top 985, 211).',
    '根据学子学业均分（GPA）、专业背景与个人志向，科学匹配985/211及省部共建重点高校，定制最优奖学金申请策略与全套升学方案。',
    'Đánh giá năng lực GPA & tài chính 1-1, Định hướng đúng trường Top 985 & 211, Xây dựng chiến lược tối ưu đỗ học bổng',
    '1对1学术背景诊断与GPA测评, 匹配985/211顶尖重点大学, 量身定制专属全额奖学金方案',
    '/images/landscapes/china-beijing.jpg', 'Thẻ 01 - Lộ trình du học'
  ],
  [
    '02', 'GIAI ĐOẠN 02', '第二阶段 · 语言', 'Quế Lâm · Non Nước Hữu Tình', '桂林 · 山水甲天下',
    'Đào Tạo Hán Ngữ & Luyện Thi HSK, HSKK Cấp Tốc', '汉语言强化与HSK冲刺',
    'Tham gia các khóa đào tạo tiếng Trung cùng giảng viên bản ngữ giàu kinh nghiệm, cam kết chuẩn đầu ra chứng chỉ HSK 4 - HSK 6 và HSKK phục vụ xét duyệt học bổng toàn phần.',
    '母语专家名师授课，强化听说读写，冲刺攻克HSK 4-6级及HSKK高级口语，确保顺利达到各大高校录取硬性语言标准。',
    'Giảng viên bản ngữ giảng dạy trực tiếp, Lộ trình tinh gọn cấp tốc từ 3 - 6 tháng, Cam kết chuẩn đầu ra HSK 4 - 6 & HSKK',
    '资深中方母语名师面对面指导, 3-6个月高效集训提分冲刺, 保过达标高校硬性语言门槛',
    '/images/landscapes/china-guilin.jpg', 'Thẻ 02 - Lộ trình du học'
  ],
  [
    '03', 'GIAI ĐOẠN 03', '第三阶段 · 申报', 'Thượng Hải · Phồn Hoa Hiện Đại', '上海 · 外滩与现代都市',
    'Hoàn Thiện Hồ Sơ & Nộp Học Bổng CSC / CIS', '文书润色与奖学金申办',
    'Dịch thuật công chứng chuyên nghiệp, chuẩn hóa Kế hoạch học tập (Study Plan / SOP), kết nối xin thư giới thiệu giáo sư danh tiếng và hoàn thiện hồ sơ trên cổng học bổng quốc gia.',
    '专业团队指导撰写极具竞争力的个人陈述（SOP/Study Plan）、联系教授出具官方推荐信，并在CSC/CIS国家官网完成规范提交。',
    'Viết Kế hoạch học tập (Study Plan / SOP) chuẩn, Hỗ trợ xin thư giới thiệu từ Giáo sư, Apply trực tiếp cổng CSC / CIS & trường',
    '教授级团队深度精修SOP研习计划, 名校博导/教授权威推荐信背书, 中国国家级奖学金官网直报跟踪',
    '/images/landscapes/china-shanghai.jpg', 'Thẻ 03 - Lộ trình du học'
  ],
  [
    '04', 'GIAI ĐOẠN 04', '第四阶段 · 启航', 'Trương Gia Giới · Kỳ Quan Thiên Nhiên', '张家界 · 奇山胜境',
    'Luyện Phỏng Vấn 1-1, Nhận Visa & Xuất Cảnh', '名校面试通关与行前迎新',
    'Luyện phỏng vấn 1-1 trực tiếp với đại diện trường Trung Quốc, hỗ trợ nhận thư mời, biểu mẫu JW202/201 và làm thủ tục Visa du học. Hướng dẫn xuất cảnh & đồng hành 24/7.',
    '中方考官1对1进行全真模拟面试与答辩指导；协助办理录取通知书、JW202/201表及赴华签证；提供抵华接机与全天候学业生活支持。',
    'Mô phỏng phỏng vấn 1-1 với giảng viên, Hỗ trợ Visa & JW202 với tỷ lệ đỗ 99.8%, Đón sân bay, nhận KTX & đồng hành 24/7',
    '中方考官全真模拟面试与答辩辅导, 全程协助JW202表与签证申请 (99.8%), 抵华接机入住与在华学业全天候关怀',
    '/images/landscapes/china-zhangjiajie.jpg', 'Thẻ 04 - Lộ trình du học'
  ],
];

// 5. PARTNERS SHEET (Theo chuẩn WEB_Việt-Nhật: name, country, countryJa, countryEn, status, order)
const partnersRows = [
  ['name', 'country', 'countryJa', 'countryEn', 'status', 'order'],
  ['Peking University (Đại học Bắc Kinh)', '🇨🇳 Bắc Kinh, Trung Quốc', '🇨🇳 北京・中国', '🇨🇳 Beijing, China', true, 1],
  ['Tsinghua University (Đại học Thanh Hoa)', '🇨🇳 Bắc Kinh, Trung Quốc', '🇨🇳 北京・中国', '🇨🇳 Beijing, China', true, 2],
  ['Fudan University (Đại học Phục Đán)', '🇨🇳 Thượng Hải, Trung Quốc', '🇨🇳 上海・中国', '🇨🇳 Shanghai, China', true, 3],
  ['Shanghai Jiao Tong University (ĐH Giao thông Thượng Hải)', '🇨🇳 Thượng Hải, Trung Quốc', '🇨🇳 上海・中国', '🇨🇳 Shanghai, China', true, 4],
  ['Zhejiang University (Đại học Chiết Giang)', '🇨🇳 Hàng Châu, Trung Quốc', '🇨🇳 杭州・中国', '🇨🇳 Hangzhou, China', true, 5],
  ['Wuhan University (Đại học Vũ Hán)', '🇨🇳 Vũ Hán, Trung Quốc', '🇨🇳 武汉・中国', '🇨🇳 Wuhan, China', true, 6],
  ['East China Normal University (ĐH Sư phạm Hoa Đông)', '🇨🇳 Thượng Hải, Trung Quốc', '🇨🇳 上海・中国', '🇨🇳 Shanghai, China', true, 7],
  ['Beijing Foreign Studies University (ĐH Ngoại ngữ Bắc Kinh)', '🇨🇳 Bắc Kinh, Trung Quốc', '🇨🇳 北京・中国', '🇨🇳 Beijing, China', true, 8],
  ['Chongqing University (Đại học Trùng Khánh)', '🇨🇳 Trùng Khánh, Trung Quốc', '🇨🇳 重庆・中国', '🇨🇳 Chongqing, China', true, 9],
];

// 6. NEWS SHEET (Theo chuẩn WEB_Việt-Nhật: slug, category, date, featured, title, titleJa, titleEn, excerpt...)
const newsRows = [
  [
    'slug', 'category', 'date', 'featured',
    'title', 'titleJa', 'titleEn',
    'excerpt', 'excerptJa', 'excerptEn',
    'content', 'contentJa', 'contentEn',
    'image', 'status'
  ],
  [
    'thong-bao-hoc-bong-csc-2026-2027', 'scholarship', '10/10/2026', true,
    'Thông báo tuyển sinh Học bổng Chính phủ Trung Quốc (CSC) niên khóa 2026 - 2027',
    '2026-2027学年中国政府奖学金（CSC）申请招募正式启动',
    '2026-2027 Chinese Government Scholarship (CSC) Enrollment Announcement',
    'Trung tâm mở cổng tiếp nhận hồ sơ ứng tuyển học bổng toàn phần CSC: miễn 100% học phí, miễn ký túc xá và cấp sinh hoạt phí tới 3.500 NDT/tháng cho các hệ Cử nhân, Thạc sĩ, Tiến sĩ.',
    '中心全面开启2026-2027学年CSC全额奖学金申请通道：免除学费及住宿费，并享受最高每月3500元生活补贴，名额有限，择优推荐。',
    'Applications are now open for CSC full scholarships covering 100% tuition, free accommodation, and monthly stipend up to 3,500 RMB.',
    'Trung tâm Du học & Hợp tác Việt - Trung chính thức tiếp nhận hồ sơ xét tuyển Học bổng Chính phủ Trung Quốc (CSC) năm học 2026 - 2027.\nHọc sinh, sinh viên quan tâm vui lòng liên hệ sớm để được hỗ trợ thẩm định học bạ và viết bài luận 1-1 cùng chuyên gia.',
    '越中教育合作与留学中心正式开启2026-2027学年中国政府奖学金（CSC）材料初审与推荐通道。\n欢迎有意赴华攻读本、硕、博学位的学子预约导师进行1对1评估与文书指导。',
    'The Vietnam - China Education & Study Abroad Center officially opens applications for the 2026 - 2027 Chinese Government Scholarship (CSC).\nInterested students should contact us early for GPA evaluation and Study Plan coaching.',
    '/images/programs/campus-beijing.jpg', true
  ],
  [
    'tuyen-sinh-hoc-bong-giao-vien-han-ngu-cis', 'scholarship', '28/09/2026', false,
    'Tuyển sinh Học bổng Giáo viên Hán ngữ Quốc tế (CIS) 1 năm tiếng & Thạc sĩ',
    '2026年国际中文教师奖学金（CIS）一学年研修与硕士申请指南',
    '2026 International Chinese Language Teachers Scholarship (CIS) Guide',
    'Cơ hội nhận học bổng toàn phần dành cho sinh viên chuyên ngành tiếng Trung, Hán ngữ thương mại hoặc có chứng chỉ HSK 3 - HSK 5.',
    '面向中文专业或持有效HSK成绩的优秀青年，资助一学年语言研修生及国际中文教育硕士，免学费住宿并提供生活补贴。',
    'Full scholarship opportunity for Chinese language students or candidates with valid HSK 3-5 certificates.',
    'Chương trình học bổng CIS do Bộ Giáo dục Trung Quốc cấp nhằm đào tạo đội ngũ giảng viên tiếng Trung chất lượng cao trên toàn cầu.\nTài trợ 100% học phí, ký túc xá và cấp sinh hoạt phí 2.500 - 3.000 NDT/tháng.',
    '国际中文教师奖学金（CIS）致力于培养各国本土优秀中文师资，资助全额学费、住宿费及每月2500-3000元生活津贴。',
    'The CIS scholarship funded by the Ministry of Education of China supports outstanding students for 1-academic-year language study, Bachelor, and Master degrees.',
    '/images/programs/campus-shanghai.jpg', true
  ],
  [
    'le-hoi-giao-luu-van-hoa-viet-trung', 'event', '15/09/2026', false,
    'Lễ hội Giao lưu Văn hóa & Trải nghiệm Trà Đạo, Thư Pháp Việt - Trung 2026',
    '2026年“越中同心”青年文化艺术节：茶道、书法与学术体验日',
    '2026 Vietnam - China Cultural Festival: Tea Art, Calligraphy & Exchange',
    'Sự kiện giao lưu văn hóa thường niên quy tụ đại diện các trường đại học đối tác Trung Quốc, giảng viên bản xứ và sinh viên HCMCOU.',
    '年度中越青年文化交流盛会，汇聚中方合作高校代表、母语外教及广大学子，现场展示传统茶艺、书法创作与留学咨询。',
    'Annual cultural festival gathering representatives from partner universities in China, native teachers, and students.',
    'Lễ hội mang đến không gian trải nghiệm văn hóa độc đáo với các gian hàng nghệ thuật Hán ngữ, ẩm thực truyền thống và góc tư vấn du học 1-1.',
    '本次文化节设有传统茶道品鉴、软笔书法体验、汉服展示及中方高校1对1留学招生咨询展位。',
    'The festival offers a unique cultural experience with Chinese language art booths, traditional cuisine, tea ceremony, calligraphy, and study abroad consultation.',
    '/images/landscapes/china-guilin.jpg', true
  ],
  [
    'lich-thi-hsk-hskk-2026', 'announcement', '01/09/2026', false,
    'Lịch thi HSK, HSKK Quốc tế và Khóa ôn thi cấp tốc quý IV/2026',
    '2026年第四季度HSK与HSKK国际中文水平考试日程安排及冲刺班',
    'Q4 2026 HSK & HSKK Exam Schedule and Intensive Prep Courses',
    'Thông tin chi tiết về các đợt thi HSK 3 - HSK 6 trên máy tính và khai giảng khóa luyện đề thực chiến chuẩn cấu trúc mới.',
    '发布第四季度机考HSK 3-6级及HSKK考期，同步开设考前全真模拟试题强化冲刺班，助考生快速达到录取分数线。',
    'Details on computer-based HSK 3-6 exam dates and registration for intensive mock test preparation classes.',
    'Khóa luyện thi HSK tại Trung tâm được giảng dạy bởi các chuyên gia giàu kinh nghiệm, cam kết chuẩn đầu ra phục vụ nộp hồ sơ du học.',
    '中心HSK冲刺班由资深考培名师授课，针对阅读、听力及书写难点专项突破，助力考生高分通关。',
    'HSK preparation courses at the Center are taught by experienced specialists, guaranteeing output standards required for Chinese scholarship applications.',
    '/images/programs/campus-hsk.jpg', true
  ],
];

// 7. FACULTY SHEET (Theo chuẩn WEB_Việt-Nhật: ID, Tên, Tên JA, Tên EN, Chức vụ VI, Chức vụ JA, Chức vụ EN, Chuyên môn VI...)
const facultyRows = [
  [
    'ID', 'Tên', 'Tên JA', 'Tên EN',
    'Chức vụ VI', 'Chức vụ JA', 'Chức vụ EN',
    'Chuyên môn VI', 'Chuyên môn EN',
    'Mô tả VI', 'Mô tả JA', 'Mô tả EN',
    'Đơn vị VI', 'Đơn vị EN',
    'Hiển thị'
  ],
  [
    1, 'PGS.TS. Trần Quốc Hùng', '陈国雄 准教授・博士', 'Assoc. Prof. Dr. Tran Quoc Hung',
    'Giám đốc Trung tâm Hợp tác Đào tạo Việt - Trung', '越中教育合作与留学中心主任', 'Director of Vietnam - China Center',
    'Hợp tác học thuật quốc tế & Dự án 985/211', 'International Academic Cooperation & Project 985/211',
    'Tiến sĩ tốt nghiệp Đại học Bắc Kinh, hơn 18 năm kinh nghiệm giảng dạy và xúc tiến hợp tác giáo dục đại học song phương Việt - Trung.',
    '北京大学博士毕业，拥有18年以上高等教育合作及国际化办学经验，主持多项越中高校联合培养项目。',
    'PhD from Peking University, over 18 years in higher education leadership and bilateral educational diplomacy.',
    'Giảng viên cơ hữu HCMCOU', 'HCMCOU Faculty',
    true
  ],
  [
    2, 'GS. Vương Nhất Minh (Wang Yiming)', '王一鸣 教授・博导', 'Prof. Wang Yiming',
    'Cố vấn cấp cao Ban Tuyển sinh & Học bổng CSC', '中方合作高校及CSC奖学金评审首席顾问', 'Senior Advisor for CSC Scholarship Review',
    'Thẩm định hồ sơ nghiên cứu & Học bổng Chính phủ', 'CSC Research Proposal Evaluation & Academic Mentorship',
    'Nguyên Giáo sư tại Đại học Thanh Hoa, thành viên ban cố vấn thẩm định hồ sơ học bổng quốc tế và kết nối giáo sư hướng dẫn.',
    '清华大学资深教授，多年从事国际学生奖学金遴选指导，擅长导师推荐信背书及学术论文研究方案规划。',
    'Former Professor at Tsinghua University, mentor for graduate scholarship applications and professor connections.',
    'Cố vấn học thuật Trung Quốc', 'Chinese Academic Advisor',
    true
  ],
  [
    3, 'TS. Trương Vệ Hoa (Zhang Weihua)', '张卫华 博士', 'Dr. Zhang Weihua',
    'Trưởng Bộ môn Hán ngữ Học thuật & Luyện thi HSK', '学术中文与HSK考培教研组组长', 'Head of Academic Chinese & HSK Prep',
    'Phương pháp giảng dạy Hán ngữ & Luyện đề HSK 6', 'Chinese Pedagogy & Advanced HSK 6 Prep',
    'Tiến sĩ Ngôn ngữ học từ Đại học Sư phạm Hoa Đông (ECNU Thượng Hải), chuyên gia luyện thi HSK 5, HSK 6 và phản xạ HSKK.',
    '华东师范大学语言学博士，深谙留学生中文应试痛点，独创“情境沉浸+考点靶向”高分突破法。',
    'PhD in Linguistics from ECNU Shanghai, expert in advanced HSK 5-6 test strategies and HSKK oral fluency.',
    'Chuyên gia bản ngữ', 'Native Chinese Specialist',
    true
  ],
  [
    4, 'ThS. Nguyễn Thị Mỹ Duyên', '阮氏美缘 修士', 'MA. Nguyen Thi My Duyen',
    'Điều phối viên Học bổng CIS & Giao lưu Quốc tế', '国际中文教师奖学金（CIS）项目协调员', 'CIS Scholarship & International Coordinator',
    'Học bổng Khổng Tử CIS & Hồ sơ Visa JW202', 'CIS Scholarships & Student Visa Clearance',
    'Thạc sĩ Đại học Chiết Giang (Học bổng CSC toàn phần), HSK 6, phụ trách hướng dẫn hồ sơ xin học bổng và thủ tục JW202.',
    '浙江大学全额奖学金硕士毕业，持HSK 6级证书，全面负责CIS奖学金申报辅导与JW202表审批跟踪。',
    'Master degree from Zhejiang University (Full CSC scholar), HSK 6, specialized in CIS applications and JW202 visas.',
    'Giảng viên cơ hữu HCMCOU', 'HCMCOU Faculty',
    true
  ],
  [
    5, 'TS. Lý Nhược Thủy (Li Ruoshui)', '李若水 博士', 'Dr. Li Ruoshui',
    'Cố vấn Kế hoạch Học tập (Study Plan) & Phỏng vấn', '研习计划书（Study Plan）及名校面试首席导师', 'Study Plan & University Interview Mentor',
    'Hiệu đính bài luận SOP & Kỹ năng phỏng vấn học bổng', 'SOP Statement Editing & Scholarship Interview Coaching',
    'Tiến sĩ từ Đại học Vũ Hán, chuyên gia hiệu đính Kế hoạch học tập (Study Plan) và trực tiếp mô phỏng phỏng vấn 1-1 với học viên.',
    '武汉大学博士，精通中英文学术陈述精修，针对中方高校面试考点进行1对1高仿真模拟答辩指导。',
    'PhD from Wuhan University, specialist in Study Plan refinement and 1-on-1 simulated scholarship interviews.',
    'Cố vấn học thuật Trung Quốc', 'Chinese Academic Mentor',
    true
  ],
  [
    6, 'ThS. Đặng Hữu Phúc', '邓友福 修士', 'MA. Dang Huu Phuc',
    'Chuyên viên Hỗ trợ Du học sinh & Việc làm Hậu du học', '赴华留学生落地接机与职业发展指导专员', 'Student Placement & Career Support Specialist',
    'Thủ tục nhập học, KTX & Định hướng nghề nghiệp', 'On-campus Settlement, Dorm & Career Development',
    'Thạc sĩ Đại học Giao thông Thượng Hải (SJTU), phụ trách hỗ trợ đón sân bay, bố trí ký túc xá và kết nối việc làm sau tốt nghiệp.',
    '上海交通大学硕士，为学子提供抵华接机、入住安置、学业跟踪及回国就业全周期专属护航。',
    'Master from Shanghai Jiao Tong University (SJTU), dedicated to arrival orientation, housing, and career matchmaking.',
    'Giảng viên cơ hữu HCMCOU', 'HCMCOU Faculty',
    true
  ],
];

// 8. ADMISSIONS SHEET (Ghi nhận form đăng ký)
const admissionsRows = [
  ['Thời gian đăng ký', 'Họ và tên', 'Email', 'Số điện thoại', 'Chương trình quan tâm', 'Trình độ HSK', 'Lời nhắn / Nguyện vọng', 'Trạng thái'],
];

// 9. CONTACT SHEET (Ghi nhận form liên hệ)
const contactRows = [
  ['Thời gian gửi', 'Họ và tên', 'Email', 'Chủ đề', 'Nội dung thắc mắc', 'Trạng thái'],
];

// Tạo workbook XLSX
const wb = XLSX.utils.book_new();

function addSheet(name, rows) {
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, name);
  
  // Xuất file CSV tương ứng vào google-sheets-csv/
  const csv = XLSX.utils.sheet_to_csv(ws);
  fs.writeFileSync(path.join(outDir, `${name}.csv`), '\uFEFF' + csv, 'utf8');
}

addSheet('home', homeRows);
addSheet('about', aboutRows);
addSheet('programs', programsRows);
addSheet('timeline', timelineRows);
addSheet('partners', partnersRows);
addSheet('news', newsRows);
addSheet('faculty', facultyRows);
addSheet('admissions', admissionsRows);
addSheet('contact', contactRows);

// Ghi file Excel chính
XLSX.writeFile(wb, 'web-du-hoc-viet-trung.xlsx');
console.log('✅ Đã tạo thành công file web-du-hoc-viet-trung.xlsx và thư mục google-sheets-csv/ chuẩn mẫu WEB_Việt-Nhật!');
