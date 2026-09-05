---
name: anti-slop-design
description: Trí tuệ thiết kế giao diện cao cấp và bộ lọc Anti-Slop. Đọc vị bối cảnh, thiết lập 3 con xoay thẩm mỹ, chọn design system chính chủ và rà soát chất lượng trước khi bàn giao.
---

# SKILL: ANTI-SLOP FRONTEND DESIGN & UI/UX INTELLIGENCE

## KHI NÀO KÍCH HOẠT
- Khi người dùng yêu cầu thiết kế giao diện web, landing page, portfolio, dashboard hoặc component mới.
- Khi cần thẩm định (audit) và nâng cấp gu thẩm mỹ của giao diện sẵn có.
- Khi người dùng gõ lệnh `/anti-slop` hoặc `/design`.

---

## QUY TRÌNH THỰC THI 5 BƯỚC

### BƯỚC 1: ĐỌC VỊ BỐI CẢNH (BRIEF INFERENCE)
Trước khi viết mã, Agent phải phân tích 6 tín hiệu:
1. **Loại trang (Page Kind):** B2B SaaS, Developer Tool, E-commerce, Luxury Consumer, Portfolio, hay Public Sector?
2. **Từ ngữ cảm xúc (Vibe Words):** Minimalist, Linear-style, Brutalist, Playful, Dark Tech, hay Editorial?
3. **Đối tượng người dùng (Audience):** Kỹ sư phần mềm khó tính, người tiêu dùng phổ thông hay chuyên gia tài chính?
4. **Tài sản thương hiệu sẵn có (Brand Assets):** Logo, font chữ, màu sắc nhận diện.
5. **Ràng buộc ngầm (Quiet Constraints):** Yêu cầu tương phản cao, tuân thủ quy chuẩn y tế/tài chính.
6. **Tuyên bố "Design Read" trong 1 dòng:**
   *Ví dụ: "Đọc vị bối cảnh: B2B SaaS landing cho kỹ sư phần mềm, phong cách Linear tối giản, sử dụng Tailwind + Geist + chuyển động tiết chế."*

### BƯỚC 2: THIẾT LẬP BỘ 3 CON XOAY (THE 3 DIALS)
Xác lập 3 giá trị định lượng:
- `DESIGN_VARIANCE`: 5-7 (Cân bằng, tinh tế) hoặc 8-10 (Nghệ thuật phá cách).
- `MOTION_INTENSITY`: 3-5 (Micro-interaction nhẹ nhàng) hoặc 7-9 (Chuyển động điện ảnh).
- `VISUAL_DENSITY`: 3-4 (Thoáng đãng như triển lãm) hoặc 6-8 (Đậm đặc dữ liệu kỹ thuật).

### BƯỚC 3: CHỌN HỆ THỐNG THIẾT KẾ CHÍNH HÃNG (DESIGN SYSTEM MAPPING)
- Doanh nghiệp lớn / Microsoft style $\rightarrow$ `@fluentui/react-components`
- DevTool / GitHub community $\rightarrow$ `@primer/react-brand`
- Ứng dụng quản trị Shopify $\rightarrow$ `@shopify/polaris`
- SaaS hiện đại, tự chủ mã nguồn $\rightarrow$ Tailwind v4 + Radix UI primitives / shadcn/ui.
- **Luật bất biến:** Dùng 1 hệ thống duy nhất per project. Cấm trộn lẫn thư viện đối lập.

### BƯỚC 4: THIẾT KẾ CHỐNG RẬP KHUÔN (ANTI-DEFAULT RULES)
- **Ánh sáng:** Cấm Gradient tím AI phát sáng. Dùng nền trung tính cao cấp (Zinc/Slate) + 1 màu nhấn (Saturation < 80%).
- **Font chữ:** Mặc định Display Sans hiện đại (Geist, Cabinet Grotesk, Satoshi). Cấm mặc định font có chân (`Fraunces`).
- **Hero Section:** Bắt buộc `min-h-[100dvh]`, tiêu đề $\le$ 2 dòng desktop, mô tả $\le$ 20 từ, tối đa 4 thành phần trong Hero stack. Logo wall nằm bên dưới Hero.
- **Eyebrow:** Tối đa 1 nhãn chữ hoa nhỏ cho mỗi 3 section.
- **Bento Grid:** Số ô khớp chính xác với nội dung; tối thiểu 2-3 ô có ảnh chụp thật hoặc chất liệu đồ họa phong phú.

### BƯỚC 5: TỰ RÀ SOÁT TRƯỚC BÀN GIAO (PRE-DELIVERY AUDIT)
1. **WCAG AA Check:** Chữ trên nền đạt tương phản $\ge$ 4.5:1.
2. **Interactive State Check:** Toàn bộ nút có `cursor-pointer`, hiệu ứng hover và active `-translate-y-[1px]`.
3. **Copy Self-Audit:** Đọc lại toàn bộ chữ hiển thị trên màn hình. Xóa sạch khẩu hiệu sáo rỗng, triết lý vô nghĩa do LLM tự bịa.
