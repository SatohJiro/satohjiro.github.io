# PROJECT CONTEXT & UBIQUITOUS LANGUAGE (DOMAIN DICTIONARY)
*(Bản đồ tri thức domain, từ điển thuật ngữ thống nhất & Nhật ký quyết định kiến trúc ADR)*

---

## 1. MỤC TIÊU DỰ ÁN & BỐI CẢNH (PROJECT CONTEXT)
- **Tên dự án:** Apex Agent System
- **Tầm nhìn sản phẩm:** Xây dựng môi trường pair-programming hiệu năng cao, nơi AI Agent hoạt động như một Staff/Principal Software Engineer tuân thủ nghiêm ngặt chuẩn mực kỹ thuật, tối ưu hóa token và thiết kế giao diện cao cấp (Anti-Slop).
- **Đối tượng người dùng:** Kỹ sư phần mềm, Tech Leads, Nhà phát triển sản phẩm đòi hỏi chất lượng code chuẩn production.

---

## 2. TỪ ĐIỂN THUẬT NGỮ ĐỒNG NHẤT (UBIQUITOUS LANGUAGE)
*Quy tắc bắt buộc: Agent và người dùng PHẢI sử dụng chính xác các thuật ngữ dưới đây. Tuyệt đối không dùng các cách gọi lòng vòng, mô tả mơ hồ làm lãng phí token và gây hiểu nhầm.*

| Thuật ngữ chuẩn (Term) | Định nghĩa kỹ thuật trong dự án | Tránh cách diễn đạt lòng vòng |
| :--- | :--- | :--- |
| **Surgical Edit** | Thao tác chỉ sửa đúng dòng/file mục tiêu, không chạm code lân cận | "Sửa chỗ này nhưng tiện tay format lại cả file" |
| **The Iron Law** | Quy tắc TDD bắt buộc: Có test fail (Red) mới được viết code (Green) | "Thử viết hàm trước xem chạy được không rồi viết test" |
| **Feedback Loop** | Vòng lặp lệnh kiểm chứng lỗi xác định (deterministic test/curl/script) | "Ngồi đọc code đoán mò xem lỗi ở đâu" |
| **Anti-Slop** | Bộ quy tắc cấm các giao diện rập khuôn AI (gradient tím, card trắng trơn) | "Làm giao diện hiện đại có tí màu sắc lấp lánh" |
| **3 Dials** | Bộ 3 thông số định hình thẩm mỹ: `VARIANCE`, `MOTION`, `DENSITY` | "Căn chỉnh cảm giác giao diện bằng mắt" |
| **Brief Inference** | Đọc vị bối cảnh sản phẩm và đối tượng trước khi chọn stack giao diện | "Cứ vào là cài thư viện shadcn rồi tính sau" |
| **Copy Self-Audit** | Quét sạch slogan vô nghĩa, triết lý rởm do LLM tự sinh ra | "Viết mấy câu marketing cho nghe kêu kêu" |
| **Vertical Slice** | Triển khai hoàn chỉnh 1 lát cắt tính năng (Spec + Code + Test + Commit) | "Viết toàn bộ database, rồi mới viết toàn bộ backend, rồi frontend" |

---

## 3. NHẬT KÝ QUYẾT ĐỊNH KIẾN TRÚC (ARCHITECTURE DECISION RECORDS - ADR)
*Lịch sử các quyết định kỹ thuật bất biến. Agent TUYỆT ĐỐI KHÔNG tự ý đề xuất thay đổi trừ khi có yêu cầu rõ ràng từ người dùng.*

### ADR 001: Testing Strategy — Enforced TDD with Vitest
- **Trạng thái:** Accepted
- **Bối cảnh:** Cần một framework kiểm thử có tốc độ thực thi dưới 2 giây để duy trì vòng lặp Feedback Loop cực nhanh.
- **Quyết định:** Sử dụng `Vitest` kết hợp với `@testing-library/react` cho frontend và native assertions cho backend.
- **Đánh đổi & Hệ quả:**
  - *Ưu điểm:* Tốc độ chạy test cực nhanh (HMR native, ESM-first), tích hợp sẵn TypeScript, hỗ trợ concurrency tốt.
  - *Nhược điểm:* Cần cấu hình môi trường jsdom cho các component test phức tạp.

### ADR 002: Styling Paradigm — Vanilla CSS / CSS Modules & Tailwind v4
- **Trạng thái:** Accepted
- **Bối cảnh:** Tránh bloat CSS, kiểm soát chặt chẽ design tokens và hỗ trợ dark mode mượt mà mà không phụ thuộc runtime CSS-in-JS.
- **Quyết định:** Mặc định sử dụng Tailwind CSS v4 kết hợp Vanilla CSS Custom Properties.
- **Đánh đổi & Hệ quả:**
  - *Ưu điểm:* Zero-runtime overhead, bundle size cực nhẹ, kiểm soát token màu chính xác theo tỷ lệ 60-30-10.
  - *Nhược điểm:* Đòi hỏi Agent phải nắm vững CSS Grid và token naming conventions.

### ADR 003: State Management — Leaf Interactivity & Motion Isolation
- **Trạng thái:** Accepted
- **Bối cảnh:** React re-render liên tục khi tracking chuột hoặc scroll gây giật lag trên mobile.
- **Quyết định:**
  - Không bao giờ dùng `useState` để lưu tọa độ chuột, thanh cuộn hoặc giá trị animation liên tục.
  - Sử dụng `MotionValues` từ `motion/react` hoặc `useRef` cho các tương tác liên tục.
  - Cô lập các component có tương tác ở tầng lá (Client Component Leaf) trong kiến trúc Next.js/React.
- **Đánh đổi & Hệ quả:** Loại bỏ hoàn toàn hiện tượng re-render thừa của cả cây component.

### ADR 004: Output Economy — ASD-STE100 & Action-First
- **Trạng thái:** Accepted
- **Bối cảnh:** Lượng token hội thoại phình to làm chậm tốc độ phản hồi và tăng chi phí vận hành.
- **Quyết định:** Agent giao tiếp theo phong cách Action-First, giản lược 60% từ ngữ đệm (Caveman Mode), câu ngắn dưới 20 từ, dùng câu mệnh lệnh trực tiếp.

---

## 4. THIẾT LẬP BỘ 3 CON XOAY THẨM MỸ (THE 3 DIALS CONFIGURATION)
*Định lượng phong cách thiết kế cho dự án hiện tại:*

```yaml
design_system:
  variance: 7       # 1 (Đối xứng máy móc) -> 10 (Nghệ thuật bất đối xứng, phá cách)
  motion: 5         # 1 (Giao diện tĩnh) -> 10 (Chuyển động vật lý điện ảnh, scroll-driven)
  density: 4        # 1 (Thoáng đãng như triển lãm) -> 10 (Đậm đặc thông tin như Bloomberg)
  
color_palette:
  base: "Neutral Slate / Zinc"
  accent: "#2563eb" # Electric Blue (Độ bão hòa < 80%, dùng xuyên suốt toàn bộ trang)
  contrast_ratio: "WCAG AA >= 4.5:1"

typography:
  display: "Geist / Cabinet Grotesk (Sans-serif Display cao cấp)"
  body: "Inter / Geist (Rõ ràng, dễ đọc, max-width: 65ch)"
  mono: "JetBrains Mono / Geist Mono (Cho code, số liệu, technical data)"
```
