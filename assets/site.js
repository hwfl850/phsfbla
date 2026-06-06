// ─────────────────────────────────────────────────────────────────────────────
// SHARED SITE JS — content/theme loading, header/footer setup, nav highlight
// ─────────────────────────────────────────────────────────────────────────────

// Server-loaded site data (null = not yet fetched or fetch failed)
let _serverContent = null;
let _serverTheme   = null;

// ── CONTENT — events, officers, page text (editable via admin panel) ────────
const CONTENT_DEFAULTS = {
  // Legacy flat fields — kept as fallbacks for older content.json files
  headline:    "Pensacola High Future Business Leaders of America",
  subheadline: "Developing the next generation of business professionals and community leaders.",
  contactEmail: "fbla@pensacolahigh.edu",

  // ── Site-wide chrome (header + footer) ──────────────────────────────
  site: {
    schoolName:      "Pensacola High",
    chapterTag:      "Florida FBLA Chapter",
    footerLocation:  "Pensacola, FL",
    instagramHandle: "@pensacolahigh.fbla",
    instagramUrl:    "https://www.instagram.com/pensacolahigh.fbla",
    footerTagline:   "Service · Education · Progress",
  },

  // ── Homepage ────────────────────────────────────────────────────────
  hero: {
    titleLine1:    "Pensacola High School",
    titleLine2:    "Future Business Leaders of America",
    tagline:       "Service · Education · Progress",
    primaryText:   "Study Resources",
    primaryHref:   "study.html",
    secondaryText: "Learn About FBLA ↗",
    secondaryHref: "https://www.fbla-pbl.org/fbla/",
  },
  announcement: {
    badge: "Latest Update",
    title: "Next Meeting — Aug 20 · Club Rush Recruitment",
    body:  "We're recruiting at Club Rush! Bring a friend, grab Krispy Kreme, and pick up your FBLA Connect login. NLC recap to follow.",
    ctaText: "See Full Calendar",
    ctaHref: "#section-events",
  },
  calendarEmbed:   "",
  cta: {
    title:         "Ready to Compete at the National Level?",
    body:          "Join Pensacola High FBLA and start your journey to the National Leadership Conference. Past members have earned scholarships and launched careers.",
    primaryText:   "Start Studying",
    primaryHref:   "study.html",
    secondaryText: "Contact Adviser",
  },

  // ── About page ──────────────────────────────────────────────────────
  about: {
    eyebrow:         "About Us",
    title:           "Pensacola High FBLA",
    body:            "Developing the next generation of business professionals and community leaders.",
    officersEyebrow: "2026 – 2027 Leadership",
    officersTitle:   "Chapter Officers",
  },

  // ── Meetings page ───────────────────────────────────────────────────
  googleFormEmbed: "",
  meetings: {
    eyebrow: "Get Involved",
    title:   "Chapter Meetings",
    intro:   "Meeting details coming soon. Check back here for the schedule, agendas, and notes.",
  },
  meetingArchive: [],

  // ── Study Resources page ────────────────────────────────────────────
  study: {
    ctaTitle:    "Choose Your Competitive Event",
    ctaDesc:     "Not sure which event to compete in yet? Browse the full list of FBLA high school competitive events to find the one that fits your interests and strengths, then dive into the study resources below.",
    ctaLinkText: "View FBLA Competitive Events",
    ctaLinkHref: "https://www.fbla.org/high-school/competitive-events/",
    labelObjective:     "Objective Tests",
    labelRoleplay:      "Roleplay",
    labelPresentations: "Presentations",
  },
  studyResources: {
    objective:     [],
    roleplay:      [],
    presentations: [],
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
  saved = saved && typeof saved === 'object' ? saved : {};

  // Merge a nested object key shallowly over its defaults.
  const mergeObj = (key) => {
    if (saved[key] && typeof saved[key] === 'object' && !Array.isArray(saved[key])) {
      result[key] = { ...result[key], ...saved[key] };
    }
  };

  if (typeof saved.headline     === 'string') result.headline     = saved.headline;
  if (typeof saved.subheadline  === 'string') result.subheadline  = saved.subheadline;
  if (typeof saved.contactEmail === 'string') result.contactEmail = saved.contactEmail;
  if (typeof saved.calendarEmbed   === 'string') result.calendarEmbed   = saved.calendarEmbed;
  if (typeof saved.googleFormEmbed === 'string') result.googleFormEmbed = saved.googleFormEmbed;

  ['site', 'hero', 'announcement', 'cta', 'about', 'meetings', 'study'].forEach(mergeObj);

  // Back-compat: older files stored the about body in `subheadline`.
  if (typeof saved.subheadline === 'string' && !(saved.about && saved.about.body)) {
    result.about.body = saved.subheadline;
  }

  if (saved.studyResources && typeof saved.studyResources === 'object') {
    result.studyResources = {
      objective:     Array.isArray(saved.studyResources.objective)     ? saved.studyResources.objective     : [],
      roleplay:      Array.isArray(saved.studyResources.roleplay)      ? saved.studyResources.roleplay      : [],
      presentations: Array.isArray(saved.studyResources.presentations) ? saved.studyResources.presentations : [],
    };
  }
  if (Array.isArray(saved.events))         result.events         = saved.events;
  if (Array.isArray(saved.officers))       result.officers       = saved.officers;
  if (Array.isArray(saved.meetingArchive)) result.meetingArchive = saved.meetingArchive;
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
  showEvents:         true,
  showOfficers:       true,
  showCta:            true,
  showAnnouncement:   true,
  showCalendar:       false,
  showGoogleForm:     false,
  showMeetingArchive: true,
  showMeetingsIntro:  true,
  showStudyCta:       true,
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
  try {
    const base = _serverTheme || JSON.parse(localStorage.getItem('fbla_theme') || '{}');
    return { ...THEME_DEFAULTS, ...base };
  } catch (_) { return { ...THEME_DEFAULTS }; }
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

// Apply admin-editable header/footer text (chapter name, Instagram, footer).
function applySiteChrome() {
  const s = (currentContent().site) || {};

  const schoolEl = document.querySelector('.chapter-school');
  if (schoolEl && s.schoolName) schoolEl.textContent = s.schoolName;
  const tagEl = document.querySelector('.chapter-tag');
  if (tagEl && s.chapterTag) tagEl.textContent = s.chapterTag;

  // Footer location line (sibling right after the footer logo).
  const footerLogo = document.querySelector('footer .footer-logo');
  const locEl = footerLogo ? footerLogo.nextElementSibling : null;
  if (locEl && (s.schoolName || s.footerLocation)) {
    locEl.innerHTML =
      `${escHtml(s.schoolName || 'Pensacola High School')} ` +
      `<span style="opacity:.55;margin:0 .35rem;">·</span> ` +
      `${escHtml(s.footerLocation || 'Pensacola, FL')}`;
  }

  // Instagram link (href + trailing handle text, keeping the inline SVG).
  const insta = document.querySelector('.insta-link');
  if (insta) {
    if (s.instagramUrl)    insta.setAttribute('href', s.instagramUrl);
    if (s.instagramHandle) {
      const handle = insta.querySelector('.insta-handle');
      if (handle) {
        handle.textContent = s.instagramHandle;
      } else {
        // Replace the last (text) node with a wrapped span we can target later.
        const last = insta.lastChild;
        if (last && last.nodeType === Node.TEXT_NODE) insta.removeChild(last);
        const span = document.createElement('span');
        span.className = 'insta-handle';
        span.textContent = s.instagramHandle;
        insta.appendChild(span);
      }
      insta.setAttribute('aria-label', `Follow us on Instagram: ${s.instagramHandle}`);
    }
  }

  // Footer tagline pills (split on · or |).
  const footerTag = document.querySelector('.footer-tag');
  if (footerTag && s.footerTagline) {
    const parts = String(s.footerTagline).split(/[·|]/).map(p => p.trim()).filter(Boolean);
    footerTag.innerHTML = parts
      .map(p => `<strong>${escHtml(p)}</strong>`)
      .join(' &nbsp;·&nbsp; ');
  }
}

function initHeaderFooter() {
  const logoNavEl = document.getElementById('logo-national-img');
  if (logoNavEl) logoNavEl.src = 'Media/Horizontal/PNG/FBLA_Logo_Horizontal_color-LoRes.png';
  const logoFooterEl = document.getElementById('logo-footer-img');
  if (logoFooterEl) logoFooterEl.src = 'Media/Horizontal/PNG/FBLA_Logo_Horizontal_white-LoRes.png';

  applySiteChrome();
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
