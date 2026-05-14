// Developed by Vedant Vyawhare

/* ===== STARFIELD ===== */
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const STAR_COUNT = 120;
const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.35 + 0.1,
    alpha: Math.random() * 0.6 + 0.2,
    twinkle: Math.random() * Math.PI * 2
}));

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.twinkle += 0.015;
        s.y -= s.speed;
        if (s.y < -2) { s.y = canvas.height + 2; s.x = Math.random() * canvas.width; }
        const a = s.alpha + Math.sin(s.twinkle) * 0.08;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${a})`;
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}
drawStars();

/* ===== CUSTOM CURSOR ===== */
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursor && dot) {
    document.addEventListener('mousemove', e => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        setTimeout(() => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }, 55);
    });
    document.querySelectorAll('a,button,.project-card,.skill-card,.cert-card,.info-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

/* ===== MOBILE MENU ===== */
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});
navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}));

/* ===== STICKY HEADER + SCROLL TOP ===== */
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('sticky', y > 50);
    scrollTopBtn.classList.toggle('show', y > 400);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

/* ===== ACTIVE NAV (IntersectionObserver) ===== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { threshold: 0.3 });
sections.forEach(s => sectionObserver.observe(s));

/* ===== TYPED.JS ===== */
new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'MERN Stack Engineer', 'Python Automation', 'Security Tool Builder'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1300,
    loop: true
});

/* ===== SCROLLREVEAL ===== */
ScrollReveal({ reset: false, distance: '40px', duration: 800, delay: 80 });
ScrollReveal().reveal('.home-content', { origin: 'left' });
ScrollReveal().reveal('.home-img', { origin: 'right' });
ScrollReveal().reveal('.section-header', { origin: 'top' });
ScrollReveal().reveal('.about-img-wrap', { origin: 'left' });
ScrollReveal().reveal('.about-text', { origin: 'right' });

ScrollReveal().reveal('.project-card', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.cert-card', { origin: 'bottom', interval: 80 });
ScrollReveal().reveal('.info-card', { origin: 'left', interval: 90 });
ScrollReveal().reveal('.contact-form', { origin: 'right' });

/* ===== SKILL TABS ===== */
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    document.querySelectorAll('.skills-tab-content').forEach(c => {
        const active = c.dataset.tab === tab;
        c.classList.toggle('active', active);
        // Force display style directly to override any cascade issues
        c.style.display = active ? 'grid' : 'none';
        c.style.gridTemplateColumns = active ? 'repeat(auto-fit, minmax(210px, 1fr))' : '';
        c.style.gap = active ? '1.2rem' : '';
        if (active) {
            c.querySelectorAll('.skill-fill').forEach(f => {
                f.style.width = '0';
                setTimeout(() => { f.style.width = f.dataset.width + '%'; }, 120);
            });
        }
    });
}
document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

// Initialize display styles on page load
document.querySelectorAll('.skills-tab-content').forEach(c => {
    if (c.classList.contains('active')) {
        c.style.display = 'grid';
        c.style.gridTemplateColumns = 'repeat(auto-fit, minmax(210px, 1fr))';
        c.style.gap = '1.2rem';
    } else {
        c.style.display = 'none';
    }
});

// Animate first tab on scroll-in
const skillsSection = document.getElementById('skills');
const skillObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        document.querySelectorAll('.skills-tab-content.active .skill-fill').forEach(f => {
            setTimeout(() => { f.style.width = f.dataset.width + '%'; }, 200);
        });
        skillObserver.disconnect();
    }
}, { threshold: 0.25 });
skillObserver.observe(skillsSection);

/* ===== COUNTER ANIMATION ===== */
const aboutSection = document.getElementById('about');
new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.target, dur = 1600, step = target / (dur / 16);
        let cur = 0;
        const tick = () => { cur = Math.min(cur + step, target); el.textContent = Math.floor(cur); if (cur < target) requestAnimationFrame(tick); };
        tick();
    });
}, { threshold: 0.5 }).observe(aboutSection);

/* ===== CONTACT FORM ===== */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="bx bx-check"></i> Sent!';
    btn.style.background = 'linear-gradient(135deg,#06b6d4,#6366f1)';
    setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; this.reset(); }, 3000);
});
