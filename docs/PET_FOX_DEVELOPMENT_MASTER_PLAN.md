# PET FOX DEVELOPMENT MASTER PLAN

## Tài liệu đặc tả triển khai hệ thống Digital Fox Pet trên website Portfolio

> **Project:** `porfolio_khoa` / Portfolio-AnhKhoa\
> **Production:** `https://www.bily.id.vn/`\
> **Asset chính:** `public/models/fox.glb`\
> **Mục tiêu:** Nâng cấp Digital Fox từ một mô hình 3D có procedural
> idle thành một **PET creature system** có cảm giác sống động, tự nhiên
> và tương tác giống pet trong game, nhưng vẫn phù hợp với website
> portfolio chuyên nghiệp.\
> **Ngày tài liệu:** 25/09/2026\
> **Trạng thái:** Planning / Implementation Specification\
> **Nguyên tắc:** Không phá vỡ architecture, UI, DeveloperCard3D, SEO,
> accessibility và performance hiện có.

------------------------------------------------------------------------

# 0. MỤC ĐÍCH VÀ CÁCH AI PHẢI SỬ DỤNG TÀI LIỆU NÀY

Tài liệu này là **master implementation specification** cho toàn bộ quá
trình phát triển PET Fox.

AI/Developer khi thực hiện phải:

1.  Đọc toàn bộ tài liệu trước khi sửa code.
2.  Xác định đúng phase đang thực hiện.
3.  Không tự ý nhảy phase nếu phase trước chưa PASS.
4.  Không thay đổi `fox.glb` nếu chưa có yêu cầu và bằng chứng kỹ thuật
    cần thiết.
5.  Không thay đổi architecture lớn chỉ để đạt một hiệu ứng animation
    đơn lẻ.
6.  Không thêm animation chỉ vì muốn "nhiều chuyển động hơn".
7.  Mọi thay đổi phải bảo toàn:
    -   Hero structure.
    -   CTA hierarchy.
    -   DeveloperCard3D.
    -   Existing shader pipeline.
    -   Responsive behavior.
    -   `prefers-reduced-motion`.
    -   `pointer-events` isolation.
    -   SEO.
    -   Production routes.
8.  Sau mỗi phase phải có validation và ghi nhận PASS/FAIL.
9.  Nếu một yêu cầu mới mâu thuẫn với tài liệu này, phải xác định ảnh
    hưởng trước khi triển khai.
10. Ưu tiên **visual quality + natural motion + performance**, không ưu
    tiên số lượng animation.

------------------------------------------------------------------------

# 1. TỔNG QUAN DỰ ÁN

## 1.1. Vision

Digital Fox là mascot/visual identity của portfolio.

Fox phải tạo cảm giác:

-   đang sống;
-   có trọng lượng;
-   có phản ứng;
-   có trạng thái;
-   có chuyển động vi mô;
-   có chuyển động thứ cấp;
-   có hành vi ngẫu nhiên;
-   có phản ứng với người dùng;
-   nhưng không biến portfolio thành game demo 3D.

## 1.2. Định hướng visual

-   Modern Developer Portfolio.
-   Dark / premium / futuristic vừa phải.
-   Tập trung Backend Developer / Software Engineer.
-   Digital Fox là visual anchor.
-   3D là điểm nhấn, không lấn át nội dung.
-   Animation có chiều sâu nhưng nhẹ.
-   Responsive desktop → tablet → mobile.
-   Accessibility và reduced-motion bắt buộc được giữ.
-   Fox không được che text, CTA hoặc component quan trọng.

## 1.3. Mục tiêu cuối

Khi người dùng mở website:

1.  Nhận biết đây là portfolio của một Backend Developer.
2.  Nhìn thấy nội dung chính và CTA rõ ràng.
3.  Nhận ra Digital Fox là điểm nhận diện riêng.
4.  Sau khi quan sát vài giây, nhận thấy Fox đang "sống".
5.  Chuyển động không gây cảm giác loop máy móc.
6.  Website vẫn nhanh, ổn định và responsive.

## 1.4. Definition of Done

Fox được coi là hoàn thiện khi:

-   kích thước đủ nhận diện;
-   3 tails nhìn rõ;
-   body breathing tự nhiên;
-   head movement tự nhiên;
-   ear twitch có timing ngẫu nhiên;
-   blink hoạt động nếu asset cho phép;
-   tail có secondary motion;
-   3 tails không chuyển động đồng bộ;
-   cursor response có damping;
-   random idle events hoạt động;
-   state transition mượt;
-   special flourish chỉ xuất hiện có kiểm soát;
-   không che UI;
-   mobile hoạt động tốt;
-   reduced-motion hoạt động;
-   không tạo regression;
-   production performance đạt mục tiêu.

------------------------------------------------------------------------

# 2. BASELINE KỸ THUẬT HIỆN TẠI

## 2.1. Project

-   Frontend portfolio: `d:/porfolio1/porfolio_khoa`
-   GitHub: `Anhkhoa1112/Portfolio-AnhKhoa`
-   Main branch dùng cho portfolio.
-   Production build và production validation đã tồn tại.

## 2.2. Digital Fox asset

-   Path: `public/models/fox.glb`
-   Kích thước hiện tại: khoảng **83 MB**
-   Vertices: khoảng **929,022**
-   Geometry islands: khoảng **9,529**
-   Model gốc không được destructive-edit.
-   Fox GLB không có animation clip sẵn.

