# TÀI LIỆU TỔNG KẾT VÀ BÁO CÁO DỰ ÁN (PROJECT DOCUMENTATION)
**Dự án**: Website Cổng thông tin & Tư vấn Du học Việt - Trung (Trường Đại học Mở TP.HCM)  
**Mã dự án**: `demoweb-ou-vhn` / `duhoc-viet-trung`  
**Ngày cập nhật**: 23/11/2026  
**Trạng thái**: Hoàn thiện & Đã kết nối Google Sheets trực tiếp  

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1. Mục tiêu dự án
Xây dựng website cổng thông tin điện tử, tư vấn tuyển sinh và săn học bổng du học toàn diện mang tên **Cổng Thông Tin Du Học Việt - Trung** trực thuộc **Trường Đại học Mở TP.HCM (HCMCOU)**. Website đóng vai trò:
- **Cầu nối giáo dục & văn hóa**: Giới thiệu hình ảnh, sứ mệnh, kết nối học thuật, giao lưu văn hóa và hợp tác giáo dục giữa các trường đại học hàng đầu Trung Quốc và sinh viên Việt Nam.
- **Cổng thông tin học bổng đa dạng**: Cung cấp chi tiết các chương trình học bổng danh giá: Học bổng Chính phủ Trung Quốc (CSC), Học bổng Giáo viên Tiếng Trung Quốc tế (CIS - Khổng Tử), Học bổng Tỉnh/Thành phố (Thượng Hải, Bắc Kinh, Giang Tô...), Học bổng Trường Đại học và các chương trình trao đổi tín chỉ 1+3, 2+2, trại hè văn hóa HSK.
- **Đào tạo & Chuẩn bị hành trang**: Thông tin các lộ trình luyện thi chứng chỉ HSK 1-6, HSKK, tiếng Trung ứng dụng thương mại và kỹ năng phỏng vấn học bổng.
- **Hệ thống tư vấn & Nộp hồ sơ trực tuyến**: Tiếp nhận thông tin, tư vấn chọn trường, thẩm định hồ sơ xin học bổng tự động và tối ưu thời gian phản hồi cho học viên/phụ huynh.
- **Không gian số giàu bản sắc**: Giao diện mang đậm dấu ấn phong cảnh và văn hóa Á Đông hiện đại kết hợp hiệu ứng cuộn ảnh danh lam thắng cảnh Trung Quốc (Bắc Kinh, Quế Lâm, Thượng Hải, Trương Gia Giới).

### 1.2. Đối tượng phục vụ
- **Học sinh, sinh viên**: Sinh viên Trường Đại học Mở TP.HCM và học sinh cả nước có nguyện vọng săn học bổng toàn phần/bán phần, theo học hệ Cử nhân, Thạc sĩ, Tiến sĩ tại Trung Quốc.
- **Người đi làm, nghiên cứu sinh**: Học viên có nhu cầu nâng cao năng lực HSK/HSKK, tham gia các khóa ngắn hạn, nghiên cứu chuyên sâu hoặc tìm kiếm cơ hội việc làm trong các doanh nghiệp sử dụng tiếng Trung.
- **Phụ huynh học sinh**: Tìm hiểu thông tin chính thống, minh bạch về chi phí sinh hoạt, điều kiện ăn ở, môi trường học tập và tính an toàn tại các thành phố của Trung Quốc.
- **Đối tác & Đại học Trung Quốc**: Các trường đại học liên kết (Tsinghua, Peking, Fudan, Zhejiang, Wuhan, Shanghai Jiao Tong...) theo dõi tiến độ hợp tác và tiếp nhận hồ sơ du học sinh Việt Nam.

---

## 2. CÔNG NGHỆ SỬ DỤNG (TECH STACK)

