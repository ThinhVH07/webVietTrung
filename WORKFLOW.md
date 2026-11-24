# TÀI LIỆU WORKFLOW VẬN HÀNH & QUẢN TRỊ DỮ LIỆU (DEMO GUIDE)
**Dự án**: Cổng Thông Tin & Tư Vấn Du Học Việt - Trung (Trường Đại học Mở TP.HCM - HCMCOU)  
**Tài liệu dành cho**: Hội đồng thẩm định, Ban giám hiệu, Quản trị viên & Đội ngũ vận hành  
**Trạng thái**: Đã kết nối Google Sheets trực tiếp • Sẵn sàng thuyết trình & Demo thực tế  
**Cập nhật lần cuối**: 24/11/2026  

---

## MỤC LỤC
1. [Tổng quan mô hình vận hành (System Architecture)](#1-tổng-quan-mô-hình-vận-hành-system-architecture)
2. [Cấu trúc dữ liệu chuẩn hóa (Hệ thống 7 Sheet Google Sheets / Excel)](#2-cấu-trúc-dữ-liệu-chuẩn-hóa-7-sheet)
   - [Sheet 1: `site_config` — Cấu hình chung, Hotline, Địa chỉ, Mạng xã hội](#sheet-1-site_config--cấu-hình-chung--liên-hệ)
   - [Sheet 2: `stats` — 4 Chỉ số thống kê nổi bật đầu trang](#sheet-2-stats--chỉ-số-thống-kê-nổi-bật)
   - [Sheet 3: `timeline` — Quy trình 4 bước du học & Phong cảnh Trung Quốc](#sheet-3-timeline--quy-trình-4-bước-du-học)
   - [Sheet 4: `partners` — Mạng lưới các trường Đại học đối tác Trung Quốc](#sheet-4-partners--đại-học-đối-tác-trung-quốc)
   - [Sheet 5: `programs` — Danh mục Học bổng CSC, CIS & Khóa đào tạo HSK](#sheet-5-programs--danh-mục-học-bổng--đào-tạo)
   - [Sheet 6: `news` — Tin tức, Sự kiện & Cẩm nang săn học bổng](#sheet-6-news--tin-tức-sự-kiện--cẩm-nang)
   - [Sheet 7: `faculty` — Đội ngũ Cố vấn học thuật & Chuyên gia Hán ngữ](#sheet-7-faculty--đội-ngũ-cố-vấn--giảng-viên)
3. [Quy trình luồng dữ liệu 3 trạm (Data Pipeline Workflow)](#3-quy-trình-luồng-dữ-liệu-3-trạm-data-pipeline)
4. [Cơ chế tối ưu: Tốc độ < 0.3s & Dự phòng chống sập (Anti-Flicker & Fallback)](#4-cơ-chế-tối-ưu-tốc-độ--dự-phòng-chống-sập)
5. [KỊCH BẢN THUYẾT TRÌNH DEMO THỰC TẾ (LIVE DEMO SCRIPT - TỪNG BƯỚC)](#5-kịch-bản-thuyết-trình-demo-thực-tế-live-demo-script)
6. [Sổ tay thao tác nhanh cho Biên tập viên (Quick Cheat Sheet)](#6-sổ-tay-thao-tác-nhanh-cho-biên-tập-viên)

---

## 1. TỔNG QUAN MÔ HÌNH VẬN HÀNH (SYSTEM ARCHITECTURE)

Dự án được xây dựng theo kiến trúc **Headless CMS không máy chủ cơ sở dữ liệu** (Serverless Data Layer), kết hợp giữa sức mạnh giao diện hiện đại của **Next.js 16 (App Router)** và sự tiện lợi, quen thuộc của **Google Sheets / Excel**:

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     TRẠM 1: NHẬP LIỆU DỄ DÀNG   │       │   TRẠM 2: TRUY XUẤT SIÊU TỐC    │       │ TRẠM 3: TRẢI NGHIỆM GIAO DIỆN   │
│                                 │       │                                 │       │                                 │
│  Quản trị viên / Thầy cô chỉnh  │ ────> │  Google Visualization CSV API   │ ────> │  Next.js 16 Client nhận dữ liệu │
│  sửa trực tiếp trên Google Sheet│       │  Thời gian phản hồi < 0.3 giây  │       │  Hiển thị tức thì (Song ngữ)    │
│  hoặc tải file Excel mẫu lên    │       │  Không tốn chi phí Server CMS   │       │  Hiệu ứng thẻ xếp lớp 3D mượt mà│
└─────────────────────────────────┘       └─────────────────────────────────┘       └─────────────────────────────────┘
```

### Ưu điểm vượt trội khi thuyết trình:
- **Tiết kiệm 100% chi phí phần mềm quản trị CMS**: Nhà trường không phải thuê máy chủ cơ sở dữ liệu đắt đỏ (như MySQL, PostgreSQL) hay xây dựng trang quản trị Admin rườm rà.
- **Thân thiện với người dùng không chuyên kỹ thuật**: Bất kỳ nhân viên tuyển sinh, thư ký hay giảng viên nào cũng có thể sửa chữ, cập nhật số điện thoại, đăng học bổng trực tiếp trên Google Sheets.
- **Phản hồi tức thì (Real-time Sync)**: Chỉnh sửa xong trên Sheet, chỉ cần nhấn F5 hoặc mở lại trang web là toàn bộ thông tin mới lập tức xuất hiện.

---

## 2. CẤU TRÚC DỮ LIỆU CHUẨN HÓA (7 SHEET)

Hệ thống quản trị được chuẩn hóa thành **7 bảng tính (Sheet)** với tên gọi và định dạng cột rõ ràng. Cả 7 Sheet này đã được tạo sẵn trong file Excel mẫu **`WEB_Việt-Trung.xlsx`** (kẻ viền bảng đẹp mắt, in đậm dòng tiêu đề):

---

### Sheet 1: `site_config` — Cấu hình chung & Liên hệ
Quản lý các thông tin liên lạc xuất hiện xuyên suốt toàn bộ website (Header, Footer, Floating Buttons, Trang Liên hệ).

| Tên cột | Kiểu dữ liệu | Ý nghĩa | Ví dụ điền mẫu |
| :--- | :--- | :--- | :--- |
| **`key`** | Chữ (không dấu) | Mã định danh thông tin | `phone`, `email`, `address`, `opening_hours`, `facebook_url`, `zalo_url` |
| **`name`** | Chữ | Tên gợi nhớ cho biên tập viên | *Hotline tư vấn tuyển sinh*, *Email tiếp nhận hồ sơ* |
| **`value_vi`** | Văn bản | Giá trị hiển thị ở giao diện **Tiếng Việt** | `(028) 3930 0089`, `viettrung@ou.edu.vn` |
| **`value_zh`** | Văn bản | Giá trị hiển thị khi chọn **Tiếng Trung (中文)** | `(028) 3930 0089`, `胡志明市第三郡武文秦街97号` |
| **`note`** | Văn bản | Ghi chú vị trí hiển thị trên web | *Hiển thị trên: Top Bar, Footer, Nút liên hệ nổi* |

---

### Sheet 2: `stats` — Chỉ số thống kê nổi bật
Quản lý 4 cột số liệu thành tựu uy tín nằm ngay dưới Banner chính của trang chủ.

| Tên cột | Ý nghĩa | Quy tắc điền | Ví dụ thực tế |
| :--- | :--- | :--- | :--- |
| **`key`** | Mã định danh thống kê | `stat_students`, `stat_success`, `stat_partners`, `stat_scholarships` | `stat_students` |
| **`value`** | **Con số thực tế** | Chỉ điền số nguyên | **`9999`** (hoặc `2468`) |
| **`suffix`** | Ký hiệu sau con số | Ký tự kèm theo | `+` hoặc `%` |
| **`label_vi`** | Chú thích Tiếng Việt | Viết hoa chữ cái đầu | `Người dùng / Học viên`, `Apply thành công` |
| **`label_zh`** | Chú thích Tiếng Trung | Chữ Hán giản thể chuẩn | `累计咨询学子`, `中方合作高校` |
| **`note`** | Vị trí cột | Số thứ tự cột hiển thị | *Vị trí: Cột 1 - Thanh thống kê dưới Banner Hero* |

---

### Sheet 3: `timeline` — Quy trình 4 bước du học & Danh thắng Trung Quốc
Quản lý các thẻ xếp chồng độc quyền (**Sticky Stacking Cards**) cuộn theo màn hình tại trang chủ.

| Tên cột | Ý nghĩa | Quy tắc điền |
| :--- | :--- | :--- |
| **`step`** | Số thứ tự bước | `01`, `02`, `03`, `04` |
| **`tag_vi` / `tag_zh`** | Thẻ giai đoạn | `GIAI ĐOẠN 01` / `第一阶段 · 评估` |
| **`location_vi` / `location_zh`** | Địa danh danh lam thắng cảnh | `Bắc Kinh · Cố Cung Hoàng Gia` / `北京 · 故宫紫禁城` |
| **`title_vi` / `title_zh`** | Tiêu đề chính của bước | `Tiếp Nhận Tư Vấn & Định Hướng Chọn Trường` |
| **`desc_vi` / `desc_zh`** | Mô tả chi tiết lộ trình | Đoạn văn 2-3 câu giải thích rõ quyền lợi và cách thực hiện |
| **`highlights_vi` / `zh`** | 3 gạch đầu dòng nổi bật | Ngăn cách nhau bằng **dấu phẩy `,`** để web tự tạo 3 dấu tích tròn |
| **`image`** | Đường dẫn ảnh danh thắng | `/images/landscapes/china-beijing.jpg`, `china-guilin.jpg`, `china-shanghai.jpg`, `china-zhangjiajie.jpg` |

---

### Sheet 4: `partners` — Đại học đối tác Trung Quốc
Quản lý danh sách các trường đại học hàng đầu thuộc đề án 985, 211, C9 League tại khu vực Đối tác.

| Tên cột | Ý nghĩa | Ví dụ điền mẫu |
| :--- | :--- | :--- |
| **`id`** | Mã định danh trường | `peking-univ`, `tsinghua-univ`, `fudan-univ`, `sjtu`, `whu` |
| **`name_vi`** | Tên trường (kèm tên tiếng Anh) | *Đại học Bắc Kinh (Peking University)* |
| **`name_zh`** | Tên chữ Hán chính thức | *北京大学 (Peking University)* |
| **`location`** | Tỉnh / Thành phố tọa lạc | `Bắc Kinh / 北京`, `Thượng Hải / 上海`, `Vũ Hán / 武汉` |
| **`rank`** | Thứ hạng / Danh hiệu học thuật | `C9 League • Top 1 Trung Quốc`, `Dự án 985 • Song Nhất Lưu` |

---

### Sheet 5: `programs` — Danh mục Học bổng & Đào tạo
Quản lý các suất học bổng CSC, CIS, SGS, các khóa học HSK hiển thị ở lưới học bổng trang chủ và trang `/programs`.

| Tên cột | Ý nghĩa | Quy tắc điền |
| :--- | :--- | :--- |
| **`slug`** | Đuôi đường dẫn trang chi tiết | Viết thường, nối bằng dấu gạch ngang (vd: `hoc-bong-chinh-phu-trung-quoc-csc`) |
| **`title` / `titleZh`** | Tên học bổng / Khóa học | *Học bổng Chính phủ Trung Quốc (CSC)* / *中国政府奖学金 (CSC)* |
| **`category`** | Phân loại tab lọc | `korean` (học bổng toàn phần), `japanese` (CIS / HSK), `exchange` (trao đổi) |
| **`description` / `zh`** | Mô tả vắn tắt quyền lợi | Nêu rõ mức tài trợ học phí, trợ cấp sinh hoạt phí hàng tháng |
| **`duration`** | Thời lượng chương trình | `1 - 4 năm`, `1 - 3 năm`, `3 - 6 tháng` |
| **`features`** | Các ưu đãi gạch đầu dòng | Ngăn cách nhau bằng **dấu phẩy `,`** (vd: *Miễn 100% học phí, KTX miễn phí, Trợ cấp 3.500 NDT/tháng*) |
| **`badgeVi` / `badgeZh`** | Nhãn huy hiệu góc trên thẻ | *Học bổng Toàn phần CSC* / *CSC全额奖学金* |
| **`image`** | Ảnh khuôn viên trường | Đường dẫn ảnh nội bộ hoặc đường link ảnh online |

---

### Sheet 6: `news` — Tin tức, Sự kiện & Cẩm nang
Quản lý các bài thông báo tuyển sinh, lịch thi HSK, kinh nghiệm săn học bổng tại `/news` và `/news/[slug]`.

| Tên cột | Ý nghĩa | Quy tắc điền |
| :--- | :--- | :--- |
| **`slug`** | Đường dẫn đọc bài báo | vd: `thong-bao-hoc-bong-csc-2026-2027` |
| **`title` / `titleZh`** | Tiêu đề bài viết | *Thông báo tuyển sinh Học bổng Chính phủ Trung Quốc (CSC)...* |
| **`category`** | Thẻ danh mục | `Học bổng`, `Sự kiện`, `Thông báo`, `Tuyển sinh` |
| **`date`** | Ngày đăng bài | `10/10/2026`, `28/09/2026` |
| **`excerpt` / `zh`** | Tóm tắt hiển thị ngoài danh sách | Đoạn văn ngắn 2-3 câu khơi gợi sự tò mò |
| **`content` / `zh`** | Toàn bộ nội dung bài viết chi tiết | Hỗ trợ xuống dòng tự nhiên, render đầy đủ khi mở trang chi tiết |
| **`featured`** | Ghim lên bài viết nổi bật to nhất | Điền **`TRUE`** (bài đinh ghim đầu) hoặc **`FALSE`** (bài viết phụ bên phải) |

---

### Sheet 7: `faculty` — Đội ngũ Cố vấn & Giảng viên
Quản lý danh sách ban giám đốc, giáo sư, chuyên gia bản ngữ luyện thi HSK tại trang `/faculty`.

| Tên cột | Ý nghĩa | Ví dụ điền mẫu |
| :--- | :--- | :--- |
| **`name` / `nameZh`** | Họ tên & Học hàm học vị | *PGS.TS. Trần Quốc Hùng* / *陈国雄 准教授/博士* |
| **`title` / `titleZh`** | Chức danh đảm nhiệm | *Giám đốc Trung tâm* / *中心主任* |
| **`specialization` / `zh`** | Chuyên môn phụ trách | *Hợp tác Giáo dục Quốc tế & Dự án 985/211* |
| **`bio` / `bioZh`** | Tiểu sử kinh nghiệm giảng dạy | Tốt nghiệp ĐH Bắc Kinh, Thanh Hoa, ECNU, cựu giám khảo HSK... |
| **`image`** | Ảnh đại diện | Đường dẫn ảnh hoặc hệ thống tự vẽ Avatar Initials sang trọng |

---

## 3. QUY TRÌNH LUỒNG DỮ LIỆU 3 TRẠM (DATA PIPELINE)

```
[BƯỚC 1: QUẢN TRỊ VIÊN]
Mở Google Sheet trên trình duyệt (hoặc tải file Excel WEB_Việt-Trung.xlsx lên)
Sửa thông tin: Đổi số liệu, thêm học bổng, sửa hotline...
            │
            ▼ (Google tự động lưu trong 0.1s)
[BƯỚC 2: GOOGLE SHEETS CLOUD ENGINE]
Đóng vai trò là Headless Data API qua giao thức Google Visualization (GViz)
Xuất bản dữ liệu sạch dạng CSV qua URL:
https://docs.google.com/spreadsheets/d/1g9f6khQqciZHwW9UdMh6p-c1IN0WRighRkfyx503gDw/edit
            │
            ▼ (Website Next.js fetch trong < 0.3s)
[BƯỚC 3: WEBSITE DU HỌC VIỆT - TRUNG]
1. Bộ chuyển đổi GoogleSheets Adapter bốc dữ liệu về.
2. Lưu vào Bộ nhớ đệm Client (LocalStorage Cache).
3. Gán tự động vào từng khối giao diện:
   • stats ─────────────► Thanh đếm số liệu Hero
   • timeline ──────────► Thẻ cuộn xếp lớp 3D phong cảnh
   • programs ──────────► Lưới lọc học bổng CSC / CIS
   • news ──────────────► Trang đọc báo & Tin tức nổi bật
   • faculty ───────────► Đội ngũ chuyên gia
```

---

## 4. CƠ CHẾ TỐI ƯU: TỐC ĐỘ < 0.3S & DỰ PHÒNG CHỐNG SẬP

Để đảm bảo hệ thống **luôn luôn chạy mượt mà trước mắt người xem demo**, mã nguồn website được tích hợp 2 lớp bảo vệ kỹ thuật cao cấp:

1. **Cơ chế Stale-While-Revalidate (Chống giật màn hình - Anti-Flicker)**:
   - Khi vừa tải trang, website lập tức hiển thị dữ liệu đang có trong cache `localStorage` (thời gian nạp: **0.001 giây**, không có hiện tượng chớp tắt hay xương khung skeleton giật mắt).
   - Đồng thời, một luồng ngầm gửi truy vấn lên Google Sheets để kiểm tra xem có nội dung gì mới không. Nếu có, giao diện sẽ nhẹ nhàng cập nhật số mới mà người dùng không hề thấy gián đoạn.
2. **Cơ chế Fallback nội bộ (Chống mất mạng - Zero Downtime)**:
   - Nếu mạng Internet bị rớt, hoặc trang Google Sheets đang trong chế độ riêng tư chưa cấp quyền, website **tự động chuyển sang đọc dữ liệu sao lưu có sẵn trong mã nguồn** (`src/data/*.ts`).
   - Website vẫn hiển thị đầy đủ 100% hình ảnh, học bổng, lộ trình du học mà không bao giờ báo lỗi `404` hay `500`.

---

## 5. KỊCH BẢN THUYẾT TRÌNH DEMO THỰC TẾ (LIVE DEMO SCRIPT)

> [!TIP]
> **Mẹo chuẩn bị trước khi demo**: Mở sẵn 2 cửa sổ trên màn hình máy tính (chia đôi màn hình: bên trái là **Website**, bên phải là **Google Sheets**).

### 🎬 Màn 1: Giới thiệu Tổng quan Giao diện & Bản sắc Du học Việt - Trung (2 phút)
1. **Trang chủ (`/`)**:
   - Trình bày Banner hoành tráng mang đậm màu sắc Á Đông: Tông Đỏ Đô (`#991b1b`) và Vàng Hoàng Gia (`#d97706`).
   - Giới thiệu thanh thống kê nổi bật: `9,999+` Học viên, `345+` Apply thành công, `120+` Đại học đối tác.
2. **Trình diễn Hiệu ứng Lộ trình xếp lớp 3D (Sticky Stacking Cards)**:
   - Cuộn nhẹ con lăn chuột qua phần "Lộ Trình Du Học Toàn Diện".
   - Chỉ cho người xem thấy 4 thẻ lộ trình lần lượt trượt lên và xếp chồng lên nhau, kèm theo vẻ đẹp của 4 danh lam thắng cảnh tiêu biểu Trung Quốc:
     - Thẻ 1: **Bắc Kinh** - Vạn Lý Trường Thành & Tử Cấm Thành.
     - Thẻ 2: **Quế Lâm** - Non nước hữu tình.
     - Thẻ 3: **Thượng Hải** - Phồn hoa hiện đại.
     - Thẻ 4: **Trương Gia Giới** - Kỳ quan thiên nhiên.
3. **Demo chuyển đổi Song ngữ (`VI` $\leftrightarrow$ `中文`)**:
   - Bấm vào nút `中文` trên Header: Toàn bộ Menu, Tiêu đề, Thẻ học bổng, Nút bấm lập tức chuyển sang tiếng Trung chuẩn xác mà không cần tải lại trang. Bấm lại `VI` để quay về tiếng Việt.

---

### 🎬 Màn 2: "Ảo thuật" Chỉnh sửa Dữ liệu Real-time qua Google Sheets (3 phút - GÂY ẤN TƯỢNG MẠNH NHẤT)
1. **Bước 1**: Nhìn vào màn hình bên phải (Google Sheets), chọn tab **`stats`**.
2. **Bước 2**: Tại ô `value` của dòng đầu tiên (`stat_students`), thay số `9999` thành một con số bất kỳ theo yêu cầu của khán giả (ví dụ: **`8888`** hoặc **`12500`**).
3. **Bước 3**: Quay sang màn hình bên trái (Website), bấm phím **F5 (Tải lại trang)**.
   - 👉 **Kết quả**: Con số trên website ngay lập tức nhảy thành con số mới!
4. **Bước 4 (Nâng cao)**:
   - Mở tab **`programs`**, sửa tên một học bổng hoặc đổi dòng quyền lợi.
   - F5 website: Thẻ học bổng tự động hiển thị nội dung mới.
   - *Thuyết minh với người xem*: "Toàn bộ thông tin tuyển sinh nhà trường có thể chỉnh sửa mọi lúc mọi nơi từ điện thoại hay máy tính, không cần phải gọi lập trình viên can thiệp!".

---

### 🎬 Màn 3: Tham quan các Trang Chức năng Chuyên sâu (2 phút)
- **Trang Học bổng (`/programs`)**: Trình diễn các bộ lọc theo tab: CSC Toàn phần, CIS Khổng Tử, Luyện thi HSK. Mở trang chi tiết học bổng xem lộ trình và chế độ sinh hoạt phí 2.500 - 3.500 NDT/tháng.
- **Trang Cố vấn (`/faculty`)**: Danh sách giáo sư Thanh Hoa, Bắc Kinh, ECNU với Avatar Initials đỏ đô sang trọng.
- **Trang Tuyển sinh (`/admissions`)**: Hướng dẫn quy trình 4 bước chuẩn bị hồ sơ du học và Form đăng ký tư vấn trực tuyến.
- **Trang Tin tức (`/news`)**: Bài viết tiêu điểm ghim đầu và các cẩm nang du học.

---

## 6. SỔ TAY THAO TÁC NHANH CHO BIÊN TẬP VIÊN (CHEAT SHEET)

| Nhu cầu của bạn | Tab cần mở trên Sheet | Thao tác cụ thể |
| :--- | :---: | :--- |
| **Đổi số hotline, email, giờ làm việc** | `site_config` | Sửa giá trị ở cột `value_vi` và `value_zh` tương ứng. |
| **Cập nhật số lượng học viên / học bổng** | `stats` | Sửa con số ở cột `value` (chỉ điền số nguyên). |
| **Thay đổi ảnh danh thắng hoặc bước lộ trình** | `timeline` | Sửa tiêu đề, mô tả hoặc thay link ảnh ở cột `image`. |
| **Thêm trường đại học đối tác mới** | `partners` | Thêm dòng mới, điền tên trường, thành phố và thứ hạng. |
| **Đăng gói học bổng / Khóa tiếng Trung mới** | `programs` | Thêm dòng mới, điền `slug` (không dấu), tên học bổng, thời lượng, các ưu đãi cách nhau bằng dấu phẩy. |
| **Đăng thông báo học bổng / bài báo mới** | `news` | Thêm dòng mới, điền tiêu đề, ngày đăng, tóm tắt và nội dung. Muốn ghim to nhất thì cột `featured` điền `TRUE`. |
| **Cập nhật danh sách giảng viên / cố vấn** | `faculty` | Điền tên, học vị, chuyên môn và kinh nghiệm công tác. |
