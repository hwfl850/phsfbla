// ─────────────────────────────────────────────────────────────────────────────
// SHARED SITE JS — content/theme loading, header/footer setup, nav highlight
// ─────────────────────────────────────────────────────────────────────────────

// Server-loaded site data (null = not yet fetched or fetch failed)
let _serverContent = null;
let _serverTheme   = null;

// ── CONTENT — events, officers, page text (editable via admin panel) ────────
const CONTENT_DEFAULTS = {
  headline:    "Pensacola High Future Business Leaders of America",
  subheadline: "Developing the next generation of business professionals and community leaders.",
  contactEmail: "fbla@pensacolahigh.edu",
  announcement: {
    badge: "Latest Update",
    title: "Next Meeting — Aug 20 · Club Rush Recruitment",
    body:  "We're recruiting at Club Rush! Bring a friend, grab Krispy Kreme, and pick up your FBLA Connect login. NLC recap to follow.",
    ctaText: "See Full Calendar",
    ctaHref: "#section-events",
  },
  calendarEmbed:   "",
  googleFormEmbed: "",
  meetings: {
    intro: "Meeting details coming soon. Check back here for the schedule, agendas, and notes.",
  },
  events: [
    { date: "AUG 7",     title: "Officer Meeting",              desc: "Officers plan the upcoming school year. All officers required." },
    { date: "AUG 20",    title: "General Meeting — Club Rush",   desc: "Recruit at Club Rush! Encourage friends to come to the New Member Meeting. NLC recap & FBLA Connect setup. Krispy Kreme." },
    { date: "AUG 27",    title: "New Member Meeting",            desc: "Intro to FBLA: events, dress code, and how to succeed. Speed-dating icebreaker. Pizza provided." },
    { date: "SEP 17",    title: "General Meeting — Buddy Pairing", desc: "Expectations, buddy pairing, event types overview, and Adopt-a-Freshie. Food after the meeting." },
    { date: "NOV 13–15", title: "SFLC",                          desc: "State Fall Leadership Conference. Selected members compete and represent PHS FBLA." },
    { date: "NOV 19",    title: "Thanksgiving Meeting",          desc: "Thankful Thanksgiving theme. Make sure members show up to upcoming workshops. Costco acorn cookies." },
    { date: "DEC 10",    title: "General Meeting — DLC Info",    desc: "Mr. Hill presents DLC details. Gift exchange and Christmas Little Debbie Cakes." },
    { date: "DEC 18",    title: "Study Night Workshop",          desc: "Prejudged event review session. Study time with officer feedback. Starts at 12:30." },
    { date: "JAN 14",    title: "District Leadership Conference", desc: "DLC competition day. All competing members must attend." },
    { date: "JAN 21",    title: "SLC Money Due",                 desc: "Payment deadline for State Leadership Conference. Sandy Sansing speaker. Hot cocoa & Oreos." },
    { date: "FEB 8–14",  title: "FBLA Week!",                    desc: "Week-long celebration of Future Business Leaders of America across the school." },
    { date: "FEB 20",    title: "Judging Practice Workshop",     desc: "Practice presentations with judge feedback to prepare for SLC." },
    { date: "MAR 11",    title: "SLC Prep Meeting",              desc: "Mr. Hill talks SLC strategy. Study time and officer feedback. Chips provided." },
    { date: "MAR 17–21", title: "State Leadership Conference",   desc: "Compete at the Florida state level in Orlando. Top performers advance to NLC." },
    { date: "APR 15",    title: "Officer Elections",             desc: "Chapter elections for the 2027–2028 officer team. All members vote." },
    { date: "MAY 15",    title: "End-of-Year Meeting",           desc: "Celebrate the year's achievements. Tentative date — details to follow." },
  ],
  officers: [
    { role: "President",                    name: "Zella Trahan" },
    { role: "Vice President",               name: "David Knoblock" },
    { role: "Secretary",                    name: "Henry White" },
    { role: "Treasurer",                    name: "Lucy Mitchem" },
    { role: "Parliamentarian",              name: "Keller Leonard" },
    { role: "Reporter",                     name: "Clayton White" },
    { role: "Historian",                    name: "Smith Maxey" },
    { role: "District 1 VP",                name: "Melody Nguyen" },
    { role: "District 1 Treasurer",         name: "Yash Gujral" },
    { role: "Underclassmen Rep",            name: "Hung Nguyen" },
    { role: "Underclassmen Rep",            name: "Mahalla Berhan" },
    { role: "State Region 1 VP",            name: "Peyton Chester" },
    { role: "Advisor",                      name: "Mr. Jacob Hill" },
  ],
};