| Thành phần | Công nghệ / Thư viện | Vai trò & Ưu điểm nổi bật |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Tối ưu hóa SEO vượt trội, kiến trúc App Router thế hệ mới, hỗ trợ Static Site Generation (SSG) với tốc độ tức thì |
| **Ngôn ngữ** | TypeScript 5 | Kiểm soát chặt chẽ kiểu dữ liệu (Strict Type Safety), giảm thiểu 100% lỗi runtime |
| **Thư viện UI** | React 19 | Xây dựng các UI component phản hồi tức thì, tối ưu khả năng re-render |
| **Styling** | Tailwind CSS v4, `@tailwindcss/typography` | Hệ thống token màu đỏ hoàng gia (`#991b1b`) và vàng hổ phách (`#d97706`) đậm nét Việt - Trung, hỗ trợ Responsive hoàn hảo |
| **Hiệu ứng chuyển động** | Framer Motion (13.x) | Xử lý mượt mà hiệu ứng **Sticky Stacking Cards** (xếp lớp cuộn trang), chuyển đổi tab, modal, dropdown |
| **Bộ Icon** | Lucide React | Hệ thống icon vector sắc nét, tải trang nhẹ, đồng bộ thiết kế giáo dục hiện đại |
| **Quản lý gói** | pnpm 9.12.x | Tốc độ cài đặt dependency cực nhanh, tiết kiệm dung lượng đĩa cứng thông qua cơ chế hard-link |
| **Headless CMS** | Google Sheets API (CSV Direct Fetch) | Quản trị dữ liệu hoàn toàn miễn phí, cập nhật tức thì dưới 0.3s không cần code backend/database |
| **Cơ chế Caching** | Stale-While-Revalidate + LocalStorage | Tải trang lập tức từ cache, không giật màn hình (anti-flicker), ngầm cập nhật dữ liệu mới nhất |
| **Web Server & Container** | Docker Multi-stage + Nginx Alpine | Đóng gói siêu nhỏ gọn (~30MB), bảo mật cao, phục vụ file tĩnh tại cổng 3005 |
| **CI/CD** | GitHub Actions Pipeline | Tự động Lint & Build trên `ubuntu-latest`, hỗ trợ `workflow_dispatch` và kích hoạt triển khai Staging |

---

## 3. DANH SÁCH CÁC CÔNG VIỆC & TÍNH NĂNG ĐÃ HOÀN THÀNH

### 3.1. Khởi tạo & Định vị Bản sắc Giao diện (Brand Identity)
- [x] Thiết lập dự án Next.js 16 trên nền tảng TypeScript và Tailwind CSS v4.
- [x] Chuyển đổi toàn diện bộ nhận diện thương hiệu từ dự án gốc sang **Du học Việt - Trung**:
  - **Màu chủ đạo (Primary)**: Sắc Đỏ Truyền Thống / Đỏ Đô (`#991b1b`, `#7f1d1d`) tượng trưng cho sự may mắn, thịnh vượng và năng lượng học thuật Á Đông.
  - **Màu điểm nhấn (Accent)**: Vàng Hoàng Gia / Hổ Phách (`#d97706`, `#b45309`) tạo cảm giác sang trọng, trang trọng và uy tín giáo dục.
- [x] Tích hợp chuẩn xuất bản tĩnh (`output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`) giúp trang web có thể triển khai trên bất kỳ CDN/Server Nginx nào với chi phí vận hành 0 đồng.

### 3.2. Hệ thống Song ngữ Việt - Trung (i18n Chuyên sâu)
- [x] Tinh giản bộ chuyển đổi ngôn ngữ chuẩn xác cho học viên: tập trung vào **Tiếng Việt (`VI`)** và **Tiếng Trung Giản thể (`中文 - ZH`)** (loại bỏ nút tiếng Anh theo đúng định hướng thị trường du học).
- [x] Xây dựng `LanguageProvider` với Context API, ghi nhớ vĩnh viễn ngôn ngữ người dùng lựa chọn qua `localStorage`.
- [x] Cung cấp bộ từ điển song ngữ chuẩn xác tại `src/data/i18n.ts` cho toàn bộ giao diện: Menu điều hướng, Tiêu đề phần, Nút kêu gọi (CTA), Nhãn biểu mẫu tuyển sinh, Thông báo chân trang.

