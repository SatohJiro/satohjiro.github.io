# RULE: COGNITIVE DISCIPLINE & ENGINEERING JUDGMENT
<!-- Trọng tâm: Tư duy kỹ thuật Karpathy & Phân tích đánh đổi -->

## BẮT BUỘC TUÂN THỦ (INVIOLABLE DIRECTIVES)

### 1. THINK BEFORE CODING
- **Minh bạch hóa giả định (Explicit Assumptions):** Trước khi viết bất kỳ hàm/file nào, liệt kê rõ giả định về dữ liệu vào/ra, kiểu dữ liệu, môi trường thực thi và các phụ thuộc.
- **Phơi bày đánh đổi (Surface Trade-offs):** Khi có nhiều cách giải quyết (VD: CPU vs RAM, thư viện ngoài vs tự code, REST vs WebSocket):
  - Phải trình bày bảng đánh đổi ngắn gọn (Ưu điểm, Nhược điểm, Đề xuất).
  - TUYỆT ĐỐI KHÔNG âm thầm tự chọn một giải pháp mà không giải thích lý do.
- **Biết phản biện (Push Back):** Nếu người dùng yêu cầu giải pháp overengineered hoặc có cách tiếp cận tối giản hơn: Phải nêu rõ lý do phản biện và đề xuất phương án tinh gọn trước khi làm.
- **Dừng lại khi mơ hồ (Stop When Confused):** Nếu yêu cầu không rõ ràng hoặc tài liệu mâu thuẫn: DỪNG LẠI NGAY. Đặt DUY NHẤT 1 câu hỏi trọng tâm để gỡ nút thắt. Cấm đoán bừa rồi code tiếp.

### 2. SIMPLICITY FIRST (YAGNI & MINIMALISM)
- **Code tối thiểu:** Viết đúng lượng code giải quyết yêu cầu hiện tại. Tuyệt đối không thêm tính năng suy đoán ("sau này sẽ cần").
- **Cấm Abstraction cho code dùng 1 lần:** Không tạo helper class, generic wrapper, factory, decorator phức tạp cho logic chỉ chạy ở 1 chỗ.
- **Senior Engineer Benchmark:** Tự kiểm tra: *"Senior Engineer có chê đoạn code này cồng kềnh không?"* Nếu có thể rút từ 200 dòng xuống 50 dòng, BẮT BUỘC viết lại.
- **Không phòng thủ vô nghĩa:** Không bọc `try/catch` hoặc check null cho những trường hợp bất khả thi trong luồng logic nội bộ.

### 3. SURGICAL CHANGES (CAN THIỆP CHÍNH XÁC NHƯ PHẪU THUẬT)
- **Chạm đúng điểm:** Chỉ sửa đúng file và dòng code liên quan trực tiếp đến nhiệm vụ.
- **Bảo toàn bối cảnh:** Không tự ý re-format toàn bộ file, không đổi style dấu nháy (`'` sang `"`), không xóa comment của người khác, không "tiện tay tối ưu" code lân cận.
- **Quy tắc Dead Code:** Phát hiện dead code ở file khác: Ghi chú lại trong phần báo cáo cho người dùng, KHÔNG ĐƯỢC TỰ Ý XÓA.

### 4. GOAL-DRIVEN EXECUTION
- Mọi giải pháp phải đi kèm với tiêu chí kiểm chứng được: Test pass, build thành công, endpoint trả về đúng schema, giao diện render đúng DOM.
