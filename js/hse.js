// hse.js
// Renders the dedicated HSE page: the HSE module's explanation content
// (reusing the same module fields as showModuleDetail), the risk matrix
// chart, an accordion of "What would you do?" case studies, and a
// pre-site checklist persisted to localStorage.

let hseRevealedCase = null;

function renderHseModuleContent() {
  const container = document.getElementById("hse-module-content");
  if (!container) return;
  const mod = MODULES_DATA.find((m) => m.id === "hse-oil-gas");
  if (!mod) return;

  const mistakesHtml = mod.commonMistakes.map((m) => `<li>${highlightTerms(m)}</li>`).join("");
  const hasCheckpoint = moduleHasCheckpoint(mod.id);

  container.innerHTML = `
    <div class="card module-detail">
      <span class="badge"><span class="category-icon">${categoryIcon(mod.category)}</span>${mod.category}</span>
      <span class="${difficultyBadgeClass(mod.difficulty)}">${mod.difficulty}</span>
      <h3>${mod.title}</h3>
      <p>${highlightTerms(mod.summary)}</p>

      <div class="eli-new-box">
        <span class="callout-title">Explain Like I'm New</span>
        ${highlightTerms(mod.explainLikeNew)}
      </div>

      <h4>Simple Explanation</h4>
      <p>${highlightTerms(mod.simpleExplanation)}</p>

      <div class="analogy-box">
        <span class="callout-title">Analogy</span>
        ${highlightTerms(mod.analogy)}
      </div>

      <div class="callout callout--mistake">
        <span class="callout-title">Common mistakes</span>
        <ul>${mistakesHtml}</ul>
      </div>

      <div class="memory-trick-box">
        <span class="callout-title">Memory trick</span>
        ${highlightTerms(mod.memoryTrick)}
      </div>

      <div class="card-actions">
        <button class="btn" data-action="quiz">Take the HSE mini quiz</button>
        ${hasCheckpoint ? `<button class="btn secondary" data-action="checkpoint">Beginner checkpoint quiz</button>` : ""}
        <button class="btn amber" data-action="flashcards">HSE flashcards</button>
      </div>
    </div>
    <div id="hse-chart"></div>
  `;

  renderModuleCharts("hse-oil-gas", "hse-chart");

  container.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (action === "quiz") { showSection("quiz"); setQuizMode(false, "hse-oil-gas"); }
      else if (action === "checkpoint") { showSection("quiz"); setQuizMode(true, "hse-oil-gas"); }
      else if (action === "flashcards") { showSection("flashcards"); startFlashcardsForCategory("HSE"); }
    });
  });
}

function renderHseCaseStudies() {
  const container = document.getElementById("hse-case-studies");
  if (!container) return;

  container.innerHTML = `
    <h3>Case Study: "What Would You Do?"</h3>
    <p class="section-subtitle">Click a scenario to reveal what the right response looks like in practice.</p>
    ${HSE_CASE_STUDIES_DATA
      .map(
        (c) => `
        <div class="card hse-case-card">
          <p>${highlightTerms(c.scenario)}</p>
          <button class="btn secondary" data-case-toggle="${c.id}">${hseRevealedCase === c.id ? "Hide answer" : c.question}</button>
          ${
            hseRevealedCase === c.id
              ? `<div class="callout callout--why"><span class="callout-title">What to do</span>${highlightTerms(c.answer)}</div>`
              : ""
          }
        </div>
      `
      )
      .join("")}
  `;

  container.querySelectorAll("[data-case-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.caseToggle;
      hseRevealedCase = hseRevealedCase === id ? null : id;
      renderHseCaseStudies();
    });
  });
}

function renderHseChecklist() {
  const container = document.getElementById("hse-checklist");
  if (!container) return;
  const progress = loadProgress();
  const checkedCount = HSE_CHECKLIST_DATA.filter((_, i) => progress.hseChecklist.includes(i)).length;
  const percent = Math.round((checkedCount / HSE_CHECKLIST_DATA.length) * 100);

  container.innerHTML = `
    <h3>Checklist Before Going to Site</h3>
    <p>${checkedCount} / ${HSE_CHECKLIST_DATA.length} confirmed</p>
    ${buildProgressBar(percent)}
    <div class="card">
      <ul class="hse-checklist-list">
        ${HSE_CHECKLIST_DATA.map(
          (item, i) => `
          <li>
            <label>
              <input type="checkbox" data-checklist-index="${i}" ${progress.hseChecklist.includes(i) ? "checked" : ""} />
              ${highlightTerms(item)}
            </label>
          </li>
        `
        ).join("")}
      </ul>
    </div>
  `;

  container.querySelectorAll("[data-checklist-index]").forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      toggleHseChecklistItem(Number(e.target.dataset.checklistIndex));
      renderHseChecklist();
    });
  });
}

function renderHsePage() {
  renderHseModuleContent();
  renderHseCaseStudies();
  renderHseChecklist();
}