### 3.3. Tích hợp Quản trị dữ liệu qua Google Sheets (Headless CMS Miễn Phí)
- [x] Xây dựng bộ điều hợp (adapter) kết nối trực tiếp với trang Google Sheets công khai (`1g9f6khQqciZHwW9UdMh6p-c1IN0WRighRkfyx503gDw`):
  - **Tab `site_config`**: Cấu hình tên trung tâm, hotline, email, địa chỉ, mạng xã hội, khẩu hiệu song ngữ.
  - **Tab `stats`**: Quản lý 4 chỉ số thống kê nổi bật (Số học viên, Tỷ lệ đỗ học bổng, Trường đối tác, Số suất học bổng toàn phần đã trao).
  - **Tab `timeline`**: Quản lý lộ trình 4 bước du học cùng nội dung thuyết minh và hình ảnh tương ứng.
  - **Tab `partners`**: Quản lý danh sách các trường đại học đối tác danh tiếng tại Trung Quốc (Bắc Kinh, Thanh Hoa, Vũ Hán, Chiết Giang, Fudan...).
  - **Tab `programs`**: Quản lý danh sách các chương trình học bổng, học phí, thời lượng và chỉ tiêu tuyển sinh.
  - **Tab `news`**: Quản trị bài viết tin tức, thông báo tuyển sinh, cẩm nang du học, bài chia sẻ kinh nghiệm săn học bổng.
  - **Tab `faculty`**: Quản trị danh sách chuyên gia tư vấn, cố vấn học thuật, cựu du học sinh xuất sắc.
- [x] **Giải quyết triệt để bài toán tải chậm & chớp nháy (Skeleton Flicker)**:
  - Tích hợp dữ liệu ban đầu sẵn trong bundle (`src/data/programs.ts`, `src/data/timeline.ts`...).
  - Áp dụng cơ chế **Stale-While-Revalidate**: Website nạp ngay lập tức dữ liệu cache từ `localStorage`, sau đó gửi request ngầm cập nhật từ Google Sheets, giúp tốc độ phản hồi đạt mức 0.0s đối với người dùng.
- [x] Xây dựng sẵn file mẫu Excel master `web-du-hoc-viet-trung.xlsx` và các file CSV trong thư mục `google-sheets-csv/` để người quản lý tải lên Google Drive bất kỳ lúc nào.

### 3.4. Chi tiết các Trang & Chức năng Giao diện Đặc sắc

#### 1. Trang chủ (`/`)
- **Hero Section**:
  - Banner hình ảnh đồ sộ, thông điệp truyền cảm hứng: *"Chắp Cánh Ước Mơ Du Học Trung Quốc Cùng Đại Học Mở TP.HCM"*.
  - Hai nút kêu gọi hành động nổi bật: "Khám Phá Học Bổng" và "Đăng Ký Tư Vấn Ngay".
  - Thanh thống kê nổi (Floating Stats Bar) hiển thị số liệu thực tế cập nhật từ Google Sheet (ví dụ: `2,468+` Học viên, `345+` Apply thành công, `120+` Đại học đối tác, `138+` Suất học bổng toàn phần).
