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
  initButtonParticleBurst();
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
   3. CONTINUOUS BACKGROUND DENSE STARFIELD & CELESTIAL CONSTELLATION
   ========================================================================== */
function initBackgroundParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = -9999;
  let mouseY = -9999;
  let mouseActive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseActive = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouseActive = false;
    mouseX = -9999;
    mouseY = -9999;
  }, { passive: true });

  // Mobile Touch Support for Interactive Starfield
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouseX = e.touches[0].clientX;
      mouseY = e.touches[0].clientY;
      mouseActive = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouseActive = false;
    mouseX = -9999;
    mouseY = -9999;
  }, { passive: true });

  let lastScrollY = window.scrollY;
  let scrollDiff = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    scrollDiff = currentScroll - lastScrollY;
    lastScrollY = currentScroll;
  }, { passive: true });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rebuildParticles();
    }, 150);
  }, { passive: true });

  const isMobile = window.innerWidth < 768;
  // Dense starfield: 135 stars on desktop, 55 on mobile
  const particleCount = isMobile ? 55 : Math.min(Math.floor(window.innerWidth / 13), 135);
  let particles = [];

  function createStar() {
    const tier = Math.random();
    let radius, baseAlpha, isBeacon, canConnect, parallaxSpeed;

    if (tier < 0.45) {
      // 1. Distant Stardust motes (ambient background shimmer)
      radius = Math.random() * 1.3 + 1.2;
      baseAlpha = Math.random() * 0.25 + 0.35;
      isBeacon = false;
      canConnect = false;
      parallaxSpeed = 0.04;
    } else if (tier < 0.83) {
      // 2. Midfield Constellation Stars (geometric network)
      radius = Math.random() * 1.8 + 2.8;
      baseAlpha = Math.random() * 0.25 + 0.60;
      isBeacon = false;
      canConnect = true;
      parallaxSpeed = 0.08;
    } else {
      // 3. Hero Beacon Stars & Pulsars (prominent, glowing & diamond sparkles)
      radius = Math.random() * 2.5 + 4.8;
      baseAlpha = Math.random() * 0.15 + 0.85;
      isBeacon = true;
      canConnect = true;
      parallaxSpeed = 0.14;
    }

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius,
      baseAlpha,
      isBeacon,
      canConnect,
      parallaxSpeed,
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      twinklePhase: Math.random() * Math.PI * 2
    };
  }

  function rebuildParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 55 : Math.min(Math.floor(window.innerWidth / 13), 135);
    for (let i = 0; i < count; i++) {
      particles.push(createStar());
    }
  }

  rebuildParticles();

  const maxDist = isMobile ? 95 : 125;
  const maxDistSq = maxDist * maxDist;
  const mouseDist = 140;
  const mouseDistSq = mouseDist * mouseDist;

  function render() {
    if (document.hidden) {
      requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Apply scroll parallax dampening
    const currentScrollDiff = scrollDiff;
    scrollDiff *= 0.85; // Smooth deceleration

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update position with continuous drift and scroll parallax
      p.x += p.vx;
      p.y += p.vy - currentScrollDiff * p.parallaxSpeed;

      // Wrap around screen boundaries
      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      else if (p.y > height + 10) p.y = -10;

      // Twinkle calculation
      p.twinklePhase += p.twinkleSpeed;
      const currentAlpha = Math.min(1, Math.max(0.12, p.baseAlpha + Math.sin(p.twinklePhase) * 0.28));

      // 1. Draw glowing aura for Hero Beacon Stars
      if (p.isBeacon && currentAlpha > 0.35) {
        const glowRadius = p.radius * 3.4;
        const glow = ctx.createRadialGradient(p.x, p.y, p.radius * 0.3, p.x, p.y, glowRadius);
        glow.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.38})`);
        glow.addColorStop(0.5, `rgba(228, 228, 231, ${currentAlpha * 0.12})`);
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4-point diamond sparkle glint
        const crossLen = p.radius * (1.8 + Math.sin(p.twinklePhase) * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x - crossLen, p.y);
        ctx.lineTo(p.x + crossLen, p.y);
        ctx.moveTo(p.x, p.y - crossLen);
        ctx.lineTo(p.x, p.y + crossLen);
        ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 2. Draw star body
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isBeacon
        ? `rgba(255, 255, 255, ${currentAlpha})`
        : `rgba(244, 244, 245, ${currentAlpha})`;
      ctx.fill();

      // 3. Mouse interactive proximity tether
      if (mouseActive) {
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mDistSq = mdx * mdx + mdy * mdy;

        if (mDistSq < mouseDistSq) {
          const mDist = Math.sqrt(mDistSq);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * (1 - mDist / mouseDist)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // 4. Draw geometric constellation lines between connectable stars
      if (p.canConnect) {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2.canConnect) continue;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.13 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
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

  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
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
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    const toggleIcon = mobileToggle.querySelector('i');
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (toggleIcon) {
        toggleIcon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (toggleIcon) toggleIcon.className = 'bx bx-menu';
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (toggleIcon) toggleIcon.className = 'bx bx-menu';
      }
    });

    // Close mobile drawer on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (toggleIcon) toggleIcon.className = 'bx bx-menu';
      }
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
      <p style="color:var(--text-secondary); line-height:1.7; font-size:0.95rem; background:var(--bg-page); padding:1rem; border-radius:var(--radius-sm); border:1px solid rgba(255, 255, 255, 0.1);">
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

  function renderRepos(reposList) {
    container.innerHTML = reposList.map(repo => {
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
  }

  try {
    const cached = localStorage.getItem('vv_github_repos');
    const cachedTime = localStorage.getItem('vv_github_repos_time');
    if (cached && cachedTime && Date.now() - parseInt(cachedTime, 10) < 3600000) {
      renderRepos(JSON.parse(cached));
      return;
    }
  } catch (e) {}

  try {
    const res = await fetch('https://api.github.com/users/Vedant24v/repos?sort=updated&per_page=6');
    if (!res.ok) return;

    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return;

    const topRepos = repos.slice(0, 6);
    try {
      localStorage.setItem('vv_github_repos', JSON.stringify(topRepos));
      localStorage.setItem('vv_github_repos_time', Date.now().toString());
    } catch (e) {}

    renderRepos(topRepos);
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
 * Background Scroll Parallax
 * Hardware-accelerated multi-axis drift synchronized with rAF for 120fps scrolling
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

    if (orb1) orb1.style.transform = `translate3d(${Math.sin(scrollProgress * Math.PI) * 35}px, ${scrollY * 0.16}px, 0)`;
    if (orb2) orb2.style.transform = `translate3d(${-scrollY * 0.08}px, ${-scrollY * 0.14}px, 0) rotate(${scrollProgress * 25}deg)`;
    if (orb3) orb3.style.transform = `translate3d(${Math.sin(scrollProgress * Math.PI * 1.5) * 40}px, ${-scrollY * 0.1}px, 0)`;
    if (orb4) orb4.style.transform = `translate3d(${scrollY * 0.1}px, ${-scrollY * 0.18}px, 0)`;
    if (orb5) orb5.style.transform = `translate3d(${-Math.cos(scrollProgress * Math.PI) * 35}px, ${scrollY * 0.1}px, 0)`;

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

  let rafId = null;

  heroWrap.addEventListener('mousemove', (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const rect = heroWrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const normX = x / (rect.width / 2);
      const normY = y / (rect.height / 2);

      photoBox.style.transform = `perspective(1000px) rotateY(${(normX * 9).toFixed(2)}deg) rotateX(${(-normY * 9).toFixed(2)}deg)`;
      if (photoAura) {
        photoAura.style.transform = `translate3d(${(normX * 15).toFixed(1)}px, ${(normY * 15).toFixed(1)}px, 0)`;
      }
      if (chip1) chip1.style.transform = `translate3d(${(-normX * 12).toFixed(1)}px, ${(-normY * 12).toFixed(1)}px, 0)`;
      if (chip2) chip2.style.transform = `translate3d(${(normX * 14).toFixed(1)}px, ${(-normY * 14).toFixed(1)}px, 0)`;
      if (chip3) chip3.style.transform = `translate3d(${(-normX * 16).toFixed(1)}px, ${(normY * 16).toFixed(1)}px, 0)`;
    });
  });

  heroWrap.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    photoBox.style.transition = 'transform 0.5s ease-out';
    photoBox.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    if (photoAura) {
      photoAura.style.transition = 'transform 0.5s ease-out';
      photoAura.style.transform = 'translate3d(0, 0, 0)';
    }
    [chip1, chip2, chip3].forEach(chip => {
      if (chip) {
        chip.style.transition = 'transform 0.5s ease-out';
        chip.style.transform = 'translate3d(0, 0, 0)';
      }
    });

    setTimeout(() => {
      photoBox.style.transition = '';
      if (photoAura) photoAura.style.transition = '';
      [chip1, chip2, chip3].forEach(chip => {
        if (chip) chip.style.transition = '';
      });
    }, 500);
  });
}

/**
 * 12. NOMINAL.SO STYLE BEHIND-TO-FRONT 3D SCROLL DYNAMICS
 * Cards emerge from deep z-space (behind, smaller) forward into the crisp foreground
 * as the user scrolls down towards and through Projects and Skills sections.
 * Optimized with IntersectionObserver to eliminate scroll layout thrashing.
 */
function initNominalBehindToFrontScroll() {
  const cards = document.querySelectorAll('.project-card, .skill-cat-card, .mini-card');
  if (!cards.length) return;

  // Initialize initial 3D behind state for all cards
  cards.forEach(card => {
    card.style.transformOrigin = 'center center';
    card.style.transform = 'perspective(1000px) translate3d(0, 45px, -80px) scale(0.92)';
    card.style.opacity = '0';
    card.style.willChange = 'transform, opacity';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        obs.unobserve(card);

        // Fly forward smoothly from behind to front with Anime.js
        animeAnimate(card, {
          translateZ: [-80, 0],
          translateY: [45, 0],
          scale: [0.92, 1],
          opacity: [0, 1],
          duration: 750,
          ease: 'outExpo',
          complete: () => {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.willChange = '';
            card.classList.add('nominal-revealed');
          }
        });

        // Stagger internal skill badges if it's a skill category card
        const pills = card.querySelectorAll('.skill-pill');
        if (pills.length) {
          animeAnimate(pills, {
            scale: [0.75, 1],
            opacity: [0, 1],
            translateY: [10, 0],
            delay: (el, i) => 80 + i * 25,
            duration: 450,
            ease: 'outBack'
          });
        }
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
}

/**
 * 13. NOMINAL.SO INTERACTIVE 3D CARD TILT ON HOVER
 * Buttery 120fps hardware-accelerated tilt on mouse move, zero jank
 */
function init3DCardTilt() {
  // Disable 3D tilt computations on mobile/touch-only devices for smoother scrolling and battery savings
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) {
    return;
  }

  const cards = document.querySelectorAll('.project-card, .skill-cat-card, .mini-card');

  cards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      if (!card.classList.contains('nominal-revealed') && card.style.opacity !== '') return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const normX = x / (rect.width / 2);
        const normY = y / (rect.height / 2);

        card.style.transform = `perspective(1000px) rotateY(${(normX * 5.5).toFixed(2)}deg) rotateX(${(-normY * 5.5).toFixed(2)}deg) translateY(-4px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = '';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
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

/**
 * 15. THREEUI GLASS AI BUTTON PARTICLE BURST ON ACTIVATION
 */
function initButtonParticleBurst() {
  document.querySelectorAll('.btn, .btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('click', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      if ((!x && !y) && btn) {
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
      createParticleBurst(x, y);
    });
  });
}

function createParticleBurst(x, y) {
  if (!x && !y) return;
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.pointerEvents = 'none';
  container.style.zIndex = '99999';
  document.body.appendChild(container);

  const particleCount = 14;
  const colors = ['#FFFFFF', '#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A'];

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 3;
    p.style.position = 'absolute';
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.borderRadius = '50%';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.boxShadow = `0 0 8px ${p.style.backgroundColor}`;
    p.style.transform = 'translate(-50%, -50%)';
    p.style.willChange = 'transform, opacity';
    container.appendChild(p);

    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
    const distance = Math.random() * 50 + 25;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    if (window.anime) {
      animeAnimate(p, {
        translateX: [0, targetX],
        translateY: [0, targetY],
        scale: [1, 0],
        opacity: [1, 0],
        duration: Math.random() * 250 + 350,
        ease: 'outExpo'
      });
    }
  }

  setTimeout(() => container.remove(), 650);
}
