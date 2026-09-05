# RULE: THE IRON LAW OF TEST-DRIVEN DEVELOPMENT (TDD)
<!-- Trọng tâm: Luật sắt TDD từ obra/superpowers & addyosmani/agent-skills -->

## KHẨU HIỆU CỐT LÕI
> **"NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"**
> *(Vi phạm câu chữ của luật này là vi phạm hoàn toàn tinh thần của luật)*

---

## 1. QUY TẮC TUYỆT ĐỐI (NON-NEGOTIABLE)
1. **Viết code trước test = XÓA LÀM LẠI:**
   - Nếu bạn (Agent) lỡ viết code triển khai trước khi viết test: **BẮT BUỘC PHẢI XÓA SẠCH ĐOẠN CODE ĐÓ.**
   - Không được giữ lại làm "tham khảo".
   - Không được "chỉnh sửa dần dần" trong lúc viết test.
   - Không được nhìn lại đoạn code cũ. Xóa nghĩa là xóa sạch.
2. **Beyoncé Rule:** *"If you like it, you should have put a test on it."* Mọi logic nghiệp vụ, tính năng mới, hoặc bản vá lỗi đều phải có test bảo vệ.

---

## 2. CHU TRÌNH BẮT BUỘC (RED-GREEN-REFACTOR)

### GIAI ĐOẠN 1: RED (Viết Test Thất Bại)
- Viết đúng 1 test case tối thiểu thể hiện hành vi mong muốn.
- Đặt tên test rõ ràng, kiểm thử hành vi thực tế (real code), hạn chế mock tối đa trừ khi bắt buộc (network, database ngoài).
- DAMP > DRY trong test: Test cần dễ đọc, tường minh (Descriptive And Meaningful Phrases) hơn là cố gắng gộp chung logic.

### GIAI ĐOẠN 2: VERIFY RED (Bắt buộc chạy test chứng minh thất bại)
- **MANDATORY:** Chạy lệnh test thực tế trong terminal (ví dụ: `npm test path/to/test.ts`).
- **Xác nhận 3 điều:**
  1. Test phải fail (thất bại logic assertion), không phải crash do lỗi syntax hay import.
  2. Thông báo lỗi (error message) khớp chính xác với chức năng chưa được viết.
  3. Nếu test PASS ngay từ đầu: Bạn đang test tính năng đã có sẵn hoặc test vô nghĩa $\rightarrow$ SỬA LẠI TEST.

### GIAI ĐOẠN 3: GREEN (Code tối thiểu để Pass)
- Viết lượng code đơn giản nhất có thể để test pass.
- Tuyệt đối không thêm code suy đoán, không viết thêm options linh hoạt ngoài test (YAGNI).

### GIAI ĐOẠN 4: VERIFY GREEN (Bắt buộc chạy lại test chứng minh thành công)
- **MANDATORY:** Chạy lại test trong terminal.
- Xác nhận: Test mới PASS và toàn bộ test suite cũ vẫn PASS (không gây regression).

### GIAI ĐOẠN 5: REFACTOR (Làm sạch code)
- Tối ưu hóa cấu trúc, loại bỏ trùng lặp mà không thay đổi hành vi bên ngoài.
- Sau mỗi lần refactor nhỏ, chạy lại test suite để đảm bảo code luôn XANH.

---

## 3. CÁC TRƯỜNG HỢP NGOẠI LỆ DUY NHẤT
Chỉ được bỏ qua TDD khi người dùng explicitly cho phép:
1. Prototype dùng 1 lần rồi bỏ (Throwaway prototypes).
2. File cấu hình tĩnh (Config files: JSON/YAML).
3. Code tự động sinh (Generated boilerplate).
*Nếu người dùng không nói rõ: MẶC ĐỊNH BẮT BUỘC PHẢI DÙNG TDD.*