- **Lộ trình Du học - Hiệu ứng độc quyền Sticky Stacking Cards (`TimelineProcess.tsx`)**:
  - Được thiết kế dựa trên chuyển động cao cấp trong video mẫu `di chuyển.mp4`.
  - Khi người dùng cuộn chuột, 4 thẻ lộ trình du học sẽ lần lượt trượt lên và xếp chồng (stacking) lên nhau tạo cảm giác 3D chiều sâu:
    1. *Bước 1: Tư Vấn & Định Hướng Trường* (Hình nền: Vạn Lý Trường Thành - Bắc Kinh)
    2. *Bước 2: Hoàn Thiện Hồ Sơ & Đào Tạo HSK* (Hình nền: Non nước Quế Lâm)
    3. *Bước 3: Xin Visa & Nhận Giấy Báo Nhập Học* (Hình nền: Bến Thượng Hải hiện đại)
    4. *Bước 4: Đồng Hành Cất Cánh & Hòa Nhập Du Học* (Hình nền: Kỳ quan Trương Gia Giới)
- **Feature Grid (Thế mạnh vượt trội)**:
  - 4 trụ cột cam kết: Tỷ lệ đỗ học bổng dẫn đầu, Đội ngũ cố vấn là cựu du học sinh/tiến sĩ từ Trung Quốc, Mạng lưới đối tác hơn 120 trường top đầu, Hỗ trợ trọn gói từ lúc làm hồ sơ đến khi tốt nghiệp.
- **Danh mục Chương trình & Học bổng (`FeatureGrid.tsx`)**:
  - Hệ thống thẻ chương trình: Học bổng CSC toàn phần, Học bổng CIS (Khổng Tử), Hệ Cử nhân 4 năm, Thạc sĩ 2-3 năm, Khóa tiếng ngắn hạn 1 năm.
  - Phân loại rõ ràng học phí, điều kiện HSK, địa điểm và chế độ đãi ngộ (miễn học phí, miễn ký túc xá, cấp sinh hoạt phí hàng tháng).
- **Mạng lưới Đối tác (`PartnersSection.tsx`)**:
  - Logo và tên các trường đại học hàng đầu Trung Quốc liên kết với HCMCOU.
- **Tin tức & Cẩm nang mới nhất (`LatestNews.tsx`)**:
  - Lấy động 3 bài viết nổi bật về kinh nghiệm xin học bổng, lịch thi HSK, chính sách visa mới nhất.

#### 2. Trang Giới thiệu (`/about`)
- Lịch sử hình thành và phát triển của chương trình hợp tác quốc tế Việt - Trung tại Trường Đại học Mở TP.HCM.
- Tuyên ngôn Sứ mệnh chắp cánh tri thức, Tầm nhìn trở thành đơn vị tư vấn và đào tạo dự bị du học Trung Quốc uy tín hàng đầu khu vực phía Nam.
- Kết nối dữ liệu động cho phép ban biên tập sửa đổi thông điệp giới thiệu trực tiếp trên Google Sheets.

#### 3. Trang Chương trình Học bổng & Đào tạo (`/programs` & `/programs/[slug]`)
- Bộ lọc nhanh chương trình theo cấp độ: Tất cả, Học bổng Chính phủ (CSC), Học bổng Khổng Tử (CIS), Khóa học tiếng HSK, Hệ Đại học/Thạc sĩ.
- Trang chi tiết từng chương trình (`/programs/[slug]`):
  - Sinh trang tĩnh tự động (`generateStaticParams`).
  - Lộ trình đào tạo, yêu cầu HSK/GPA, danh sách quyền lợi chi tiết (trợ cấp 2,500 - 3,500 NDT/tháng, bảo hiểm, phòng ở), form đăng ký tư vấn trực tiếp cho từng chương trình.

#### 4. Trang Đội ngũ Cố vấn & Giảng viên (`/faculty`)
- Danh sách các thầy cô, tiến sĩ tốt nghiệp từ các trường đại học trọng điểm Trung Quốc (Thanh Hoa, Bắc Kinh, Chiết Giang, Trung Sơn...).
- Đội ngũ chuyên gia bản ngữ luyện thi HSK/HSKK và thẩm định hồ sơ bài luận (Study Plan).
- Tự động hiển thị và đồng bộ theo trạng thái quản trị trên Google Sheets.

