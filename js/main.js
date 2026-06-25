// ============================================================
// Athar's Game — UI wiring: screens, input, quiz flow
// ============================================================

(() => {
  const el = (id) => document.getElementById(id);

  const canvas = el("gameCanvas");
  const confettiCanvas = el("confettiCanvas");

  const hud = el("hud");
  const characterVal = el("characterVal");
  const scoreVal = el("scoreVal");
  const bestVal = el("bestVal");
  const reviveVal = el("reviveVal");
  const speedVal = el("speedVal");
  const pauseBtn = el("pauseBtn");
  const muteBtn = el("muteBtn");

  const startScreen = el("startScreen");
  const startHighScore = el("startHighScore");
  const startBtn = el("startBtn");
  const howToPlayBtn = el("howToPlayBtn");
  const howToPlayModal = el("howToPlayModal");
  const closeHowToPlay = el("closeHowToPlay");

  const pauseScreen = el("pauseScreen");
  const resumeBtn = el("resumeBtn");
  const restartFromPauseBtn = el("restartFromPauseBtn");
  const menuFromPauseBtn = el("menuFromPauseBtn");

  const quizModal = el("quizModal");
  const quizCategory = el("quizCategory");
  const quizQuestion = el("quizQuestion");
  const quizOptions = el("quizOptions");
  const quizFeedback = el("quizFeedback");
  const quizContinueBtn = el("quizContinueBtn");

  const gameOverScreen = el("gameOverScreen");
  const gameOverMessage = el("gameOverMessage");
  const finalScore = el("finalScore");
  const finalHighScore = el("finalHighScore");
  const newHighScoreBadge = el("newHighScoreBadge");
  const badgeUnlocked = el("badgeUnlocked");
  const playAgainBtn = el("playAgainBtn");
  const menuFromGameOverBtn = el("menuFromGameOverBtn");

  const leaderboardBtn = el("leaderboardBtn");
  const leaderboardModal = el("leaderboardModal");
  const leaderboardList = el("leaderboardList");
  const closeLeaderboard = el("closeLeaderboard");

  const app = el("app");

  let askedQuestionsThisRun = [];
  let quizAnswered = false;
  let wrongAnswerPending = false;

  const BADGES = [
    { id: "anak-tik", threshold: 10, label: "Anak TIK", emoji: "💻" },
    { id: "calon-kartografer", threshold: 20, label: "Calon Kartografer", emoji: "🌍" },
    { id: "raja-integral", threshold: 35, label: "Raja Integral", emoji: "📐" },
    { id: "anti-deadline", threshold: 50, label: "Anti Deadline", emoji: "⏰" },
  ];

  function getUnlockedBadgeIds() {
    try { return JSON.parse(localStorage.getItem("athar_badges") || "[]"); }
    catch (e) { return []; }
  }

  function checkNewBadges(score) {
    const unlocked = getUnlockedBadgeIds();
    const newly = [];
    BADGES.forEach((b) => {
      if (score >= b.threshold && !unlocked.includes(b.id)) {
        unlocked.push(b.id);
        newly.push(b);
      }
    });
    if (newly.length) localStorage.setItem("athar_badges", JSON.stringify(unlocked));
    return newly;
  }

  function getLeaderboard() {
    try { return JSON.parse(localStorage.getItem("athar_leaderboard") || "[]"); }
    catch (e) { return []; }
  }

  function addToLeaderboard(score) {
    if (score <= 0) return;
    const board = getLeaderboard();
    board.push({ score, date: new Date().toLocaleDateString("id-ID") });
    board.sort((a, b) => b.score - a.score);
    const top5 = board.slice(0, 5);
    localStorage.setItem("athar_leaderboard", JSON.stringify(top5));
  }

  function renderLeaderboard() {
    const board = getLeaderboard();
    leaderboardList.innerHTML = "";
    if (board.length === 0) {
      leaderboardList.innerHTML = '<li class="lb-empty">Belum ada skor. Main dulu, baru sombong.</li>';
      return;
    }
    board.forEach((entry, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="lb-rank">#${i + 1}</span><span class="lb-score">${entry.score} poin</span><span class="lb-date">${entry.date}</span>`;
      leaderboardList.appendChild(li);
    });
  }

  const GAMEOVER_LOSE_MESSAGES = [
    "Yah, skripsinya belum kelar, gamenya juga tamat.",
    "Hassel kecewa. Aye geleng-geleng.",
    "Athar butuh istirahat... dan revisi bab 2.",
    "Deadline menang lagi hari ini.",
  ];

  const REVIVE_MESSAGES = [
    "Mantap, lanjut skripsi—eh lanjut game!",
    "Athar hidup lagi karena kepintaranmu.",
    "Hassel sedikit terkesan. Aye mengangguk pelan.",
  ];

  function showScreen(elm) { elm.classList.remove("hidden"); }
  function hideScreen(elm) { elm.classList.add("hidden"); }

  function updateHUD() {
    characterVal.textContent = Game.getCharacterName();
    scoreVal.textContent = Game.getScore();
    bestVal.textContent = Game.getBest();
    reviveVal.textContent = Game.getRevivesLeft();
    speedVal.textContent = Game.getSpeedLevel();
  }

  function shakeApp() {
    app.classList.remove("shake");
    // restart animation
    void app.offsetWidth;
    app.classList.add("shake");
    setTimeout(() => app.classList.remove("shake"), 420);
  }

  // ---- Game init ----
  Game.init(canvas, confettiCanvas, {
    onJump() { SoundFX.jump(); },
    onScoreChange() { updateHUD(); },
    onDeath() {
      shakeApp();
      updateHUD();
      setTimeout(openQuiz, 300);
    },
  });

  updateStartHighScore();

  function updateStartHighScore() {
    startHighScore.textContent = localStorage.getItem("athar_highscore") || 0;
  }

  let activeMusicTrack = 0;
  function startMusicForNewRun() {
    activeMusicTrack = MusicFX.pickRandomTrack();
    MusicFX.start(activeMusicTrack);
  }
  function resumeMusic() {
    MusicFX.start(activeMusicTrack);
  }

  // ---- Start screen ----
  startBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(startScreen);
    askedQuestionsThisRun = [];
    showScreen(hud);
    Game.start();
    startMusicForNewRun();
    updateHUD();
  });

  howToPlayBtn.addEventListener("click", () => {
    SoundFX.click();
    showScreen(howToPlayModal);
  });
  closeHowToPlay.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(howToPlayModal);
  });

  leaderboardBtn.addEventListener("click", () => {
    SoundFX.click();
    renderLeaderboard();
    showScreen(leaderboardModal);
  });
  closeLeaderboard.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(leaderboardModal);
  });

  // ---- Pause ----
  function openPause() {
    Game.pause();
    MusicFX.stop();
    showScreen(pauseScreen);
  }
  function closePause() {
    hideScreen(pauseScreen);
    Game.resume();
    resumeMusic();
  }

  pauseBtn.addEventListener("click", () => {
    SoundFX.click();
    if (Game.isPlaying()) openPause();
  });
  resumeBtn.addEventListener("click", () => { SoundFX.click(); closePause(); });
  restartFromPauseBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(pauseScreen);
    askedQuestionsThisRun = [];
    Game.restart();
    startMusicForNewRun();
    updateHUD();
  });
  menuFromPauseBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(pauseScreen);
    hideScreen(hud);
    MusicFX.stop();
    Game.goToMenu();
    showScreen(startScreen);
    updateStartHighScore();
  });

  // ---- Mute ----
  muteBtn.addEventListener("click", () => {
    const muted = !SoundFX.isMuted();
    SoundFX.setMuted(muted);
    MusicFX.setMuted(muted);
    muteBtn.textContent = muted ? "🔇" : "🔊";
  });

  // ---- Revive Quiz ----
  function pickQuestion() {
    let pool = QUIZ_BANK.filter((_, i) => !askedQuestionsThisRun.includes(i));
    if (pool.length === 0) {
      askedQuestionsThisRun = [];
      pool = QUIZ_BANK;
    }
    const idx = Math.floor(Math.random() * pool.length);
    const realIndex = QUIZ_BANK.indexOf(pool[idx]);
    askedQuestionsThisRun.push(realIndex);
    return QUIZ_BANK[realIndex];
  }

  function openQuiz() {
    quizAnswered = false;
    wrongAnswerPending = false;
    hideScreen(quizFeedback);
    quizFeedback.classList.remove("feedback-correct", "feedback-wrong");
    hideScreen(quizContinueBtn);

    const q = pickQuestion();
    quizCategory.textContent = q.category;
    quizQuestion.textContent = q.question;
    quizOptions.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(i, q, btn));
      quizOptions.appendChild(btn);
    });

    showScreen(quizModal);
  }

  function handleAnswer(selectedIndex, q, clickedBtn) {
    if (quizAnswered) return;
    quizAnswered = true;

    const buttons = Array.from(quizOptions.children);
    buttons.forEach((b) => (b.disabled = true));

    const correct = selectedIndex === q.answerIndex;

    if (correct) {
      clickedBtn.classList.add("correct");
      SoundFX.correct();
      quizFeedback.classList.add("feedback-correct");
      const msg = REVIVE_MESSAGES[Math.floor(Math.random() * REVIVE_MESSAGES.length)];
      quizFeedback.innerHTML = `${msg}<span class="explain">${q.explanation}</span>`;
      wrongAnswerPending = false;
    } else {
      clickedBtn.classList.add("wrong");
      buttons[q.answerIndex].classList.add("correct");
      SoundFX.wrong();
      quizFeedback.classList.add("feedback-wrong");
      quizFeedback.innerHTML = `Jawaban salah. Yah, wassalam.<span class="explain">${q.explanation}</span>`;
      wrongAnswerPending = true;
    }

    showScreen(quizFeedback);
    showScreen(quizContinueBtn);
  }

  quizContinueBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(quizModal);

    if (wrongAnswerPending || Game.getRevivesLeft() <= 0) {
      finishGameOver(wrongAnswerPending);
    } else {
      SoundFX.revive();
      Game.fireConfetti();
      Game.reviveAthar();
      updateHUD();
    }
  });

  function finishGameOver(causedByWrongAnswer) {
    Game.finalizeGameOver();
    MusicFX.stop();
    hideScreen(hud);

    const score = Game.getScore();
    const best = Game.getBest();
    const isNewHigh = score >= best && score > 0;

    finalScore.textContent = score;
    finalHighScore.textContent = best;

    if (isNewHigh) showScreen(newHighScoreBadge);
    else hideScreen(newHighScoreBadge);

    addToLeaderboard(score);
    // badge memakai jumlah rintangan terlewati (bukan skor) karena skor sekarang acak 10-15/rintangan
    const newBadges = checkNewBadges(Game.getObstaclesPassed());
    if (newBadges.length > 0) {
      badgeUnlocked.innerHTML = newBadges
        .map((b) => `🎉 Badge baru: ${b.emoji} ${b.label}`)
        .join("<br>");
      showScreen(badgeUnlocked);
    } else {
      hideScreen(badgeUnlocked);
    }

    gameOverMessage.textContent = causedByWrongAnswer
      ? GAMEOVER_LOSE_MESSAGES[Math.floor(Math.random() * GAMEOVER_LOSE_MESSAGES.length)]
      : "Revive sudah habis. Sampai jumpa lagi, Athar.";

    SoundFX.gameOver();
    showScreen(gameOverScreen);
  }

  // also handle case revivesLeft hits 0 right when dying (no quiz chance)
  // we still show quiz even on last revive per spec: "jika revive habis, langsung Game Over"
  // -> override openQuiz to skip straight to game over when no revives left
  const originalOpenQuiz = openQuiz;
  openQuiz = function () {
    if (Game.getRevivesLeft() <= 0) {
      finishGameOver(false);
      return;
    }
    originalOpenQuiz();
  };

  playAgainBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(gameOverScreen);
    askedQuestionsThisRun = [];
    showScreen(hud);
    Game.restart();
    startMusicForNewRun();
    updateHUD();
  });

  menuFromGameOverBtn.addEventListener("click", () => {
    SoundFX.click();
    hideScreen(gameOverScreen);
    Game.goToMenu();
    showScreen(startScreen);
    updateStartHighScore();
  });

  // ---- Input handling ----
  function tryJump(e) {
    if (e && e.target && e.target.closest(".modal-overlay, .screen, #hud")) {
      // ignore taps that originate from UI overlays (buttons etc.)
      if (e.target.closest("button")) return;
    }
    if (Game.isPlaying()) {
      Game.jump();
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      if (Game.isPlaying()) {
        Game.jump();
      } else if (Game.isPaused()) {
        // no-op, must use buttons
      }
    }
    if (e.key === "p" || e.key === "P") {
      if (Game.isPlaying()) openPause();
      else if (Game.isPaused()) closePause();
    }
  });

  canvas.addEventListener("mousedown", tryJump);
  canvas.addEventListener("touchstart", (e) => { e.preventDefault(); tryJump(e); }, { passive: false });
})();
