// modules.js
// Renders the Learning Roadmap timeline and the Module cards grid (with a
// difficulty filter), plus an expanded module detail view with callouts,
// an embedded chart where available, sources, quiz/flashcard shortcuts, and
// an "Ask AI" copyable prompt template (no API connection, just text).

let moduleDifficultyFilter = "All";

const CATEGORY_ICONS = {
  Fundamentals: "🛢️",
  Geoscience: "🪨",
  Reservoir: "🧪",
  Drilling: "🛠️",
  Production: "⚙️",
  Petrophysics: "📊",
  Geophysics: "〜",
  "Data & Software": "💻",
  Economics: "💰",
  HSE: "🦺",
};

const DEFAULT_ESTIMATED_TIME = {
  Beginner: "20 min",
  Intermediate: "30 min",
  Advanced: "40 min",
};

function categoryIcon(category) {
  return CATEGORY_ICONS[category] || "📘";
}

function difficultyBadgeClass(difficulty) {
  return "badge difficulty-" + difficulty.toLowerCase();
}

function moduleEstimatedTime(mod) {
  return mod.estimatedTime || DEFAULT_ESTIMATED_TIME[mod.difficulty] || "25 min";
}

function buildProgressBar(percent) {
  const clamped = Math.max(0, Math.min(100, percent));
  return `
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width:${clamped}%"></div>
    </div>
  `;
}

function renderRoadmap() {
  const container = document.getElementById("roadmap-list");
  if (!container) return;

  const completedCount = ROADMAP_DATA.filter((s) => isRoadmapComplete(s.id)).length;
  const percent = Math.round((completedCount / ROADMAP_DATA.length) * 100);
  const progressHeader = document.getElementById("roadmap-progress-header");
  if (progressHeader) {
    progressHeader.innerHTML = `
      <p>${completedCount} / ${ROADMAP_DATA.length} stages completed (${percent}%)</p>
      ${buildProgressBar(percent)}
    `;
  }

  container.innerHTML = "";
  ROADMAP_DATA.forEach((stage) => {
    const complete = isRoadmapComplete(stage.id);
    const item = document.createElement("div");
    item.className = "timeline-item" + (complete ? " completed" : "");

    const sourcesHtml = stage.recommendedSources
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.title}</a>`)
      .join(", ");

    const relatedHtml = stage.relatedModules.length
      ? stage.relatedModules
          .map((id) => {
            const mod = MODULES_DATA.find((m) => m.id === id);
            return mod ? mod.title : id;
          })
          .join(", ")
      : "Coming soon";

    item.innerHTML = `
      <div class="timeline-info">
        <strong>${stage.stage}</strong>
        <div>
          <span class="${difficultyBadgeClass(stage.difficulty)}">${stage.difficulty}</span>
          <span class="badge">${stage.estimatedTime}</span>
        </div>
        <ul>
          <li>Related modules: ${relatedHtml}</li>
          <li>Recommended sources: ${sourcesHtml}</li>
        </ul>
      </div>
      <label class="timeline-check">
        <input type="checkbox" data-stage-id="${stage.id}" ${complete ? "checked" : ""} />
        Completed
      </label>
    `;
    container.appendChild(item);
  });

  container.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      toggleRoadmapComplete(e.target.dataset.stageId);
      renderRoadmap();
    });
  });
}

function renderModuleFilterBar() {
  const bar = document.getElementById("module-filter-bar");
  if (!bar) return;
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  bar.innerHTML = levels
    .map(
      (level) =>
        `<button class="filter-chip${level === moduleDifficultyFilter ? " active" : ""}" data-level="${level}">${level}</button>`
    )
    .join("");
  bar.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      moduleDifficultyFilter = chip.dataset.level;
      renderModuleCards();
    });
  });
}

function renderModuleCards() {
  renderModuleFilterBar();

  const container = document.getElementById("modules-grid");
  if (!container) return;

  const visibleModules =
    moduleDifficultyFilter === "All"
      ? MODULES_DATA
      : MODULES_DATA.filter((m) => m.difficulty === moduleDifficultyFilter);

  container.innerHTML = "";
  visibleModules.forEach((mod) => {
    const completed = isModuleCompleted(mod.id);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="badge"><span class="category-icon">${categoryIcon(mod.category)}</span>${mod.category}</span>
      <span class="${difficultyBadgeClass(mod.difficulty)}">${mod.difficulty}</span>
      <span class="badge">⏱ ${moduleEstimatedTime(mod)}</span>
      <h3>${mod.title}</h3>
      <p>${mod.summary}</p>
      <span class="badge ${completed ? "status-complete" : "status-pending"}">
        ${completed ? "Quiz attempted" : "Not started"}
      </span>
      <div class="card-actions">
        <button class="btn secondary" data-action="view" data-module-id="${mod.id}">View module</button>
        <button class="btn" data-action="quiz" data-module-id="${mod.id}">Take quiz</button>
        <button class="btn amber" data-action="flashcards" data-module-id="${mod.id}">Flashcards</button>
      </div>
    `;
    container.appendChild(card);
  });

  if (visibleModules.length === 0) {
    container.innerHTML = "<p>No modules at this difficulty level yet.</p>";
  }

  container.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const moduleId = btn.dataset.moduleId;
      const action = btn.dataset.action;
      if (action === "view") {
        showSection("modules");
        showModuleDetail(moduleId);
      } else if (action === "quiz") {
        showSection("quiz");
        setQuizMode(false, moduleId);
      } else if (action === "flashcards") {
        showSection("flashcards");
        startFlashcardsForCategory(MODULES_DATA.find((m) => m.id === moduleId).category);
      }
    });
  });
}