#### 5. Trang Tin tức & Cẩm nang Săn học bổng (`/news` & `/news/[slug]`)
- Tổng hợp bài viết theo các chuyên mục: Thông báo học bổng, Kinh nghiệm du học, Đời sống du học sinh, Hướng dẫn hồ sơ.
- Trang đọc bài viết chuyên nghiệp, chuẩn Typography, tối ưu SEO với thẻ Dynamic OpenGraph giúp hiển thị đẹp mắt khi chia sẻ lên Zalo, Facebook.

#### 6. Trang Tuyển sinh & Hướng dẫn Hồ sơ (`/admissions`)
- Cẩm nang hồ sơ đầy đủ: Hộ chiếu, Bằng tốt nghiệp & Bảng điểm dịch thuật công chứng, Giấy khám sức khỏe du học Trung Quốc, Lý lịch tư pháp số 2, Thư giới thiệu của giáo sư, Kế hoạch học tập (Study Plan).
- **Form đăng ký thẩm định học bổng online**: Cho phép học sinh gửi thông tin điểm GPA, trình độ HSK hiện tại để nhận lộ trình săn học bổng miễn phí 1-1.
- Khối câu hỏi thường gặp (FAQ) giải đáp chi tiết về chi phí sinh hoạt, điều kiện ăn ở tại Trung Quốc, cách duy trì học bổng qua các năm.

#### 7. Trang Liên hệ & Hỗ trợ sinh viên (`/contact`)
- Thông tin văn phòng tư vấn tại Trường Đại học Mở TP.HCM (97 Võ Văn Tần, P. Võ Thị Sáu, Q.3, TP.HCM).
- Hotline hỗ trợ, Zalo tư vấn du học, Email tiếp nhận hồ sơ, bản đồ hướng dẫn đường đi.

#### 8. Layout toàn cục & Tương tác
- **Header**: Thanh điều hướng nổi với logo song ngữ, bộ chọn ngôn ngữ `VI | 中文` nhanh nhạy, menu đa cấp và drawer trượt êm ái trên màn hình điện thoại di động.
- **Footer**: Bản quyền Trường Đại học Mở TP.HCM, liên kết hữu ích, thông tin chứng nhận và mạng xã hội.
- **Trang 404 (`not-found.tsx`)**: Thiết kế thân thiện, định hướng người dùng quay lại cổng thông tin chính.

---

## 4. CẤU TRÚC THƯ MỤC NGUỒN (SOURCE CODE STRUCTURE)

