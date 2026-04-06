import React from "react";
import "./App.css";

const stats = [
    { value: "80+", label: "API endpoints" },
    { value: "40+", label: "bảng dữ liệu" },
    { value: "6", label: "vai trò người dùng" },
    { value: "3", label: "khối chức năng lõi" },
];

const coreModules = [
    {
        title: "LMS toàn diện",
        text: "Quản lý khóa học, section, lesson, cohort, ghi danh và theo dõi tiến độ học tập trong một luồng thống nhất.",
        icon: "📚",
    },
    {
        title: "Thi độc lập",
        text: "Tạo đề thi riêng, pool câu hỏi random, timer, auto-submit, thống kê kết quả và chia sẻ bằng link.",
        icon: "📝",
    },
    {
        title: "Ngân hàng câu hỏi",
        text: "CRUD câu hỏi, phân loại độ khó, tag, import Excel và tổ chức theo danh mục để tái sử dụng linh hoạt.",
        icon: "🧠",
    },
    {
        title: "Phân quyền RBAC",
        text: "SUPER_ADMIN, ORG_ADMIN, TRAINER, MENTOR, CONTENT_CREATOR, LEARNER với kiểm soát truy cập rõ ràng.",
        icon: "🛡️",
    },
    {
        title: "Analytics & báo cáo",
        text: "Dashboard theo vai trò, số liệu học tập, điểm số, tỷ lệ hoàn thành và chỉ số tương tác.",
        icon: "📊",
    },
    {
        title: "Thông báo & email",
        text: "Notification, email SMTP, nhắc hợp đồng, thông báo duyệt ghi danh và cảnh báo hệ thống.",
        icon: "✉️",
    },
];

const roles = [
    {
        name: "SUPER_ADMIN",
        desc: "Toàn quyền: user, tổ chức, khóa học, cấu hình, impersonation.",
    },
    {
        name: "ORG_ADMIN",
        desc: "Quản trị tổ chức, user, khóa học, cohort, ghi danh và cài đặt.",
    },
    {
        name: "TRAINER",
        desc: "Tạo nội dung, quản lý lớp, đề thi, chấm bài và theo dõi học viên.",
    },
    {
        name: "MENTOR",
        desc: "Quản lý mentoring 1-1 và theo dõi phiên hỗ trợ.",
    },
    {
        name: "CONTENT_CREATOR",
        desc: "Tập trung vào biên soạn nội dung khóa học.",
    },
    {
        name: "LEARNER",
        desc: "Ghi danh, học, thi và theo dõi tiến độ cá nhân.",
    },
];

const securityItems = [
    "JWT authentication + bcrypt password hashing",
    "RBAC trên mọi endpoint quan trọng",
    "Không gửi đáp án đúng sang client khi thi",
    "Question snapshot đóng băng trong phiên làm bài",
    "Rate limiting, CORS chặt, Helmet headers",
    "Theo dõi IP / User-Agent cho phiên thi",
];

const architecture = [
    {
        title: "Client",
        text: "Frontend hướng tới trải nghiệm nhanh, responsive, hỗ trợ tiếng Việt mặc định.",
        meta: "Public landing + dashboard + exam + learning",
    },
    {
        title: "Server",
        text: "Backend mô-đun, tách rõ auth, users, courses, exams, analytics, notifications.",
        meta: "REST API + JWT + Swagger",
    },
    {
        title: "Data",
        text: "PostgreSQL, Prisma, file uploads local và khả năng mở rộng theo module.",
        meta: "40+ tables + migrations",
    },
];