function loadContent() {
  try {
    const base = _serverContent || JSON.parse(localStorage.getItem('fbla_content') || '{}');
    return deepMergeContent(CONTENT_DEFAULTS, base);
  } catch (_) { return JSON.parse(JSON.stringify(CONTENT_DEFAULTS)); }
}

function deepMergeContent(defaults, saved) {
  const result = JSON.parse(JSON.stringify(defaults));
  if (typeof saved.headline    === 'string') result.headline    = saved.headline;
  if (typeof saved.subheadline === 'string') result.subheadline = saved.subheadline;
  if (typeof saved.contactEmail === 'string') result.contactEmail = saved.contactEmail;
  if (saved.announcement && typeof saved.announcement === 'object') {
    result.announcement = { ...result.announcement, ...saved.announcement };
  }
  if (typeof saved.calendarEmbed   === 'string') result.calendarEmbed   = saved.calendarEmbed;
  if (typeof saved.googleFormEmbed === 'string') result.googleFormEmbed = saved.googleFormEmbed;
  if (saved.meetings && typeof saved.meetings === 'object') {
    result.meetings = { ...result.meetings, ...saved.meetings };
  }
  if (Array.isArray(saved.events))   result.events   = saved.events;
  if (Array.isArray(saved.officers)) result.officers = saved.officers;
  return result;
}

function currentContent() {
  return loadContent();
}

// ── THEME / ADMIN SETTINGS ──────────────────────────────────────────────────
const THEME_DEFAULTS = {
  primary:    '#0a2e7f',
  accent:     '#f4ab19',
  bg:         '#ffffff',
  fontBody:   'Apercu Pro',
  showEvents:        true,
  showOfficers:      true,
  showCta:           true,
  showAnnouncement:  true,
  showCalendar:      false,
  showGoogleForm:    false,
};

function loadTheme() {
  try {
    const base = _serverTheme || JSON.parse(localStorage.getItem('fbla_theme') || '{}');
    const t = { ...THEME_DEFAULTS, ...base };
    applyTheme(t);
  } catch (_) { applyTheme(THEME_DEFAULTS); }
}

function applyTheme(t) {
  const r = document.documentElement.style;
  r.setProperty('--primary', t.primary);
  r.setProperty('--accent',  t.accent);
  r.setProperty('--bg',      t.bg);
  r.setProperty('--font-body', `'${t.fontBody}', sans-serif`);
  window.__theme = t;
}

function currentTheme() {
  try { return { ...THEME_DEFAULTS, ...JSON.parse(localStorage.getItem('fbla_theme') || '{}') }; }
  catch (_) { return { ...THEME_DEFAULTS }; }
}

async function initSiteData() {
  try {
    const res = await fetch(`src/data/content.json?_=${Date.now()}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        if (data.content && typeof data.content === 'object') _serverContent = data.content;
        if (data.theme   && typeof data.theme   === 'object') _serverTheme   = data.theme;
      }
    }
  } catch (_) { /* fall through — loadTheme/loadContent use localStorage/defaults */ }
}

// ── ESCAPE HELPERS ──────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function escapeHtml(t) {
  return String(t ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── HEADER / FOOTER / NAV INIT ──────────────────────────────────────────────
function highlightActiveNav() {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  let activeId = null;
  if (path === '' || path === 'index.html' || path === 'home.html') activeId = 'nav-home';
  else if (path === 'about.html')    activeId = 'nav-about';
  else if (path === 'meetings.html') activeId = 'nav-meetings';
  else if (path === 'study.html')    activeId = 'nav-study';
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  if (activeId) document.getElementById(activeId)?.classList.add('active');
}

function initHeaderFooter() {
  const logoNavEl = document.getElementById('logo-national-img');
  if (logoNavEl) logoNavEl.src = 'Media/Horizontal/PNG/FBLA_Logo_Horizontal_color-LoRes.png';
  const logoFooterEl = document.getElementById('logo-footer-img');
  if (logoFooterEl) logoFooterEl.src = 'Media/Horizontal/PNG/FBLA_Logo_Horizontal_white-LoRes.png';

  highlightActiveNav();

  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (ham && nav) {
    ham.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', () => {
      nav.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    });
  }

  const logoArea = document.querySelector('.logo-area');
  if (logoArea) {
    logoArea.addEventListener('keydown', e => {
      if (e.key === 'Enter') location.href = 'index.html';
    });
    logoArea.addEventListener('click', () => { location.href = 'index.html'; });
  }
}

// ── BOOT ────────────────────────────────────────────────────────────────────
async function bootSite() {
  await initSiteData();
  loadTheme();
  initHeaderFooter();
  if (typeof onSiteReady === 'function') onSiteReady();
}

window.addEventListener('load', bootSite);
