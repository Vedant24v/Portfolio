/**
 * ==========================================================================
 * VEDANT VYAWHARE — PORTFOLIO RUNTIME
 * Vibrant Glassmorphism + Background Particles + Orbitals + Modals
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initTypingAnimation();
  initNavigation();
  initBackToTop();
  initBackgroundParticles();
  initGitHubRepos();
  initModalKeyListeners();
  initAnimeBackgroundParallax();
  initAnimeInteractiveHero();
  initNominalBehindToFrontScroll();
  init3DCardTilt();
  initSectionScrollReveals();
});

/* ==========================================================================
   1. DYNAMIC COPYRIGHT YEAR
   ========================================================================== */
function initCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   2. HERO ROTATING TYPING EFFECT
   ========================================================================== */
function initTypingAnimation() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const phrases = [
    'Backend Engineering',
    'Full-Stack MERN Dev',
    'Python & AI Systems',
    'REST APIs & Cloud Architecture'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. CONTINUOUS BACKGROUND PARTICLE CONSTELLATION
   ========================================================================== */
function initBackgroundParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      color: i % 2 === 0 ? 'rgba(79, 70, 229, 0.4)' : 'rgba(6, 182, 212, 0.4)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw and update particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Connect nearby particles with subtle gradient line
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. STICKY NAVIGATION & ACTIVE SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scrollProgress');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max((scrollY / docHeight) * 100, 0), 100) : 0;
      scrollProgress.style.width = `${progress}%`;
    }
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ==========================================================================
   5. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
}

/* ==========================================================================
   6. MORE PROJECTS TOGGLE
   ========================================================================== */
function toggleMoreProjects() {
  const grid = document.getElementById('moreProjectsGrid');
  const btn = document.getElementById('toggleMoreProjectsBtn');

  if (!grid || !btn) return;

  const isExpanded = grid.classList.toggle('expanded');
  if (isExpanded) {
    btn.innerHTML = `<i class='bx bx-chevron-up'></i> Hide Additional Experiments`;
  } else {
    btn.innerHTML = `<i class='bx bx-chevron-down'></i> View More Projects &amp; Experiments`;
  }
}

/* ==========================================================================
   7. APT ALGO CASE STUDY MODAL
   ========================================================================== */
