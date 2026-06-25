// career.js
// Renders the Career Prep section: role cards (expandable), the job posting
// breakdown viewer, certifications grid, the audience/path career roadmap,
// "Choose Your Path" data lookups (also used from app.js on the home page),
// and the ranked companies/countries tables.

let careerActiveRoleId = null;
let careerRoadmapAudience = "Fresh graduate";

function findCareerRole(id) {
  return CAREER_ROLES_DATA.find((r) => r.id === id);
}

function renderCareerRoleCards() {
  const container = document.getElementById("career-roles-grid");
  if (!container) return;

  container.innerHTML = CAREER_ROLES_DATA.map((role) => {
    const expanded = role.id === careerActiveRoleId;
    return `
      <div class="card role-card${expanded ? " expanded" : ""}">
        <span class="badge"><span class="category-icon">${categoryIcon(role.category)}</span>${role.category}</span>
        <h3>${role.title}</h3>
        <p>${highlightTerms(role.blurb)}</p>
        <button class="btn secondary" data-role-toggle="${role.id}">${expanded ? "Hide details" : "View role details"}</button>
        ${expanded ? renderCareerRoleDetail(role) : ""}
      </div>
    `;
  }).join("");

  container.querySelectorAll("[data-role-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.roleToggle;
      careerActiveRoleId = careerActiveRoleId === id ? null : id;
      if (careerActiveRoleId) markCareerRoleViewed(id);
      renderCareerRoleCards();
      if (careerActiveRoleId) {
        document.querySelector(`[data-role-toggle="${id}"]`).scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });
}

function renderCareerRoleDetail(role) {
  const relatedModulesHtml = role.relevantTopics
    .map((id) => {
      const mod = MODULES_DATA.find((m) => m.id === id);
      return mod ? `<button class="filter-chip" data-goto-module="${mod.id}">${mod.title}</button>` : "";
    })
    .join("");

  return `
    <div class="role-detail">
      <h4>Daily responsibilities</h4>
      <ul>${role.dailyResponsibilities.map((d) => `<li>${highlightTerms(d)}</li>`).join("")}</ul>

      <h4>Skills needed</h4>
      <ul>${role.skillsNeeded.map((s) => `<li>${highlightTerms(s)}</li>`).join("")}</ul>

      <h4>Common tools / software</h4>
      <p>${role.tools.join(" &middot; ")}</p>

      <h4>Real problems you'd face</h4>
      <ul>${role.realProblems.map((p) => `<li>${highlightTerms(p)}</li>`).join("")}</ul>

      <div class="callout callout--why">
        <span class="callout-title">Who fits this role</span>
        ${highlightTerms(role.personaFit)}
      </div>

      <h4>Career ladder</h4>
      <div class="career-ladder">
        ${role.careerLadder.map((rung, i) => `<span class="career-ladder-step"><span class="step-number">${i + 1}</span>${rung}</span>`).join("")}
      </div>

      ${relatedModulesHtml ? `<h4>Related modules</h4><div class="filter-bar">${relatedModulesHtml}</div>` : ""}
    </div>
  `;
}

