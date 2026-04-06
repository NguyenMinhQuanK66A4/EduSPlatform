# Đặc tả Yêu cầu Phần mềm (SRS)
# EduS Platform — Nền tảng Đào tạo Trực tuyến

**Phiên bản:** 1.0  
**Ngày cập nhật:** 06/04/2026  
**Tác giả:** EduS Development Team

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Mô tả tổng quát](#2-mô-tả-tổng-quát)
3. [Vai trò người dùng & Phân quyền](#3-vai-trò-người-dùng--phân-quyền)
4. [Yêu cầu chức năng](#4-yêu-cầu-chức-năng)
5. [Yêu cầu phi chức năng](#5-yêu-cầu-phi-chức-năng)
6. [Kiến trúc hệ thống](#6-kiến-trúc-hệ-thống)
7. [Mô hình dữ liệu](#7-mô-hình-dữ-liệu)
8. [Giao diện người dùng](#8-giao-diện-người-dùng)
9. [API Endpoints](#9-api-endpoints)
10. [Bảo mật](#10-bảo-mật)

---

## 1. Giới thiệu

### 1.1. Mục đích

Tài liệu SRS mô tả đầy đủ yêu cầu phần mềm cho hệ thống **EduS Platform**, phục vụ làm cơ sở cho phát triển, kiểm thử và nghiệm thu.

### 1.2. Phạm vi sản phẩm

**EduS** là nền tảng đào tạo trực tuyến (LMS) hỗ trợ quản lý toàn diện quy trình dạy và học cho các tổ chức đào tạo. Hệ thống cung cấp:
- Quản lý khóa học và nội dung bài giảng (LMS)
- Hệ thống thi trực tuyến độc lập
- Ngân hàng câu hỏi tập trung
- Quản lý giảng viên, mentor và học viên
- Phân tích học tập, thông báo & email tự động

### 1.3. Thuật ngữ

| Thuật ngữ | Giải thích |
|-----------|----------|
| LMS | Learning Management System — Hệ thống quản lý học tập |
| Cohort | Nhóm lớp / Lớp học theo đợt |
| Enrollment | Ghi danh khóa học |
| RBAC | Kiểm soát truy cập theo vai trò |
| JWT | JSON Web Token |

---

## 2. Mô tả tổng quát

### 2.1. Các nhóm chức năng chính

1. **Hệ sinh thái Giảng viên & Mentor** — Hồ sơ, chuyên môn, lịch dạy, đánh giá
2. **Hệ thống LMS** — Khóa học, lớp học, ghi danh, học tập trực tuyến, phân tích
3. **Hệ thống Thi & Đánh giá** — Đề thi độc lập, ngân hàng câu hỏi, bài kiểm tra, rubric

### 2.2. Tổng quan tính năng

| # | Nhóm | Mô tả |
|---|------|-------|
| F1 | Xác thực & Phân quyền | Đăng ký, đăng nhập, RBAC, đa vai trò, impersonation |
| F2 | Quản lý người dùng | CRUD user, import Excel, mã HV, hợp đồng |
| F3 | Giảng viên & Mentor | Hồ sơ, chuyên môn, chứng chỉ, lịch, mentoring 1-1 |
| F4 | Quản lý khóa học | CRUD, section/lesson, quy tắc hoàn thành, clone nội dung |
| F5 | Lớp học (Cohort) | Tạo lớp, gán trainer, lịch, buổi học |
| F6 | Ghi danh & Duyệt | Ghi danh, duyệt/từ chối, trạng thái |
| F7 | Học tập trực tuyến | Video, tiến độ, bình luận, ghi chú |
| F8 | Bài kiểm tra & Rubric | Assessment, quiz, chấm tự động, rubric |
| F9 | Hệ thống thi | Đề thi độc lập, pool random, thống kê, export |
| F10 | Ngân hàng câu hỏi | Thư viện câu hỏi, danh mục, import Excel |
| F11 | Thông báo & Email | Notification, email SMTP, cron cảnh báo |
| F12 | Phân tích | Dashboard thống kê theo vai trò |
| F13 | Cài đặt tổ chức | Branding, cấu hình email |
| F14 | Upload tệp tin | Hình ảnh, tài liệu, video |

### 2.3. Ràng buộc chung

- Trình duyệt: Chrome, Firefox, Safari, Edge
- Responsive: desktop + mobile
- Ngôn ngữ: Tiếng Việt (chính), Tiếng Anh
- Múi giờ: Asia/Ho_Chi_Minh (UTC+7)

---

## 3. Vai trò người dùng & Phân quyền

### 3.1. Vai trò hệ thống

| Vai trò | Quyền chính |
|---------|-------------|
| **SUPER_ADMIN** | Toàn quyền: user, tổ chức, khóa học, cài đặt, impersonation |
| **ORG_ADMIN** | Quản lý user trong tổ chức, khóa học, lớp, ghi danh, cài đặt |
| **TRAINER** | Tạo khóa học, nội dung, đề thi, quản lý lớp, chấm bài |
| **MENTOR** | Quản lý phiên mentoring 1-1 |
| **CONTENT_CREATOR** | Tạo nội dung khóa học |
| **LEARNER** | Ghi danh, học, thi, xem tiến độ |

### 3.2. Ma trận phân quyền

| Tính năng | SUPER_ADMIN | ORG_ADMIN | TRAINER | MENTOR | CONTENT_CREATOR | LEARNER |
|-----------|:-:|:-:|:-:|:-:|:-:|:-:|
| Quản lý tổ chức | ✅ | ✅ | — | — | — | — |
| Quản lý user | ✅ | ✅ | — | — | — | — |
| Tạo khóa học | ✅ | ✅ | ✅ | — | — | — |
| Quản lý lớp | ✅ | ✅ | ✅ | — | — | — |
| Duyệt ghi danh | ✅ | ✅ | ✅ | — | — | — |
| Tạo đề thi | ✅ | ✅ | ✅ | — | — | — |
| Ngân hàng câu hỏi | ✅ | ✅ | ✅ | — | — | — |
| Chấm bài | ✅ | ✅ | ✅ | — | — | — |
| Mentoring 1-1 | ✅ | ✅ | — | ✅ | — | — |
| Tạo nội dung | ✅ | ✅ | ✅ | — | ✅ | — |
| Ghi danh + Học | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Impersonation | ✅ | — | — | — | — | — |

### 3.3. Đa vai trò

Mỗi user có `role` chính + `extraRoles[]` bổ sung. Guard kiểm tra quyền trên tổng hợp cả hai.

---

## 4. Yêu cầu chức năng

### F1 — Xác thực & Phân quyền

| Mã | Yêu cầu |
|----|---------|
| F1.1 | Đăng ký: email (unique), mật khẩu (bcrypt), họ tên, chọn vai trò |
| F1.2 | User đầu tiên auto-promote SUPER_ADMIN |
| F1.3 | Đăng nhập: email + password → JWT (7 ngày), cập nhật lastLoginAt |
| F1.4 | Protected routes: JWT + RBAC via @Roles decorator |
| F1.5 | Impersonation: chỉ SUPER_ADMIN, không impersonate SA khác, token 1h, claim audit |
| F1.6 | Frontend banner cảnh báo khi đang mạo danh + nút thoát |

### F2 — Quản lý người dùng

| Mã | Yêu cầu |
|----|---------|
| F2.1 | CRUD user: email, tên, role, phone, studentCode (unique), contractEndDate, notes |
| F2.2 | Danh sách: phân trang, search (email/tên/mã HV), filter (role/status) |
| F2.3 | Import Excel (.xlsx): email/firstName/lastName bắt buộc, password mặc định `Edus@2025` |
| F2.4 | File mẫu Excel download |
| F2.5 | Cảnh báo hợp đồng: đỏ (< 7 ngày), vàng (< 30 ngày) |
| F2.6 | Quản lý extraRoles cho đa vai trò |

### F3 — Giảng viên & Mentor

| Mã | Yêu cầu |
|----|---------|
| F3.1 | TrainerProfile (1-1 User): bio, headline, kinh nghiệm, hourlyRate, LinkedIn, languages |
| F3.2 | Trạng thái: ACTIVE / INACTIVE / ON_LEAVE / PENDING_APPROVAL |
| F3.3 | Chuyên môn (Specialization): skillName, level, yearsOfExp |
| F3.4 | Chứng chỉ (Certification): tên, tổ chức cấp, ngày, URL xác thực |
| F3.5 | Lịch dạy (Availability): ngày trong tuần, giờ bắt đầu/kết thúc, timezone |
| F3.6 | MentorProfile: expertise, maxMentees, currentMentees |
| F3.7 | MentorSession: tiêu đề, thời gian, link meeting, status (SCHEDULED/COMPLETED/CANCELLED/NO_SHOW) |
| F3.8 | Review: rating 1-5, comment, targetType (TRAINER/COURSE) |

### F4 — Quản lý khóa học

| Mã | Yêu cầu |
|----|---------|
| F4.1 | CRUD: tiêu đề, slug (unique), mô tả, ảnh bìa, mục tiêu, prerequisites, level, duration |
| F4.2 | Status lifecycle: DRAFT → PUBLISHED → ARCHIVED |
| F4.3 | Cấu trúc: Course → Section → Lesson (6 loại: VIDEO, TEXT, QUIZ, LIVE_CLASS, ASSIGNMENT, RESOURCE) |
| F4.4 | Video: YouTube, Vimeo, Cloudflare Stream |
| F4.5 | Bài miễn phí (`isFree`), bài ẩn (`isPublished = false`) |
| F4.6 | Điều kiện hoàn thành bài: isMandatory, isVideoRequired (lần xem, % video), isResourceRequired |
| F4.7 | CourseRule: % bài tối thiểu (80%), điểm quiz, bắt buộc mandatory, bài cuối, chứng chỉ |
| F4.8 | Clone section/lesson sang khóa khác (tiêu đề + "(copy)") |
| F4.9 | Announcements: NORMAL/IMPORTANT/URGENT, ghim |

### F5 — Lớp học (Cohort)

| Mã | Yêu cầu |
|----|---------|
| F5.1 | CRUD: gắn Course, tên, ngày, maxParticipants, meetingUrl, schedule |
| F5.2 | Status: UPCOMING → IN_PROGRESS → COMPLETED / CANCELLED |
| F5.3 | Gán trainer (Facilitator / Co-facilitator) |
| F5.4 | CourseSession: buổi học trực tiếp gắn cohort + module |

### F6 — Ghi danh & Duyệt

| Mã | Yêu cầu |
|----|---------|
| F6.1 | Học viên ghi danh → PENDING; chọn Cohort tùy chọn |
| F6.2 | Kiểm tra: khóa PUBLISHED, chưa trùng, cohort còn chỗ |
| F6.3 | Nếu đã DROPPED → reactivate cũ |
| F6.4 | Admin duyệt (ACTIVE) / từ chối (DROPPED) / thêm trực tiếp (bypass PENDING) |
| F6.5 | Ghi nhận approvedBy, approvedAt |
| F6.6 | Flow: PENDING → ACTIVE → COMPLETED (progress=100%) hoặc DROPPED/SUSPENDED |

### F7 — Học tập trực tuyến

| Mã | Yêu cầu |
|----|---------|
| F7.1 | Giao diện `/learn/[courseId]` kiểu F8/Udemy: sidebar section/lesson + content chính |
| F7.2 | LessonProgress: watchedDuration, lastPosition, videoWatchCount, maxVideoProgress, resourcesCompleted, notes |
| F7.3 | Hoàn thành tự động khi đạt yêu cầu hoặc thủ công |
| F7.4 | Tiến độ tổng = (bài hoàn thành / tổng bài) × 100%; auto COMPLETED khi 100% |
| F7.5 | Bình luận: reply threads, upvote, isResolved |
| F7.6 | Ghi chú cá nhân mỗi bài |
| F7.7 | Search bài trong sidebar |

### F8 — Bài kiểm tra & Rubric

| Mã | Yêu cầu |
|----|---------|
| F8.1 | Assessment: 6 loại (QUIZ, ESSAY, PROJECT, PEER_REVIEW, SELF_ASSESSMENT, PRACTICAL) |
| F8.2 | Gắn CourseModule; cấu hình: điểm max/pass, attempts, timeLimit, shuffle |
| F8.3 | QuizQuestion: 4 loại (MC, TF, SA, MS); chấm tự động |
| F8.4 | Rubric → RubricCriterion → RubricLevel |
| F8.5 | Submission: DRAFT → SUBMITTED → GRADED/RETURNED/LATE; đính kèm file |
| F8.6 | Import câu hỏi từ ngân hàng (chọn cụ thể hoặc random) |

### F9 — Hệ thống thi (Exam)

| Mã | Yêu cầu |
|----|---------|
| F9.1 | Đề thi độc lập (không gắn khóa); status: DRAFT → PUBLISHED → CLOSED → ARCHIVED |
| F9.2 | Câu hỏi cố định từ ngân hàng (reference, onDelete Restrict) + Pool random |
| F9.3 | Pool: filter (category, difficulty, tags, type), count, Fisher-Yates shuffle, deduplicate |
| F9.4 | Access: AUTHENTICATED / GUEST_ALLOWED / MIXED; mã PIN tùy chọn |
| F9.5 | Timer, auto-submit hết giờ, auto-save, flag câu, sidebar navigation |
| F9.6 | Start → questionSnapshot (đóng băng); resume phiên dở |
| F9.7 | Chấm tự động: MC (exact), TF (bool), MS (array match), SA (case-insensitive trim) |
| F9.8 | Kết quả tùy config: showScore, showCorrectAnswers, showExplanations |
| F9.9 | Thống kê: điểm TB, tỷ lệ đạt, phân bổ điểm, phân tích từng câu |
| F9.10 | Export Excel (.xlsx); nhân bản đề; chia sẻ link `/exam/{slug}` |
| F9.11 | Validate publish: ≥1 câu, mỗi pool đủ matching |
| F9.12 | Security: không gửi correctAnswer cho client, IP/UA tracking, attempt limit |

### F10 — Ngân hàng câu hỏi

| Mã | Yêu cầu |
|----|---------|
| F10.1 | CRUD: 4 loại (MC, TF, SA, MS); difficulty (EASY/MEDIUM/HARD); points, tags, explanation |
| F10.2 | QuestionCategory: CRUD, unique name, onDelete SetNull |
| F10.3 | Search text + filter (category/difficulty/type/tags), phân trang 20/page |
| F10.4 | Import Excel: nhiều format cột (optionA/option_a/a), file mẫu |
| F10.5 | Stats: tổng, phân bố theo difficulty/type/category |

### F11 — Thông báo & Email

| Mã | Yêu cầu |
|----|---------|
| F11.1 | Notification: 6 loại (SYSTEM, COURSE, ASSESSMENT, ENROLLMENT, MENTION, MESSAGE); UNREAD → READ → ARCHIVED |
| F11.2 | Email SMTP (Nodemailer): cảnh báo HĐ, welcome, duyệt ghi danh |
| F11.3 | Dev mode: log console nếu chưa cấu hình SMTP |
| F11.4 | Cron 8:00 hàng ngày: cảnh báo HĐ hết hạn 2 ngày + 7 ngày (chỉ user ACTIVE) |

### F12 — Phân tích

| Mã | Yêu cầu |
|----|---------|
| F12.1 | Admin: tổng user, khóa học, enrollment, trainer |
| F12.2 | Trainer: cohort, khóa đã tạo, tổng HV, đánh giá |
| F12.3 | Learner: khóa đang học, tiến độ, điểm TB |
| F12.4 | LearningAnalytics: lessonsCompleted, timeSpent, avgScore, engagementScore |

### F13 — Cài đặt tổ chức

| Mã | Yêu cầu |
|----|---------|
| F13.1 | Singleton: orgName, logo, favicon, primaryColor, accentColor |
| F13.2 | Email config: enableEmailAlerts, welcomeEmail, supportEmail, contractWarningDays |
| F13.3 | GET (authenticated), PUT (ADMIN+) |

### F14 — Upload tệp tin

| Mã | Yêu cầu |
|----|---------|
| F14.1 | Upload ảnh (nén tự động), tài liệu (PDF/Word/Excel/PPT), video |
| F14.2 | Cloudflare Stream cho video |
| F14.3 | Lưu local `/uploads/` |

### F15 — Cài đặt cá nhân

| Mã | Yêu cầu |
|----|---------|
| F15.1 | Tab Hồ sơ: tên, email, avatar, phone |
| F15.2 | Tab Mật khẩu: đổi password (yêu cầu cũ) |
| F15.3 | Tab Giao diện: dark/light mode |

---

## 5. Yêu cầu phi chức năng

### 5.1. Hiệu suất

- API CRUD < 500ms, truy vấn phức tạp < 2s
- Frontend initial load < 3s (4G)
- Tối thiểu 100 user đồng thời

### 5.2. Bảo mật

- Mật khẩu bcrypt, JWT auth, RBAC trên mọi endpoint
- Helmet headers, Rate limiting (Throttler), CORS chặt
- Đáp án không gửi client khi thi, question snapshot đóng băng
- IP/UA tracking phiên thi

### 5.3. Khả năng sử dụng

- Responsive (desktop + mobile), Dark/Light mode
- Đa ngôn ngữ: Tiếng Việt (mặc định), Tiếng Anh
- Loading/empty/error state cho mọi trang
- Ưu tiên UX cho người dùng Việt Nam

### 5.4. Bảo trì & Mở rộng

- Module-based (NestJS), TypeScript strict
- Prisma ORM + migration version control
- Swagger/OpenAPI tự động
- Database indexing, phân trang toàn bộ
- Thêm module mới không ảnh hưởng cũ

### 5.5. Triển khai

- Docker Compose, biến môi trường (.env), database seeding

---

## 6. Kiến trúc hệ thống

### 6.1. Tổng quan

```
┌─────────────────────────────────────────────────┐
│  CLIENT: Next.js 14 (App Router)                │
│  TailwindCSS + shadcn/ui + React Query + Zustand│
│  http://localhost:3333                          │
└──────────────────┬──────────────────────────────┘
                   │ REST API (JSON)
┌──────────────────▼──────────────────────────────┐
│  SERVER: NestJS 10 (Modular Architecture)       │
│  JWT + Passport + class-validator + Swagger     │
│  http://localhost:4444                          │
│  19 modules: auth, users, trainers, courses,    │
│  lessons, cohorts, enrollments, assessments,    │
│  exams, question-bank, notifications, analytics,│
│  org-settings, course-rules, stream, upload...  │
└──────────────────┬──────────────────────────────┘
                   │ Prisma ORM
┌──────────────────▼──────────────────────────────┐
│  DATA: PostgreSQL 15+ (40+ tables)              │
│  + Local File Storage (/uploads/)               │
└─────────────────────────────────────────────────┘
```

### 6.2. Tech Stack

**Backend:** Node.js 20+, NestJS 10, TypeScript 5, PostgreSQL 15+, Prisma 5, JWT/Passport, Helmet, Throttler, Nodemailer, @nestjs/schedule

**Frontend:** Next.js 14 (App Router), TypeScript 5, TailwindCSS 3, shadcn/ui + Radix UI, React Hook Form + Zod, Zustand, TanStack Query, Recharts, Lucide Icons, Framer Motion

---

## 7. Mô hình dữ liệu

### 7.1. Sơ đồ quan hệ

```
User
 ├─1:1─ TrainerProfile ─1:N─ Specialization, Certification, Availability, CohortTrainer
 ├─1:1─ MentorProfile ─1:N─ MentorSession
 ├─1:N─ Enrollment ─1:N─ Submission
 ├─1:N─ Course (creator) ─1:N─ Section ─1:N─ Lesson ─1:N─ LessonProgress, LessonComment
 ├─1:N─ LessonProgress, LessonComment, QuizAttempt, ExamAttempt
 ├─1:N─ QuestionBankItem, Notification, Review, Feedback
 └─1:N─ Exam (creator)

Course
 ├─1:N─ Section → Lesson (→ Exam link for QUIZ type)
 ├─1:N─ CourseModule (legacy) → Assessment → Rubric, QuizQuestion, Submission → Grade
 ├─1:N─ Cohort → CohortTrainer, Enrollment, CourseSession
 ├─1:N─ Enrollment, Announcement
 └─1:1─ CourseRule

Exam (independent)
 ├─1:N─ ExamQuestion → QuestionBankItem
 ├─1:N─ ExamQuestionPool → QuestionCategory
 └─1:N─ ExamAttempt → ExamAnswer
```

### 7.2. Danh sách bảng (40+)

| Nhóm | Bảng |
|------|------|
| **Users** | users |
| **Trainers** | trainer_profiles, trainer_specializations, trainer_certifications, trainer_availability |
| **Mentors** | mentor_profiles, mentor_sessions |
| **Courses** | courses, course_sections, lessons, course_modules (legacy), course_announcements, course_rules |
| **Progress** | lesson_progress, lesson_comments, learner_progress |
| **Cohorts** | cohorts, cohort_trainers, course_sessions |
| **Enrollments** | enrollments |
| **Assessments** | assessments, quiz_questions, quiz_attempts, rubrics, rubric_criteria, rubric_levels, submissions, grades |
| **Exams** | exams, exam_questions, exam_question_pools, exam_attempts, exam_answers |
| **Questions** | question_categories, question_bank_items |
| **System** | notifications, reviews, feedback, learning_analytics, org_settings |

---

## 8. Giao diện người dùng

### 8.1. Sitemap

```
/                           → Landing page (public)
├── /exam/[slug]            → Đề thi (public) → /take → /result/[attemptId]
├── /learn/[courseId]       → Giao diện học (protected)
└── /dashboard              → Dashboard (protected)
    ├── /courses (/create, /[id], /[id]/edit)
    ├── /my-courses
    ├── /cohorts (/create, /[id])
    ├── /enrollments
    ├── /users (/create, /[id], /[id]/edit)
    ├── /trainers (/create, /[id])
    ├── /exams, /[id]
    ├── /library
    ├── /assessments
    ├── /analytics
    └── /settings
```

### 8.2. Layout chính

- **Dashboard:** Sidebar 260px (collapsible 72px) + content. Mobile: hamburger + bottom nav (3 mục)
- **Learning:** Sidebar section/lesson + video/content area + tabs (bình luận, ghi chú)
- **Exam:** Sidebar câu hỏi (đánh số, trạng thái) + timer + content 1 câu/trang

### 8.3. Navigation theo vai trò

**Learner:** Dashboard, Khóa học của tôi, Duyệt khóa học, Phân tích

**Admin/Trainer:** Dashboard, Khóa học, Đăng ký, Nhóm lớp, Người dùng, Giảng viên, Thư viện, Bài thi, Phân tích

---

## 9. API Endpoints

**Base URL:** `http://localhost:4444/api/v1` | **Auth:** JWT Bearer | **Docs:** `/api/v1/docs` (Swagger)

### Auth (4)
| POST `/auth/register` | POST `/auth/login` | GET `/auth/me` | POST `/auth/impersonate` (SA) |

### Users (9+)
GET/POST/PATCH/DELETE `/users`, PATCH `/users/:id/extra-roles`, POST `/users/import-excel`, GET `/users/import-template`, GET `/users/expiring-contracts`

### Trainers (5+)
GET `/trainers`, GET/PATCH `/trainers/:id`, POST `/trainers/profile`, GET `/trainers/:id/statistics`

### Courses (7+)
GET/POST/PATCH/DELETE `/courses`, GET/PUT `/courses/:courseId/rule`

### Sections & Lessons
POST `/sections/:id/clone`, POST `/lessons/:id/clone`, PATCH `/lessons/:id/progress`

### Cohorts (5)
GET/POST/PATCH/DELETE `/cohorts`

### Enrollments (9+)
POST `/enrollments`, GET `/enrollments/my`, GET `/enrollments/check/:courseId`, DELETE `/enrollments/:id`, GET `/enrollments/admin/pending`, PATCH `/enrollments/:id/approve`, PATCH `/enrollments/:id/reject`, POST `/enrollments/add-learner`, GET `/enrollments/course/:courseId`

### Assessments (4+)
GET `/assessments/:id`, POST `/assessments/:id/submit`, GET `/assessments/:id/submissions`, POST `/assessments/:id/grade`

### Question Bank (10+)
CRUD `/question-bank`, GET `/question-bank/stats`, GET `/question-bank/categories`, GET `/question-bank/tags`, POST `/question-bank/upload-excel`, POST `/question-bank/import-to-assessment`

### Question Categories (5)
CRUD `/question-categories`

### Exams — Quản lý (14)
CRUD `/exams`, PATCH `/exams/:id/status`, POST `/exams/:id/duplicate`, POST/DELETE `/exams/:id/questions`, PUT `/exams/:id/questions/reorder`, POST/PUT/DELETE `/exams/:id/pools`, GET `/exams/:id/pools/:poolId/preview`

### Exams — Làm bài (6)
GET `/exam/:slug`, POST `/exam/:slug/start`, GET `/exam/:slug/attempt/:id`, POST `/exam/:slug/attempt/:id/answer`, POST `/exam/:slug/attempt/:id/submit`, GET `/exam/:slug/attempt/:id/result`

### Exams — Thống kê (5)
GET `/exams/:id/analytics`, GET `/exams/:id/attempts`, GET `/exams/:id/attempts/:aId`, GET `/exams/:id/question-analysis`, GET `/exams/:id/export`

### System (3)
POST `/notifications/test-email` (SA), GET/PUT `/org-settings`

**Tổng: ~80+ endpoints**

---

## 10. Bảo mật

| Biện pháp | Mô tả |
|-----------|-------|
| **Authentication** | JWT + bcrypt, token 7d (1h cho impersonation) |
| **Authorization** | RBAC qua @Roles + RolesGuard, hỗ trợ multi-role |
| **HTTP Security** | Helmet headers, Rate limiting (Throttler), CORS whitelist |
| **Exam Security** | Không gửi correctAnswer khi thi, question snapshot đóng băng, access code (PIN), attempt limit, IP/UA tracking, server-side timeout check |
| **Data Protection** | Cascade delete, foreign key constraints, unique constraints |
| **Impersonation** | Chỉ SA, không impersonate SA khác, token 1h, audit claim |
| **Validation** | class-validator trên mọi DTO, Zod trên frontend |
| **First User** | Auto-promote SUPER_ADMIN |

---

## Phụ lục

### A. Tài khoản test (sau khi seed)

| Vai trò | Email | Mật khẩu |
|---------|-------|-----------|
| SUPER_ADMIN | admin@edus.vn | Admin@123 |
| ORG_ADMIN | orgadmin@edus.vn | Admin@123 |
| TRAINER | trainer@edus.vn | Admin@123 |
| LEARNER | learner@edus.vn | Admin@123 |

### B. Seed data

- ~99 câu hỏi mẫu tiếng Việt trong 6 danh mục (ESG, Văn hóa DN, Quản trị, D&I, Lãnh đạo, Công nghệ)
- Chạy: `npx ts-node prisma/seed-question-bank.ts`

### C. Biến môi trường

**Backend (.env):**
```
DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, PORT, FRONTEND_URL
MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS, FROM_EMAIL, FROM_NAME
```

**Frontend (.env):**
```
NEXT_PUBLIC_API_URL
```

### D. Development URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3333 |
| Backend API | http://localhost:4444 |
| Swagger Docs | http://localhost:4444/api/v1/docs |
| Prisma Studio | http://localhost:5555 |
