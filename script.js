/**
 * ==========================================================================
 * VEDANT VYAWHARE — PORTFOLIO RUNTIME
 * Senior-engineered JavaScript: Navigation, Typing, Modals, GitHub API, Contact
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyrightYear();
  initTypingAnimation();
  initNavigation();
  initBackToTop();
  initGitHubRepos();
  initModalKeyListeners();
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
    'Full-Stack Development',
    'API Design & Integrations',
    'Building Scalable Products'
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
      typingSpeed = 45;
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      // Switch to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. STICKY NAVIGATION & ACTIVE SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileIcon = document.getElementById('mobileIcon');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileIcon.className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileIcon.className = 'bx bx-menu';
      });
    });
  }

  // Active section intersection observer
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
   4. BACK TO TOP BUTTON
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
   5. EXPANDABLE "MORE PROJECTS" TOGGLE
   ========================================================================== */
function toggleMoreProjects() {
  const grid = document.getElementById('moreProjectsGrid');
  const btn = document.getElementById('toggleMoreProjectsBtn');
  const icon = document.getElementById('moreProjectsIcon');

  if (!grid || !btn) return;

  const isExpanded = grid.classList.toggle('expanded');
  if (isExpanded) {
    btn.innerHTML = `<i class='bx bx-chevron-up' id="moreProjectsIcon"></i> Hide Additional Experiments`;
  } else {
    btn.innerHTML = `<i class='bx bx-chevron-down' id="moreProjectsIcon"></i> View More Projects &amp; Experiments`;
  }
}

/* ==========================================================================
   6. APT ALGO CASE STUDY MODAL
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
   7. DETAILED PROJECT CASE STUDIES MODAL DATA & HANDLERS
   ========================================================================== */