function renderJobPostingBreakdown() {
  const container = document.getElementById("career-job-posting");
  if (!container) return;
  const jp = JOB_POSTING_EXAMPLE_DATA;

  container.innerHTML = `
    <div class="card">
      <h3>How to Read an Oil &amp; Gas Job Posting</h3>
      <p class="glossary-meta">${jp.title} -- a fictitious posting used purely to demonstrate how to read one.</p>
      <div class="job-posting-raw">
        ${jp.rawText.map((line) => `<p>${line}</p>`).join("")}
      </div>
      <h4>Annotated breakdown</h4>
      <div class="grid">
        ${jp.breakdown
          .map(
            (b) => `
          <div class="card job-posting-tag">
            <span class="badge">${b.label}</span>
            <p>${b.explanation}</p>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="callout callout--remember">
        <span class="callout-title">Tip</span>
        ${jp.tip}
      </div>
    </div>
  `;
}

function renderCertifications() {
  const container = document.getElementById("career-certifications");
  if (!container) return;

  container.innerHTML = `
    <h3>Certifications the Industry Values</h3>
    <div class="grid">
      ${CERTIFICATIONS_DATA.map(
        (c) => `
        <div class="card">
          <h4>${c.name}</h4>
          <p>${c.what}</p>
          <p class="glossary-meta"><strong>Who needs it:</strong> ${c.whoNeedsIt}</p>
          <p class="glossary-meta"><strong>How to get it:</strong> ${c.howToGet}</p>
        </div>
      `
      ).join("")}
    </div>
  `;
}

function renderCareerRoadmap() {
  const tabsContainer = document.getElementById("career-roadmap-tabs");
  const bodyContainer = document.getElementById("career-roadmap-body");
  if (!tabsContainer || !bodyContainer) return;

  const audiences = Object.keys(CAREER_ROADMAP_DATA);
  tabsContainer.innerHTML = audiences
    .map((a) => `<button class="filter-chip${a === careerRoadmapAudience ? " active" : ""}" data-audience="${a}">${a}</button>`)
    .join("");

  bodyContainer.innerHTML = `
    <div class="card">
      <h4>${careerRoadmapAudience}</h4>
      <ul>${CAREER_ROADMAP_DATA[careerRoadmapAudience].map((step) => `<li>${highlightTerms(step)}</li>`).join("")}</ul>
    </div>
  `;

  tabsContainer.querySelectorAll("[data-audience]").forEach((btn) => {
    btn.addEventListener("click", () => {
      careerRoadmapAudience = btn.dataset.audience;
      renderCareerRoadmap();
    });
  });
}

function renderCareerPathsRow(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = CAREER_PATHS_DATA.map(
    (p) => `
      <button class="path-card" data-path-id="${p.id}">
        <span class="path-card-icon">${categoryIcon(p.moduleCategories[0])}</span>
        <span class="path-card-label">${p.label}</span>
      </button>
    `
  ).join("");

  container.querySelectorAll("[data-path-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const path = CAREER_PATHS_DATA.find((p) => p.id === btn.dataset.pathId);
      if (!path) return;
      showSection("career");
      careerActiveRoleId = path.roles[0];
      renderCareerPrep();
    });
  });
}

function renderCompaniesCountriesTables() {
  const container = document.getElementById("career-industry-data");
  if (!container) return;

  const companyRows = COMPANIES_DATA.map(
    (c) => `<tr><td>${c.rank}</td><td>${c.name}</td><td>${c.country}</td><td>${c.metric}</td><td class="glossary-meta">${c.note}</td></tr>`
  ).join("");
  const countryRows = COUNTRIES_DATA.map(
    (c) => `<tr><td>${c.rank}</td><td>${c.name}</td><td>${c.metric}</td><td class="glossary-meta">${c.note}</td></tr>`
  ).join("");

  container.innerHTML = `
    <h3>Industry at a Glance</h3>
    <p class="glossary-meta">
      Illustrative, point-in-time rankings -- not a live feed. Figures shift year to year; check
      <a href="https://www.eia.gov/" target="_blank" rel="noopener">EIA</a> or
      <a href="https://www.opec.org/" target="_blank" rel="noopener">OPEC</a> for current numbers.
    </p>
    <h4>Top companies (by revenue / production)</h4>
    <table class="formula-table">
      <thead><tr><th>#</th><th>Company</th><th>Country</th><th>Ranked by</th><th>Note</th></tr></thead>
      <tbody>${companyRows}</tbody>
    </table>
    <h4>Top countries (by production / reserves)</h4>
    <table class="formula-table">
      <thead><tr><th>#</th><th>Country</th><th>Ranked by</th><th>Note</th></tr></thead>
      <tbody>${countryRows}</tbody>
    </table>
  `;
}

function renderIndonesiaRegulation() {
  const container = document.getElementById("career-indonesia-regulation");
  if (!container) return;
  const d = INDONESIA_REGULATION_DATA;

  container.innerHTML = `
    <h3>Indonesia Oil &amp; Gas Industry Structure</h3>
    <div class="card">
      <p>${highlightTerms(d.intro)}</p>
      <h4>Who does what</h4>
      <ul>${d.structure.map((s) => `<li><strong>${s.label}:</strong> ${highlightTerms(s.detail)}</li>`).join("")}</ul>
      <h4>Contract models</h4>
      <div class="grid">
        ${d.contractModels.map((c) => `<div class="card"><h4>${c.name}</h4><p>${highlightTerms(c.detail)}</p></div>`).join("")}
      </div>
      <div class="callout callout--why">
        <span class="callout-title">Why it matters for interviews</span>
        ${highlightTerms(d.whyItMatters)}
      </div>
    </div>
  `;
}

function renderCareerPrep() {
  renderCareerRoleCards();
  renderJobPostingBreakdown();
  renderCertifications();
  renderCareerRoadmap();
  renderCompaniesCountriesTables();
  renderIndonesiaRegulation();

  document.querySelectorAll("[data-goto-module]").forEach((btn) => {
    btn.addEventListener("click", () => {
      showSection("modules");
      showModuleDetail(btn.dataset.gotoModule);
    });
  });
}

function getCareerPrepProgress() {
  // Simple heuristic: fraction of roles viewed at least once, persisted via progress.js
  const progress = loadProgress();
  const viewed = progress.careerRolesViewed || [];
  return CAREER_ROLES_DATA.length ? Math.round((viewed.length / CAREER_ROLES_DATA.length) * 100) : 0;
}
