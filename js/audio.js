// audio.js
// Calming ambient background music, synthesized at runtime with the Web
// Audio API -- no audio file is bundled, so there's nothing to license
// and the offline "just open index.html" promise still holds.
//
// It's an "alpha wave" drone: two detuned low sine oscillators (a ~10 Hz
// binaural beat, the alpha brainwave range) under a slow breathing volume
// LFO, kept very quiet so it's meant to sit under study sessions rather
// than be noticed. Off by default, toggled with the single #music-toggle
// button, and the on/off choice is persisted via progress.js.

let audioCtx = null;
let ambientNodes = null;

function getAudioContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function isAmbientMusicEnabled() {
  return Boolean(loadProgress().ambientMusicEnabled);
}

// Builds (but does not start) the ambient drone graph: left/right detuned
// oscillators through a gentle lowpass filter, with a slow LFO breathing
// the master volume up and down so it never feels static or alarm-like.
function buildAmbientGraph() {
  const ctx = getAudioContext();
  const masterGain = ctx.createGain();
  masterGain.gain.value = 0;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 600;

  const panLeft = ctx.createStereoPanner();
  panLeft.pan.value = -1;
  const panRight = ctx.createStereoPanner();
  panRight.pan.value = 1;

  const oscLeft = ctx.createOscillator();
  oscLeft.type = "sine";
  oscLeft.frequency.value = 220;
  const oscRight = ctx.createOscillator();
  oscRight.type = "sine";
  oscRight.frequency.value = 230; // 10 Hz difference -> alpha-range binaural beat

  oscLeft.connect(panLeft).connect(filter);
  oscRight.connect(panRight).connect(filter);
  filter.connect(masterGain).connect(ctx.destination);

  // Slow "breathing" LFO on the master volume (about one breath every 8s)
  // so the drone gently swells and fades instead of holding one flat tone.
  const breathLfo = ctx.createOscillator();
  breathLfo.type = "sine";
  breathLfo.frequency.value = 1 / 8;
  const breathDepth = ctx.createGain();
  breathDepth.gain.value = 0.025;
  breathLfo.connect(breathDepth).connect(masterGain.gain);

  const targetVolume = 0.05;
  masterGain.gain.value = targetVolume;

  oscLeft.start();
  oscRight.start();
  breathLfo.start();

  return { masterGain, oscLeft, oscRight, breathLfo, targetVolume };
}

function startAmbientMusic() {
  if (ambientNodes) return;
  const ctx = getAudioContext();
  ambientNodes = buildAmbientGraph();
  // Fade in instead of snapping to volume, so starting it isn't jarring.
  ambientNodes.masterGain.gain.setValueAtTime(0, ctx.currentTime);
  ambientNodes.masterGain.gain.linearRampToValueAtTime(ambientNodes.targetVolume, ctx.currentTime + 2);
}

function stopAmbientMusic() {
  if (!ambientNodes) return;
  const ctx = getAudioContext();
  const { masterGain, oscLeft, oscRight, breathLfo } = ambientNodes;
  masterGain.gain.cancelScheduledValues(ctx.currentTime);
  masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
  setTimeout(() => {
    oscLeft.stop();
    oscRight.stop();
    breathLfo.stop();
  }, 1100);
  ambientNodes = null;
}

function updateMusicToggleButton() {
  const btn = document.getElementById("music-toggle");
  if (!btn) return;
  const enabled = isAmbientMusicEnabled();
  btn.classList.toggle("active", enabled);
  btn.setAttribute("aria-pressed", String(enabled));
}

function initAudioControls() {
  const musicBtn = document.getElementById("music-toggle");
  if (!musicBtn) return;

  updateMusicToggleButton();
  musicBtn.addEventListener("click", () => {
    const next = !isAmbientMusicEnabled();
    setAmbientMusicEnabled(next);
    updateMusicToggleButton();
    if (next) startAmbientMusic();
    else stopAmbientMusic();
  });
  if (isAmbientMusicEnabled()) startAmbientMusic();
}
