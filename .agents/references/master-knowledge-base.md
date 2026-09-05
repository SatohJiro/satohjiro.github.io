# TỔNG QUAN KIẾN THỨC TOÀN DIỆN & SỔ TAY KỸ THUẬT NÂNG CAO CHO AI CODING AGENT
*(Master Knowledge Base & Operational Blueprint from 9 Leading Repositories)*

---

# MỤC LỤC
1. [Chương 1: obra/superpowers — Kỷ luật quy trình kỹ thuật & Luật sắt TDD](#chương-1-obrasuperpowers)
2. [Chương 2: forrestchang/andrej-karpathy-skills — 4 Nguyên tắc tư duy Karpathy](#chương-2-forrestchangandrej-karpathy-skills)
3. [Chương 3: mattpocock/skills — Kỹ thuật thực chiến, Socratic Grilling & Shared Language](#chương-3-mattpocockskills)
4. [Chương 4: nextlevelbuilder/ui-ux-pro-max-skill — Design Intelligence & Hệ thống 192 quy tắc ngành](#chương-4-nextlevelbuilderui-ux-pro-max-skill)
5. [Chương 5: JuliusBrussee/caveman — Tối ưu hóa Token, ASD-STE100 & Giao tiếp cô đọng](#chương-5-juliusbrusseecaveman)
6. [Chương 6: addyosmani/agent-skills — Chu trình 6 pha & Cổng chống ngụy biện (Anti-Rationalization)](#chương-6-addyosmaniagent-skills)
7. [Chương 7: Leonxlnx/taste-skill — Bộ lọc thẩm mỹ Anti-Slop & 3 Con Xoay (The 3 Dials)](#chương-7-leonxlnxtaste-skill)
8. [Chương 8: ComposioHQ/awesome-claude-skills — Kiến trúc phân tầng & Nạp ngữ cảnh lũy tiến](#chương-8-composiohqawesome-claude-skills)
9. [Chương 9: tech-leads-club/agent-skills & i-have-adhd — Bảo mật kỹ năng & Định dạng Action-First](#chương-9-tech-leads-clubagent-skills--i-have-adhd)
10. [Chương 10: Khung vận hành hợp nhất (The Apex Operating System)](#chương-10-khung-vận-hành-hợp-nhất)

---

# CHƯƠNG 1: obra/superpowers
### *Kỷ luật quy trình kỹ thuật & Luật sắt TDD (Software Engineering Rigor)*

### 1.1 Bối cảnh & Vấn đề cốt lõi
- **Điểm yếu của AI:** AI thường là một "tay gõ code tốc độ cao nhưng thiếu trách nhiệm" (fast typist, poor engineer). Khi nhận một bài toán, AI có phản xạ lao vào viết code ngay lập tức, tự tưởng tượng ra cấu trúc dữ liệu, đoán mò edge-cases, bỏ qua kiểm thử, hoặc viết test chiếu lệ sau khi đã code xong.
- **Giải pháp của Superpowers:** Ép Agent tuân thủ phương pháp phát triển phần mềm chuẩn mực thông qua hệ thống quy tắc cưỡng chế: **Spec → Plan → TDD → Review**.

### 1.2 The Iron Law of TDD (Luật Sắt TDD)
> **"NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST"**
> *(Không bao giờ viết code sản phẩm nếu chưa có test thất bại trước đó)*

- **Quy tắc tuyệt đối (No exceptions):**
  - Nếu Agent viết code triển khai trước khi viết test: **BẮT BUỘC PHẢI XÓA ĐOẠN CODE ĐÓ ĐI VÀ LÀM LẠI TỪ ĐẦU.**
  - Không được giữ lại đoạn code đó làm "tham khảo".
  - Không được "chỉnh sửa dần dần" trong lúc viết test.
  - Không được nhìn lại đoạn code cũ. Xóa nghĩa là xóa sạch hoàn toàn.
- **Chu trình RED-GREEN-REFACTOR khép kín:**
  1. **RED (Viết test thất bại):**
     - Viết đúng 1 test case tối thiểu thể hiện hành vi mong muốn.
     - Đặt tên test rõ ràng (`test('retries failed operations 3 times', async () => ...)`).
     - Kiểm thử hành vi thực tế (real code), hạn chế mock tối đa trừ khi bắt buộc (network, hardware).
  2. **Verify RED (Chứng thực thất bại):**
     - **BẮT BUỘC CHẠY TEST.** Không được suy đoán là test sẽ fail.
     - Xác nhận: Test phải fail (thất bại logic assertion), không phải lỗi cú pháp (syntax error) hay import sai.
     - Nếu test PASS ngay từ đầu: Bạn đang kiểm thử một hành vi đã có sẵn hoặc test vô nghĩa. Phải sửa test!
  3. **GREEN (Code tối thiểu để Pass):**
     - Viết lượng code đơn giản nhất, vừa đủ để test pass.
     - Nghiêm cấm thêm option, cấu hình linh hoạt hoặc xử lý trường hợp chưa được test (YAGNI).
  4. **Verify GREEN (Chứng thực thành công):**
     - Chạy lại test suite: Test mới phải PASS, toàn bộ test cũ phải PASS.
  5. **REFACTOR (Tối ưu hóa):**
     - Làm sạch code, loại bỏ trùng lặp (DRY). Sau mỗi lần sửa nhỏ, chạy lại test để đảm bảo luôn xanh.

### 1.3 Subagent-Driven Development (Phát triển điều phối Subagent)
- Chia nhỏ kế hoạch lớn thành các lát cắt dọc (vertical slices).
- Tạo subagent với ngữ cảnh đóng gói hẹp (isolated context) để làm 1 task duy nhất (viết test + code pass).
- Subagent xong việc → Agent chính thanh tra (inspect) và duyệt code trước khi tích hợp vào nhánh chính.

---

# CHƯƠNG 2: forrestchang/andrej-karpathy-skills
### *4 Nguyên tắc tư duy kỹ thuật của Andrej Karpathy*

### 2.1 Bối cảnh ra đời
Được đúc kết từ quan sát của Andrej Karpathy về 4 tật xấu cố hữu của các mô hình ngôn ngữ lớn (LLMs):
1. Tự tiện suy diễn sai lệch rồi cứ thế làm tới.
2. Giấu nhẹm sự hoang mang, không biết cách đặt câu hỏi làm rõ.
3. Nghiện over-engineering, thích đẻ ra abstraction rườm rà (viết 1000 dòng trong khi 100 dòng là xong).
4. Sửa đổi/xóa bỏ code hoặc comment lân cận mà nó không hiểu rõ.

### 2.2 Chi tiết 4 Nguyên tắc vàng

#### 1. Think Before Coding (Nghĩ trước khi gõ)
- **Minh bạch hóa giả định (Explicit Assumptions):** Trước khi viết bất kỳ hàm nào, nêu rõ các giả định về dữ liệu, môi trường và luồng xử lý.
- **Trình bày các phương án (Surface Trade-offs):** Khi gặp bài toán có nhiều hướng giải quyết (ví dụ: tối ưu RAM vs tối ưu CPU, dùng thư viện ngoài vs tự viết), phải liệt kê rõ ưu/nhược điểm từng hướng. Tuyệt đối không âm thầm tự chọn.
- **Biết phản biện (Push Back):** Nếu người dùng yêu cầu một kiến trúc quá cồng kềnh trong khi có giải pháp 10 dòng đơn giản hơn, Agent có nghĩa vụ chỉ ra và đề xuất phương án tối giản.
- **Dừng lại khi bối rối (Stop When Confused):** Nếu yêu cầu không rõ ràng hoặc tài liệu bị mâu thuẫn, Agent phải DỪNG LẠI NGAY LẬP TỨC. Nêu rõ điểm đang nghẽn và hỏi người dùng. Không được đoán bừa rồi code tiếp.

#### 2. Simplicity First (Đơn giản là số một)
- **Nguyên tắc YAGNI triệt để:** Không viết tính năng ngoài yêu cầu. Không thêm cờ cấu hình (flags), options trừu tượng khi chưa ai cần.
- **Cấm Abstraction cho code dùng 1 lần:** Không tạo helper class, factory, interface phức tạp cho một đoạn logic chỉ chạy ở 1 nơi duy nhất.
- **Tiêu chuẩn Senior Engineer:** *"Một Senior Engineer nhìn vào đoạn code này có chê là overcomplicated không?"* Nếu câu trả lời là có, xóa đi viết lại. Nếu 200 dòng rút về 50 dòng được, hãy làm ngay.
- **Không bắt lỗi cho trường hợp bất khả thi:** Chỉ xử lý các lỗi có khả năng xảy ra trong thực tế, không bọc try-catch tầng tầng lớp lớp vô nghĩa.

#### 3. Surgical Changes (Chỉnh sửa chuẩn xác như phẫu thuật)
- **Chạm đúng điểm đau:** Chỉ sửa đúng những dòng code liên quan trực tiếp đến tính năng/bug.
- **Tôn trọng bối cảnh xung quanh:** Không tự tiện re-format toàn bộ file, không đổi style dấu nháy (`'` sang `"`), không xóa comment của người khác, không refactor code lân cận không liên quan.
- **Quy tắc Dead Code:** Nếu phát hiện dead code (code thừa, không ai dùng) ở các module khác trong lúc làm việc: **Ghi chú lại để báo cho người dùng biết, tuyệt đối không tự tay xóa.**

#### 4. Goal-Driven Execution (Hành động hướng đích)
- Mọi thay đổi phải đi kèm với tiêu chí đo lường được: Test chạy pass, endpoint trả về đúng HTTP status, giao diện render đúng DOM node. Không chấp nhận câu trả lời cảm tính "em thấy có vẻ chạy rồi".

---

# CHƯƠNG 3: mattpocock/skills
### *Kỹ năng thực chiến, Socratic Grilling & Shared Language (Matt Pocock)*

### 3.1 Khắc phục căn bệnh #1: Lệch pha yêu cầu (Misalignment)
- **Triết lý Pragmatic Programmer:** *"Không ai biết chính xác mình muốn gì cho đến khi nhìn thấy sản phẩm"*. Khoảng cách giao tiếp giữa người và AI là nguyên nhân gây ra 90% lỗi phần mềm.
- **Kỹ thuật Socratic Grilling (`/grill-me` & `/grill-with-docs`):**
  - Trước khi bắt tay vào làm một tính năng phức tạp, Agent sẽ đóng vai một Tech Lead khó tính, tiến hành một phiên **phỏng vấn truy cùng đuổi tận (relentless interview)**.
  - Mỗi lượt chỉ đặt **1 câu hỏi sắc bén nhất** (về edge-cases, validation, hành vi khi mất mạng, xử lý dữ liệu null, cấu trúc bảng DB).
  - Không bao giờ spam 5-10 câu hỏi cùng lúc khiến người dùng choáng ngợp.
  - Quá trình phỏng vấn dừng lại khi Agent đã có đủ dữ liệu để lập đặc tả hoàn chỉnh.

### 3.2 Khắc phục căn bệnh #2: Lắm lời & Biệt ngữ lộn xộn (Ubiquitous Language & `CONTEXT.md`)
- **Triết lý Domain-Driven Design (Eric Evans):** Khi không có ngôn ngữ chung, Agent phải dùng 20 từ lòng vòng để diễn tả 1 khái niệm nghiệp vụ mà trong dự án chỉ cần 1 từ là đủ.
- **Tài liệu `CONTEXT.md`:**
  - Định nghĩa rõ bản đồ thuật ngữ nội bộ của dự án.
  - Ví dụ:
    - *Trước khi có CONTEXT.md:* "Có một lỗi xảy ra khi một bài học nằm bên trong một chương của khóa học được tạo thành thư mục thực tế trên ổ cứng". (24 từ)
    - *Sau khi có CONTEXT.md:* "Lỗi ở luồng `materialization cascade`". (5 từ)
  - Sự cô đọng này giúp tiết kiệm hàng ngàn token sau mỗi lượt chat và loại bỏ hoàn toàn hiểu nhầm.

### 3.3 Architecture Decision Records (ADRs)
- Ghi lại các quyết định kỹ thuật quan trọng và lý do đằng sau chúng vào thư mục `.agents/adr/`.
- Cấu trúc 1 bản ADR:
  - **Context:** Bối cảnh vấn đề là gì?
  - **Decision:** Quyết định chọn giải pháp nào?
  - **Consequences:** Đánh đổi (trade-offs) là gì? Lợi ích và điểm hạn chế?
- Nhờ ADR, các phiên làm việc sau của Agent sẽ không bao giờ hỏi lại hoặc vô tình đập bỏ những quyết định kiến trúc đã thống nhất trước đó.

### 3.4 Quy trình chuẩn đoán lỗi 5 pha (`/diagnosing-bugs`)
1. **Phase 1: Build a Feedback Loop (Tạo vòng lặp phản hồi chặt chẽ - 90% thành bại nằm ở đây):**
   - Không được ngồi nhìn code suy đoán mò mẫm. Phải tạo bằng được một lệnh chạy thử có khả năng chuyển đỏ (fail) ngay trên lỗi này.
   - Các hình thức: Unit test lỗi, curl script tới dev server, snapshot diff, headless browser script, hoặc script replay request đã lưu.
   - Vòng lặp phải **nhanh** (dưới 2 giây) và **chuẩn xác** (deterministic).
2. **Phase 2: Hypothesize (Đặt giả thuyết khoa học):** Nêu rõ nguyên nhân gốc rễ nghi vấn dựa trên bằng chứng, không đoán mò.
3. **Phase 3: Instrument & Verify (Thêm log kiểm chứng):** Thêm log hoặc breakpoint tại đúng vị trí nghi vấn, chạy feedback loop để kiểm chứng giả thuyết.
4. **Phase 4: Surgical Fix (Sửa chữa tối thiểu):** Viết lượng code tối thiểu để vòng lặp feedback chuyển từ ĐỎ sang XANH.
5. **Phase 5: Regression Test:** Biến vòng lặp feedback đó thành một test tự động vĩnh viễn trong test suite để lỗi không bao giờ tái phát.

---

# CHƯƠNG 4: nextlevelbuilder/ui-ux-pro-max-skill
### *Design Intelligence & Hệ thống 192 quy tắc ngành (Data-Driven UI/UX)*

### 4.1 Bối cảnh & Cơ chế hoạt động
- **Vấn đề:** AI khi thiết kế web/app thường dùng trực giác ngẫu nhiên, sinh ra giao diện thiếu thẩm mỹ, sai tỷ lệ màu sắc và vi phạm nghiêm trọng tiêu chuẩn tiếp cận (accessibility).
- **Giải pháp:** Xây dựng một "ngân hàng tri thức thiết kế" (Design Intelligence Engine) với cơ sở dữ liệu định lượng, cho phép Agent truy vấn trước khi viết CSS/HTML.

### 4.2 Kho tri thức định lượng (Multi-Domain Knowledge Base)
- **192 Quy tắc tư duy chuyên biệt theo ngành (Industry Reasoning Rules):**
  - *SaaS / DevTools:* Ưu tiên bảng màu trung tính tối giản (Slate/Zinc), độ đậm đặc thông tin cao (high density), font monospace cho dữ liệu kỹ thuật, thanh điều hướng dạng command bar (Cmd+K).
  - *FinTech / Banking:* Màu xanh navy/xanh lá biểu trưng cho sự tin cậy và thịnh vượng, nhấn mạnh độ an toàn, layout dạng bảng số liệu rõ ràng, hiển thị trạng thái bảo mật rõ rệt.
  - *Healthcare / Medical:* Màu xanh ngọc/xanh lam nhạt, giao diện thoáng đãng (airy), font chữ tròn trịa, dễ đọc, tương phản cực cao hỗ trợ bệnh nhân mắt kém.
  - *Luxury / E-commerce:* Không gian trắng rộng mở (whitespace lớn), hình ảnh sản phẩm chiếm 70% khung hình, typography tinh tế.
- **192 Bảng màu phối chuẩn khoa học (Color Palettes):**
  - Tuân thủ nghiêm ngặt công thức vàng **60-30-10**:
    - 60% Màu chủ đạo (Background/Base - trung tính).
    - 30% Màu thứ cấp (Card, Panel, Typography, Border).
    - 10% Màu nhấn (CTA, Active state, Status badge - không quá 1 màu bão hòa cao).
- **79 Phong cách giao diện (UI Styles):** Phân loại rõ ràng cách áp dụng Bento Grid, Glassmorphism, Brutalism, Neo-brutalism, Minimalist, Dark Tech, Editorial...
- **74 Cặp font chữ (Typography Pairings):** Ghép đôi font Display/Headline với Body font có tính bổ trợ cao (ví dụ: Cormorant Garamond + Montserrat, Geist + Geist Mono, Cabinet Grotesk + Inter).

### 4.3 Quy trình tạo Design System tự động
```
[User Request] ──▶ [Multi-Domain Search: 5 phân vùng] ──▶ [Reasoning Engine] ──▶ [design-system.md]
                     1. Phân loại ngành (192 ngành)         - Lọc quy tắc ngành
                     2. Khuyến nghị Style (79 styles)       - Xếp hạng BM25
                     3. Chọn Palette (192 palettes)         - Loại trừ Anti-patterns
                     4. Mẫu Landing Page (34 patterns)
                     5. Cặp Font tối ưu (74 pairings)
```

### 4.4 Bảng kiểm định chất lượng trước bàn giao (Pre-Delivery Checklist)
- [ ] **Tuyệt đối không dùng Emoji làm icon:** Phải dùng SVG icon nhất quán từ một thư viện duy nhất (Lucide, Phosphor, Heroicons).
- [ ] **Kiểm tra con trỏ chuột (`cursor-pointer`):** Phải có mặt trên tất cả nút bấm, liên kết, thẻ có thể click.
- [ ] **Độ tương phản WCAG AA:** Tỷ lệ tương phản chữ trên nền tối thiểu **4.5:1** (đối với body text) và **3:1** (đối với large text 18px+).
- [ ] **Trạng thái bàn phím (`focus-visible`):** Đường viền focus rõ ràng phục vụ người khuyết tật điều hướng bằng phím Tab.
- [ ] **Tôn trọng `prefers-reduced-motion`:** Tắt toàn bộ chuyển động rung lắc/bay lượn nếu người dùng bật chế độ giảm chuyển động trong hệ điều hành.
- [ ] **Kiểm thử Responsive 4 mốc chuẩn:** 375px (Mobile), 768px (Tablet), 1024px (Laptop), 1440px (Desktop màn rộng). Không bị tràn ngang (no horizontal overflow).

---

# CHƯƠNG 5: JuliusBrussee/caveman
### *Tối ưu hóa Token, ASD-STE100 & Giao tiếp cô đọng (Caveman Mode)*

### 5.1 Triết lý & Bản chất của chi phí Token
- **Sự thật về Token:** AI Agent tính tiền dựa trên từng token đọc vào (input) và viết ra (output). Trong một phiên làm việc dài (long session), những câu từ rườm rà của Agent tích tụ lại, vừa ngốn hàng ngàn token đắt đỏ, vừa làm loãng ngữ cảnh (context drift).
- **Khẩu hiệu:** *"Why use many token when few do trick. Brain still big, mouth small, bill small."*
- **Hiệu quả thực tế:** Tiết kiệm trung bình **65% output tokens** trên các tác vụ giải thích kỹ thuật và phản hồi.

### 5.2 Các quy tắc cắt giảm không thương tiếc (Drop Rules)
1. **Lược bỏ mạo từ (Drop articles):** Lược bỏ *a, an, the* khi viết tiếng Anh (áp dụng cho các ngôn ngữ có mạo từ).
2. **Lược bỏ từ đệm & rào đón (Drop filler & hedging):** Cắt sạch các từ: *just, really, basically, actually, simply, probably, perhaps, as you know*.
3. **Lược bỏ câu chào hỏi & xã giao (Drop pleasantries):**
   - Cấm hoàn toàn: *"Chào bạn!", "Câu hỏi tuyệt vời!", "Tôi rất vui lòng được hỗ trợ", "Hy vọng điều này giúp ích cho bạn!", "Hãy cho tôi biết nếu bạn cần thêm gì nhé"*.
4. **Không tường thuật việc gọi Tool:** Không mở bài: *"Bây giờ tôi sẽ đọc file X để tìm lỗi Y..."*. Gọi tool thẳng luôn.

### 5.3 Những thành phần BẤT DI BẤT DỊCH (Never Drop)
- **Code, đường dẫn file, dòng lệnh CLI, mã lỗi:** Giữ nguyên vẹn 100%. Không tóm tắt sai lệch code.
- **Từ đảo nghĩa (Polarity words):** Tuyệt đối **KHÔNG ĐƯỢC BỎ** các từ: *not, never, no, only, except*. Mất những từ này sẽ làm đảo ngược hoàn toàn ý nghĩa kỹ thuật.
- **Số liệu & đơn vị:** Giữ chính xác (ví dụ: `4.5:1`, `100ms`, `512MB`).
- **Cấm chế từ viết tắt kỳ cục:** Không tự chế các từ viết tắt lạ như *cfg, impl, req, res, fn*. Tokenizer của LLM vẫn băm chúng thành các mảnh nhỏ, không tiết kiệm được token nào mà người đọc lại tốn công giải mã.

### 5.4 Tiêu chuẩn tiếng Anh kỹ thuật tinh giản (ASD-STE100)
- **Một câu - Một ý:** Tối đa 20 từ mỗi câu.
- **Thể chủ động & Câu mệnh lệnh:** "Chạy lệnh X", "Sửa dòng 42", thay vì "Lệnh X nên được chạy bởi bạn".
- **Một từ - Một nghĩa:** Sử dụng một thuật ngữ duy nhất cho một khái niệm xuyên suốt phiên làm việc, không đổi từ đồng nghĩa lung tung.

---

# CHƯƠNG 6: addyosmani/agent-skills
### *Chu trình 6 pha & Cổng chống ngụy biện (Addy Osmani's Playbook)*

### 6.1 Chu trình kỹ thuật phần mềm 6 Pha
```
  DEFINE   ──▶   PLAN   ──▶   BUILD   ──▶   VERIFY   ──▶   REVIEW   ──▶   SHIP
  /spec          /plan        /build        /test          /review        /ship
```

### 6.2 Chi tiết 9 Lệnh Slash Commands
| Lệnh | Ý nghĩa | Nguyên tắc cốt lõi |
| :--- | :--- | :--- |
| `/spec` | Định nghĩa yêu cầu | Đặc tả kỹ thuật trước khi viết code |
| `/plan` | Lập kế hoạch chi tiết | Chia nhỏ thành các task nguyên tử (atomic) |
| `/build` | Triển khai code | Làm từng lát cắt nhỏ (vertical slice) |
| `/build auto`| Triển khai tự động có kiểm soát | Tự động chạy task nhưng dừng lại ngay khi test fail |
| `/test` | Chứng minh code chạy đúng | Test là bằng chứng duy nhất |
| `/constraints`| Thiết lập ranh giới kiến trúc | Quyết định 1 lần, tuân thủ toàn dự án |
| `/code-simplify`| Tối ưu sự trong sáng | Đơn giản, rõ ràng hơn là thông minh ma mãnh |
| `/review` | Rà soát chất lượng đa chiều | Đánh giá code trên 5 trục |
| `/ship` | Đóng gói & Phát hành | Nhanh hơn và an toàn hơn |

### 6.3 Cơ chế Anti-Rationalization (Chống AI ngụy biện)
AI Agent có tâm lý "lười biếng" giống con người: thích đi đường tắt, tìm lý do biện hộ để trốn viết test hoặc bỏ qua review. Addy Osmani đã cài đặt các "Cổng chặn ngụy biện" (Anti-Rationalization Gates) trực tiếp vào prompt:

| Ngụy biện thường gặp của AI Agent | Cổng chặn (Rebuttal) của Framework |
| :--- | :--- |
| *"Thay đổi này đơn giản quá, không cần viết test đâu."* | **Chặn:** Không có thay đổi nào là quá đơn giản. Càng đơn giản càng phải có test để đảm bảo không bị regression. |
| *"Viết test cho phần này phức tạp lắm, để tôi test bằng tay."* | **Chặn:** Nếu khó viết test chứng tỏ thiết kế kiến trúc đang bị phụ thuộc (tight coupling). Phải tái cấu trúc code để test được. |
| *"Tôi đã kiểm tra kỹ lưỡng bằng mắt rồi, code chạy ngon."* | **Chặn:** Mắt của bạn không phải là máy chạy code. Đưa ra log chạy test pass làm bằng chứng ngay. |
| *"Tôi sẽ refactor đoạn này một chút cho đẹp hơn."* | **Chặn:** Có test suite bảo vệ cho đoạn refactor đó chưa? Chưa có thì cấm đụng vào. |

### 6.4 Rà soát code trên 5 trục (The 5-Axis Code Review)
Trước khi merge code, Agent phải tự kiểm tra qua 5 bộ lọc:
1. **Correctness (Tính đúng đắn):** Code có giải quyết đúng bài toán không? Xử lý hết edge cases chưa?
2. **Security (Bảo mật):** Có nguy cơ Injection (SQL/XSS), rò rỉ secret, hở quyền truy cập không?
3. **Performance (Hiệu năng):** Có vòng lặp $O(N^2)$, N+1 query, rò rỉ bộ nhớ (memory leak) không?
4. **Maintainability (Khả năng bảo trì):** Tên biến có rõ ràng không? Code có dễ đọc sau 6 tháng nữa không?
5. **Testability (Khả năng kiểm thử):** Logic nghiệp vụ có bị dính chặt vào framework/UI không?

---

# CHƯƠNG 7: Leonxlnx/taste-skill
### *Bộ lọc thẩm mỹ Anti-Slop & 3 Con Xoay (Leonxlnx)*

### 7.1 "AI Slop" trong giao diện là gì?
"Slop" là thuật ngữ chỉ các sản phẩm giao diện rác, lười biếng mà AI hay tạo ra khi không có sự chỉ đạo thẩm mỹ:
- Nền đen mù mịt kết hợp gradient tím/xanh phát sáng lòe loẹt.
- Hero section căn giữa với 3 thẻ tính năng giống hệt nhau bên dưới.
- Lạm dụng font có chân (Serif) một cách tùy tiện vì tưởng thế là "sang trọng".
- Các hiệu ứng chuyển động chạy lặp vô tận gây chóng mặt.
- Bảng màu "ấm cúng giả tạo" (beige/cream + đồng thau) cho mọi sản phẩm tiêu dùng.

### 7.2 Hệ thống 3 Con Xoay (The 3 Dials)
Agent thiết lập 3 biến số trước khi code để kiểm soát toàn bộ phong cách:
- `DESIGN_VARIANCE: 1-10` (1 = Cân xứng tuyệt đối; 10 = Nghệ thuật bất đối xứng, phá cách Awwwards).
- `MOTION_INTENSITY: 1-10` (1 = Giao diện tĩnh lặng; 10 = Chuyển động vật lý điện ảnh, scroll-driven).
- `VISUAL_DENSITY: 1-10` (1 = Thoáng đãng như triển lãm nghệ thuật; 10 = Đậm đặc thông tin như Bloomberg Terminal).

### 7.3 Các lệnh cấm thép & Kỷ luật thiết kế (Banned Rules)
1. **The Lila Rule (Cấm Gradient tím phát sáng):** Cấm mặc định tạo nền tối với ánh sáng tím/xanh neon. Phải dùng bảng màu trung tính cao cấp (Slate, Zinc, Stone) kết hợp đúng **1 màu nhấn duy nhất** có độ bão hòa dưới 80%.
2. **Cấm dùng Serif làm mặc định:**
   - AI hay nghĩ: "Sản phẩm cao cấp/nghệ thuật = Font có chân". Sai lầm!
   - Cấm mặc định dùng `Fraunces` và `Instrument_Serif` (2 font AI hay lạm dụng nhất).
   - Mặc định sử dụng **Display Sans-serif** hiện đại (Geist, Cabinet Grotesk, Satoshi, Söhne). Chỉ dùng Serif khi thương hiệu thực sự yêu cầu hoặc là tạp chí văn học/di sản truyền thống.
3. **Kỷ luật khoảng thở Hero Section:**
   - Hero section **BẮT BUỘC** nằm trọn trong viewport đầu tiên: dùng `min-h-[100dvh]`, **CẤM DÙNG** `h-screen` (vì gây giật layout trên Safari iOS khi thanh URL co giãn).
   - Tiêu đề tối đa 2 dòng trên màn hình desktop.
   - Đoạn mô tả dưới 20 từ (nếu không mô tả được giá trị sản phẩm trong 20 từ thì thông điệp chưa rõ ràng).
   - Tối đa 4 thành phần trong Hero stack: (1) Eyebrow hoặc brand strip, (2) Headline, (3) Subtext, (4) CTAs.
   - Bức tường logo khách hàng ("Trusted by") phải đặt ở section riêng biệt **bên dưới Hero**, cấm nhét chung vào trong Hero.
4. **Kỷ luật Nhãn phụ (Eyebrow Restraint):**
   - Eyebrow là dòng chữ in hoa nhỏ nằm trên tiêu đề (ví dụ: `CORE FEATURES`).
   - AI có tật xấu là đặt eyebrow lên tất cả các section, tạo nhịp điệu rập khuôn nhàm chán.
   - **Luật:** Tối đa 1 eyebrow cho mỗi 3 section. Trang có 9 section chỉ được phép có tối đa 3 eyebrow.
5. **Kỷ luật Bento Grid:**
   - Bento Grid không được là 6 ô trắng trơn chỉ chứa chữ.
   - Ít nhất 2-3 ô phải có sự phong phú về chất liệu: Ảnh chụp thực tế, họa tiết, gradient tinh tế, hoặc tương tác trực quan.
   - Số lượng ô phải khớp chính xác với lượng nội dung (3 nội dung = 3 ô; cấm để ô trống vô nghĩa).
6. **Nghiêm cấm ảnh chụp giả bằng thẻ `<div>`:**
   - Cấm tự chế mockup giao diện sản phẩm bằng các thẻ `<div>` kẻ bảng giả mạo. Phải dùng ảnh thật (từ công cụ sinh ảnh hoặc ảnh chụp màn hình thật).
7. **Copy Self-Audit (Tự rà soát câu chữ):**
   - Trước khi ship, Agent phải đọc lại từng dòng text hiển thị trên web.
   - Loại bỏ toàn bộ các câu slogan vô nghĩa, sáo rỗng, triết lý hão huyền mà LLM hay tự sáng tác. Thay bằng câu văn chức năng, gãy gọn, đúng bản chất sản phẩm.

---

# CHƯƠNG 8: ComposioHQ/awesome-claude-skills
### *Kiến trúc phân tầng & Nạp ngữ cảnh lũy tiến (Context Architecture)*

### 8.1 Phân định rõ 3 tầng: MCP vs Tools vs Skills
| Tầng | Định nghĩa | Ví dụ |
| :--- | :--- | :--- |
| **MCP (Model Context Protocol)** | Giao thức kết nối, xác thực và truyền dữ liệu ra bên ngoài | Kết nối tới GitHub API, PostgreSQL DB, Slack Workspace |
| **Tools** | Các hàm/công cụ thực thi cụ thể mà Agent có thể gọi | `run_command`, `read_file`, `write_file`, `search_web` |
| **Skills** | Quy trình hướng dẫn hành vi, luật lệ và rào chắn chất lượng | Dạy Agent quy trình TDD, quy chuẩn thiết kế UI, cách review code |

*Quy tắc vận hành:* MCP cấp quyền truy cập, Tools cấp hành động, Skills định hướng hành vi.

### 8.2 Cơ chế Progressive Disclosure (Nạp ngữ cảnh lũy tiến)
- **Vấn đề:** Nếu nạp toàn bộ hàng trăm tài liệu kỹ năng vào Prompt ban đầu, context window sẽ bị nghẽn (chiếm hàng chục ngàn token), gây tốn kém chi phí và làm Agent mất tập trung (Lost in the Middle).
- **Cơ chế nạp 3 bước:**
  1. **Bước 1 (Session Start - Indexing):** Agent chỉ nạp Tên (Name) và Mô tả ngắn (Description) của mỗi Skill (~100 tokens/skill).
  2. **Bước 2 (Skill Activation):** Chỉ khi người dùng yêu cầu tác vụ tương ứng, Agent mới đọc file `SKILL.md` chi tiết (< 5.000 tokens).
  3. **Bước 3 (On-demand Resources):** Các tài liệu chuyên sâu trong thư mục `references/` và mã script trong `scripts/` chỉ được tải khi thực sự cần giải quyết một bài toán cụ thể.

---

# CHƯƠNG 9: tech-leads-club/agent-skills & i-have-adhd
### *Bảo mật chuỗi cung ứng & Định dạng Action-First*

### 9.1 Bảo mật chuỗi cung ứng kỹ năng (Skill Security & Trust)
- **Cảnh báo từ báo cáo an ninh Snyk:** Hơn **13.4%** kỹ năng trên các marketplace mở chứa lỗ hổng bảo mật nghiêm trọng (Prompt Injection, rò rỉ API key, thực thi mã độc qua terminal).
- **Nguyên tắc an toàn bắt buộc:**
  - Tuyệt đối không chạy file nhị phân (binary/executable) không rõ nguồn gốc.
  - Khóa toàn vẹn bằng mã băm (SHA-256 lockfile integrity).
  - Phân quyền nghiêm ngặt: Luôn hỏi ý kiến người dùng trước các lệnh hủy hoại dữ liệu (xóa bảng DB, xóa thư mục, sửa hạ tầng cloud).
  - Tự động ẩn (redact) các thông tin nhạy cảm: Token, Mật khẩu, API Keys khi in log ra màn hình.

### 9.2 Kỹ năng "I Have ADHD" — Định dạng thông tin giảm tải nhận thức
Người dùng khi lập trình phải chịu áp lực nhận thức rất lớn (Cognitive Load). Định dạng thông tin của Agent phải tối ưu để não bộ tiếp thu nhanh nhất:
1. **Action-First (Hành động đi đầu):**
   - Dòng đầu tiên của câu trả lời luôn là việc cụ thể người dùng có thể làm ngay: Một dòng lệnh CLI, một đường dẫn file kèm số dòng (`src/auth.ts:42`), hoặc đoạn code thay thế.
   - Tuyệt đối không mở bài bằng lời chào hay tóm tắt dài dòng.
2. **Đánh số thứ tự các bước (Numbered Steps):**
   - Mỗi bước là 1 hành động độc lập, có giới hạn rõ ràng.
   - Không lồng ghép quá nhiều hành động vào 1 dòng ("Mở file X, rồi sửa Y, rồi chạy Z"). Hãy tách thành bước 1, bước 2, bước 3.
3. **Restate State (Nhắc lại trạng thái hiện tại):**
   - Người dùng dễ quên tiến độ giữa các lượt chat dài. Agent luôn cập nhật tiến độ ở đầu phản hồi: `[Tiến độ: Đã xong bước 2/5]`.
4. **Dập tắt các chủ đề phân nhánh (Suppress Tangents):**
   - Tập trung giải quyết dứt điểm vấn đề trước mắt. Không "tiện thể" nhắc sang chuyện khác làm người dùng xao nhãng.
   - Nếu có vấn đề phụ: Xử lý xong việc chính, sau đó mới hỏi xem người dùng có muốn xử lý vấn đề phụ ở lượt tiếp theo không.
5. **Chốt hạ bằng 1 hành động duy nhất (Under 2 minutes):**
   - Luôn kết thúc câu trả lời bằng ĐÚNG MỘT việc mà người dùng có thể làm trong dưới 2 phút để tiếp tục mạch làm việc (Ví dụ: *"Bước tiếp theo: Chạy lệnh `npm test` và gửi cho tôi dòng lỗi đầu tiên"*).

---

# CHƯƠNG 10: KHUNG VẬN HÀNH HỢP NHẤT (THE APEX OPERATING SYSTEM)

Khi hợp nhất 9 kho tri thức trên, một AI Coding Agent hoàn hảo sẽ vận hành theo sơ đồ logic sau:

```
[Nhận yêu cầu từ người dùng]
             │
             ▼
[1. THINK BEFORE CODING] ────▶ Có mơ hồ / hiểu nhầm? ──(Có)──▶ [Socratic Grilling: Hỏi 1 câu duy nhất]
             │                                                                   │
           (Rõ ràng) ◀───────────────────────────────────────────────────────────┘
             │
             ▼
[2. SPEC & ARCHITECTURE] ────▶ Tra cứu CONTEXT.md (Từ điển thuật ngữ & ADR)
             │                 Thiết lập ranh giới /constraints & Tiêu chí đo lường
             │
             ▼
[3. THE IRON LAW OF TDD] ────▶ Viết test tối thiểu (RED)
             │                 Chạy test chứng thực FAIL
             │                 Viết code tối thiểu (GREEN - Simplicity First / YAGNI)
             │                 Chạy test chứng thực PASS
             │                 Refactor sạch sẽ & chạy lại test
             │
             ▼
[4. FRONTEND & AESTHETICS] ──▶ (Nếu có làm UI)
             │                 Đọc vị bối cảnh (Brief Inference)
             │                 Thiết lập 3 Con Xoay (Variance / Motion / Density)
             │                 Áp dụng 192 quy tắc ngành + Kiểm tra độ tương phản WCAG AA
             │                 Diệt trừ AI Slop: Cấm gradient tím, Cấm Serif mặc định, Hero 100dvh
             │                 Copy Self-Audit: Quét sạch văn phong AI sáo rỗng
             │
             ▼
[5. SURGICAL DELIVERY] ──────▶ Chạm đúng file/dòng cần sửa, không lan man
             │                 Tự review 5 trục: Đúng đắn, Bảo mật, Hiệu năng, Bảo trì, Test
             │
             ▼
[6. ACTION-FIRST RESPONSE] ──▶ Báo cáo tiến độ [Bước X/Y]
                               Dòng đầu tiên là Action (Lệnh CLI / Đường dẫn file:dòng)
                               Cắt 65% rác ngôn từ (Caveman + STE), giữ nguyên 100% code kỹ thuật
                               Kết thúc bằng DUY NHẤT 1 hành động kế tiếp dưới 2 phút!
```
