// terms.js
// Wraps known glossary terms inside a chunk of plain text with a styled
// <span class="term"> chip that shows the simple definition as a tooltip
// (title attribute). Used across module detail text so key technical terms
// stand out visually, per the "Key Term Highlighting" upgrade requirement.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightTerms(text) {
  if (!text) return "";
  const escaped = escapeHtml(text);

  const sortedTerms = GLOSSARY_DATA.slice().sort((a, b) => b.term.length - a.term.length);
  const pattern = sortedTerms
    .map((entry) => entry.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!pattern) return escaped;

  const re = new RegExp("\\b(" + pattern + ")\\b", "gi");
  return escaped.replace(re, (match) => {
    const entry = GLOSSARY_DATA.find((e) => e.term.toLowerCase() === match.toLowerCase());
    if (!entry) return match;
    const safeDef = escapeHtml(entry.simpleDefinition);
    return `<span class="term" title="${safeDef}">${match}</span>`;
  });
}