function App() {
    return (
        <div className="app-shell">
            <header className="topbar">
                <div className="container topbar-inner">
                    <a className="brand" href="#home" aria-label="EduS Platform">
                        <span className="brand-mark">E</span>
                        <span className="brand-text">
              <strong>EduS</strong>
              <small>Online Training Platform</small>
            </span>
                    </a>

                    <nav className="nav">
                        <a href="#features">Tính năng</a>
                        <a href="#roles">Vai trò</a>
                        <a href="#architecture">Kiến trúc</a>
                        <a href="#security">Bảo mật</a>
                    </nav>

                    <a className="btn btn-primary" href="#cta">
                        Liên hệ triển khai
                    </a>
                </div>
            </header>

            <main id="home">
                <section className="hero">
                    <div className="container hero-grid">
                        <div className="hero-copy">
                            <div className="eyebrow">Nền tảng đào tạo trực tuyến cho tổ chức hiện đại</div>
                            <h1>
                                Quản lý học tập, thi cử và phân tích
                                <span> trong một hệ thống thống nhất</span>
                            </h1>
                            <p className="hero-text">
                                EduS Platform được thiết kế để hỗ trợ toàn bộ vòng đời đào tạo:
                                từ quản lý khóa học, ghi danh, học trực tuyến, thi độc lập, đến
                                báo cáo và tự động hóa thông báo.
                            </p>

                            <div className="hero-actions">
                                <a className="btn btn-primary" href="#features">
                                    Khám phá tính năng
                                </a>
                                <a className="btn btn-secondary" href="#cta">
                                    Xem lộ trình triển khai
                                </a>
                            </div>

                            <div className="hero-highlights">
                                <div className="highlight">
                                    <span>Responsive</span>
                                    <small>Desktop + mobile</small>
                                </div>
                                <div className="highlight">
                                    <span>VN / EN</span>
                                    <small>Đa ngôn ngữ</small>
                                </div>
                                <div className="highlight">
                                    <span>Secure</span>
                                    <small>JWT, RBAC, audit</small>
                                </div>
                            </div>
                        </div>

                        <div className="hero-panel">
                            <div className="panel-card panel-card-primary">
                                <div className="panel-badge">EduS Core</div>
                                <h2>Đào tạo, đánh giá, vận hành — tập trung trong một nền tảng</h2>
                                <ul>
                                    <li>Course / Cohort / Enrollment</li>
                                    <li>Quiz / Exam / Question Bank</li>
                                    <li>Analytics / Notifications / Email</li>
                                </ul>
                            </div>

                            <div className="stats-grid">
                                {stats.map((item) => (
                                    <div className="stat-card" key={item.label}>
                                        <strong>{item.value}</strong>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section section-muted">
                    <div className="container">
                        <div className="section-heading">
                            <div className="section-kicker">Giá trị sản phẩm</div>
                            <h2>Định vị rõ ràng cho đội ngũ đào tạo và vận hành</h2>
                            <p>
                                Landing page này nhấn mạnh đúng các khối nghiệp vụ cốt lõi của
                                hệ thống: LMS, thi độc lập, ngân hàng câu hỏi, phân quyền, phân
                                tích và thông báo tự động.
                            </p>
                        </div>
                    </div>
                </section>

                <section id="features" className="section">
                    <div className="container">
                        <div className="section-heading">
                            <div className="section-kicker">Tính năng nổi bật</div>
                            <h2>Thiết kế theo cấu trúc sản phẩm thật</h2>
                        </div>

                        <div className="card-grid">
                            {coreModules.map((item) => (
                                <article className="feature-card" key={item.title}>
                                    <div className="feature-icon" aria-hidden="true">
                                        {item.icon}
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="roles" className="section section-muted">
                    <div className="container">
                        <div className="section-heading">
                            <div className="section-kicker">Vai trò người dùng</div>
                            <h2>Phân quyền rõ ràng, dễ mở rộng</h2>
                        </div>

                        <div className="role-grid">
                            {roles.map((role) => (
                                <article className="role-card" key={role.name}>
                                    <span className="role-tag">{role.name}</span>
                                    <p>{role.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section" id="architecture">
                    <div className="container">
                        <div className="section-heading">
                            <div className="section-kicker">Kiến trúc</div>
                            <h2>Phù hợp với hệ thống module-based, có thể mở rộng lâu dài</h2>
                        </div>

                        <div className="architecture-grid">
                            {architecture.map((item) => (
                                <article className="architecture-card" key={item.title}>
                                    <div className="architecture-title">{item.title}</div>
                                    <p>{item.text}</p>
                                    <small>{item.meta}</small>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section section-muted" id="security">
                    <div className="container security-grid">
                        <div className="security-copy">
                            <div className="section-kicker">Bảo mật</div>
                            <h2>Ưu tiên kiểm soát truy cập và an toàn dữ liệu</h2>
                            <p>
                                Các lớp bảo mật được nhấn mạnh trực tiếp trên landing page để
                                tạo niềm tin với khách hàng tổ chức.
                            </p>
                        </div>

                        <div className="security-card">
                            {securityItems.map((item) => (
                                <div className="security-item" key={item}>
                                    <span className="security-dot" aria-hidden="true" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="cta" className="section cta-section">
                    <div className="container cta-card">
                        <div>
                            <div className="section-kicker">Sẵn sàng triển khai</div>
                            <h2>Xây dựng landing page mới theo đúng định vị EduS</h2>
                            <p>
                                Bố cục này phù hợp để giới thiệu sản phẩm, dẫn người dùng tới
                                đăng ký demo hoặc liên hệ triển khai với doanh nghiệp / trung tâm đào tạo.
                            </p>
                        </div>

                        <div className="cta-actions">
                            <a className="btn btn-primary" href="mailto:hello@edus.vn">
                                Gửi email liên hệ
                            </a>
                            <a className="btn btn-secondary" href="#home">
                                Lên đầu trang
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container footer-inner">
                    <p>© 2026 EduS Platform. Nền tảng đào tạo trực tuyến.</p>
                    <div className="footer-links">
                        <a href="#features">Tính năng</a>
                        <a href="#security">Bảo mật</a>
                        <a href="#cta">Liên hệ</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;