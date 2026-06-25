// app.js
// Entry point: wires up navigation between sections, theme toggling, the
// global search box, and the one-time rendering calls for pages that don't
// change after load (formulas, sources, research library, study path,
// software lab). Run after all data/*.js and the other js/*.js files have
// loaded (see index.html script order).

function showSection(sectionId) {
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

const SECTION_REFRESH = {
  home: renderHomePage,
  progress: renderProgressTracker,
  roadmap: renderRoadmap,
  modules: renderModuleCards,
  studypath: renderStudyPath,
  softwarelab: renderSoftwareLab,
  news: renderNewsLinks,
  career: renderCareerPrep,
  interview: renderInterviewBank,
  hse: renderHsePage,
  unitconverter: renderUnitConverter,
  jobs: renderJobLinks,
};

// Eases the nav menu, search box, and dark-mode button out as the page
// scrolls down (more reading room) -- the brand name and the music toggle
// always stay visible. Instead of an on/off snap, opacity and a small
// upward slide are set proportionally to scroll position over FADE_RANGE
// pixels, so the panel visually tracks the user's scroll; it's back at
// full strength only once scrolled within TOP_THRESHOLD of the very top.
function initAutoHideHeaderOnScroll() {
  const collapsible = document.getElementById("topbar-collapsible");
  if (!collapsible) return;

  const TOP_THRESHOLD = 4;
  const FADE_RANGE = 70; // px of scrolling over which it fully collapses
  let ticking = false;
  let naturalHeight = 0;

  // max-height needs a real px value (not "none") for the collapse
  // animation to run, so measure the wrapper's true height whenever the
  // window resizes and the nav might wrap differently.
  function measure() {
    const prevMax = collapsible.style.maxHeight;
    collapsible.style.maxHeight = "none";
    naturalHeight = collapsible.scrollHeight;
    collapsible.style.maxHeight = prevMax;
  }

  function onScroll() {
    const y = window.scrollY;
    const progress = y <= TOP_THRESHOLD ? 0 : Math.min(1, (y - TOP_THRESHOLD) / FADE_RANGE);
    collapsible.style.opacity = String(1 - progress);
    collapsible.style.transform = `translateY(${-10 * progress}px)`;
    collapsible.style.maxHeight = `${(1 - progress) * naturalHeight}px`;
    // Shrinks the gap above this panel too, so once fully collapsed the
    // header is just symmetric padding above and below the logo row,
    // instead of leaving a leftover gap that only existed on one side.
    collapsible.style.marginTop = `${(1 - progress) * 8}px`;
    // overflow stays visible at the very top so the global search results
    // dropdown (absolutely positioned inside this wrapper) isn't clipped
    // while idle; once any collapsing starts, hide overflow so the nav
    // actually tucks away instead of spilling out of the shrinking box.
    collapsible.style.overflow = progress > 0 ? "hidden" : "visible";
    collapsible.classList.toggle("topbar-collapsed", progress > 0.85);
    ticking = false;
  }

  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  measure();
  onScroll();
}

function initNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const sectionId = link.dataset.section;
      showSection(sectionId);
      const refresh = SECTION_REFRESH[sectionId];
      if (refresh) refresh();
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function initThemeToggle() {
  const progress = loadProgress();
  applyTheme(progress.theme || "light");

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
  });
}

// ---------- Formula sheet (searchable card grid) ----------

let formulaSearchTerm = "";

function renderFormulas() {
  const container = document.getElementById("formula-sheet");
  if (!container) return;

  const term = formulaSearchTerm.trim().toLowerCase();
  const filtered = FORMULAS_DATA.filter((f) => {
    if (!term) return true;
    return f.name.toLowerCase().includes(term) || f.category.toLowerCase().includes(term);
  });

  const categories = [...new Set(filtered.map((f) => f.category))];

  if (filtered.length === 0) {
    container.innerHTML = `<p>No formulas match "${formulaSearchTerm}".</p>`;
    return;
  }

  container.innerHTML = categories
    .map((category) => {
      const cards = filtered
        .filter((f) => f.category === category)
        .map(
          (f) => `
        <div class="card">
          <h4>${f.name}</h4>
          <p class="formula-expr">${f.formula}</p>
          <p class="glossary-meta">${f.variables}</p>
          <p class="glossary-meta"><strong>Unit notes:</strong> ${f.unitNotes}</p>
          <p class="glossary-meta"><strong>Example:</strong> ${f.example}</p>
        </div>
      `
        )
        .join("");
      return `<h3>${category}</h3><div class="grid">${cards}</div>`;
    })
    .join("");
}

