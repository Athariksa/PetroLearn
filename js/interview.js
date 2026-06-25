// interview.js
// Renders the Interview Bank: category/difficulty/bookmark filters, a
// Browse mode (expand/collapse cards) and an Interview Mode (one question
// at a time with a Show Answer reveal, Next/Previous, and a progress
// indicator). Bookmarks and "answered" state persist via js/progress.js.

let interviewFilters = { category: "All", difficulty: "All", bookmarkedOnly: false };
let interviewViewMode = "browse"; // "browse" | "session"
let interviewSessionIndex = 0;
let interviewAnswerRevealed = {}; // questionId -> bool, browse-mode reveal state

function getFilteredInterviewQuestions() {
  const progress = loadProgress();
  return INTERVIEW_QUESTIONS_DATA.filter((q) => {
    const catOk = interviewFilters.category === "All" || q.category === interviewFilters.category;
    const diffOk = interviewFilters.difficulty === "All" || q.difficulty === interviewFilters.difficulty;
    const bookmarkOk = !interviewFilters.bookmarkedOnly || progress.interviewBookmarks.includes(q.id);
    return catOk && diffOk && bookmarkOk;
  });
}

function renderInterviewFilterBar() {
  const catBar = document.getElementById("interview-category-filter");
  const diffBar = document.getElementById("interview-difficulty-filter");
  if (!catBar || !diffBar) return;

  const categories = ["All", ...INTERVIEW_CATEGORIES];
  catBar.innerHTML = categories
    .map((c) => `<button class="filter-chip${c === interviewFilters.category ? " active" : ""}" data-category="${c}">${c}</button>`)
    .join("");

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
  diffBar.innerHTML =
    difficulties
      .map((d) => `<button class="filter-chip${d === interviewFilters.difficulty ? " active" : ""}" data-difficulty="${d}">${d}</button>`)
      .join("") +
    `<button class="filter-chip${interviewFilters.bookmarkedOnly ? " active" : ""}" data-bookmarked-only="1">★ Bookmarked only</button>`;

  catBar.querySelectorAll("[data-category]").forEach((btn) => {
    btn.addEventListener("click", () => {
      interviewFilters.category = btn.dataset.category;
      interviewSessionIndex = 0;
      renderInterviewBank();
    });
  });
  diffBar.querySelectorAll("[data-difficulty]").forEach((btn) => {
    btn.addEventListener("click", () => {
      interviewFilters.difficulty = btn.dataset.difficulty;
      interviewSessionIndex = 0;
      renderInterviewBank();
    });
  });
  diffBar.querySelectorAll("[data-bookmarked-only]").forEach((btn) => {
    btn.addEventListener("click", () => {
      interviewFilters.bookmarkedOnly = !interviewFilters.bookmarkedOnly;
      interviewSessionIndex = 0;
      renderInterviewBank();
    });
  });
}

function renderInterviewModeToggle() {
  const bar = document.getElementById("interview-mode-toggle");
  if (!bar) return;
  bar.innerHTML = `
    <button class="quiz-mode-toggle${interviewViewMode === "browse" ? " active" : ""}" data-view="browse">Browse</button>
    <button class="quiz-mode-toggle${interviewViewMode === "session" ? " active" : ""}" data-view="session">Interview Mode</button>
  `;
  bar.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      interviewViewMode = btn.dataset.view;
      interviewSessionIndex = 0;
      renderInterviewBank();
    });
  });
}

