---
name: production-lifecycle
description: Cổng kiểm soát vòng đời phát triển phần mềm chuẩn Production 6 pha (Define -> Plan -> Build -> Verify -> Review -> Ship). Kích hoạt các chốt chặn chất lượng và cơ chế Anti-Rationalization ngăn chặn Agent đi đường tắt.
---

# SKILL: PRODUCTION SOFTWARE ENGINEERING LIFECYCLE

## KHI NÀO KÍCH HOẠT
- Quản lý và điều phối các tác vụ phát triển tính năng hoàn chỉnh từ ý tưởng ban đầu đến phát hành.
- Khi người dùng gõ các lệnh điều phối: `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`.

---

## 6 PHA PHÁT TRIỂN & CỔNG KIỂM DUYỆT (QUALITY GATES)

```
  DEFINE (1)   ──▶   PLAN (2)   ──▶   BUILD (3)   ──▶   VERIFY (4)   ──▶   REVIEW (5)   ──▶   SHIP (6)
   /spec              /plan           /build            /test              /review             /ship
```

---

### PHA 1: DEFINE (/spec) — ĐẶC TẢ TRƯỚC KHI CODE
- Lắng nghe và trích xuất tài liệu đặc tả chức năng (PRD/Spec) ngắn gọn, rõ ràng.
- Xác định rõ tiêu chí nghiệm thu (Acceptance Criteria) và các ca biên (Edge Cases).
- **Cổng qua:** Người dùng phê duyệt Spec trước khi chuyển sang Pha 2.

### PHA 2: PLAN (/plan) — CHIA NHỎ THÀNH TASK NGUYÊN TỬ
- Tách nhỏ công việc thành các task độc lập, mỗi task thực hiện trong dưới 15 phút.
- Sắp xếp thứ tự phụ thuộc logic: Database / Data schema $\rightarrow$ Business logic $\rightarrow$ UI components $\rightarrow$ Integration.
- **Cổng qua:** Kế hoạch có cấu trúc rõ ràng, mỗi task có test đi kèm.

### PHA 3: BUILD (/build & /build auto) — TRIỂN KHAI TỪNG LÁT CẮT DỌC
- Làm dứt điểm từng task: Viết test $\rightarrow$ Viết code $\rightarrow$ Test pass $\rightarrow$ Commit.
- Với chế độ `/build auto`: Tự động chạy tuần tự qua các task đã duyệt, nhưng BẮT BUỘC dừng lại ngay nếu gặp lỗi test hoặc sự cố kiến trúc.

### PHA 4: VERIFY (/test) — KIỂM THỬ LÀ BẰNG CHỨNG DUY NHẤT
- Áp dụng triệt để Luật Sắt TDD: Test phải có trước code, test phải fail trước khi code chạy pass.
- Đạt tỷ lệ phân bổ kim tự tháp kiểm thử: 80% Unit Tests, 15% Integration Tests, 5% E2E Tests.

### PHA 5: REVIEW (/review) — RÀ SOÁT TRÊN 5 TRỤC
Trước khi tạo Pull Request hoặc bàn giao, Agent phải tự thẩm định:
1. **Correctness:** Code có xử lý hết toàn bộ ca lỗi và edge cases đã nêu trong Spec không?
2. **Security:** Có lỗ hổng Injection, rò rỉ secret, hay hở quyền truy cập không?
3. **Performance:** Có vòng lặp $O(N^2)$, memory leak, hay re-render vô tận không?
4. **Maintainability:** Tên hàm, biến có tự giải thích không? Có vi phạm YAGNI/DRY không?
5. **Testability:** Code có dễ viết unit test độc lập không?

### PHA 6: SHIP (/ship) — ĐÓNG GÓI & PHÁT HÀNH AN TOÀN
- Chạy toàn bộ test suite và build bundle kiểm tra lần cuối.
- Viết Changelog rõ ràng cho người dùng (tập trung vào giá trị mang lại, không liệt kê commit kỹ thuật nhàm chán).

---

## BẢNG CHẶN NGỤY BIỆN (ANTI-RATIONALIZATION GATES)
*Agent BẮT BUỘC tự dập tắt các suy nghĩ đi đường tắt sau đây:*

1. **"Đoạn code này đơn giản quá, không cần test":** $\rightarrow$ Càng đơn giản càng phải có test để ngăn chặn regression trong tương lai.
2. **"Viết test chỗ này khó quá, tôi kiểm tra bằng tay rồi":** $\rightarrow$ Khó test chứng tỏ kiến trúc bị phụ thuộc (tightly coupled). Phải tách nhỏ logic để test được.
3. **"Tôi sẽ viết tính năng trước rồi bổ sung test sau":** $\rightarrow$ Vi phạm Luật Sắt TDD. Xóa code viết lại từ test.
4. **"Tôi sẽ refactor một số chỗ lân cận cho đẹp hơn":** $\rightarrow$ Vi phạm Surgical Changes. Chỉ sửa đúng phạm vi nhiệm vụ.
