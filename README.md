# CỔNG THÔNG TIN & TƯ VẤN DU HỌC VIỆT - TRUNG (HCMCOU)
> Hệ thống Cổng thông tin điện tử, Tuyển sinh & Xét duyệt Học bổng Du học Trung Quốc trực thuộc **Trường Đại học Mở TP.HCM**.

---

## 📊 LINK BẢNG TÍNH GOOGLE SHEETS QUẢN TRỊ DỮ LIỆU
Toàn bộ dữ liệu hiển thị trên website (Số liệu thống kê, Hotline, Học bổng CSC/CIS, Lộ trình du học, Tin tức, Giảng viên...) được kết nối và quản trị trực tiếp tại:

👉 **[BẢNG TÍNH GOOGLE SHEETS QUẢN TRỊ DỰ ÁN](https://docs.google.com/spreadsheets/d/1tO_F1zDP81n9io4B0HV1qgMWvZ9EaMg0tHSA6HqYdG8/edit)**

> **Cơ chế cập nhật**: Quản trị viên chỉ cần mở link Google Sheets trên, chỉnh sửa chữ/số tại các ô tính $\rightarrow$ Website sẽ tự động đồng bộ ngay lập tức (dưới 0.3s) mà không cần can thiệp vào code.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, `@tailwindcss/typography`
- **Chuyển động**: Framer Motion 13 (Hiệu ứng cuộn Sticky Stacking Cards 3D)
- **Data Engine**: Google Sheets API (CSV Direct Fetch), Stale-While-Revalidate Caching
- **Hệ thống Đa ngôn ngữ**: Song ngữ chuẩn xác **Tiếng Việt (`VI`)** & **Tiếng Trung (`ZH / 中文`)**

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY (LOCAL DEVELOPMENT)

```bash
# 1. Cài đặt các gói phụ thuộc
pnpm install

# 2. Khởi chạy máy chủ phát triển (port 3000)
pnpm dev

# 3. Kiểm tra định dạng mã nguồn và TypeScript
pnpm lint
npx tsc --noEmit

# 4. Đóng gói bản tĩnh (Static Export vào thư mục /out)
pnpm build
```

---

## 📁 CÁC FILE TÀI LIỆU QUAN TRỌNG
- [`WORKFLOW.md`](./WORKFLOW.md): Tài liệu quy trình vận hành dữ liệu & Kịch bản Demo thực tế 3 màn cho người thuyết trình.
- [`VietTrung.md`](./VietTrung.md): Báo cáo tổng kết dự án và toàn bộ đặc tả kỹ thuật.
- [`.env.example`](./.env.example): Mẫu biến môi trường cấu hình link Google Sheets.
- [`web-du-hoc-viet-trung.xlsx`](./web-du-hoc-viet-trung.xlsx): File mẫu bảng tính Excel dự phòng đầy đủ 7 tab đã kẻ viền và in đậm tiêu đề.
