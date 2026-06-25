// flashcards.js
// Flip-card study tool built from glossary terms. Supports category
// filtering, next/previous navigation, and marking cards known / for review.

let flashcardState = {
  category: "all",
  cards: [],
  index: 0,
  flipped: false,
};

function getFlashcardCategories() {
  const categories = new Set(FLASHCARDS_DATA.map((c) => c.category));
  return ["all", ...categories];
}

function populateFlashcardCategorySelect() {
  const select = document.getElementById("flashcard-category-select");
  if (!select) return;
  select.innerHTML = getFlashcardCategories()
    .map((c) => `<option value="${c}">${c === "all" ? "All categories" : c}</option>`)
    .join("");
  select.addEventListener("change", (e) => startFlashcardsForCategory(e.target.value));
}

function startFlashcardsForCategory(category) {
  const select = document.getElementById("flashcard-category-select");
  if (select) select.value = category;

  const cards =
    category === "all" ? FLASHCARDS_DATA : FLASHCARDS_DATA.filter((c) => c.category === category);

  flashcardState = { category, cards, index: 0, flipped: false };
  renderFlashcard();
}

function renderFlashcard() {
  const wrap = document.getElementById("flashcard-display");
  const statusEl = document.getElementById("flashcard-status");
  if (!wrap) return;

  if (flashcardState.cards.length === 0) {
    wrap.innerHTML = "<p>No flashcards in this category.</p>";
    return;
  }

  const card = flashcardState.cards[flashcardState.index];
  const progress = loadProgress();
  const known = progress.knownFlashcards.includes(card.id);
  const review = progress.reviewFlashcards.includes(card.id);

  wrap.innerHTML = `
    <div class="flashcard" id="flashcard-face">
      ${
        flashcardState.flipped
          ? `${card.back}<span class="hint">${card.technicalHint}</span>`
          : `<strong>${card.front}</strong>`
      }
    </div>
    <div class="flashcard-controls">
      <button class="btn secondary" id="fc-prev">Previous</button>
      <button class="btn secondary" id="fc-flip">Flip</button>
      <button class="btn secondary" id="fc-next">Next</button>
      <button class="btn" id="fc-known">Mark as known</button>
      <button class="btn amber" id="fc-review">Mark for review</button>
    </div>
  `;

  if (statusEl) {
    statusEl.textContent =
      `Card ${flashcardState.index + 1} of ${flashcardState.cards.length}` +
      (known ? " - Known" : review ? " - Marked for review" : "");
  }

  document.getElementById("flashcard-face").addEventListener("click", flipFlashcard);
  document.getElementById("fc-flip").addEventListener("click", flipFlashcard);
  document.getElementById("fc-prev").addEventListener("click", () => moveFlashcard(-1));
  document.getElementById("fc-next").addEventListener("click", () => moveFlashcard(1));
  document.getElementById("fc-known").addEventListener("click", () => {
    markFlashcard(card.id, "known");
    renderFlashcard();
  });
  document.getElementById("fc-review").addEventListener("click", () => {
    markFlashcard(card.id, "review");
    renderFlashcard();
  });
}

function flipFlashcard() {
  flashcardState.flipped = !flashcardState.flipped;
  renderFlashcard();
}

function moveFlashcard(direction) {
  const total = flashcardState.cards.length;
  flashcardState.index = (flashcardState.index + direction + total) % total;
  flashcardState.flipped = false;
  renderFlashcard();
}