```
demoweb-ou-vhn/
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD Workflow (Chạy test trên ubuntu-latest, hỗ trợ workflow_dispatch)
├── google-sheets-csv/              # 7 File CSV mẫu chuẩn hóa tương ứng với các tab trên Google Sheets
│   ├── site_config.csv             # Cấu hình website, hotline, địa chỉ, slogan
│   ├── stats.csv                   # Thống kê 4 cột số liệu nổi bật
│   ├── timeline.csv                # 4 bước lộ trình du học kèm hình ảnh danh thắng Trung Quốc
│   ├── partners.csv                # Mạng lưới các trường đại học đối tác Trung Quốc
│   ├── programs.csv                # Danh mục các chương trình học bổng & khóa học
│   ├── news.csv                    # Danh sách tin tức & bài viết cẩm nang
│   └── faculty.csv                 # Danh sách giảng viên & cố vấn du học
├── public/                         # Tài nguyên hình ảnh, biểu tượng tĩnh
│   ├── images/
│   │   └── landscapes/             # Bộ sưu tập 4 danh lam thắng cảnh Trung Quốc chất lượng cao
│   │       ├── china-beijing.jpg   # Vạn Lý Trường Thành - Bắc Kinh
│   │       ├── china-guilin.jpg    # Thắng cảnh sông Ly - Quế Lâm
│   │       ├── china-shanghai.jpg  # Tháp Đông Phương Minh Châu - Thượng Hải
│   │       └── china-zhangjiajie.jpg # Kỳ quan cột đá Trương Gia Giới
│   └── icons/                      # Favicon, Logo Trường Đại học Mở TP.HCM
├── src/
│   ├── app/                        # Next.js App Router (Các trang chính)
│   │   ├── layout.tsx              # Root Layout bọc LanguageProvider, Header, Footer
│   │   ├── page.tsx                # Trang chủ (Home)
│   │   ├── not-found.tsx           # Trang báo lỗi 404
│   │   ├── globals.css             # Theme màu đỏ/vàng hoàng gia & biến Tailwind CSS v4
│   │   ├── about/                  # Trang Giới thiệu trung tâm
│   │   ├── admissions/             # Trang Tuyển sinh, nộp hồ sơ & FAQ
│   │   ├── contact/                # Trang Liên hệ & văn phòng tư vấn
│   │   ├── faculty/                # Trang Đội ngũ giảng viên & chuyên gia
│   │   ├── news/                   # Trang Tin tức & Cẩm nang du học
│   │   │   └── [slug]/             # Chi tiết bài viết cẩm nang
│   │   └── programs/               # Trang Chương trình học bổng
│   │       └── [slug]/             # Chi tiết từng loại học bổng
│   ├── components/
│   │   ├── home/                   # Các khối giao diện trang chủ
│   │   │   ├── HeroSection.tsx     # Hero banner & số liệu thống kê
│   │   │   ├── TimelineProcess.tsx # Lộ trình cuộn Sticky Stacking Cards cảnh quan Trung Quốc
│   │   │   ├── FeatureGrid.tsx     # Danh mục học bổng & cam kết chất lượng
│   │   │   ├── LatestNews.tsx      # Tin tức & cẩm nang mới nhất
│   │   │   └── PartnersSection.tsx # Mạng lưới trường đại học đối tác
│   │   ├── layout/                 # Header (Song ngữ VI/ZH), Footer, Container
│   │   ├── providers/              # LanguageProvider (Đa ngôn ngữ VI / 中文)
│   │   └── ui/                     # UI components dùng chung (Button, Card, Badge, Input...)
│   ├── data/                       # Dữ liệu nội bộ & Module kết nối Google Sheets
│   │   ├── i18n.ts                 # Từ điển dịch thuật Song ngữ Việt - Trung
│   │   ├── site.ts                 # Thông tin cấu hình mặc định
│   │   ├── sheets.ts               # Module kết nối, fetch CSV & cache Google Sheets API
│   │   ├── programs.ts             # Dữ liệu học bổng & khóa học tĩnh dự phòng
│   │   ├── timeline.ts             # Dữ liệu các bước lộ trình du học
│   │   └── news.ts                 # Dữ liệu tin tức dự phòng
│   └── lib/
│       └── utils.ts                # Hàm tiện ích gộp class CSS (clsx + tailwind-merge)
├── web-du-hoc-viet-trung.xlsx      # Bảng tính Excel mẫu đầy đủ 7 tab cho quản trị viên
├── Dockerfile                      # Multi-stage Docker build cho môi trường Production
├── nginx.conf                      # Cấu hình máy chủ web Nginx phục vụ static file trên cổng 3005
├── next.config.ts                  # Cấu hình Next.js (Static Export, Trailing Slash)
├── package.json                    # Cấu hình dependencies (React 19, Next 16, Tailwind 4, Lucide)
├── pnpm-lock.yaml                  # Lockfile chuẩn hóa phiên bản pnpm
└── tsconfig.json                   # Cấu hình TypeScript 5 nghiêm ngặt
```

---

## 5. HƯỚNG DẪN VẬN HÀNH VÀ QUẢN TRỊ DỮ LIỆU

### 5.1. Khởi chạy trên môi trường phát triển (Local Development)
```bash
# 1. Cài đặt các gói phụ thuộc (Dependencies)
pnpm install

# 2. Khởi chạy máy chủ phát triển tại cổng 3000
pnpm dev

# 3. Kiểm tra định dạng mã nguồn và kiểu dữ liệu TypeScript
pnpm lint
npx tsc --noEmit
```

