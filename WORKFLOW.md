# QUY TRÌNH LÀM VIỆC DỰ ÁN (PROJECT DEVELOPMENT WORKFLOW)
**Dự án**: Cổng thông tin & Tư vấn Du học Việt - Trung (Trường Đại học Mở TP.HCM)  
**Mã dự án**: `demoweb-ou-vhn`  
**Nhánh mặc định**: `master` | **Nhánh phát triển chính**: `dev`  

---

## 1. TỔNG QUAN QUY TRÌNH (OVERVIEW)

Quy trình phát triển và vận hành của dự án tuân thủ mô hình **Git Feature Branch Workflow kết hợp CI/CD tự động**:

```
[Nhánh master] ◄────────────── (Merge sau khi review/test) ──────────────┐
      ▲                                                                   │
      │                                                                   │
  [Nhánh dev]  ◄── (Pull Request) ── [feat/ten-tinh-nang]                 │
      │                                     ▲                             │
      ▼                                     │                             │
[GitHub Actions CI] (Tự động Lint & Build) ─┴── (Lập trình & Test local) ──┘
```

---

## 2. QUY TRÌNH PHÁT TRIỂN TÍNH NĂNG MỚI (STEP-BY-STEP)

### Bước 1: Đồng bộ và tạo nhánh mới từ `dev`
Luôn bắt đầu từ phiên bản mới nhất của nhánh `dev`:
```bash
# 1. Chuyển sang nhánh dev và kéo code mới nhất
git checkout dev
git pull origin dev

# 2. Tạo nhánh tính năng mới (theo tiền tố feat/ hoặc fix/)
git checkout -b feat/ten-tinh-nang
# Ví dụ: git checkout -b feat/bo-sung-hoc-bong-thuong-hai
```

### Bước 2: Lập trình và kiểm tra trên máy cục bộ (Local Testing)
Trong quá trình code, chạy máy chủ dev và kiểm tra định kỳ:
```bash
# Khởi động môi trường phát triển (cổng 3000)
pnpm dev

# Kiểm tra cú pháp và quy chuẩn code
pnpm lint

# Kiểm tra chặt chẽ kiểu dữ liệu TypeScript (bắt buộc 0 lỗi)
npx tsc --noEmit
```

### Bước 3: Đóng gói kiểm tra thử bản xuất bản tĩnh (Build Test)
Trước khi commit, luôn đảm bảo lệnh build tĩnh chạy thành công:
```bash
pnpm build
```

### Bước 4: Commit theo quy chuẩn Conventional Commits
Quy ước đặt thông điệp commit rõ ràng:
- `feat: ...` : Thêm tính năng, giao diện mới
- `fix: ...` : Sửa lỗi hiển thị, logic, responsive
- `docs: ...` : Cập nhật tài liệu (`README.md`, `WORKFLOW.md`, `VietTrung.md`)
- `chore: ...` : Dọn dẹp file dư thừa, cấu hình build, cập nhật package
- `ci: ...` : Cập nhật file workflow GitHub Actions

```bash
git add .
git commit -m "feat: mo ta ngan gon ve tinh nang vua lam"
```

### Bước 5: Đẩy nhánh lên GitHub & Tạo Pull Request
```bash
git push -u origin feat/ten-tinh-nang
```
- Truy cập vào GitHub: `https://github.com/makonhakony/demoweb-ou-vhn`
- Tạo **Pull Request (PR)** từ nhánh `feat/ten-tinh-nang` vào nhánh `dev`.
- Hệ thống **GitHub Actions CI** sẽ tự động kích hoạt kiểm tra Lint & Build.
- Sau khi kiểm tra đạt tích xanh (`passed`), tiến hành Merge vào `dev`.

---

## 3. QUY TRÌNH QUẢN TRỊ NỘI DUNG QUA GOOGLE SHEETS

Website hoạt động theo kiến trúc **Headless CMS không máy chủ cơ sở dữ liệu**. Khi cần thay đổi nội dung trang web:

1. **Mở bảng tính quản trị trực tuyến**:  
   🔗 [Bảng tính Google Sheets Du học Việt - Trung](https://docs.google.com/spreadsheets/d/1tO_F1zDP81n9io4B0HV1qgMWvZ9EaMg0tHSA6HqYdG8/edit)
2. **Chọn đúng tab cần chỉnh sửa**:
   - `site_config`: Tên trung tâm, hotline, email, địa chỉ, slogan song ngữ.
   - `stats`: Số liệu thống kê ở Banner chính (ví dụ: `2,468+`, `9999+`...).
   - `timeline`: 4 bước lộ trình và danh lam thắng cảnh.
   - `programs`: Các suất học bổng CSC, CIS, Cử nhân, Thạc sĩ.
   - `news`: Bài viết tin tức, cẩm nang và thông báo học bổng mới.
   - `partners`: Danh sách đại học đối tác Trung Quốc.
   - `faculty`: Đội ngũ chuyên gia và giảng viên.
3. **Hiệu lực tức thì**: Người dùng chỉ cần tải lại trang web (F5), dữ liệu mới sẽ được tự động hiển thị mà không cần lập trình viên can thiệp code hay redeploy.

---

## 4. QUY TRÌNH TỰ ĐỘNG HÓA CI/CD TRÊN GITHUB ACTIONS

### Sự khác nhau giữa 2 loại file Workflow:
1. **File cấu hình tự động của GitHub (`.github/workflows/deploy.yml`)**:
   - Định dạng **bắt buộc là YAML (`.yml` hoặc `.yaml`)** theo quy định của GitHub.
   - Chạy trên máy chủ ảo GitHub mỗi khi có commit hoặc Pull Request.
   - Tự động cài đặt dependencies với `pnpm`, kiểm tra `lint`, và chạy `pnpm build`.
   - Có nút bấm **Run workflow** thủ công trong tab **Actions** trên GitHub.
2. **File tài liệu quy trình làm việc (`WORKFLOW.md`)**:
   - Định dạng **Markdown (`.md`)** dành cho lập trình viên và quản lý dự án đọc hiểu để phối hợp công việc.

---

## 5. BẢNG CHECKLIST TRƯỚC KHI BÀN GIAO / MERGE MÃ NGUỒN

- [ ] Chạy `npx tsc --noEmit` đạt 0 lỗi TypeScript.
- [ ] Chạy `pnpm lint` đạt 0 lỗi cú pháp.
- [ ] Chạy `pnpm build` tạo thư mục `out/` thành công.
- [ ] Kiểm tra giao diện hoạt động tốt trên cả máy tính (Desktop) và điện thoại (Mobile).
- [ ] Kiểm tra tính năng chuyển đổi ngôn ngữ song ngữ `VI | 中文` hoạt động mượt mà.
- [ ] Không commit các file tạm, file lock thừa (`package-lock.json`) hay dữ liệu nhạy cảm (`.env`).