function openAptAlgoModal() {
  const modal = document.getElementById('aptAlgoModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAptAlgoModal() {
  const modal = document.getElementById('aptAlgoModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   8. PROJECT DETAIL MODALS DATA & HANDLERS
   ========================================================================== */
const projectDataStore = {
  repox: {
    tag: 'AI DEVELOPER TOOLING',
    title: 'Repox — AI Codebase Explanation Generator',
    subtitle: 'Next.js 15 · FastAPI · Groq (Llama 3.3 70B) · Mermaid.js',
    githubUrl: 'https://github.com/Vedant24v/Repox',
    liveUrl: 'https://repox-alpha.vercel.app',
    overview: 'Repox transforms uploaded repository ZIP files into modular, multi-level tutorials. It solves the steep onboarding curve engineers experience when exploring complex, unfamiliar codebases.',
    architecture: `
[Next.js 15 Client] ──(ZIP Upload)──> [FastAPI Backend]
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
             [AST File Parser]                           [Regex Secret Scanner]
                       │                                           │
                       ▼                                           ▼
             [Mermaid.js Diagram]                        [Groq Llama 3.3 70B]
                       │                                           │
                       └─────────────────────┬─────────────────────┘
                                             ▼
                               [Downloadable ZIP Tutorial]
    `,
    contributions: [
      'Engineered heuristic static-analysis pipeline detecting 10+ languages (React, FastAPI, Django, Express) mapping file relationships and API routes.',
      'Constructed automated Mermaid.js diagram generation producing deterministic architecture, user-flow, and ERD diagrams.',
      'Integrated regex pattern scanning to detect accidentally committed tokens, API keys, and secret credentials before ingestion.',
      'Configured production deployment pairing Next.js 15 on Vercel with containerized FastAPI on Render.'
    ],
    challenges: 'Balancing LLM context window limits with large repositories. Solved by pre-ranking files using AST depth metrics and pruning test mocks, node_modules, and cache files.'
  },

  taskflow: {
    tag: 'FULL-STACK MERN SYSTEM',
    title: 'TaskFlow — Full-Stack Task Management App',
    subtitle: 'React 18 · Node.js · Express.js · MongoDB · JWT · @dnd-kit',
    githubUrl: 'https://github.com/Vedant24v/taskflow',
    liveUrl: 'https://taskkfloww.vercel.app',
    overview: 'Production-ready, Jira-style Kanban board application with JWT authentication, role-based data isolation, and smooth drag-and-drop task workflows.',
    architecture: `
[React 18 UI + @dnd-kit]
           │
           ▼ (JWT Refresh-Token HttpOnly Auth)
[Express.js REST Middleware]
    ├── Authentication Guard
    ├── Role-Based Data Isolation
    └── Schema Validation
           │
           ▼
[MongoDB Atlas via Mongoose Models]
    (Tasks, Columns, Activity Logs, Users)
    `,
    contributions: [
      'Built a production-grade Jira-style Kanban board with JWT authentication, role-based data isolation, and drag-and-drop task management using @dnd-kit.',
      'Designed a RESTful MERN backend with Mongoose schemas and Express middleware with serverless deployment on Vercel supporting full CRUD for tasks, users, and teams.',
      'Implemented JWT refresh-token auth with bcryptjs password hashing, per-user data isolation, and environment-separated config for local and cloud deployments.'
    ],
    challenges: 'Preventing race conditions when multiple users reorder tasks simultaneously. Implemented fractional index positioning to allow continuous reordering without bulk database updates.'
  },

  indusmind: {
    tag: 'AI RAG & RETRIEVAL PIPELINE',
    title: 'Indus_Mind — Industrial Document RAG System',
    subtitle: 'FastAPI · React · Qdrant Cloud · Hugging Face · Groq Llama 3.1 · MCP',
    githubUrl: 'https://github.com/Vedant24v/Indus_Mind',
    liveUrl: null,
    overview: 'A specialized Retrieval-Augmented Generation platform tailored for Architecture, Engineering, and Construction (AEC) technical manuals and industrial blueprints.',
    architecture: `
[Industrial PDF Manuals] ──> [Semantic Parser & Table Chunker]
                                           │
                                           ▼
                                [Qdrant Cloud Vector DB]
                                           │
[User Query] ─────────────> [Cosine Semantic Search] ──> [Groq Llama 3.1] ──> [Answer + Page Citations]
    `,
    contributions: [
      'Constructed project-isolated vector ingestion pipeline in Qdrant Cloud with strict collection segmentation.',
      'Integrated Hugging Face serverless embedding models with Groq (Llama 3.1) for high-accuracy response synthesis with verifiable page references.',
      'Built Model Context Protocol (MCP) server endpoints enabling external tools like Claude Desktop to query industrial technical specs.'
    ],
    challenges: 'Preserving tabular specifications during chunking. Designed a table-aware parser preserving markdown tables during chunking.'
  },

  medtrace: {
    tag: 'PHARMA BATCH RECORD TRACKER',
    title: 'MedTrace — Pharma Batch Record Tracker (EBR/MES)',
    subtitle: 'React · Node.js · Express.js · MongoDB · PDFKit · Recharts',
    githubUrl: 'https://github.com/Vedant24v/MedTrace',
    liveUrl: null,
    overview: 'Full-stack Electronic Batch Record (EBR) system simulating pharmaceutical MES workflows: recipe management, sequential batch execution, digital e-signatures, and admin approval flows.',
    architecture: `
[Operator / QA Input] ──> [Express Validation & Role Auth]
                                      │
                                      ▼
                        [Electronic Signature Hash]
                        (21 CFR Part 11 Audit Trail)
                                      │
                                      ▼
                        [MongoDB Encrypted Records]
                                      │
                                      ▼
                        [Automated PDFKit Report Engine]
    `,
    contributions: [
      'Engineered a full-stack Electronic Batch Record (EBR) system simulating pharmaceutical MES workflows, recipe management, sequential batch execution, and digital e-signatures.',
      'Built role-based access control (Operator vs Admin) with httpOnly JWT cookies, CORS protection, and Mongoose injection prevention.',
      'Integrated pdfkit to generate GMP-compliant batch record PDFs on demand and Recharts for an admin analytics dashboard tracking KPIs and 30-day batch trends.'
    ],
    challenges: 'Ensuring immutable audit logs without database performance degradation. Implemented write-only append logs for audit trails paired with indexed reference queries.'
  },

  weapondetector: {
    tag: 'COMPUTER VISION (YOLOv8)',
    title: 'Real Time Weapon Detector',
    subtitle: 'Python · YOLOv8n (Ultralytics) · OpenCV · Tkinter',
    githubUrl: 'https://github.com/Vedant24v/Real-Time-Weapon-Detector',
    liveUrl: null,
    overview: 'Trained a YOLOv8n model to detect 5 weapon classes (handguns, rifles, knives, explosives) in real time via webcam with per-frame FPS and latency telemetry.',
    architecture: `
[Live Video Feed (OpenCV)] ──> [Frame Preprocessing & Normalization]
                                                │
                                                ▼
                                    [YOLOv8n Inference Engine]
                                                │
                                                ▼
                                  [Confidence Threshold Slider]
                                                │
                                                ▼
                                  [Tkinter Telemetry UI & CSV Export]
    `,
    contributions: [
      'Trained a YOLOv8n model to detect 5 weapon classes in real time via webcam with per-frame FPS and latency telemetry displayed in a desktop Tkinter console.',
      'Added confidence-threshold slider for precision control, per-category detection breakdown, and CSV + snapshot export for audit-friendly evidence logging.',
      'Optimized frame inference pipeline with OpenCV to maintain steady 30+ FPS video processing.'
    ],
    challenges: 'Reducing false positives from handheld items. Augmented the training dataset with varied lighting and bounding box scales.'
  },

  jobalert: {
    tag: 'AUTOMATION & SCRAPING',
    title: 'Internshala Job Alert Bot',
    subtitle: 'Python · BeautifulSoup · Requests · Telegram Bot API',
    githubUrl: 'https://github.com/Vedant24v/job-alert-bot',
    liveUrl: null,
    overview: 'Automated daily scraping of Internshala, filtering listings by keyword and location, deduplicating across runs, and pushing formatted alerts with apply links to Telegram at 9 AM.',
    architecture: `
[Daily Cron Trigger @ 9 AM]
           │
           ▼
[BeautifulSoup + Requests Scraper]
           │
           ▼
[Persistent Deduplication Store]
           │
           ▼
[Telegram Bot API Push Notification]
    `,
    contributions: [
      'Automated daily scraping of Internshala, filtering listings by keyword and location, deduplicating across runs, and pushing formatted alerts to Telegram.',
      'Built persistent deduplication using a local store to prevent repeat notifications; optimised crawl intervals to avoid rate limiting.'
    ],
    challenges: 'Dynamic DOM updates on listing sites. Engineered robust fallback selectors and exponential backoff retry algorithms.'
  },

  apitest: {
    tag: 'AUTOMATED API TESTING',
    title: 'Automated API Test Framework',
    subtitle: 'Python · Pytest · Requests · pytest-html',
    githubUrl: 'https://github.com/Vedant24v/api-test-framework',
    liveUrl: null,
    overview: 'Automated API testing suite executing 54 REST API tests with session fixtures, response schema assertions, and self-contained HTML test reports.',
    architecture: `
[pytest CLI / CI Trigger]
           │
           ▼
[conftest.py Fixtures Engine] (Session Token Setup & Mock Environment)
           │
           ├── [Auth & Permissions Suite]
           ├── [CRUD & Schema Validation Suite] (54 Tests)
           └── [Boundary & Negative Response Suite]
           │
           ▼
[pytest-html Reporter Engine] (Self-contained HTML test output & execution metrics)
    `,
    contributions: [
      'Engineered 54 automated pytest cases covering happy paths, authentication failures, edge cases, and schema mismatch validations.',
      'Created modular session fixtures eliminating duplicate login requests and reducing test execution time by 60%.',
      'Configured automated HTML report generation detailing assertions, timing benchmarks, and response payloads.'
    ],
    challenges: 'Handling stateful dependent tests without cascade failures. Engineered clean fixture teardowns ensuring tests run completely decoupled and isolated.'
  }
};

function openProjectModal(projectId) {
  const data = projectDataStore[projectId];
  if (!data) return;

  const modal = document.getElementById('projectDetailModal');
  const tag = document.getElementById('projectModalTag');
  const title = document.getElementById('projectModalTitle');
  const subtitle = document.getElementById('projectModalSubtitle');
  const content = document.getElementById('projectModalContent');

  tag.textContent = data.tag;
  title.textContent = data.title;
  subtitle.textContent = data.subtitle;

  let linksHtml = '';
  if (data.githubUrl) {
    linksHtml += `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost" style="padding:0.5rem 1.1rem; font-size:0.85rem;"><i class='bx bxl-github'></i> View Repository</a> `;
  }
  if (data.liveUrl) {
    linksHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:0.5rem 1.1rem; font-size:0.85rem;"><i class='bx bx-link-external'></i> Live Demo</a> `;
  }

  content.innerHTML = `
    <div>
      <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">Project Overview</h3>
      <p style="color:var(--text-secondary); line-height:1.75; font-size:0.98rem;">${data.overview}</p>
    </div>

    <div>
      <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">Architecture Flow</h3>
      <div class="diagram-box">
        <pre>${data.architecture.trim()}</pre>
      </div>
    </div>

    <div>
      <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">Key Engineering Highlights</h3>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:0.65rem;">
        ${data.contributions.map(item => `
          <li style="display:flex; gap:0.6rem; color:var(--text-secondary); font-size:0.95rem;">
            <i class='bx bx-check-circle' style="color:var(--primary); font-size:1.2rem; flex-shrink:0; margin-top:0.15rem;"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div>
      <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:0.5rem;">Technical Challenge &amp; Solution</h3>
      <p style="color:var(--text-secondary); line-height:1.7; font-size:0.95rem; background:var(--bg-page); padding:1rem; border-radius:var(--radius-sm); border:1px solid rgba(226, 232, 240, 0.9);">
        ${data.challenges}
      </p>
    </div>

    ${linksHtml ? `<div style="display:flex; gap:0.75rem; margin-top:0.5rem;">${linksHtml}</div>` : ''}
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('projectDetailModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function initModalKeyListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAptAlgoModal();
      closeProjectModal();
    }
  });

  const modals = document.querySelectorAll('.modal-backdrop');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAptAlgoModal();
        closeProjectModal();
      }
    });
  });
}

