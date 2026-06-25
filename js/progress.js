// progress.js
// Thin wrapper around localStorage for everything PetroLearn AI needs to
// remember between visits: completed roadmap stages, known/review
// flashcards, quiz scores, and the preferred theme.

const STORAGE_KEY = "petrolearn_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultProgress(), parsed);
  } catch (err) {
    return defaultProgress();
  }
}

function defaultProgress() {
  return {
    theme: "light",
    completedRoadmap: [],
    knownFlashcards: [],
    reviewFlashcards: [],
    quizScores: [], // { moduleId, score, total, date }
    interviewBookmarks: [],
    interviewAnswered: [],
    hseChecklist: [], // indices into HSE_CHECKLIST_DATA
    careerRolesViewed: [], // role ids from CAREER_ROLES_DATA
    clickSoundEnabled: false,
    ambientMusicEnabled: false,
    navHidden: false,
  };
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function toggleRoadmapComplete(stageId) {
  const progress = loadProgress();
  const idx = progress.completedRoadmap.indexOf(stageId);
  if (idx === -1) {
    progress.completedRoadmap.push(stageId);
  } else {
    progress.completedRoadmap.splice(idx, 1);
  }
  saveProgress(progress);
  return progress;
}

function isRoadmapComplete(stageId) {
  return loadProgress().completedRoadmap.includes(stageId);
}

function setTheme(theme) {
  const progress = loadProgress();
  progress.theme = theme;
  saveProgress(progress);
}

function markFlashcard(cardId, status) {
  // status: "known" | "review"
  const progress = loadProgress();
  progress.knownFlashcards = progress.knownFlashcards.filter((id) => id !== cardId);
  progress.reviewFlashcards = progress.reviewFlashcards.filter((id) => id !== cardId);
  if (status === "known") progress.knownFlashcards.push(cardId);
  if (status === "review") progress.reviewFlashcards.push(cardId);
  saveProgress(progress);
  return progress;
}

function recordQuizScore(moduleId, score, total) {
  const progress = loadProgress();
  progress.quizScores.push({
    moduleId,
    score,
    total,
    date: new Date().toISOString(),
  });
  saveProgress(progress);
  return progress;
}

function isModuleCompleted(moduleId) {
  const progress = loadProgress();
  return progress.quizScores.some((entry) => entry.moduleId === moduleId);
}

function toggleInterviewBookmark(questionId) {
  const progress = loadProgress();
  const idx = progress.interviewBookmarks.indexOf(questionId);
  if (idx === -1) progress.interviewBookmarks.push(questionId);
  else progress.interviewBookmarks.splice(idx, 1);
  saveProgress(progress);
  return progress;
}

function markInterviewAnswered(questionId) {
  const progress = loadProgress();
  if (!progress.interviewAnswered.includes(questionId)) {
    progress.interviewAnswered.push(questionId);
    saveProgress(progress);
  }
  return progress;
}

function getInterviewReadinessScore() {
  const progress = loadProgress();
  const total = INTERVIEW_QUESTIONS_DATA.length;
  return total ? Math.round((progress.interviewAnswered.length / total) * 100) : 0;
}

function toggleHseChecklistItem(index) {
  const progress = loadProgress();
  const idx = progress.hseChecklist.indexOf(index);
  if (idx === -1) progress.hseChecklist.push(index);
  else progress.hseChecklist.splice(idx, 1);
  saveProgress(progress);
  return progress;
}

function markCareerRoleViewed(roleId) {
  const progress = loadProgress();
  if (!progress.careerRolesViewed.includes(roleId)) {
    progress.careerRolesViewed.push(roleId);
    saveProgress(progress);
  }
  return progress;
}

function setClickSoundEnabled(enabled) {
  const progress = loadProgress();
  progress.clickSoundEnabled = enabled;
  saveProgress(progress);
}

function setAmbientMusicEnabled(enabled) {
  const progress = loadProgress();
  progress.ambientMusicEnabled = enabled;
  saveProgress(progress);
}

function setNavHidden(hidden) {
  const progress = loadProgress();
  progress.navHidden = hidden;
  saveProgress(progress);
}