function initFormulaSearch() {
  const input = document.getElementById("formula-search");
  if (!input) return;
  input.addEventListener("input", (e) => {
    formulaSearchTerm = e.target.value;
    renderFormulas();
  });
}

// ---------- Sources & References (filterable) ----------

let sourceFilters = { topic: "All", level: "All" };

function getDistinctTopics() {
  const topics = new Set();
  SOURCES_DATA.forEach((s) => s.topics.forEach((t) => topics.add(t)));
  return ["All", ...Array.from(topics).sort()];
}

function getDistinctLevels() {
  return ["All", ...new Set(SOURCES_DATA.map((s) => s.level))];
}

function populateSourceFilters() {
  const topicSelect = document.getElementById("source-topic-filter");
  const levelSelect = document.getElementById("source-level-filter");
  if (!topicSelect || !levelSelect) return;

  topicSelect.innerHTML = getDistinctTopics()
    .map((t) => `<option value="${t}">${t}</option>`)
    .join("");
  levelSelect.innerHTML = getDistinctLevels()
    .map((l) => `<option value="${l}">${l}</option>`)
    .join("");

  topicSelect.addEventListener("change", (e) => {
    sourceFilters.topic = e.target.value;
    renderSourcesPage();
  });
  levelSelect.addEventListener("change", (e) => {
    sourceFilters.level = e.target.value;
    renderSourcesPage();
  });
}

function renderSourcesPage() {
  const container = document.getElementById("sources-list");
  if (!container) return;

  const filtered = SOURCES_DATA.filter((s) => {
    const topicOk = sourceFilters.topic === "All" || s.topics.includes(sourceFilters.topic);
    const levelOk = sourceFilters.level === "All" || s.level === sourceFilters.level;
    return topicOk && levelOk;
  });

  const groups = [...new Set(filtered.map((s) => s.group))];

  if (filtered.length === 0) {
    container.innerHTML = "<p>No sources match the selected filters.</p>";
    return;
  }

  container.innerHTML = groups
    .map((group) => {
      const items = filtered
        .filter((s) => s.group === group)
        .map(
          (s) => `
          <div class="card">
            <p><a href="${s.url}" target="_blank" rel="noopener"><strong>${s.title}</strong></a></p>
            <span class="badge">${s.type}</span>
            <span class="badge">${s.level}</span>
            <p class="glossary-meta">${s.why}</p>
            <p class="glossary-meta">Suggested module: ${s.suggestedModule}</p>
          </div>
        `
        )
        .join("");
      return `<h3>${group}</h3><div class="grid">${items}</div>`;
    })
    .join("");
}

function renderResearchLibrary() {
  const container = document.getElementById("research-library-list");
  if (!container) return;

  container.innerHTML = Object.entries(RESEARCH_LIBRARY_DATA)
    .map(
      ([group, items]) => `
      <h3>${group}</h3>
      <div class="grid">
        ${items
          .map(
            (item) => `
          <div class="card">
            <p><a href="${item.url}" target="_blank" rel="noopener"><strong>${item.title}</strong></a></p>
            <span class="badge">${item.type}</span>
            <span class="badge">${item.level}</span>
            <p class="glossary-meta">${item.why}</p>
          </div>
        `
          )
          .join("")}
      </div>
    `
    )
    .join("");
}

// ---------- Home page: Choose Your Path + Dashboard ----------

function renderHomePathRow() {
  renderCareerPathsRow("home-path-row");
}

