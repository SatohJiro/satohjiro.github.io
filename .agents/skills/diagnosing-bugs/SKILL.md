---
name: diagnosing-bugs
description: Quy trình chuẩn đoán và sửa chữa lỗi kỹ thuật phức tạp qua 5 pha. Bắt buộc tạo vòng lặp phản hồi (Feedback Loop) chặt chẽ có khả năng chuyển ĐỎ trước khi đặt giả thuyết sửa code.
---

# SKILL: SYSTEMATIC BUG DIAGNOSIS (CHUẨN ĐOÁN LỖI CÓ HỆ THỐNG)

## KHI NÀO KÍCH HOẠT
- Người dùng thông báo có bug, hệ thống bị crash, trả về sai dữ liệu, hoặc hiệu năng bị tụt giảm.
- Khi người dùng gõ lệnh `/diagnosing-bugs` hoặc yêu cầu "sửa bug này đi".

---

## QUY TRÌNH 5 PHA BẮT BUỘC

### PHA 1: TẠO VÒNG LẶP PHẢN HỒI (BUILD A TIGHT FEEDBACK LOOP)
> **"Đây là cốt lõi của kỹ năng. 90% thành bại của việc sửa bug nằm ở bước này."**
- **CẤM:** Ngồi nhìn code suy đoán lung tung hoặc sửa thử hú họa mà không có cách kiểm chứng.
- **BẮT BUỘC:** Tạo ra đúng **1 câu lệnh duy nhất** trong terminal có khả năng chạy lại và chuyển sang màu ĐỎ (FAIL) trên chính lỗi này.
- **Các hình thức tạo Feedback Loop (ưu tiên từ trên xuống dưới):**
  1. *Failing Test:* Viết 1 unit test, integration test hoặc e2e test tái hiện lỗi.
  2. *Curl / HTTP Script:* Tạo script gọi endpoint với payload gây lỗi.
  3. *CLI Invocation:* Chạy lệnh CLI với input mẫu và so sánh stdout với kết quả mong đợi.
  4. *Headless Browser Script:* Script Playwright/Puppeteer bắt đúng lỗi DOM/Console/Network.
  5. *Replay Trace:* Lưu request/payload thực tế vào đĩa và phát lại độc lập.
- **Tiêu chuẩn vòng lặp:** Phải **nhanh** (dưới 2 giây) và **chuẩn xác** (deterministic). Nếu bug chập chờn (flaky), lặp lại lệnh 100 lần để tăng tỷ lệ tái hiện lên trên 50%.
- **Điều kiện qua cổng:** Bạn phải chạy lệnh đó ít nhất 1 lần trong terminal và chứng minh nó ĐANG THẤT BẠI.

### PHA 2: ĐẶT GIẢ THUYẾT KHOA HỌC (HYPOTHESIZE)
- Dựa trên error stack trace và hành vi của Feedback Loop, nêu rõ giả thuyết nguyên nhân gốc rễ (Root Cause).
- Tránh đưa ra 5-6 giả thuyết mơ hồ; tập trung vào cơ chế lỗi cụ thể nhất.

### PHA 3: THÊM LOG KIỂM CHỨNG (INSTRUMENT & VERIFY)
- Thêm log có mục tiêu hoặc assertion tạm thời vào đúng nhánh code bị nghi ngờ.
- Chạy lại Feedback Loop để xác nhận giá trị biến thực tế có đúng như giả thuyết không.

### PHA 4: SỬA LỖI PHẪU THUẬT (SURGICAL FIX)
- Viết lượng code tối thiểu cần thiết để sửa dứt điểm nguyên nhân gốc rễ.
- Chạy lại Feedback Loop: Lệnh kiểm thử BẮT BUỘC phải chuyển từ **ĐỎ** sang **XANH**.
- Kiểm tra lại toàn bộ test suite cũ để đảm bảo không làm gãy tính năng khác.

### PHA 5: BẢO VỆ CHỐNG TÁI PHÁT (REGRESSION TEST & CLEANUP)
- Biến Feedback Loop ở Pha 1 thành một bài test chính thức trong test suite của dự án.
- Xóa sạch toàn bộ log debug tạm thời đã thêm ở Pha 3.