function interviewQuestionCardHtml(q, revealed) {
  const progress = loadProgress();
  const bookmarked = progress.interviewBookmarks.includes(q.id);
  const answered = progress.interviewAnswered.includes(q.id);
  return `
    <div class="card interview-card">
      <div class="interview-card-header">
        <span class="badge">${q.category}</span>
        <span class="${difficultyBadgeClass(q.difficulty)}">${q.difficulty}</span>
        ${answered ? `<span class="badge status-complete">Answered</span>` : ""}
        <button class="bookmark-btn${bookmarked ? " active" : ""}" data-bookmark-id="${q.id}" title="Bookmark this question">${bookmarked ? "★" : "☆"}</button>
      </div>
      <p class="quiz-question interview-question">${q.question}</p>
      ${
        revealed
          ? `
        <div class="interview-answer">
          <h4>Ideal answer</h4>
          <p>${highlightTerms(q.idealAnswer)}</p>
          <h4>How to think about it</h4>
          <p>${highlightTerms(q.thinkingApproach)}</p>
          <h4>Common mistakes</h4>
          <ul>${q.commonMistakes.map((m) => `<li>${highlightTerms(m)}</li>`).join("")}</ul>
        </div>
        <button class="btn secondary" data-hide-answer="${q.id}">Hide answer</button>
      `
          : `<button class="btn" data-show-answer="${q.id}">Show answer</button>`
      }
    </div>
  `;
}

function renderInterviewBrowse() {
  const container = document.getElementById("interview-body");
  if (!container) return;
  const questions = getFilteredInterviewQuestions();

  if (questions.length === 0) {
    container.innerHTML = `<p>No interview questions match these filters yet.</p>`;
    return;
  }

  container.innerHTML = questions.map((q) => interviewQuestionCardHtml(q, Boolean(interviewAnswerRevealed[q.id]))).join("");
  wireInterviewCardEvents(container, () => renderInterviewBrowse());
}

function renderInterviewSession() {
  const container = document.getElementById("interview-body");
  if (!container) return;
  const questions = getFilteredInterviewQuestions();

  if (questions.length === 0) {
    container.innerHTML = `<p>No interview questions match these filters yet.</p>`;
    return;
  }

  if (interviewSessionIndex >= questions.length) interviewSessionIndex = 0;
  const q = questions[interviewSessionIndex];
  const progress = loadProgress();
  const answeredCount = questions.filter((qq) => progress.interviewAnswered.includes(qq.id)).length;

  container.innerHTML = `
    <p>Question ${interviewSessionIndex + 1} of ${questions.length} &middot; ${answeredCount} / ${questions.length} answered in this filter</p>
    ${buildProgressBar(Math.round((answeredCount / questions.length) * 100))}
    ${interviewQuestionCardHtml(q, Boolean(interviewAnswerRevealed[q.id]))}
    <div class="card-actions">
      <button class="btn secondary" id="interview-prev-btn" ${interviewSessionIndex === 0 ? "disabled" : ""}>Previous</button>
      <button class="btn" id="interview-next-btn" ${interviewSessionIndex >= questions.length - 1 ? "disabled" : ""}>Next</button>
    </div>
  `;

  wireInterviewCardEvents(container, () => renderInterviewSession());

  const prevBtn = document.getElementById("interview-prev-btn");
  const nextBtn = document.getElementById("interview-next-btn");
  if (prevBtn) prevBtn.addEventListener("click", () => { interviewSessionIndex -= 1; renderInterviewSession(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { interviewSessionIndex += 1; renderInterviewSession(); });
}

function wireInterviewCardEvents(container, rerender) {
  container.querySelectorAll("[data-show-answer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.showAnswer;
      interviewAnswerRevealed[id] = true;
      markInterviewAnswered(id);
      rerender();
    });
  });
  container.querySelectorAll("[data-hide-answer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      interviewAnswerRevealed[btn.dataset.hideAnswer] = false;
      rerender();
    });
  });
  container.querySelectorAll("[data-bookmark-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleInterviewBookmark(btn.dataset.bookmarkId);
      rerender();
    });
  });
}

function renderInterviewBank() {
  renderInterviewModeToggle();
  renderInterviewFilterBar();
  if (interviewViewMode === "session") {
    renderInterviewSession();
  } else {
    renderInterviewBrowse();
  }
}