function renderHomeDashboard() {
  const container = document.getElementById("home-dashboard");
  if (!container) return;

  const progress = loadProgress();
  const completedModules = MODULES_DATA.filter((m) => isModuleCompleted(m.id)).length;
  const lastQuiz = progress.quizScores.length ? progress.quizScores[progress.quizScores.length - 1] : null;
  const lastQuizMod = lastQuiz ? MODULES_DATA.find((m) => m.id === lastQuiz.moduleId) : null;
  const flashcardsDue = GLOSSARY_DATA.length - progress.knownFlashcards.length;
  const careerProgress = getCareerPrepProgress();
  const interviewScore = getInterviewReadinessScore();

  container.innerHTML = `
    <div class="card stat-card">
      <h4>Continue Learning</h4>
      <p>Pick up where you left off in the Roadmap or Modules.</p>
      <button class="btn secondary" data-action="goto" data-target="roadmap">Continue</button>
    </div>
    <div class="card stat-card">
      <h4>Completed Modules</h4>
      <p class="stat-number">${completedModules} / ${MODULES_DATA.length}</p>
    </div>
    <div class="card stat-card">
      <h4>Latest Quiz Score</h4>
      <p class="stat-number">${lastQuiz ? `${lastQuiz.score} / ${lastQuiz.total}` : "--"}</p>
      <p class="glossary-meta">${lastQuizMod ? lastQuizMod.title : "No quiz attempts yet"}</p>
    </div>
    <div class="card stat-card">
      <h4>Flashcards Due</h4>
      <p class="stat-number">${Math.max(0, flashcardsDue)}</p>
    </div>
    <div class="card stat-card">
      <h4>Career Prep Progress</h4>
      <p class="stat-number">${careerProgress}%</p>
      ${buildProgressBar(careerProgress)}
    </div>
    <div class="card stat-card">
      <h4>Interview Readiness Score</h4>
      <p class="stat-number">${interviewScore}%</p>
      ${buildProgressBar(interviewScore)}
    </div>
  `;

  container.querySelectorAll('[data-action="goto"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      showSection(target);
      const refresh = SECTION_REFRESH[target];
      if (refresh) refresh();
    });
  });
}

function renderHomePage() {
  renderHomePathRow();
  renderHomeDashboard();
}

// ---------- Study Path ----------

function renderStudyPath() {
  const container = document.getElementById("study-path-list");
  if (!container) return;

  container.innerHTML = Object.entries(STUDY_PATH_DATA)
    .map(([level, steps]) => {
      const stepsHtml = steps
        .map(
          (step, i) => `
        <div class="study-path-step" data-module-id="${step.moduleId || ""}" data-section-id="${step.sectionId || ""}">
          <span class="step-number">${i + 1}</span>
          <span>${step.label}</span>
        </div>
      `
        )
        .join("");
      return `
        <div class="card">
          <h3>${level}</h3>
          <div class="study-path-steps">${stepsHtml}</div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".study-path-step").forEach((stepEl) => {
    stepEl.addEventListener("click", () => {
      const moduleId = stepEl.dataset.moduleId;
      const sectionId = stepEl.dataset.sectionId;
      if (moduleId) {
        showSection("modules");
        showModuleDetail(moduleId);
      } else if (sectionId) {
        showSection(sectionId);
        const refresh = SECTION_REFRESH[sectionId];
        if (refresh) refresh();
      }
    });
  });
}

// ---------- Software Lab ----------

function renderSoftwareLab() {
  const container = document.getElementById("softwarelab-content");
  if (!container) return;

  const mod = MODULES_DATA.find((m) => m.id === "software-lab");
  if (!mod) return;

  container.innerHTML = `
    <div class="card">
      <h3>${mod.title}</h3>
      <p>${highlightTerms(mod.summary)}</p>
      <h4>Key tools</h4>
      <ul>${mod.keyConcepts.map((c) => `<li>${highlightTerms(c)}</li>`).join("")}</ul>
      <div class="callout callout--why">
        <span class="callout-title">Why it matters</span>
        ${highlightTerms(mod.whyItMatters)}
      </div>
    </div>
    <div id="softwarelab-chart"></div>
    <div class="card">
      <h4>Source Links</h4>
      <ul>${mod.sources.map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`).join("")}</ul>
      <div class="card-actions">
        <button class="btn" id="softwarelab-quiz-btn">Take the Software Lab quiz</button>
      </div>
    </div>
  `;

  renderModuleCharts("software-lab", "softwarelab-chart");

  const quizBtn = document.getElementById("softwarelab-quiz-btn");
  if (quizBtn) {
    quizBtn.addEventListener("click", () => {
      showSection("quiz");
      setQuizMode(false, "software-lab");
    });
  }
}

// ---------- Oil and Gas News Links ----------

const NEWS_NOTES_KEY = "petrolearn_news_notes_v1";
let newsCategoryFilter = "All";

function loadNewsNotes() {
  try {
    return JSON.parse(localStorage.getItem(NEWS_NOTES_KEY)) || {};
  } catch (err) {
    return {};
  }
}

function saveNewsNote(url, text) {
  const notes = loadNewsNotes();
  notes[url] = text;
  localStorage.setItem(NEWS_NOTES_KEY, JSON.stringify(notes));
}

function renderNewsFilterBar() {
  const bar = document.getElementById("news-filter-bar");
  if (!bar) return;
  const categories = ["All", ...NEWS_CATEGORIES];
  bar.innerHTML = categories
    .map(
      (c) => `<button class="filter-chip${c === newsCategoryFilter ? " active" : ""}" data-category="${c}">${c}</button>`
    )
    .join("");
  bar.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      newsCategoryFilter = chip.dataset.category;
      renderNewsLinks();
    });
  });
}