## 2.3. Pipeline hiện có

Đã có nền tảng:

-   Fox shader.
-   Tail separation.
-   Tail runtime system.
-   Tail motion.
-   Procedural idle animation.
-   Body breathing.
-   Ear motion.
-   Cursor tracking.
-   Responsive positioning.
-   Reduced-motion.
-   Pointer interaction isolation.
-   Production integration.

## 2.4. Những phần đã PASS

-   Fox geometry analysis.
-   3-tail identification.
-   Runtime tail control.
-   Production DigitalFox integration.
-   Responsive placement.
-   Existing idle animation.
-   Cursor tracking.
-   Reduced-motion foundation.
-   DeveloperCard3D compatibility.
-   Production build.
-   TypeScript check.
-   Production routes.

## 2.5. Những phần còn cần polish

-   Fox đang quá nhỏ.
-   Tail motion khó nhận biết.
-   Front camera che tail.
-   Material có cảm giác hơi plastic.
-   Chưa có creature state system hoàn chỉnh.
-   Chưa có random idle event system đầy đủ.
-   Chưa có secondary tail motion đủ rõ.
-   Chưa có flourish system hoàn chỉnh.
-   83 MB asset cần benchmark thực tế.
-   Git/asset/deployment cần final audit.
-   Mobile/low-end performance cần stress test.

------------------------------------------------------------------------

# 3. PHÂN TÍCH MỤC TIÊU CHUYỂN ĐỘNG TỪ VIDEO PET

Video demo được sử dụng làm **visual reference**, không phải yêu cầu sao
chép nguyên xi từng frame.

Các đặc điểm cần tái hiện về mặt nguyên lý:

1.  Body breathing.
2.  Weight shift.
3.  Head movement.
4.  Ear twitch.
5.  Blink.
6.  Tail sway.
7.  Tail secondary motion.
8.  Ba tail chuyển động lệch phase.
9.  Anticipation trước chuyển động lớn.
10. Flourish / special idle event.
11. Return-to-idle.
12. Random timing.
13. Damping/easing.
14. Không có loop lặp quá dễ nhận ra.
15. Chuyển động nhiều lớp nhưng biên độ nhỏ.
16. Cảm giác creature có trọng lượng.

------------------------------------------------------------------------

# 4. KIẾN TRÚC PHÂN CẤP CỦA PET SYSTEM

Đề xuất kiến trúc:

``` text
DigitalFox
│
├── FoxRoot
│
├── FoxBodyController
│   ├── breathing
│   ├── weightShift
│   ├── idleSway
│   └── bodyRotation
│
├── FoxHeadController
│   ├── lookAt
│   ├── idleTurn
│   ├── pitch
│   └── damping
│
├── FoxEarController
│   ├── leftEar
│   ├── rightEar
│   └── twitchScheduler
│
├── FoxBlinkController
│   ├── blink
│   └── blinkScheduler
│
├── FoxTailController
│   ├── Tail1
│   ├── Tail2
│   └── Tail3
│
├── FoxInteractionController
│   ├── cursor
│   ├── hover
│   └── interactionIntensity
│
├── FoxIdleEventScheduler
│   ├── random event
│   ├── cooldown
│   └── probability
│
├── FoxStateMachine
│   ├── IDLE
│   ├── CURSOR_DETECTED
│   ├── LOOK_AT_CURSOR
│   ├── IDLE_VARIATION
│   ├── ANTICIPATION
│   ├── FLOURISH
│   ├── SETTLE
│   └── RETURN_TO_IDLE
│
└── FoxPerformanceController
    ├── desktop
    ├── tablet
    ├── mobile
    ├── low-end
    └── reduced-motion
```

------------------------------------------------------------------------

# 5. NGUYÊN TẮC ANIMATION

## 5.1. Animation nhiều lớp

Không sử dụng một animation loop duy nhất.

Phân lớp:

``` text
Layer A — Always Running
    breathing
    subtle body sway
    tail sway
    micro head motion

Layer B — Interaction
    cursor look
    head response
    body response
    subtle tail response

Layer C — Random Idle
    blink
    ear twitch
    tail flick
    head turn
    weight shift

Layer D — Special
    anticipation
    flourish
    settle
```

## 5.2. Không đồng bộ tuyệt đối

Không để:

``` text
body = sin(t)
tail1 = sin(t)
tail2 = sin(t)
tail3 = sin(t)
ear = sin(t)
```

Mà phải có:

-   phase;
-   delay;
-   amplitude;
-   damping;
-   duration;
-   cooldown;
-   random interval.

## 5.3. Nguyên tắc chuyển động

Ưu tiên:

``` text
anticipation
→ action
→ overshoot
→ settle
→ idle
```

thay vì:

``` text
loop
→ loop
→ loop
```

------------------------------------------------------------------------

# 6. 26 HẠNG MỤC CHUYỂN ĐỘNG VÀ KỸ THUẬT CẦN TRIỂN KHAI

## 6.1. Hạng mục 01 --- Idle Breathing

Mục tiêu: Fox không đứng bất động.

Yêu cầu:

-   body position thay đổi rất nhỏ;
-   scale thay đổi cực nhẹ;
-   rotation thay đổi nhẹ;
-   chu kỳ không quá nhanh;
-   không được nhìn thấy rõ như "phóng to/thu nhỏ".