const projectDataStore = {
  repox: {
    tag: 'AI DEVELOPER TOOLING',
    title: 'Repox — AI Codebase Explanation Generator',
    subtitle: 'Next.js 15 · FastAPI · Groq (Llama 3.3 70B) · Mermaid.js',
    githubUrl: 'https://github.com/Vedant24v/Repox',
    liveUrl: 'https://repox-alpha.vercel.app',
    overview: 'Repox transforms uploaded repository ZIP files into modular, multi-level tutorials. It addresses the steep onboarding curve engineers experience when exploring complex, unfamiliar codebases.',
    architecture: `
┌───────────────────────────┐         ┌──────────────────────────────┐
│  Next.js 15 Client        │  POST   │  FastAPI Backend             │
│  (ZIP Upload / UI State)  │ ──────> │  - Unpack & Heuristic Filter │
└───────────────────────────┘         │  - Static AST File Mapper    │
              │                       └──────────────────────────────┘
              ▼                                       │
┌───────────────────────────┐                         ▼
│  Mermaid.js Visualizer    │         ┌──────────────────────────────┐
│  (Architecture & ERDs)    │ <────── │  Groq API (Llama 3.3 70B)    │
└───────────────────────────┘         │  - Evidence-Graded Content   │
                                      └──────────────────────────────┘
    `,
    contributions: [
      'Engineered the heuristic static-analysis engine scanning Python, TypeScript, and JavaScript to extract routes, models, and dependencies.',
      'Constructed automated Mermaid.js diagram generation producing deterministic architecture, ERD, and user-flow maps.',
      'Integrated regex pattern scanning to detect accidentally committed tokens, API keys, and secret credentials before ingestion.',
      'Configured production deployment pairing Next.js 15 on Vercel with containerized FastAPI on Render.'
    ],
    challenges: 'Balancing LLM context window limits with multi-thousand line repositories. Solved by pre-ranking files using AST depth metrics and pruning test mocks, node_modules, and cache files prior to LLM summarization.'
  },

  taskflow: {
    tag: 'FULL-STACK MERN SYSTEM',
    title: 'TaskFlow — Collaborative Kanban System',
    subtitle: 'React 18 · Node.js · Express.js · MongoDB · JWT · @dnd-kit',
    githubUrl: 'https://github.com/Vedant24v/taskflow',
    liveUrl: 'https://taskkfloww.vercel.app',
    overview: 'Production-ready, Jira-style task management platform supporting multi-tenant role isolation, Kanban boards, and real-time state synchronization.',
    architecture: `
[React 18 Client + @dnd-kit]
           │
           │ JWT Bearer Token (Secure HttpOnly Refresh)
           ▼
[Express.js REST Middleware]
    ├── Authentication Guard
    ├── Role-Based Access Control (Admin / Member)
    └── Schema Validation
           │
           ▼
[MongoDB Atlas via Mongoose Models]
    (Tasks, Columns, Activity Logs, Users)
    `,
    contributions: [
      'Implemented JWT refresh-token authentication pipeline with bcryptjs password hashing and strict data isolation per workspace.',
      'Engineered smooth drag-and-drop column transitions using @dnd-kit with optimistic client UI updates and rollback on network failure.',
      'Designed normalized Mongoose schemas indexing workspace and user references for sub-50ms query responses.',
      'Deployed serverless API endpoints to Vercel with environment-separated staging and production configs.'
    ],
    challenges: 'Preventing race conditions when multiple users reordered tasks simultaneously. Implemented fractional index positioning to allow continuous reordering without bulk database updates.'
  },

  indusmind: {
    tag: 'AI RAG & RETRIEVAL PIPELINE',
    title: 'Indus_Mind — Industrial Document RAG System',
    subtitle: 'FastAPI · React · Qdrant Cloud · Hugging Face · Groq Llama 3.1 · MCP',
    githubUrl: 'https://github.com/Vedant24v/Indus_Mind',
    liveUrl: null,
    overview: 'A specialized Retrieval-Augmented Generation platform tailored for Architecture, Engineering, and Construction (AEC) technical manuals and complex industrial blueprints.',
    architecture: `
[Industrial PDF Manuals] ──> [PyMuPDF Parsing & Semantic Chunking]
                                           │
                                           ▼
                                [Hugging Face Embeddings]
                                           │
                                           ▼
                                [Qdrant Cloud Vector DB]
                                           │
[User Query] ─────────────> [Cosine Semantic Search] ──> [Groq Llama 3.1] ──> [Answer + Page Citations]
    `,
    contributions: [
      'Constructed project-isolated vector ingestion pipeline in Qdrant Cloud with strict collection segmentation.',
      'Integrated Hugging Face serverless embedding models with Groq (Llama 3.1) for high-accuracy response synthesis with verifiable page references.',
      'Built Model Context Protocol (MCP) server endpoints enabling external tools like Claude Desktop to query industrial technical specs.',
      'Implemented token-efficient re-ranking to prioritize critical compliance and safety paragraphs.'
    ],
    challenges: 'Industrial manuals contain tabular equipment specs and technical tolerances that naive chunking fragmented. Designed a table-aware parser preserving markdown tables during chunking.'
  },

  medtrace: {
    tag: 'PHARMACEUTICAL COMPLIANCE SYSTEM',
    title: 'MedTrace — Electronic Batch Record (EBR) System',
    subtitle: 'React · Node.js · Express.js · MongoDB · PDFKit · JWT',
    githubUrl: 'https://github.com/Vedant24v/MedTrace',
    liveUrl: null,
    overview: 'A digital Electronic Batch Record management system designed for pharmaceutical manufacturing, replacing error-prone paper batch files with audit-compliant digital verification.',
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
      'Developed cryptographic audit-trail logging tracking every user operation, timestamp, and field mutation.',
      'Implemented multi-tier approval flows: Operator Execution → QA Review → Production Release.',
      'Engineered automated PDF generation using PDFKit producing audit-ready, formatted batch certificates.',
      'Constructed role-based access control safeguarding sensitive drug formulation data.'
    ],
    challenges: 'Ensuring immutable audit logs without database performance degradation. Implemented write-only append logs for audit trails paired with indexed reference queries.'
  },

  apitest: {
    tag: 'AUTOMATED TEST ENGINEERING',
    title: 'Automated API Test Framework',
    subtitle: 'Python · Pytest · Requests · pytest-html',
    githubUrl: 'https://github.com/Vedant24v/api-test-framework',
    liveUrl: null,
    overview: 'An automated REST API test framework delivering comprehensive endpoint validation, regression testing, and instant visual reporting.',
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
      'Configured automated HTML report generation detailing assertions, timing benchmarks, and response payloads.',
      'Established parameter-driven negative testing to ensure APIs strictly return standard HTTP 4xx and 5xx error structures.'
    ],
    challenges: 'Handling stateful dependent tests without cascade failures. Engineered clean fixture teardowns ensuring tests run completely decoupled and isolated.'
  },

  weapondetector: {
    tag: 'COMPUTER VISION & SAFETY',
    title: 'Real-Time Weapon Detection System',
    subtitle: 'Python · YOLOv8 · OpenCV · Tkinter',
    githubUrl: null,
    liveUrl: null,
    overview: 'A real-time computer vision system built to detect firearms and dangerous weapons from live surveillance camera streams to enhance security monitoring.',
    architecture: `
[Live Video Feed (OpenCV)] ──> [Frame Preprocessing (Resizing & Normalization)]
                                                │
                                                ▼
                                    [YOLOv8 Inference Engine]
                                                │
                                                ▼
                                  [Bounding Box & Confidence Threshold]
                                                │
                                                ▼
                                  [Tkinter Telemetry UI & Audio Alert]
    `,
    contributions: [
      'Trained and optimized a lightweight YOLOv8 neural network for fast inference on edge camera streams.',
      'Constructed real-time video pipeline using OpenCV with frame-skipping optimizations to maintain 30+ FPS.',
      'Engineered a Tkinter desktop interface displaying detection bounding boxes, confidence percentages, and operator alerts.',
      'Implemented persistence logging for security incident timestamps and frame snapshots.'
    ],
    challenges: 'Minimizing false positives caused by common objects (such as mobile phones). Tuned confidence thresholds and augmented training dataset with varied angles and lighting conditions.'
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
    linksHtml += `<a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer" class="neu-btn" style="padding:0.5rem 1rem; font-size:0.85rem;"><i class='bx bxl-github'></i> View Repository</a> `;
  }
  if (data.liveUrl) {
    linksHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="neu-btn neu-btn-primary" style="padding:0.5rem 1rem; font-size:0.85rem;"><i class='bx bx-link-external'></i> Live Deployment</a> `;
  }

  content.innerHTML = `
    <div>
      <h3 style="font-size:1.15rem; margin-bottom:0.5rem;">Project Overview</h3>
      <p style="color:var(--text-secondary); line-height:1.7; font-size:0.95rem;">${data.overview}</p>
    </div>

    <div>
      <h3 style="font-size:1.15rem; margin-bottom:0.5rem;">Architecture &amp; Data Flow</h3>
      <div class="diagram-box">
        <pre>${data.architecture.trim()}</pre>
      </div>
    </div>

    <div>
      <h3 style="font-size:1.15rem; margin-bottom:0.5rem;">Key Engineering Contributions</h3>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:0.6rem;">
        ${data.contributions.map(item => `
          <li style="display:flex; gap:0.5rem; color:var(--text-secondary); font-size:0.92rem;">
            <i class='bx bx-check-circle' style="color:var(--accent); font-size:1.1rem; flex-shrink:0; margin-top:0.15rem;"></i>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div>
      <h3 style="font-size:1.15rem; margin-bottom:0.5rem;">Engineering Challenge &amp; Solution</h3>
      <p style="color:var(--text-secondary); line-height:1.65; font-size:0.92rem; background:var(--surface); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); box-shadow:var(--shadow-neu-inset-sm);">
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
  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAptAlgoModal();
      closeProjectModal();
    }
  });

  // Close modals when clicking on backdrop
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
   8. GITHUB PUBLIC REPOSITORIES INTEGRATION
   ========================================================================== */
async function initGitHubRepos() {
  const container = document.getElementById('githubReposGrid');
  if (!container) return;

  try {
    const res = await fetch('https://api.github.com/users/Vedant24v/repos?sort=updated&per_page=6', {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    if (!res.ok) {
      console.warn('GitHub API rate limit or error:', res.status);
      return; // Keep verified fallback static cards
    }

    const repos = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return;

    // Filter out forks if desired, or pick top 6
    const topRepos = repos.slice(0, 6);

    const cardsHtml = topRepos.map(repo => {
      const desc = repo.description || 'Public software engineering repository on GitHub.';
      const lang = repo.language || 'Code';
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;

      return `
        <div class="repo-card">
          <div class="repo-header">
            <span class="repo-title">
              <i class='bx bx-book-bookmark' style="color:var(--accent);"></i> ${escapeHtml(repo.name)}
            </span>
            <span class="neu-badge">${escapeHtml(lang)}</span>
          </div>
          <p class="repo-desc">${escapeHtml(desc)}</p>
          <div class="repo-meta">
            <span class="repo-lang"><span class="lang-dot"></span> ${escapeHtml(lang)}</span>
            <div class="repo-stats">
              <span><i class='bx bx-star'></i> ${stars}</span>
              <span><i class='bx bx-git-repo-forked'></i> ${forks}</span>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" style="color:var(--accent); font-weight:600; margin-left:0.35rem;">
                <i class='bx bx-link-external'></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = cardsHtml;
  } catch (err) {
    console.warn('Could not fetch GitHub repositories, using fallback:', err);
    // Verified fallback cards remain visible
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
   9. COPY EMAIL INTERACTION
   ========================================================================== */
function copyEmail() {
  const emailText = 'vedantvyawhare2000@gmail.com';
  const btn = document.getElementById('copyEmailBtn');

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(emailText).then(() => {
      showCopiedSuccess(btn);
    }).catch(() => {
      fallbackCopy(emailText, btn);
    });
  } else {
    fallbackCopy(emailText, btn);
  }
}

function showCopiedSuccess(btn) {
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = `<i class='bx bx-check'></i> Copied!`;
  btn.style.color = 'var(--success)';
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.color = '';
  }, 2200);
}

function fallbackCopy(text, btn) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand('copy');
    showCopiedSuccess(btn);
  } catch (e) {
    alert('Email: ' + text);
  }
  document.body.removeChild(tempInput);
}

/* ==========================================================================
   10. FUNCTIONAL CONTACT FORM (WITH MAILTO DISPATCH & HONEST FEEDBACK)
   ========================================================================== */
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const statusMsg = document.getElementById('formStatusMsg');

  if (!name || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - ${name}`);
  const encodedBody = encodeURIComponent(
    `Hello Vedant,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
  );

  const mailtoUrl = `mailto:vedantvyawhare2000@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

  // Honest status update: never claim "Message Sent!" without an API transmission
  if (statusMsg) {
    statusMsg.className = 'form-status-msg success';
    statusMsg.innerHTML = `<i class='bx bx-check-circle'></i> Launching your mail client to send to <strong>vedantvyawhare2000@gmail.com</strong>...`;
    statusMsg.style.display = 'block';
  }

  // Trigger default client
  window.location.href = mailtoUrl;
}