function renderNewsLinks() {
  renderNewsFilterBar();
  const container = document.getElementById("news-list");
  if (!container) return;

  const notes = loadNewsNotes();
  const filtered =
    newsCategoryFilter === "All" ? NEWS_DATA : NEWS_DATA.filter((n) => n.category === newsCategoryFilter);
  const categories = [...new Set(filtered.map((n) => n.category))];

  container.innerHTML = categories
    .map((category) => {
      const cards = filtered
        .filter((n) => n.category === category)
        .map(
          (n) => `
        <div class="card">
          <p><a href="${n.url}" target="_blank" rel="noopener"><strong>${n.title}</strong></a></p>
          <p class="glossary-meta">${n.description}</p>
          <p class="news-last-checked">Last checked: open the link to see the latest update.</p>
          <textarea class="news-note" data-url="${n.url}" placeholder="Your note about this source (saved in this browser)...">${notes[n.url] || ""}</textarea>
        </div>
      `
        )
        .join("");
      return `<h3>${category}</h3><div class="grid">${cards}</div>`;
    })
    .join("");

  container.querySelectorAll(".news-note").forEach((textarea) => {
    textarea.addEventListener("input", (e) => saveNewsNote(e.target.dataset.url, e.target.value));
  });
}

// ---------- Global search ----------

// Splits a query into lowercase tokens; every token must appear somewhere
// in an item's combined searchable text for that item to match (AND
// across tokens, so "water cut" only matches items mentioning both words).
function tokenizeQuery(query) {
  return query.trim().toLowerCase().split(/\s+/).filter(Boolean);
}

function matchesAllTokens(corpus, tokens) {
  const lower = corpus.toLowerCase();
  return tokens.every((t) => lower.includes(t));
}

// Simple relevance score: exact label match ranks highest, then label
// starts-with, then label contains, then a small bonus per matched token
// found anywhere in the corpus (so title hits always outrank body hits).
function scoreSearchResult(label, corpus, tokens) {
  const lowerLabel = label.toLowerCase();
  const query = tokens.join(" ");
  let score = 0;
  if (lowerLabel === query) score += 100;
  else if (lowerLabel.startsWith(query)) score += 50;
  else if (lowerLabel.includes(query)) score += 25;
  tokens.forEach((t) => {
    if (lowerLabel.includes(t)) score += 5;
    if (corpus.toLowerCase().includes(t)) score += 1;
  });
  return score;
}

function performGlobalSearch(query) {
  const tokens = tokenizeQuery(query);
  const dropdown = document.getElementById("search-results-dropdown");
  if (!dropdown) return;

  if (tokens.length === 0) {
    dropdown.classList.remove("open");
    dropdown.innerHTML = "";
    return;
  }

  const results = [];
  const addResult = (label, corpus, type, action) => {
    if (!matchesAllTokens(corpus, tokens)) return;
    results.push({ type, label, action, score: scoreSearchResult(label, corpus, tokens) });
  };

  MODULES_DATA.forEach((m) => {
    addResult(m.title, `${m.title} ${m.summary}`, "Module", () => { showSection("modules"); showModuleDetail(m.id); });
  });

  GLOSSARY_DATA.forEach((g) => {
    addResult(g.term, `${g.term} ${g.simpleDefinition} ${g.category}`, "Glossary", () => { showSection("glossary"); renderGlossary(g.term); });
  });

  FORMULAS_DATA.forEach((f) => {
    addResult(f.name, `${f.name} ${f.category}`, "Formula", () => showSection("formulas"));
  });

  SOURCES_DATA.forEach((s) => {
    addResult(s.title, `${s.title} ${s.topics.join(" ")}`, "Source", () => showSection("sources"));
  });

  CAREER_ROLES_DATA.forEach((r) => {
    addResult(r.title, `${r.title} ${r.blurb}`, "Career role", () => { showSection("career"); careerActiveRoleId = r.id; renderCareerPrep(); });
  });

  INTERVIEW_QUESTIONS_DATA.forEach((q) => {
    addResult(q.question, `${q.question} ${q.category}`, "Interview question", () => showSection("interview"));
  });

  results.sort((a, b) => b.score - a.score);

  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-result-item">No matches for "${query}".</div>`;
  } else {
    dropdown.innerHTML = results
      .slice(0, 20)
      .map(
        (r, i) => `
        <div class="search-result-item" data-index="${i}">
          <span class="search-result-type">${r.type}</span><br/>${r.label}
        </div>
      `
      )
      .join("");
    dropdown.querySelectorAll(".search-result-item").forEach((el, i) => {
      el.addEventListener("click", () => {
        results[i].action();
        dropdown.classList.remove("open");
        document.getElementById("global-search").value = "";
      });
    });
  }
  dropdown.classList.add("open");
}

