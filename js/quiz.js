// quiz.js
// Multiple-choice quiz engine. Picks questions for a chosen module, walks
// through them one at a time, then shows a score summary with a review of
// any wrong answers.

let quizState = {
  moduleId: null,
  questions: [],
  currentIndex: 0,
  answers: [], // { question, selectedIndex, correct }
};

let quizCheckpointMode = false;
let quizExamMode = false;
const MIXED_EXAM_QUESTION_COUNT = 20;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Mixed Exam: a simulated test pulling random full-quiz questions (no
// checkpoint questions) across every module, for practicing under
// "real test" conditions rather than one module at a time.
function startMixedExam() {
  quizExamMode = true;
  document.querySelectorAll(".quiz-mode-toggle").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === "exam");
  });
  const select = document.getElementById("quiz-module-select");
  if (select) select.style.display = "none";

  const pool = QUIZZES_DATA.filter((q) => !q.checkpoint);
  const questions = shuffleArray(pool).slice(0, MIXED_EXAM_QUESTION_COUNT);
  quizState = { moduleId: "mixed-exam", questions, currentIndex: 0, answers: [] };
  renderQuizQuestion();
}

function getQuizModuleIds(checkpointOnly) {
  const wanted = Boolean(checkpointOnly);
  const ids = new Set(
    QUIZZES_DATA.filter((q) => Boolean(q.checkpoint) === wanted).map((q) => q.moduleId)
  );
  return MODULES_DATA.filter((m) => ids.has(m.id));
}

function populateQuizModuleSelect() {
  const select = document.getElementById("quiz-module-select");
  if (!select) return;
  select.innerHTML = getQuizModuleIds(quizCheckpointMode)
    .map((m) => `<option value="${m.id}">${m.title}</option>`)
    .join("");
  select.addEventListener("change", (e) => startQuizForModule(e.target.value, quizCheckpointMode));
}

function setQuizMode(checkpointOnly, moduleId) {
  quizExamMode = false;
  quizCheckpointMode = Boolean(checkpointOnly);
  document.querySelectorAll(".quiz-mode-toggle").forEach((btn) => {
    btn.classList.toggle("active", (btn.dataset.mode === "checkpoint") === quizCheckpointMode && btn.dataset.mode !== "exam");
  });
  const select = document.getElementById("quiz-module-select");
  if (select) select.style.display = "";
  populateQuizModuleSelect();
  const target = moduleId || (getQuizModuleIds(quizCheckpointMode)[0] || {}).id;
  if (target) startQuizForModule(target, quizCheckpointMode);
}

function startQuizForModule(moduleId, checkpointOnly) {
  quizExamMode = false;
  const isCheckpoint = checkpointOnly === undefined ? quizCheckpointMode : Boolean(checkpointOnly);
  quizCheckpointMode = isCheckpoint;

  const select = document.getElementById("quiz-module-select");
  if (select) select.value = moduleId;

  const questions = QUIZZES_DATA.filter(
    (q) => q.moduleId === moduleId && Boolean(q.checkpoint) === isCheckpoint
  );
  quizState = { moduleId, questions, currentIndex: 0, answers: [] };
  renderQuizQuestion();
}

function initQuizModeToggle() {
  document.querySelectorAll(".quiz-mode-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mode === "exam") startMixedExam();
      else setQuizMode(btn.dataset.mode === "checkpoint");
    });
  });
}

function renderQuizQuestion() {
  const container = document.getElementById("quiz-body");
  if (!container) return;

  if (quizState.questions.length === 0) {
    container.innerHTML = "<p>No quiz questions available for this module yet.</p>";
    return;
  }

  if (quizState.currentIndex >= quizState.questions.length) {
    renderQuizResults();
    return;
  }

  const q = quizState.questions[quizState.currentIndex];
  container.innerHTML = `
    <p>Question ${quizState.currentIndex + 1} of ${quizState.questions.length}
      &middot; <span class="badge">${q.difficulty}</span>
    </p>
    <p class="quiz-question">${q.question}</p>
    <div class="quiz-options">
      ${q.options
        .map((opt, i) => `<button class="quiz-option" data-index="${i}">${opt}</button>`)
        .join("")}
    </div>
    <div id="quiz-feedback"></div>
  `;

  container.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => selectQuizAnswer(Number(btn.dataset.index)));
  });
}

function selectQuizAnswer(selectedIndex) {
  const q = quizState.questions[quizState.currentIndex];
  const correct = selectedIndex === q.correctIndex;

  quizState.answers.push({ question: q, selectedIndex, correct });

  document.querySelectorAll(".quiz-option").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correctIndex) btn.classList.add("correct");
    if (i === selectedIndex && !correct) btn.classList.add("incorrect");
  });

  const feedback = document.getElementById("quiz-feedback");
  feedback.innerHTML = `
    <div class="quiz-explanation">${correct ? "Correct! " : "Not quite. "}${q.explanation}</div>
    <button class="btn" id="quiz-next-btn">
      ${quizState.currentIndex + 1 < quizState.questions.length ? "Next question" : "See results"}
    </button>
  `;
  document.getElementById("quiz-next-btn").addEventListener("click", () => {
    quizState.currentIndex += 1;
    renderQuizQuestion();
  });
}

function renderCategoryBreakdown() {
  const byModule = {};
  quizState.answers.forEach((a) => {
    const id = a.question.moduleId;
    if (!byModule[id]) byModule[id] = { correct: 0, total: 0 };
    byModule[id].total += 1;
    if (a.correct) byModule[id].correct += 1;
  });

  const rows = Object.keys(byModule)
    .map((id) => {
      const mod = MODULES_DATA.find((m) => m.id === id);
      const stats = byModule[id];
      return `<tr><td>${mod ? mod.title : id}</td><td>${stats.correct} / ${stats.total}</td></tr>`;
    })
    .join("");

  return `
    <h4>Score breakdown by module</h4>
    <table class="formula-table">
      <thead><tr><th>Module</th><th>Correct</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderQuizResults() {
  const container = document.getElementById("quiz-body");
  const score = quizState.answers.filter((a) => a.correct).length;
  const total = quizState.answers.length;

  recordQuizScore(quizState.moduleId, score, total);
  renderModuleCards();

  const wrongAnswers = quizState.answers.filter((a) => !a.correct);
  const reviewHtml = wrongAnswers.length
    ? wrongAnswers
        .map(
          (a) => `
        <div class="quiz-review-item">
          <strong>${a.question.question}</strong><br/>
          Your answer: ${a.question.options[a.selectedIndex]}<br/>
          Correct answer: ${a.question.options[a.question.correctIndex]}<br/>
          ${a.question.explanation}
        </div>
      `
        )
        .join("")
    : "<p>No wrong answers - nice work.</p>";

  container.innerHTML = `
    <p class="quiz-score">Score: ${score} / ${total}</p>
    ${quizExamMode ? renderCategoryBreakdown() : ""}
    <h4>Review wrong answers</h4>
    ${reviewHtml}
    <button class="btn secondary" id="quiz-retry-btn">${quizExamMode ? "Retry Mixed Exam" : "Retry this module"}</button>
  `;
  document.getElementById("quiz-retry-btn").addEventListener("click", () => {
    if (quizExamMode) startMixedExam();
    else startQuizForModule(quizState.moduleId);
  });
}