Không dùng scale toàn model với biên độ lớn.

------------------------------------------------------------------------

## 6.2. Hạng mục 02 --- Body Weight Shift

Mục tiêu: tạo cảm giác có trọng lượng.

Cơ chế:

``` text
center
→ shift left
→ center
→ shift right
→ center
```

Yêu cầu:

-   biên độ nhỏ;
-   duration dài;
-   easing mềm;
-   không lặp cố định.

------------------------------------------------------------------------

## 6.3. Hạng mục 03 --- Head Movement

Head phải có animation riêng.

Bao gồm:

-   yaw;
-   pitch;
-   subtle roll;
-   random idle turn;
-   return-to-neutral.

Không cho đầu quay quá mạnh.

------------------------------------------------------------------------

## 6.4. Hạng mục 04 --- Cursor Tracking

Cursor là tín hiệu tham chiếu, không phải mục tiêu mà Fox phải "đuổi".

Tỷ lệ đề xuất:

``` text
head response  = 100%
body response  = 15%
tail response  = 5–10%
```

Yêu cầu:

-   smooth damping;
-   rotation limit;
-   không giật;
-   mobile giảm hoặc tắt.

------------------------------------------------------------------------

## 6.5. Hạng mục 05 --- Ear Twitch

Tạo event ngẫu nhiên:

``` text
EAR_TWITCH
```

Yêu cầu:

-   tai trái và phải không nhất thiết cùng lúc;
-   random interval;
-   random duration;
-   cooldown;
-   amplitude nhỏ.

------------------------------------------------------------------------

## 6.6. Hạng mục 06 --- Blink

Nếu cấu trúc mắt cho phép:

``` text
BLINK
```

Yêu cầu:

-   random timing;
-   không blink theo chu kỳ cố định;
-   duration ngắn;
-   có double-blink hiếm;
-   reduced-motion có thể bỏ.

Nếu không thể điều khiển mắt bằng runtime, không được phá model để ép
tính năng.

------------------------------------------------------------------------

## 6.7. Hạng mục 07 --- Tail Sway

Đây là nền tảng của tail animation.

Mỗi tail phải có:

-   amplitude;
-   frequency;
-   phase;
-   damping;
-   delay.

------------------------------------------------------------------------

## 6.8. Hạng mục 08 --- Tail Secondary Motion

Mục tiêu:

``` text
Root
 ↓
Middle
 ↓
Tip
```

Chuyển động của tip phải theo sau root.

Không làm cả tail quay như một khối cứng.

------------------------------------------------------------------------

## 6.9. Hạng mục 09 --- Three-Tail Phase Difference

Đề xuất:

``` text
Tail 1 phase = 0.0
Tail 2 phase = 0.7
Tail 3 phase = 1.4
```

Các giá trị chỉ là starting point; phải tuning bằng visual test.

------------------------------------------------------------------------

## 6.10. Hạng mục 10 --- Tail Delay

Mỗi phần của tail phải có delay nhỏ.

Mục tiêu tạo:

``` text
root → middle → tip
```

không phải:

``` text
root + middle + tip
```

cùng lúc.

------------------------------------------------------------------------

## 6.11. Hạng mục 11 --- Tail Flick

Random event:

``` text
TAIL_FLICK
```

Một tail hoặc hai tail phản ứng nhẹ.

Không trigger quá thường xuyên.

------------------------------------------------------------------------

## 6.12. Hạng mục 12 --- Anticipation

Trước flourish:

``` text
idle
→ small body shift
→ tail gather
→ action
```

Mục tiêu làm animation có nguyên nhân và kết quả.

------------------------------------------------------------------------

## 6.13. Hạng mục 13 --- Flourish

Special animation.

Flow:

``` text
IDLE
→ ANTICIPATION
→ FLOURISH
→ SETTLE
→ IDLE
```

Có thể bao gồm:

-   body movement;
-   head movement;
-   tail expansion;
-   glow;
-   energy response nếu phù hợp.

Không chạy liên tục.

------------------------------------------------------------------------

## 6.14. Hạng mục 14 --- Settle

Sau flourish phải có phase trở lại trạng thái nghỉ.

Không snap:

``` text
FLOURISH → IDLE
```

mà:

``` text
FLOURISH
→ overshoot
→ damping
→ neutral
→ IDLE
```

------------------------------------------------------------------------

## 6.15. Hạng mục 15 --- Random Idle Events

Event scheduler nên hỗ trợ:

``` text
blink
ear twitch
tail flick
head turn
weight shift
micro body motion
```

Mỗi event cần:

-   probability;
-   cooldown;
-   duration;
-   priority;
-   interruptibility.

------------------------------------------------------------------------

## 6.16. Hạng mục 16 --- Idle Variation

Không để idle cycle giống nhau.

Ví dụ:

``` text
Idle A
Idle B
Idle C
Idle D
```

Có thể chọn bằng weighted random.

------------------------------------------------------------------------

## 6.17. Hạng mục 17 --- Look At Cursor

Tách khỏi idle head motion.

Nếu cursor xuất hiện:

``` text
IDLE
→ CURSOR_DETECTED
→ LOOK_AT_CURSOR
```

Khi cursor rời:

``` text
LOOK_AT_CURSOR
→ IDLE_RETURN
→ IDLE
```

------------------------------------------------------------------------

## 6.18. Hạng mục 18 --- Interaction Damping