/* ==========================================================================
   9. GITHUB REPOSITORIES FETCH
   ========================================================================== */
async function initGitHubRepos() {
  const container = document.getElementById('githubReposGrid');
  if (!container) return;

  try {
    const res = await fetch('https://api.github.com/users/Vedant24v/repos?sort=updated&per_page=6');
    if (!res.ok) return;

    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return;

    const topRepos = repos.slice(0, 6);
    container.innerHTML = topRepos.map(repo => {
      const desc = repo.description || 'Software engineering repository by Vedant Vyawhare.';
      const lang = repo.language || 'Code';
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;

      return `
        <div class="glass-card repo-card">
          <div class="repo-header">
            <span class="repo-title">
              <i class='bx bx-book-bookmark' style="color:var(--primary);"></i> ${escapeHtml(repo.name)}
            </span>
            <span class="badge-pill" style="font-size:0.75rem;">${escapeHtml(lang)}</span>
          </div>
          <p class="repo-desc">${escapeHtml(desc)}</p>
          <div class="repo-meta">
            <span><span class="lang-dot"></span> ${escapeHtml(lang)}</span>
            <div style="display:flex; gap:0.75rem;">
              <span><i class='bx bx-star'></i> ${stars}</span>
              <span><i class='bx bx-git-repo-forked'></i> ${forks}</span>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color:var(--primary); font-weight:700;">
                <i class='bx bx-link-external'></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    // Keep fallback cards
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

/* ==========================================================================
   10. COPY EMAIL & CONTACT FORM DISPATCH
   ========================================================================== */
function copyEmail() {
  const emailText = 'vedantvyawhare2000@gmail.com';
  const btn = document.getElementById('copyEmailBtn');

  if (navigator.clipboard) {
    navigator.clipboard.writeText(emailText).then(() => {
      showCopied(btn);
    }).catch(() => fallbackCopy(emailText, btn));
  } else {
    fallbackCopy(emailText, btn);
  }
}

function showCopied(btn) {
  if (!btn) return;
  const orig = btn.innerHTML;
  btn.innerHTML = `<i class='bx bx-check'></i> Copied!`;
  btn.style.background = 'var(--grad-emerald)';
  btn.style.color = '#FFFFFF';
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.style.color = '';
  }, 2200);
}

function fallbackCopy(text, btn) {
  const input = document.createElement('input');
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  showCopied(btn);
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const statusMsg = document.getElementById('formStatusMsg');

  const encodedSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - ${name}`);
  const encodedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  if (statusMsg) {
    statusMsg.className = 'badge-pill';
    statusMsg.style.display = 'block';
    statusMsg.style.width = '100%';
    statusMsg.style.justifyContent = 'center';
    statusMsg.style.marginTop = '1rem';
    statusMsg.innerHTML = `<i class='bx bx-send'></i> Opening your email client to message Vedant...`;
  }

  window.location.href = `mailto:vedantvyawhare2000@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
}

/* ==========================================================================
   11. ANIME.JS POWERED SCROLL PARALLAX, 3D TILT & STAGGER REVEALS
   ========================================================================== */

/**
 * Universal Anime.js bridge supporting v4 (animate) and v3 (anime({...}))
 */
function animeAnimate(targets, params) {
  if (typeof window !== 'undefined' && window.anime) {
    try {
      if (typeof window.anime.animate === 'function') {
        return window.anime.animate(targets, params);
      } else if (typeof window.anime === 'function') {
        return window.anime({ targets, ...params });
      }
    } catch (err) {
      // Graceful fallback to CSS transforms
    }
  }
}

/**
 * Background Scroll Parallax using Anime.js
 * Moves background orb layers in multi-axis opposition for deep visual immersion
 */
function initAnimeBackgroundParallax() {
  const orb1 = document.querySelector('.orb-layer-1');
  const orb2 = document.querySelector('.orb-layer-2');
  const orb3 = document.querySelector('.orb-layer-3');
  const orb4 = document.querySelector('.orb-layer-4');
  const orb5 = document.querySelector('.orb-layer-5');

  if (!orb1 && !orb2 && !orb3 && !orb4 && !orb5) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
    const scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);

    // Layer 1: Downward drift + gentle scaling
    if (orb1) {
      animeAnimate(orb1, {
        translateY: scrollY * 0.26,
        translateX: Math.sin(scrollProgress * Math.PI) * 40,
        scale: 1 + scrollProgress * 0.12,
        duration: 350,
        ease: 'outQuad'
      });
    }

    // Layer 2: Reverse drift + counter-rotation
    if (orb2) {
      animeAnimate(orb2, {
        translateY: -scrollY * 0.22,
        translateX: -scrollY * 0.1,
        rotate: scrollProgress * 30,
        duration: 400,
        ease: 'outQuad'
      });
    }

    // Layer 3: Lateral slide + scaling
    if (orb3) {
      animeAnimate(orb3, {
        translateX: Math.sin(scrollProgress * Math.PI * 1.5) * 55,
        translateY: -scrollY * 0.16,
        scale: 1 - scrollProgress * 0.08,
        duration: 450,
        ease: 'outQuad'
      });
    }

    // Layer 4: Upward counter-scroll
    if (orb4) {
      animeAnimate(orb4, {
        translateY: -scrollY * 0.3,
        translateX: scrollY * 0.14,
        rotate: -scrollProgress * 40,
        duration: 420,
        ease: 'outQuad'
      });
    }

    // Layer 5: Diagonal breathing
    if (orb5) {
      animeAnimate(orb5, {
        translateY: scrollY * 0.15,
        translateX: -Math.cos(scrollProgress * Math.PI) * 45,
        rotate: scrollProgress * 45,
        duration: 480,
        ease: 'outQuad'
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
}

/**
 * 3D Interactive Mouse Tilt on Hero Photo, Aura, and Orbital Chips
 */
function initAnimeInteractiveHero() {
  const heroWrap = document.querySelector('.hero-visual-wrap');
  const photoBox = document.querySelector('.photo-box');
  const photoAura = document.querySelector('.photo-aura');
  const chip1 = document.querySelector('.chip-pos-1');
  const chip2 = document.querySelector('.chip-pos-2');
  const chip3 = document.querySelector('.chip-pos-3');

  if (!heroWrap || !photoBox) return;

  heroWrap.addEventListener('mousemove', (e) => {
    const rect = heroWrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);

    // 3D Card tilt on photo
    animeAnimate(photoBox, {
      rotateY: normX * 12,
      rotateX: -normY * 12,
      duration: 350,
      ease: 'outQuad'
    });

    // Holographic aura shift
    if (photoAura) {
      animeAnimate(photoAura, {
        translateX: normX * 18,
        translateY: normY * 18,
        duration: 450,
        ease: 'outQuad'
      });
    }

    // Orbital chips depth parallax
    if (chip1) {
      animeAnimate(chip1, {
        translateX: -normX * 16,
        translateY: -normY * 16,
        duration: 500,
        ease: 'outQuad'
      });
    }
    if (chip2) {
      animeAnimate(chip2, {
        translateX: normX * 18,
        translateY: -normY * 18,
        duration: 500,
        ease: 'outQuad'
      });
    }
    if (chip3) {
      animeAnimate(chip3, {
        translateX: -normX * 20,
        translateY: normY * 20,
        duration: 500,
        ease: 'outQuad'
      });
    }
  });

  heroWrap.addEventListener('mouseleave', () => {
    animeAnimate(photoBox, {
      rotateY: 0,
      rotateX: 0,
      duration: 650,
      ease: 'outQuad'
    });

    if (photoAura) {
      animeAnimate(photoAura, {
        translateX: 0,
        translateY: 0,
        duration: 650,
        ease: 'outQuad'
      });
    }

    [chip1, chip2, chip3].forEach(chip => {
      if (chip) {
        animeAnimate(chip, {
          translateX: 0,
          translateY: 0,
          duration: 650,
          ease: 'outQuad'
        });
      }
    });
  });
}

/**
 * 12. NOMINAL.SO STYLE BEHIND-TO-FRONT 3D SCROLL DYNAMICS
 * Cards emerge from deep z-space (behind, smaller, blurred) forward into the crisp foreground
 * as the user scrolls down towards and through Projects and Skills sections.
 */
function initNominalBehindToFrontScroll() {
  const cards = document.querySelectorAll('.project-card, .skill-cat-card, .mini-card');
  if (!cards.length) return;

  // Initialize initial 3D behind state for all cards
  cards.forEach(card => {
    card.style.transformOrigin = 'center center';
    card.style.transform = 'perspective(1200px) translate3d(0, 50px, -150px) scale(0.85)';
    card.style.opacity = '0.2';
    card.style.filter = 'blur(4px)';
  });

  const animatedCards = new WeakSet();

  function checkCardPositions() {
    const windowHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      // Trigger when card enters the active viewport window (bottom 92%)
      if (rect.top < windowHeight * 0.92 && rect.bottom > 0) {
        if (!animatedCards.has(card)) {
          animatedCards.add(card);

          // Fly forward from behind to front with Anime.js
          animeAnimate(card, {
            translateZ: [-150, 0],
            translateY: [50, 0],
            scale: [0.85, 1],
            opacity: [0.2, 1],
            filter: ['blur(4px)', 'blur(0px)'],
            duration: 850,
            delay: (index % 2) * 90,
            ease: 'outExpo',
            complete: () => {
              card.style.filter = 'none';
            }
          });

          // Stagger internal skill badges if it's a skill category card
          const pills = card.querySelectorAll('.skill-pill');
          if (pills.length) {
            animeAnimate(pills, {
              scale: [0.7, 1],
              opacity: [0, 1],
              translateY: [12, 0],
              delay: (el, i) => 120 + i * 30,
              duration: 500,
              ease: 'outBack'
            });
          }
        }
      }
    });
  }

  window.addEventListener('scroll', checkCardPositions, { passive: true });
  window.addEventListener('resize', checkCardPositions, { passive: true });

  // Initial check
  checkCardPositions();
}

/**
 * 13. NOMINAL.SO INTERACTIVE 3D CARD TILT ON HOVER
 */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.project-card, .skill-cat-card, .mini-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const normX = x / (rect.width / 2);
      const normY = y / (rect.height / 2);

      animeAnimate(card, {
        rotateY: normX * 7,
        rotateX: -normY * 7,
        duration: 250,
        ease: 'outQuad'
      });
    });

    card.addEventListener('mouseleave', () => {
      animeAnimate(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 500,
        ease: 'outQuad'
      });
    });
  });
}

/**
 * 14. SECTION SCROLL REVEALS FOR TIMELINE & HIGHLIGHTS
 */
function initSectionScrollReveals() {
  const otherSelectors = [
    '.timeline-card',
    '.stat-box',
    '.about-highlight-card'
  ];

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animeAnimate(entry.target, {
          translateY: [28, 0],
          opacity: [0, 1],
          duration: 650,
          ease: 'outExpo'
        });
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  otherSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  });
}
