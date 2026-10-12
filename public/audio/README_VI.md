# Thêm nhạc nền — sparkle.mp3

> Trang web đã có sẵn hệ thống **đồng bộ hình ảnh theo nhạc** (beat-sync).
> Bạn chỉ cần tự thêm file nhạc của mình — repo này **không kèm** bất kỳ file
> nhạc có bản quyền nào.

## Cách thêm nhạc (2 bước)

1. Chuẩn bị file nhạc của bạn (ví dụ bài *Sparkle* — bạn tự tải từ nguồn
   hợp pháp mà bạn có quyền sử dụng).
2. Đặt file vào đúng vị trí này và **giữ nguyên tên file**:

```
public/audio/sparkle.mp3
```

Xong. Build lại / deploy là nút Play góc phải dưới màn hình sẽ phát nhạc,
đồng thời bầu trời, sao băng, nhân vật sẽ "nhảy" theo nhịp nhạc.

## Không có file nhạc thì sao?

Không sao cả. Trang web tự chạy ở **chế độ ambient**: bầu trời vẫn thở
nhẹ, sao vẫn nhấp nháy, sao băng vẫn bay — không báo lỗi, không vỡ giao diện.

## Tinh chỉnh theo file nhạc của bạn

Mở file `src/config/music-sync.ts`:

- `markers`: các mốc thời gian (giây) đánh dấu chuyển đoạn
  `intro → verse → build → chorus → bridge → outro`.
  Nghe nhạc, ghi lại giây mà bài chuyển mood rồi sửa các số `start`
  (giữ thứ tự tăng dần).
- `bpm`: tempo ước lượng của bài — chỉnh cho cảm giác "pulse" hợp.
- `ambient`: chu kỳ "hơi thở" khi không có nhạc.

## Lưu ý bản quyền

Chỉ dùng file nhạc mà bạn có quyền sử dụng (mua bản quyền, nhạc của chính
bạn, hoặc nhạc miễn phí có giấy phép rõ ràng). Không commit file nhạc
vi phạm bản quyền lên repo công khai.