function buildAskAiPrompt(moduleTitle) {
  return (
    `Explain "${moduleTitle}" to me as a beginner petroleum engineering student. ` +
    `Use simple examples, relevant formulas, and common mistakes to avoid.`
  );
}

function moduleHasCheckpoint(moduleId) {
  return QUIZZES_DATA.some((q) => q.moduleId === moduleId && q.checkpoint);
}

function showModuleDetail(moduleId) {
  const mod = MODULES_DATA.find((m) => m.id === moduleId);
  if (!mod) return;

  const detail = document.getElementById("module-detail");
  if (!detail) return;

  const sourcesHtml = mod.sources
    .map((s) => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.title}</a></li>`)
    .join("");

  const conceptsHtml = mod.keyConcepts.map((c) => `<li>${highlightTerms(c)}</li>`).join("");
  const objectivesHtml = mod.objectives.map((o) => `<li>${highlightTerms(o)}</li>`).join("");
  const mistakesHtml = mod.commonMistakes.map((m) => `<li>${highlightTerms(m)}</li>`).join("");
  const prompt = buildAskAiPrompt(mod.title);
  const chartContainerId = `module-chart-${mod.id}`;
  const hasCheckpoint = moduleHasCheckpoint(mod.id);

  detail.innerHTML = `
    <div class="card module-detail">
      <span class="badge"><span class="category-icon">${categoryIcon(mod.category)}</span>${mod.category}</span>
      <span class="${difficultyBadgeClass(mod.difficulty)}">${mod.difficulty}</span>
      <h3>${mod.title}</h3>
      <p>${highlightTerms(mod.summary)}</p>

      <div class="eli-new-box">
        <span class="callout-title">Explain Like I'm New</span>
        ${highlightTerms(mod.explainLikeNew)}
      </div>

      <h4>Key Concepts</h4>
      <ul>${conceptsHtml}</ul>

      <h4>Learning Objectives</h4>
      <ul>${objectivesHtml}</ul>

      <h4>Simple Explanation</h4>
      <p>${highlightTerms(mod.simpleExplanation)}</p>

      <h4>Technical Explanation</h4>
      <p>${highlightTerms(mod.technicalExplanation)}</p>

      <div class="analogy-box">
        <span class="callout-title">Analogy</span>
        ${highlightTerms(mod.analogy)}
      </div>

      <div class="callout callout--why">
        <span class="callout-title">Why it matters</span>
        ${highlightTerms(mod.whyItMatters)}
      </div>

      <div class="callout callout--mistake">
        <span class="callout-title">Common mistakes</span>
        <ul>${mistakesHtml}</ul>
      </div>

      <div class="memory-trick-box">
        <span class="callout-title">Memory trick</span>
        ${highlightTerms(mod.memoryTrick)}
      </div>

      <div class="callout callout--example">
        <span class="callout-title">Mini example</span>
        ${highlightTerms(mod.miniExample)}
      </div>

      ${mod.charts && mod.charts.length ? `<div id="${chartContainerId}"></div>` : ""}

      <h4>Source Links</h4>
      <ul>${sourcesHtml}</ul>

      <h4>Ask AI Prompt Helper</h4>
      <p>Copy this prompt into your favorite AI assistant for extra explanation:</p>
      <div class="prompt-box" id="prompt-box-${mod.id}">${prompt}</div>

      <div class="card-actions">
        <button class="btn secondary" data-copy-prompt="${mod.id}">Copy prompt</button>
        <button class="btn" data-action="quiz" data-module-id="${mod.id}">Take quiz</button>
        ${hasCheckpoint ? `<button class="btn secondary" data-action="checkpoint" data-module-id="${mod.id}">Beginner checkpoint quiz</button>` : ""}
        <button class="btn amber" data-action="flashcards" data-module-id="${mod.id}">Flashcards</button>
      </div>
    </div>
  `;
  detail.style.display = "block";
  detail.scrollIntoView({ behavior: "smooth" });

  if (mod.charts && mod.charts.length) renderModuleCharts(mod.id, chartContainerId);

  detail.querySelector("[data-copy-prompt]").addEventListener("click", () => {
    navigator.clipboard.writeText(prompt).catch(() => {});
  });
  detail.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "quiz") {
        showSection("quiz");
        setQuizMode(false, mod.id);
      } else if (action === "checkpoint") {
        showSection("quiz");
        setQuizMode(true, mod.id);
      } else if (action === "flashcards") {
        showSection("flashcards");
        startFlashcardsForCategory(mod.category);
      }
    });
  });
}
