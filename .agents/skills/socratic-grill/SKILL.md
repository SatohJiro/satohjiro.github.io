---
name: socratic-grill
description: Phỏng vấn bóc tách yêu cầu phần mềm theo phương pháp Socratic, mỗi lượt đúng 1 câu hỏi sắc bén nhất để làm rõ đặc tả, xử lý edge-cases và thiết lập Ubiquitous Language trước khi code.
---

# SKILL: SOCRATIC GRILL (TRA VẤN YÊU CẦU & ĐỒNG NHẤT THUẬT NGỮ)

## KHI NÀO KÍCH HOẠT
- Người dùng yêu cầu triển khai một tính năng mới nhưng mô tả còn chung chung.
- Có nhiều hướng kiến trúc hoặc sự mâu thuẫn trong yêu cầu.
- Khi người dùng gõ lệnh `/grill-me` hoặc `/grill-with-docs`.

---

## NGUYÊN TẮC THỰC THI (ALGORITHM)

### BƯỚC 1: ĐỐI CHIẾU NGỮ CẢNH DỰ ÁN
1. Đọc tệp `CONTEXT.md` (nếu có) để nắm rõ từ điển thuật ngữ domain (Ubiquitous Language) và các ADR hiện có.
2. Xác định phạm vi ảnh hưởng của tính năng mới đối với các module hiện tại.

### BƯỚC 2: PHỎNG VẤN TRUY CÙNG ĐUỔI TẬN (SOCRATIC INTERVIEW)
- **Quy tắc vàng:** **MỖI LƯỢT CHỈ ĐẶT DUY NHẤT 1 CÂU HỎI TRỌNG TÂM NHẤT.**
- Không bao giờ gửi một danh sách 5-10 câu hỏi khiến người dùng quá tải nhận thức.
- **Trọng tâm các câu hỏi cần khai thác:**
  1. *Edge-cases dữ liệu:* Khi input là null, rỗng, cực lớn, hoặc định dạng lạ thì hệ thống phản hồi thế nào?
  2. *Lỗi mạng & Sự cố:* Khi API bên thứ ba timeout hoặc mất kết nối DB thì fallback ra sao?
  3. *Quyền hạn & Bảo mật:* Ai có quyền gọi luồng này? Có cần xác thực session/role không?
  4. *Trạng thái giao diện:* Trong lúc tải dữ liệu (loading) hoặc khi không có dữ liệu (empty state) thì UI hiển thị gì?

### BƯỚC 3: XÁC LẬP TỪ ĐIỂN THUẬT NGỮ (UBIQUITOUS LANGUAGE)
- Nếu người dùng giới thiệu một thuật ngữ nghiệp vụ mới: Cập nhật ngay vào bảng thuật ngữ trong `CONTEXT.md`.
- Kể từ đó, Agent chỉ được dùng duy nhất thuật ngữ này, cấm diễn đạt vòng vo.

### BƯỚC 4: XUẤT BẢN ADR (ARCHITECTURE DECISION RECORD)
- Khi hai bên đã thống nhất xong một quyết định kiến trúc quan trọng:
  - Ghi nhận lại quyết định đó vào `CONTEXT.md` hoặc tạo file ADR mới dưới dạng:
    - **Context:** Bối cảnh và bài toán.
    - **Decision:** Giải pháp được chọn.
    - **Consequences:** Đánh đổi kỹ thuật được chấp nhận.

### BƯỚC 5: KẾT THÚC PHỎNG VẤN & CHUYỂN BƯỚC
- Khi đã đủ thông tin, tuyên bố kết thúc phỏng vấn và xuất bản bản Kế hoạch hành động (Implementation Plan) chia nhỏ dưới dạng các task nguyên tử.
