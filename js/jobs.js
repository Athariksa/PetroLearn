// jobs.js
// Renders the Job Board: live link cards to recruitment portals, job
// search engines, and company career pages, filterable by category.
// Link cards only, same "no scraping" philosophy as the News page --
// always open the link to see what's currently live.

let jobLinkCategoryFilter = "All";

function renderJobLinkFilterBar() {
  const bar = document.getElementById("jobs-filter-bar");
  if (!bar) return;
  const categories = ["All", ...JOB_LINK_CATEGORIES];
  bar.innerHTML = categories
    .map((c) => `<button class="filter-chip${c === jobLinkCategoryFilter ? " active" : ""}" data-job-category="${c}">${c}</button>`)
    .join("");
  bar.querySelectorAll("[data-job-category]").forEach((chip) => {
    chip.addEventListener("click", () => {
      jobLinkCategoryFilter = chip.dataset.jobCategory;
      renderJobLinks();
    });
  });
}

function renderJobLinks() {
  renderJobLinkFilterBar();
  const container = document.getElementById("jobs-list");
  if (!container) return;

  const filtered =
    jobLinkCategoryFilter === "All" ? JOB_LINKS_DATA : JOB_LINKS_DATA.filter((j) => j.category === jobLinkCategoryFilter);
  const categories = [...new Set(filtered.map((j) => j.category))];

  container.innerHTML = categories
    .map((category) => {
      const cards = filtered
        .filter((j) => j.category === category)
        .map(
          (j) => `
        <div class="card">
          <p><a href="${j.url}" target="_blank" rel="noopener"><strong>${j.title}</strong></a></p>
          <p class="glossary-meta">${j.description}</p>
          <p class="news-last-checked">Live search/portal -- open the link to see current openings.</p>
        </div>
      `
        )
        .join("");
      return `<h3>${category}</h3><div class="grid">${cards}</div>`;
    })
    .join("");
}
