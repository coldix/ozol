/*
    File: js/script.js
    Website: ozol.org — OZ On Line
    Description: Aurora theme toggle, scroll reveals, motes, card glow,
                 image + enquiry modals, retro CRT terminal typewriter.
    Version: 2.0.0
    Date: 24 Jun 2026 AEST
    Author: Colin Dixon + Claude Opus 4.8
*/

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Theme ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const applyTheme = (theme) => {
        document.body.className = theme;
        if (themeToggle) themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        localStorage.setItem('theme', theme);
    };
    if (themeToggle) {
        themeToggle.addEventListener('click', () =>
            applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark'));
    }
    applyTheme(localStorage.getItem('theme') || 'dark');

    // --- Footer year + build stamp ---
    const yr = document.getElementById('copyright-year');
    if (yr) yr.textContent = new Date().getFullYear();
    const stamp = document.getElementById('build-stamp');
    if (stamp) stamp.textContent = 'v2.0.0 · 24 Jun 2026';

    // --- Scroll reveal ---
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in'));
    }

    // --- Modals ---
    const enquiryBtn   = document.getElementById('enquiryBtn');
    const cancelBtn    = document.getElementById('cancelBtn');
    const enquiryModal = document.getElementById('enquiryModal');
    const actionModal  = document.getElementById('actionModal');
    const imgModal     = document.getElementById('imgModal');
    const modalImg     = document.getElementById('modalImg');

    const openModal  = (m) => { if (m) m.classList.add('open'); };
    const closeModal = (m) => { if (m) m.classList.remove('open'); };

    if (enquiryBtn) enquiryBtn.addEventListener('click', () => openModal(enquiryModal));
    if (cancelBtn)  cancelBtn.addEventListener('click', () => closeModal(enquiryModal));

    document.querySelectorAll('.js-modal').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const src = link.getAttribute('data-full');
            if (src && modalImg) { modalImg.src = src; openModal(imgModal); }
        });
    });
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) closeModal(e.target);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') [enquiryModal, actionModal, imgModal].forEach(closeModal);
    });

    // --- Enquiry form (mailto formatting) ---
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fd = new FormData(event.target);
            const name = fd.get('name');
            const enquiryText = `
Enquiry Details
--------------------------------
Reason: ${fd.get('enquiry-reason')}
Name: ${name}
Email: ${fd.get('email')}
Phone: ${fd.get('phone') || 'Not provided'}
Message: ${fd.get('message') || 'Not provided'}
--------------------------------
Sent to Colin Dixon via ozol.org`.trim();

            document.getElementById('formatted-enquiry').textContent = enquiryText;
            const subject = `Website Enquiry: ${fd.get('enquiry-reason')} from ${name}`;
            const mailto = `mailto:col@ozol.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryText)}`;
            document.getElementById('emailUsBtn').href = mailto;
            closeModal(enquiryModal);
            openModal(actionModal);
        });

        document.getElementById('emailUsBtn').addEventListener('click', (e) => {
            e.preventDefault();
            window.open(e.currentTarget.href, 'mail', 'width=800,height=600,scrollbars=yes,resizable=yes');
        });
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(document.getElementById('formatted-enquiry').textContent).then(() => {
                const t = copyBtn.textContent; copyBtn.textContent = 'Copied!';
                setTimeout(() => { copyBtn.textContent = t; }, 2000);
            });
        });
    }

    // --- Retro CRT terminal typewriter ---
    const crtScreen = document.getElementById('crtScreen');
    if (crtScreen) {
        // Each entry: [text, isMuted]. Blank string = newline pause.
        const lines = [
            ['OZ ON LINE  ·  boot sequence', true],
            ['', false],
            ['> PDP-11 bootstrap ............ OK', false],
            ['> 56k dial-up modem .......... CARRIER', false],
            ['> dedicated IP ............... ASSIGNED', false],
            ['> AltaVista index ............ READY', false],
            ['> HotDog HTML editor ......... LOADED', false],
            ['', false],
            ['$ whoami', false],
            ['  Colin Dixon — building the', true],
            ['  Australian web since the 90s.', true],
            ['', false],
            ['$ cat mission.txt', false],
            ['  Useful technology. 40+ years.', true],
            ['  Classrooms → dial-up → drones → AI.', true],
            ['', false],
            ['> system ready. scroll for the story_', false],
        ];

        const cursor = document.createElement('span');
        cursor.className = 'cursor';

        if (reduceMotion) {
            crtScreen.textContent = lines.map((l) => l[0]).join('\n') + '\n';
            crtScreen.appendChild(cursor);
            return;
        }

        let li = 0, ci = 0;
        const buf = document.createElement('span');
        crtScreen.appendChild(buf);
        crtScreen.appendChild(cursor);

        const typeChar = () => {
            if (li >= lines.length) {
                // Finished — hold, then restart the loop.
                setTimeout(() => { buf.textContent = ''; li = 0; ci = 0; typeChar(); }, 11000);
                return;
            }
            const [text] = lines[li];
            if (ci < text.length) {
                buf.append(text[ci]);
                ci++;
                setTimeout(typeChar, 18 + Math.random() * 36);
            } else {
                buf.append('\n');
                li++; ci = 0;
                setTimeout(typeChar, text === '' ? 90 : 260);
            }
        };
        typeChar();
    }

    if (reduceMotion) return;

    // --- Link-card cursor glow ---
    document.querySelectorAll('.link-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
    });

    // --- Floating light motes ---
    const canvas = document.getElementById('motes');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let w, h, motes = [];
        const COUNT = Math.min(46, Math.floor(window.innerWidth / 26));
        const rand = (a, b) => a + Math.random() * (b - a);
        const seed = () => motes = Array.from({ length: COUNT }, () => ({
            x: rand(0, w), y: rand(0, h), r: rand(0.6, 2.4),
            vy: rand(0.08, 0.5), vx: rand(-0.15, 0.15),
            a: rand(0.12, 0.5), tw: rand(0.005, 0.02), tp: rand(0, 6.28)
        }));
        const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; seed(); };
        const tick = () => {
            ctx.clearRect(0, 0, w, h);
            for (const m of motes) {
                m.y -= m.vy; m.x += m.vx; m.tp += m.tw;
                if (m.y < -6) { m.y = h + 6; m.x = rand(0, w); }
                const flicker = m.a * (0.6 + 0.4 * Math.sin(m.tp));
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.r, 0, 6.2832);
                ctx.fillStyle = `rgba(170,225,255,${flicker})`;
                ctx.fill();
            }
            requestAnimationFrame(tick);
        };
        window.addEventListener('resize', resize);
        resize();
        tick();
    }
});