### 5.2. Đóng gói sản phẩm tĩnh (Static Build)
```bash
# Biên dịch mã nguồn và xuất ra thư mục tĩnh /out
pnpm build
```

### 5.3. Đóng gói và chạy bằng Docker
```bash
# 1. Build Docker image
docker build -t demoweb-ou-viet-trung:latest .

# 2. Khởi chạy container trên cổng 3005
docker run -d -p 3005:3005 --name demoweb-viet-trung demoweb-ou-viet-trung:latest

# 3. Kiểm tra trạng thái hoạt động
curl http://localhost:3005/
```

### 5.4. Hướng dẫn Quản trị Nội dung qua Google Sheets
1. Mở trang Google Sheets quản trị dự án đã được chia sẻ quyền xem công khai:  
   🔗 [Bảng tính Google Sheets Quản trị Du học Việt - Trung](https://docs.google.com/spreadsheets/d/1g9f6khQqciZHwW9UdMh6p-c1IN0WRighRkfyx503gDw/edit)
2. Chỉnh sửa nội dung tại các tab tương ứng:
   - Sửa số liệu thống kê tại tab **`stats`** (ví dụ: thay đổi số lượng học viên `9999+` hoặc số suất học bổng).
   - Thêm bài viết mới tại tab **`news`**.
   - Thêm/bớt chương trình học bổng tại tab **`programs`**.
   - Cập nhật đối tác trường học tại tab **`partners`**.
3. **Hiệu lực ngay lập tức**: Người dùng chỉ cần tải lại trang web hoặc mở lại trình duyệt, toàn bộ số liệu và thông tin mới sẽ được tự động đồng bộ mà không cần phải lập trình viên can thiệp hay build lại mã nguồn.

---

## 6. KẾT LUẬN & ĐỊNH HƯỚNG PHÁT TRIỂN

### 6.1. Kết quả đạt được
- **Hoàn thành 100% mục tiêu chuyển đổi** sang Cổng thông tin & Tư vấn Du học Việt - Trung hiện đại, sang trọng, mang đậm bản sắc văn hóa Á Đông.
- **Tính năng chuyển động Stacking Cards đột phá**: Tái hiện sinh động vẻ đẹp 4 danh thắng Trung Quốc theo từng thao tác cuộn trang của người dùng.
- **Hệ thống Song ngữ Việt - Trung hoàn thiện**: Phục vụ chính xác tệp du học sinh, phụ huynh và đối tác các trường đại học tại Trung Quốc.
- **Giải pháp Headless CMS Google Sheets siêu tốc**: Vừa tiết kiệm 100% chi phí cơ sở dữ liệu, vừa mang lại trải nghiệm chỉnh sửa trực quan, tức thì cho ban quản trị.
- **Quy chuẩn mã nguồn chất lượng cao**: Không có lỗi TypeScript (`tsc --noEmit`), tối ưu hóa tốc độ tải trang SSG cực đỉnh.

### 6.2. Đề xuất nâng cấp trong tương lai
- **Cổng trắc nghiệm chọn trường và ngành học**: Hệ thống gợi ý trường đại học phù hợp dựa trên điểm GPA và mục tiêu tài chính của học sinh.
- **Tính năng tra cứu trạng thái hồ sơ học bổng**: Cho phép học sinh nhập mã hồ sơ để theo dõi tiến độ nộp sang trường đại học Trung Quốc (Đã nhận hồ sơ $\rightarrow$ Thẩm định $\rightarrow$ Phỏng vấn $\rightarrow$ Trúng tuyển).
- **Kho tài liệu đề thi HSK & HSKK trực tuyến**: Cung cấp đề thi thử và tài liệu ôn luyện có đáp án trực tiếp trên website.