Mọi interaction phải có damping.

Không:

``` text
targetRotation = cursorRotation
```

mà:

``` text
currentRotation
→ lerp/damp
→ targetRotation
```

Mục tiêu: chuyển động mềm.

------------------------------------------------------------------------

## 6.19. Hạng mục 19 --- Material Response

Fox hiện có cảm giác hơi plastic.

Cần đánh giá:

-   roughness variation;
-   specular;
-   highlight;
-   rim light;
-   ambient;
-   contact shadow;
-   eye glow.

Không glow toàn thân quá mạnh.

------------------------------------------------------------------------

## 6.20. Hạng mục 20 --- Camera / Framing

Hiện tại front-facing angle làm tail bị che.

Cần test:

-   slight 3/4 angle;
-   camera elevation nhẹ;
-   model rotation nhẹ;
-   framing rộng hơn.

Mục tiêu:

> mặt Fox vẫn rõ + silhouette rõ + 3 tails nhìn thấy.

------------------------------------------------------------------------

## 6.21. Hạng mục 21 --- Fox Scale

Fox production hiện quá nhỏ.

Cần tăng visual presence nhưng:

-   không che CTA;
-   không che text;
-   không phá Hero;
-   mobile phải có scale riêng.

------------------------------------------------------------------------

## 6.22. Hạng mục 22 --- Responsive Behavior

### Desktop

-   full visual presence;
-   full tail motion;
-   cursor interaction.

### Tablet

-   giảm scale;
-   giảm animation intensity nếu cần.

### Mobile

-   không che CTA;
-   giảm hoặc tắt cursor;
-   ưu tiên performance.

------------------------------------------------------------------------

## 6.23. Hạng mục 23 --- Performance Tier

### HIGH

``` text
full idle
full tail
head tracking
ear
blink
random events
flourish
```

### MEDIUM

``` text
idle
tail
head
ear
```

### LOW

``` text
breathing
reduced tail
no cursor
no flourish
```

### REDUCED MOTION

``` text
static/minimal motion
```

------------------------------------------------------------------------

## 6.24. Hạng mục 24 --- Accessibility

Bắt buộc giữ:

-   `prefers-reduced-motion`;
-   pointer-events không block UI;
-   keyboard navigation;
-   contrast;
-   CTA visibility;
-   screen reader content độc lập với Fox.

------------------------------------------------------------------------

## 6.25. Hạng mục 25 --- Asset / Loading Performance

Fox GLB khoảng 83 MB là rủi ro lớn.

Phải benchmark:

-   download size;
-   transfer size;
-   load time;
-   decode time;
-   parse time;
-   GPU memory;
-   CPU time;
-   FPS;
-   mobile behavior.

Có thể nghiên cứu:

-   Draco;
-   Meshopt;
-   texture optimization;
-   lazy loading;
-   controlled preload.

Không tối ưu theo cách phá visual quality.

------------------------------------------------------------------------

## 6.26. Hạng mục 26 --- Final Creature Quality

Đây là bước tổng hợp.

Fox phải đạt:

``` text
Alive
Natural
Responsive
Premium
Lightweight
Non-intrusive
Responsive
Accessible
Stable
```

Không đánh giá bằng số lượng animation.

Đánh giá bằng cảm giác creature.

------------------------------------------------------------------------

# 7. DANH SÁCH VẤN ĐỀ CẦN GIẢI QUYẾT

## P0 --- Bắt buộc trước implementation sâu

-   [ ] Git working tree audit.
-   [ ] Xác nhận file modified/untracked.
-   [ ] Xác nhận `fox.glb` được track đúng.
-   [ ] Kiểm tra giới hạn repository/deployment.
-   [ ] Benchmark asset 83 MB.
-   [ ] Production loading test.
-   [ ] Desktop FPS test.
-   [ ] Mobile FPS test.
-   [ ] Memory/GPU test.

## P1 --- Visual Fox

-   [ ] Tăng Fox size.
-   [ ] Điều chỉnh camera.
-   [ ] Hiển thị rõ 3 tails.
-   [ ] Tăng tail amplitude vừa phải.
-   [ ] Secondary tail motion.
-   [ ] Body breathing.
-   [ ] Head movement.
-   [ ] Ear twitch.
-   [ ] Cursor damping.
-   [ ] Material polish.

## P2 --- Creature System

-   [ ] Random idle events.
-   [ ] Blink.
-   [ ] Idle variation.
-   [ ] State machine.
-   [ ] Anticipation.
-   [ ] Flourish.
-   [ ] Settle.
-   [ ] Interaction scheduler.

## P3 --- Optimization / QA

-   [ ] Performance tiers.
-   [ ] Reduced-motion validation.
-   [ ] Mobile QA.
-   [ ] Browser QA.
-   [ ] Accessibility QA.
-   [ ] Regression test.
-   [ ] Production deployment test.

------------------------------------------------------------------------

# 8. THỨ TỰ ƯU TIÊN TRIỂN KHAI

## Phase 0 --- Baseline Lock

Mục tiêu:

> Chụp lại trạng thái hiện tại trước khi sửa.

Thực hiện:

``` bash
git status
git diff --stat
npm run build
```

Ghi nhận:

-   build;
-   TypeScript;
-   current visual;
-   current FPS;
-   asset loading;
-   routes.

**Không sửa animation trước Phase 0.**

------------------------------------------------------------------------