function initGlobalSearch() {
  const input = document.getElementById("global-search");
  const dropdown = document.getElementById("search-results-dropdown");
  if (!input || !dropdown) return;

  input.addEventListener("input", (e) => performGlobalSearch(e.target.value));
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) dropdown.classList.remove("open");
  });
}

// ---------- Progress Tracker ----------

function renderProgressTracker() {
  const container = document.getElementById("progress-summary");
  if (!container) return;

  const progress = loadProgress();
  const completedStages = progress.completedRoadmap.length;
  const totalStages = ROADMAP_DATA.length;
  const knownCards = progress.knownFlashcards.length;
  const reviewCards = progress.reviewFlashcards.length;

  const quizRowsHtml = progress.quizScores.length
    ? progress.quizScores
        .slice()
        .reverse()
        .map((entry) => {
          const mod = MODULES_DATA.find((m) => m.id === entry.moduleId);
          const date = new Date(entry.date).toLocaleString();
          return `<tr><td>${mod ? mod.title : entry.moduleId}</td><td>${entry.score}/${entry.total}</td><td>${date}</td></tr>`;
        })
        .join("")
    : `<tr><td colspan="3">No quiz attempts yet.</td></tr>`;

  const roadmapPercent = totalStages ? Math.round((completedStages / totalStages) * 100) : 0;

  container.innerHTML = `
    <div class="grid">
      <div class="card">
        <h3>Roadmap</h3>
        <p>${completedStages} / ${totalStages} stages completed</p>
        ${buildProgressBar(roadmapPercent)}
      </div>
      <div class="card"><h3>Flashcards</h3><p>${knownCards} known, ${reviewCards} marked for review</p></div>
      <div class="card"><h3>Theme</h3><p>${progress.theme}</p></div>
    </div>
    <h3>Quiz history</h3>
    <table class="formula-table">
      <thead><tr><th>Module</th><th>Score</th><th>Date</th></tr></thead>
      <tbody>${quizRowsHtml}</tbody>
    </table>
    <button class="btn secondary" id="reset-progress-btn">Reset all progress</button>
  `;

  document.getElementById("reset-progress-btn").addEventListener("click", () => {
    if (confirm("This clears all saved progress in this browser. Continue?")) {
      localStorage.removeItem(STORAGE_KEY);
      renderProgressTracker();
      renderRoadmap();
      renderModuleCards();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAutoHideHeaderOnScroll();
  initThemeToggle();
  initGlobalSearch();
  initAudioControls();

  renderRoadmap();
  renderModuleCards();
  renderGlossary("");
  initGlossarySearch();
  renderFormulas();
  initFormulaSearch();
  renderUnitConverter();
  populateQuizModuleSelect();
  populateFlashcardCategorySelect();
  populateSourceFilters();
  renderSourcesPage();
  renderResearchLibrary();
  renderStudyPath();
  renderSoftwareLab();
  renderNewsLinks();
  renderJobLinks();
  initQuizModeToggle();
  renderProgressTracker();
  renderHomePage();
  renderCareerPrep();
  renderInterviewBank();
  renderHsePage();

  // Start quiz/flashcards with the first available module/category so the
  // pages are never empty on first visit.
  const firstQuizModule = getQuizModuleIds()[0];
  if (firstQuizModule) startQuizForModule(firstQuizModule.id);
  startFlashcardsForCategory("all");

  showSection("home");
});
