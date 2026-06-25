// glossary.js
// Renders the searchable glossary list. Filters client-side as the user
// types -- no backend, no build step.

function renderGlossary(filterText) {
  const container = document.getElementById("glossary-list");
  if (!container) return;

  const term = (filterText || "").trim().toLowerCase();
  const filtered = GLOSSARY_DATA.filter((entry) => {
    if (!term) return true;
    return (
      entry.term.toLowerCase().includes(term) ||
      entry.simpleDefinition.toLowerCase().includes(term) ||
      entry.category.toLowerCase().includes(term)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p>No glossary terms match "${filterText}".</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (entry) => `
      <div class="card">
        <p class="glossary-term">${entry.term}</p>
        <span class="badge">${entry.category}</span>
        <p>${entry.simpleDefinition}</p>
        <p class="glossary-meta"><strong>Technical:</strong> ${entry.technicalDefinition}</p>
        <p class="glossary-meta">
          Source:
          <a href="${entry.source.url}" target="_blank" rel="noopener">${entry.source.title}</a>
        </p>
        <p class="glossary-meta">Related terms: ${entry.relatedTerms.join(", ")}</p>
      </div>
    `
    )
    .join("");
}

function initGlossarySearch() {
  const input = document.getElementById("glossary-search");
  if (!input) return;
  input.addEventListener("input", (e) => renderGlossary(e.target.value));
}