## Phase 1 --- Repository & Asset Safety

Mục tiêu:

-   repo sạch hoặc hiểu rõ mọi thay đổi;
-   asset được deployment đúng;
-   không có debug artifact.

Tasks:

1.  Git status.
2.  Git diff.
3.  Untracked files.
4.  fox.glb tracking.
5.  deployment behavior.
6.  production asset URL.
7.  network loading.
8.  build.
9.  TypeScript.

Exit criteria:

``` text
PASS:
repo state understood
asset available
build PASS
TS PASS
```

------------------------------------------------------------------------

## Phase 2 --- Fox Visual Foundation

Mục tiêu:

> Làm Fox đủ lớn và đủ rõ trước khi đánh giá animation.

Tasks:

1.  Fox scale.
2.  Camera.
3.  3/4 framing.
4.  Tail visibility.
5.  Shadow.
6.  Material.
7.  Lighting.

Exit criteria:

-   mặt rõ;
-   3 tails rõ;
-   không che CTA;
-   không phá Hero.

------------------------------------------------------------------------

## Phase 3 --- Core Creature Motion

Tasks:

1.  breathing;
2.  weight shift;
3.  head motion;
4.  ear twitch;
5.  tail sway;
6.  tail phase;
7.  tail delay;
8.  secondary motion.

Exit criteria:

> Fox nhìn sống ngay cả khi user không tương tác.

------------------------------------------------------------------------

## Phase 4 --- Interaction System

Tasks:

1.  cursor detection;
2.  head look;
3.  damping;
4.  body response;
5.  tail response;
6.  return-to-idle.

Exit criteria:

-   không giật;
-   không overreact;
-   không block UI.

------------------------------------------------------------------------

## Phase 5 --- Random Idle System

Tasks:

1.  event scheduler;
2.  probability;
3.  cooldown;
4.  random duration;
5.  idle variation;
6.  blink;
7.  ear twitch;
8.  tail flick;
9.  head turn.

Exit criteria:

> User xem 30--60 giây không nhận ra một loop cố định.

------------------------------------------------------------------------

## Phase 6 --- Special Flourish

Tasks:

1.  anticipation;
2.  flourish;
3.  energy/glow nếu phù hợp;
4.  settle;
5.  cooldown.

Exit criteria:

-   animation có đầu/cuối;
-   không phá layout;
-   không xảy ra quá thường xuyên;
-   return idle tự nhiên.

------------------------------------------------------------------------

## Phase 7 --- Performance

Tasks:

1.  production build;
2.  network;
3.  asset loading;
4.  FPS;
5.  memory;
6.  GPU;
7.  mobile;
8.  low-end;
9.  browser compatibility.

Exit criteria:

> Animation không làm portfolio có cảm giác chậm.

------------------------------------------------------------------------

## Phase 8 --- Responsive / Accessibility

Tasks:

-   desktop;
-   tablet;
-   mobile;
-   reduced motion;
-   keyboard;
-   CTA;
-   pointer events.

Exit criteria:

> Không có regression ở UI hoặc accessibility.

------------------------------------------------------------------------

## Phase 9 --- Final QA

Kiểm tra:

-   navigation;
-   CTA;
-   CV;
-   projects;
-   contact;
-   Fox;
-   ID Card;
-   responsive;
-   SEO;
-   external links;
-   mobile menu;
-   loading;
-   browser compatibility.

------------------------------------------------------------------------

## Phase 10 --- Production Deploy

Chỉ deploy khi:

-   build PASS;
-   TypeScript PASS;
-   Git diff reviewed;
-   asset verified;
-   Fox tested;
-   mobile tested;
-   reduced-motion tested;
-   no debug route;
-   no broken link;
-   performance acceptable.

------------------------------------------------------------------------

# 9. CẤU TRÚC ƯU TIÊN P0/P1/P2/P3

``` text
P0 — SAFETY
│
├── Repository
├── Asset
├── Build
├── Deployment
└── Baseline performance
        ↓
P1 — VISUAL
│
├── Scale
├── Camera
├── Tail visibility
├── Material
└── Core animation
        ↓
P2 — CREATURE
│
├── State machine
├── Random events
├── Blink
├── Flourish
└── Interaction
        ↓
P3 — QUALITY
│
├── Performance tiers
├── Accessibility
├── Browser QA
├── Mobile QA
└── Final regression
```

------------------------------------------------------------------------

# 10. QUY TẮC KHÔNG ĐƯỢC PHÁ VỠ

Không được phá:

-   `fox.glb`;
-   DeveloperCard3D;
-   existing shader pipeline;
-   Hero structure;
-   CTA hierarchy;
-   reduced-motion;
-   pointer-events isolation;
-   SEO;
-   production route behavior.

Không được:

-   thêm animation chỉ để tăng số lượng;
-   làm Fox quá lớn;
-   làm glow quá mạnh;
-   làm tail giống tentacle;
-   để Fox che CTA;
-   biến portfolio thành game;
-   hy sinh performance để lấy visual;
-   tạo animation loop dễ nhận biết;
-   tạo object/material/geometry mới mỗi frame;
-   thêm physics engine nặng nếu procedural animation đáp ứng được yêu
    cầu.

------------------------------------------------------------------------

# 11. PERFORMANCE IMPLEMENTATION RULES

## 11.1. Không allocation mỗi frame

Tránh:

``` text
new Vector3()
new Quaternion()
new Material()
new Geometry()
```

trong animation loop.

Ưu tiên reusable objects.

## 11.2. Update theo frame

Animation runtime phải dùng một loop thống nhất.

Không tạo nhiều `requestAnimationFrame` độc lập cho từng feature.

## 11.3. Shader

Các chuyển động phù hợp có thể tiếp tục xử lý bằng shader.

Ưu tiên GPU-friendly processing.

## 11.4. Interaction

Pointer data chỉ cập nhật target.

Animation controller mới thực hiện smoothing.

## 11.5. Reduced motion

Khi:

``` text
prefers-reduced-motion: reduce
```

phải giảm hoặc tắt:

-   flourish;
-   cursor tracking;
-   random event;
-   tail amplitude;
-   body motion.

------------------------------------------------------------------------

# 12. PERFORMANCE TARGET

Không hard-code một con số FPS duy nhất cho mọi thiết bị.

Đánh giá theo:

## Desktop

-   animation ổn định;
-   không stutter;
-   UI không lag;
-   scroll không bị ảnh hưởng.

## Tablet

-   animation vẫn mượt;
-   GPU load không bất thường.

## Mobile

-   model load hợp lý;
-   animation giảm khi cần;
-   scroll và touch vẫn mượt.

## Low-end

-   ưu tiên UI;
-   giảm Fox animation;
-   có fallback.

------------------------------------------------------------------------

# 13. BROWSER COMPATIBILITY

Phải kiểm tra tối thiểu:

-   Chrome desktop.
-   Edge desktop.
-   Firefox desktop.
-   Safari desktop nếu có môi trường test.
-   Chrome Android.
-   Safari iOS nếu có môi trường test.

Kiểm tra:

-   WebGL;
-   model loading;
-   shader;
-   pointer;
-   reduced-motion;
-   resize;
-   mobile viewport;
-   memory.

------------------------------------------------------------------------

# 14. RESPONSIVE SPECIFICATION

## Desktop

Fox:

-   lớn hơn baseline hiện tại;
-   3 tails rõ;
-   camera 3/4;
-   full animation;
-   cursor interaction.

## Tablet

Fox:

-   scale giảm;
-   animation intensity giảm nếu cần;
-   CTA không bị che.

## Mobile

Fox:

-   nhỏ hơn desktop;
-   không che text;
-   không che CTA;
-   cursor interaction có thể disable;
-   flourish disable hoặc giảm mạnh;
-   ưu tiên load/performance.

------------------------------------------------------------------------

# 15. STATE MACHINE SPECIFICATION

``` text
                 ┌──────────────┐
                 │     IDLE     │
                 └──────┬───────┘
                        │
              random event
                        ↓
              ┌────────────────┐
              │ IDLE_VARIATION │
              └───────┬────────┘
                      │
                      ↓
                    IDLE

IDLE
 ↓ cursor
CURSOR_DETECTED
 ↓
LOOK_AT_CURSOR
 ↓ cursor leaves
IDLE_RETURN
 ↓
IDLE

IDLE
 ↓ special event
ANTICIPATION
 ↓
FLOURISH
 ↓
SETTLE
 ↓
IDLE
```

Mỗi state phải có:

-   enter;
-   update;
-   exit;
-   duration;
-   interrupt rule;
-   priority;
-   cooldown nếu cần.

------------------------------------------------------------------------

# 16. RANDOM EVENT SYSTEM

Mỗi event có schema logic:

``` text
Event {
  id
  probability
  minCooldown
  maxCooldown
  duration
  priority
  interruptible
}
```

Ví dụ:

``` text
BLINK
EAR_TWITCH
TAIL_FLICK
HEAD_TURN
WEIGHT_SHIFT
FLOURISH
```

Không cho nhiều event xung đột.

Ví dụ:

``` text
FLOURISH
```

có priority cao hơn:

``` text
EAR_TWITCH
```

------------------------------------------------------------------------

# 17. VISUAL TUNING WORKFLOW

Không tuning bằng cảm giác sau một lần chạy.

Quy trình:

``` text
Implement
 ↓
Run
 ↓
Record
 ↓
Compare
 ↓
Adjust amplitude
 ↓
Adjust timing
 ↓
Adjust damping
 ↓
Repeat
```

Mỗi lần chỉ thay đổi một nhóm tham số.

Các tham số cần tuning:

-   amplitude;
-   frequency;
-   phase;
-   delay;
-   duration;
-   damping;
-   easing;
-   random interval;
-   cooldown.

------------------------------------------------------------------------

# 18. VIDEO REFERENCE VALIDATION

Không cần clone từng frame.

Kiểm tra theo tiêu chí:

### Body

-   có breathing?
-   có weight shift?
-   có trọng lượng?

### Head

-   có micro movement?
-   có phản ứng?
-   có damping?

### Ear

-   có twitch?
-   có timing không đều?

### Tail

-   3 tails độc lập?
-   có delay?
-   tip theo root?
-   có secondary motion?

### Idle

-   có loop dễ nhận biết?
-   random event có hợp lý?

### Flourish

-   có anticipation?
-   action?
-   settle?

------------------------------------------------------------------------

# 19. TEST CASES

## TC-001 --- Initial Load

Expected:

-   page render;
-   Fox load;
-   UI usable;
-   không block interaction.

## TC-002 --- Idle 60s

Expected:

-   Fox vẫn sống;
-   không loop dễ nhận biết;
-   không memory leak.

## TC-003 --- Cursor

Expected:

-   head follow nhẹ;
-   damping;
-   return smooth.

## TC-004 --- Mobile

Expected:

-   Fox không che CTA;
-   UI không lag;
-   animation reduced.

## TC-005 --- Reduced Motion

Expected:

-   animation tối thiểu;
-   no flourish;
-   no aggressive interaction.

## TC-006 --- Resize

Expected:

-   camera;
-   scale;
-   position;
-   responsive.

## TC-007 --- Low-end

Expected:

-   fallback/reduced tier;
-   UI remains responsive.

## TC-008 --- Long Session

Expected:

-   không tăng memory bất thường;
-   không tạo object liên tục;
-   FPS không giảm dần.

------------------------------------------------------------------------

# 20. QUY TRÌNH KIỂM SOÁT KẾT QUẢ

Sau mỗi phase:

``` text
1. Build
2. TypeScript
3. Visual test
4. Functional test
5. Performance test
6. Regression test
7. Record result
8. PASS / FAIL
```

Không chuyển phase nếu:

-   build fail;
-   TypeScript fail;
-   visual regression nghiêm trọng;
-   UI bị block;
-   performance regression nghiêm trọng.

------------------------------------------------------------------------

# 21. BÁO CÁO SAU MỖI PHASE

AI/Developer phải ghi:

``` text
PHASE:
STATUS:

FILES CHANGED:
- ...

FEATURES ADDED:
- ...

PARAMETERS CHANGED:
- ...

PERFORMANCE:
- ...

REGRESSION:
- ...

TESTS:
- ...

KNOWN ISSUES:
- ...

NEXT STEP:
- ...
```

------------------------------------------------------------------------

# 22. TIÊU CHÍ ĐÁNH GIÁ VISUAL

Đánh giá từng mục theo:

``` text
0 = chưa có
1 = có nhưng lỗi
2 = hoạt động
3 = ổn định
4 = tự nhiên
5 = production quality
```

Không dùng tổng điểm để quyết định thay thế engineering judgment.

Các tiêu chí:

-   body;
-   head;
-   ear;
-   blink;
-   tail;
-   interaction;
-   randomness;
-   flourish;
-   material;
-   camera;
-   framing;
-   responsiveness.

------------------------------------------------------------------------

# 23. TIÊU CHÍ ĐÁNH GIÁ PERFORMANCE

Theo dõi:

-   model load time;
-   network transfer;
-   parse/decode;
-   FPS;
-   frame time;
-   CPU;
-   GPU;
-   memory;
-   mobile;
-   low-end;
-   long-session stability.

Đặc biệt phải đánh giá:

``` text
83 MB fox.glb
+
Fox shader
+
Fox animation
+
DeveloperCard3D
+
UI animation
```

cùng lúc.

------------------------------------------------------------------------

# 24. FINAL QA CHECKLIST

## Functional

-   [ ] navigation
-   [ ] CTA
-   [ ] CV
-   [ ] project links
-   [ ] case studies
-   [ ] contact
-   [ ] external links
-   [ ] mobile menu

## Visual

-   [ ] Hero
-   [ ] Fox
-   [ ] ID Card
-   [ ] Projects
-   [ ] responsive
-   [ ] spacing
-   [ ] typography
-   [ ] loading states

## PET

-   [ ] Fox loads
-   [ ] 3 tails visible
-   [ ] breathing
-   [ ] head motion
-   [ ] ear twitch
-   [ ] blink if supported
-   [ ] tail sway
-   [ ] secondary motion
-   [ ] phase difference
-   [ ] cursor tracking
-   [ ] random idle
-   [ ] flourish
-   [ ] settle
-   [ ] no pointer blocking
-   [ ] reduced motion
-   [ ] camera
-   [ ] material
-   [ ] shadow
-   [ ] glow

## Performance

-   [ ] desktop
-   [ ] tablet
-   [ ] mobile
-   [ ] low-end
-   [ ] FPS
-   [ ] memory
-   [ ] GPU
-   [ ] asset loading
-   [ ] long-session test

## Production

-   [ ] build exit 0
-   [ ] TypeScript clean
-   [ ] `/` = 200
-   [ ] `/cv` = 200
-   [ ] `/robots.txt` = 200
-   [ ] `/sitemap.xml` = 200
-   [ ] test routes = 404
-   [ ] Git diff reviewed
-   [ ] no debug artifact
-   [ ] production Fox tested

------------------------------------------------------------------------

# 25. COMMAND / IMPLEMENTATION WORKFLOW

Baseline:

``` bash
cd d:\porfolio1\porfolio_khoa

git status
git diff --stat
npm run build
```

Sau đó:

``` text
Phase 1
→ repository / asset safety

Phase 2
→ visual foundation

Phase 3
→ core creature motion

Phase 4
→ interaction

Phase 5
→ random idle

Phase 6
→ flourish

Phase 7
→ performance

Phase 8
→ responsive/accessibility

Phase 9
→ final QA

Phase 10
→ production deployment
```

Không triển khai tất cả trong một commit lớn.

Ưu tiên commit nhỏ theo phase.

------------------------------------------------------------------------

# 26. KẾT LUẬN --- MASTER IMPLEMENTATION DIRECTIVE

## Mục tiêu

Biến Digital Fox thành một:

> **Premium Interactive Web Pet**

chứ không chỉ là:

> **3D model có animation.**

## Công thức chất lượng

``` text
Visual Quality
+
Natural Motion
+
Secondary Motion
+
Random Timing
+
State Machine
+
Interaction
+
Performance
+
Accessibility
=
Production PET
```

## Thứ tự tuyệt đối

``` text
SAFETY
  ↓
BASELINE
  ↓
VISUAL FOUNDATION
  ↓
CORE MOTION
  ↓
TAIL SECONDARY MOTION
  ↓
INTERACTION
  ↓
RANDOM IDLE
  ↓
FLOURISH
  ↓
PERFORMANCE
  ↓
RESPONSIVE
  ↓
ACCESSIBILITY
  ↓
QA
  ↓
DEPLOY
```

## Quy tắc cuối cùng

Nếu phải lựa chọn giữa:

``` text
MORE ANIMATION
```

và

``` text
BETTER ANIMATION
```

luôn ưu tiên:

``` text
BETTER ANIMATION
```

Nếu phải lựa chọn giữa:

``` text
VISUAL EFFECT
```

và

``` text
PERFORMANCE
```

không được hy sinh performance.

Nếu phải lựa chọn giữa:

``` text
NEW ARCHITECTURE
```

và

``` text
IMPROVE EXISTING PIPELINE
```

ưu tiên cải thiện pipeline hiện tại nếu vẫn đáp ứng yêu cầu.

Nếu phải lựa chọn giữa:

``` text
MODIFY fox.glb
```

và

``` text
RUNTIME PROCEDURAL CONTROL
```

ưu tiên runtime procedural control, trừ khi có bằng chứng kỹ thuật rõ
ràng rằng asset phải được sửa.

------------------------------------------------------------------------

# APPENDIX A --- CURRENT PROJECT STATUS

Theo master project status hiện tại:

-   Portfolio core: PASS
-   Digital Fox integration: PASS
-   Fox animation foundation: PASS
-   Responsive: PASS
-   Accessibility foundation: PASS
-   SEO foundation: PASS
-   Production validation: PASS
-   Visual Fox polish: NEEDS POLISH
-   83 MB asset/deployment verification: NEEDS FINAL CHECK
-   Git final audit: NEEDS FINAL CHECK
-   Performance stress test: NEEDS FINAL CHECK
-   Final deployment: READY AFTER FINAL QA

## Current strategic direction

Project đang ở giai đoạn:

> **Production Hardening + Visual Polish + Final QA**

Không mở rộng scope ngoài PET animation system nếu không có lý do kỹ
thuật rõ ràng.

------------------------------------------------------------------------

# APPENDIX B --- AI EXECUTION RULE

Khi AI được giao nhiệm vụ sửa PET Fox, AI phải trả lời/hoạt động theo
format:

``` text
1. PHASE IDENTIFIED
2. CURRENT BASELINE
3. FILES TO INSPECT
4. FILES TO MODIFY
5. IMPLEMENTATION PLAN
6. SAFETY CHECK
7. IMPLEMENTATION
8. BUILD / TYPECHECK
9. VISUAL VALIDATION
10. PERFORMANCE VALIDATION
11. REGRESSION CHECK
12. RESULT
13. REMAINING ISSUES
14. NEXT PHASE
```

AI không được:

-   giả định file chưa đọc;
-   giả định animation đã tồn tại;
-   thay đổi model khi chưa kiểm tra;
-   bỏ qua performance;
-   bỏ qua mobile;
-   bỏ qua reduced-motion;
-   bỏ qua regression.

Nếu thiếu dữ liệu để thực hiện một phase, phải xác định rõ dữ liệu còn
thiếu thay vì tự suy đoán.

------------------------------------------------------------------------

# APPENDIX C --- PRIORITY MATRIX

  Priority   Nhóm           Nội dung                            Điều kiện
  ---------- -------------- ----------------------------------- ----------------------
  P0         Safety         Git, asset, build, deployment       Bắt buộc
  P0         Performance    83 MB asset, FPS, memory            Bắt buộc
  P1         Visual         Scale, camera, tails, material      Bắt buộc
  P1         Motion         Body, head, tail, ear               Bắt buộc
  P2         Creature       Random idle, blink, state machine   Nâng cấp
  P2         Interaction    Cursor, reactions                   Nâng cấp
  P2         Flourish       Special animation                   Nâng cấp
  P3         Optimization   Performance tiers                   Bắt buộc trước final
  P3         QA             Browser/mobile/accessibility        Bắt buộc
  P3         Deployment     Production verification             Bắt buộc

------------------------------------------------------------------------

# APPENDIX D --- FINAL ACCEPTANCE STATEMENT

Sản phẩm PET chỉ được coi là hoàn thành khi:

> Người dùng mở website, thấy một Digital Fox đủ lớn và rõ, có 3 tails,
> có breathing, head/ear micro-motion, tail secondary motion, phản ứng
> nhẹ với cursor, có random idle behavior và thỉnh thoảng có special
> flourish; tất cả chuyển động phải tự nhiên, không lặp máy móc, không
> che UI, không phá DeveloperCard3D, hoạt động tốt trên desktop/mobile,
> hỗ trợ reduced-motion và không làm portfolio mất cảm giác nhanh,
> chuyên nghiệp.

**END OF PET FOX DEVELOPMENT MASTER PLAN**
