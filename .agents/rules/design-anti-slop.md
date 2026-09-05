# RULE: ANTI-SLOP FRONTEND DESIGN & UI/UX INTELLIGENCE
<!-- Trọng tâm: Triệt tiêu rác giao diện từ Leonxlnx/taste-skill & 192 quy tắc ngành từ UI/UX Pro Max -->

## MỤC TIÊU
Loại bỏ hoàn toàn các mẫu giao diện "AI Slop" lười biếng, tạo ra sản phẩm frontend có gu nghệ thuật cao, bố cục vững chắc và đạt chuẩn tiếp cận WCAG AA.

---

## 1. HỆ THỐNG 3 CON XOAY (THE 3 DIALS)
Trước khi viết mã UI, Agent phải đọc vị bối cảnh (Brief Inference) và thiết lập 3 biến:
- `DESIGN_VARIANCE: 1-10` (1 = Cân xứng tuyệt đối; 10 = Bất đối xứng, nghệ thuật Awwwards)
- `MOTION_INTENSITY: 1-10` (1 = Tĩnh lặng; 10 = Chuyển động vật lý điện ảnh, scroll-driven)
- `VISUAL_DENSITY: 1-10` (1 = Thoáng đãng như triển lãm tranh; 10 = Đậm đặc thông tin như Bloomberg)

*Thiết lập mặc định cho SaaS:* `7 / 6 / 4`.

---

## 2. CÁC LỆNH CẤM THÉP (BANNED AI PATTERNS)

1. **The Lila Rule (Cấm Gradient tím/xanh phát sáng):**
   - Cấm mặc định tạo nền tối với ánh sáng tím neon/cyan mờ ảo vô nghĩa.
   - Bắt buộc dùng nền trung tính cao cấp (Slate, Zinc, Stone) kết hợp với **duy nhất 1 màu nhấn (Accent color)** có độ bão hòa dưới 80%.
2. **Cấm lạm dụng Serif làm mặc định:**
   - Cấm mặc định dùng font có chân (`Fraunces`, `Instrument_Serif`).
   - Mặc định dùng **Display Sans-serif** hiện đại: Geist, Cabinet Grotesk, Satoshi, Söhne Breit. Chỉ dùng Serif khi thương hiệu là tạp chí văn học, xa xỉ phẩm cổ điển hoặc di sản truyền thống.
   - *Italic Descender Clearance:* Khi dùng chữ nghiêng chứa các ký tự có đuôi (`y, g, j, p, q`), dùng `leading-[1.1]` tối thiểu và thêm `pb-1` để không bị cắt xén đuôi chữ.
3. **Cấm bảng màu "Warm-craft" mặc định:**
   - Cấm mặc định dùng màu be `#f5f1ea` + nâu đồng thau cho hàng tiêu dùng/thủ công.
   - Luân chuyển các bảng màu: Cold Luxury (bạc + khói), Forest (xanh lục sẫm + hổ phách), Cobalt + Cream, Terracotta + Slate.
4. **Kỷ luật khoảng thở Hero Section:**
   - Hero section **BẮT BUỘC** nằm trọn trong 1 màn hình đầu: dùng `min-h-[100dvh]`, **CẤM DÙNG `h-screen`** (gây giật layout trên Safari mobile).
   - Tiêu đề tối đa 2 dòng ở màn hình desktop.
   - Đoạn mô tả dưới 20 từ (max 3-4 dòng).
   - Tối đa 4 thành phần trong Hero stack: (1) Eyebrow hoặc brand strip, (2) Headline, (3) Subtext, (4) CTAs.
   - Bức tường logo khách hàng ("Trusted by") phải nằm ở section riêng biệt **bên dưới Hero**, cấm nhét chung vào Hero.
5. **Kỷ luật Nhãn phụ (Eyebrow Restraint):**
   - Tối đa 1 nhãn chữ hoa nhỏ (Eyebrow) cho mỗi 3 section. Cấm đặt chữ in hoa nhỏ phía trên mọi tiêu đề tạo nhịp điệu rập khuôn.
6. **Bento Grid có nhịp điệu:**
   - Cấm làm 6 ô trắng trơn chỉ chứa chữ. Ít nhất 2-3 ô phải có ảnh chụp thực tế, họa tiết hoặc gradient tinh tế.
   - Số lượng ô phải khớp chính xác với số lượng nội dung (3 nội dung = 3 ô; cấm để ô trống).
7. **Nghiêm cấm ảnh mockup giả bằng thẻ `<div>`:**
   - Cấm tự chế màn hình sản phẩm bằng các thẻ `<div>` kẻ bảng giả mạo. Phải dùng ảnh thật (từ tool sinh ảnh, ảnh chụp thực tế hoặc preview component thật).

---

## 3. CHECKLIST CHẤT LƯỢNG UI & A11Y BẮT BUỘC
- [ ] **Không Emoji:** Dùng SVG icon nhất quán (Phosphor hoặc Lucide).
- [ ] **`cursor-pointer`:** Hiện diện trên toàn bộ phần tử tương tác (button, link, card).
- [ ] **Tương phản WCAG AA:** Đạt tối thiểu 4.5:1 cho text thường, 3:1 cho text lớn (18px+).
- [ ] **Accessibility:** Có đường viền `focus-visible` cho bàn phím; tôn trọng `prefers-reduced-motion`.
- [ ] **Responsive:** Kiểm tra hiển thị chuẩn trên 4 mốc: 375px, 768px, 1024px, 1440px.
- [ ] **Copy Self-Audit:** Quét sạch toàn bộ các câu chữ sáo rỗng, triết lý hão huyền mà LLM hay tự sinh ra trước khi bàn giao.
