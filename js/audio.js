// Sound effects sederhana memakai Web Audio API (tanpa asset eksternal)
const SoundFX = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, duration, type = "sine", startGain = 0.18, glideTo = null) {
    if (muted) return;
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      if (glideTo !== null) {
        osc.frequency.exponentialRampToValueAtTime(glideTo, c.currentTime + duration);
      }
      gain.gain.setValueAtTime(startGain, c.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start();
      osc.stop(c.currentTime + duration);
    } catch (e) { /* audio not available, fail silently */ }
  }

  return {
    setMuted(val) { muted = val; },
    isMuted() { return muted; },
    jump() { tone(520, 0.12, "square", 0.12, 720); },
    score() { tone(880, 0.1, "sine", 0.12, 1100); },
    hit() { tone(140, 0.35, "sawtooth", 0.2, 60); },
    gameOver() { tone(300, 0.5, "triangle", 0.2, 80); },
    correct() {
      tone(660, 0.12, "sine", 0.15, 880);
      setTimeout(() => tone(990, 0.18, "sine", 0.15, 1200), 120);
    },
    wrong() { tone(200, 0.4, "sawtooth", 0.2, 90); },
    revive() {
      tone(440, 0.1, "sine", 0.15, 660);
      setTimeout(() => tone(880, 0.2, "sine", 0.15, 1100), 100);
    },
    click() { tone(700, 0.06, "square", 0.08, 700); },
  };
})();

// Musik latar prosedural (disintesis, tanpa file audio eksternal) — 3 trek berbeda,
// dipilih acak setiap kali permainan baru dimulai.
const MusicFX = (() => {
  let ctx = null;
  let muted = false;
  let masterGain = null;
  let schedulerId = null;
  let nextNoteTime = 0;
  let stepIndex = 0;
  let trackIndex = 0;
  const LOOKAHEAD_MS = 30;
  const SCHEDULE_AHEAD = 0.15;

  const TRACKS = [
    { // "Aurora" — tenang, melengkung, untuk wallpaper aurora
      name: "Aurora",
      tempo: 96,
      bass: [110, 110, 130.81, 98],
      lead: [440, 523.25, 587.33, 659.25, 783.99],
      waveLead: "sine", waveBass: "sine",
      leadGain: 0.05, bassGain: 0.07,
    },
    { // "Grid Pulse" — lebih cepat & tegas, untuk wallpaper grid neon
      name: "Grid Pulse",
      tempo: 130,
      bass: [98, 98, 110, 87.31],
      lead: [392, 466.16, 523.25, 587.33, 698.46],
      waveLead: "square", waveBass: "sawtooth",
      leadGain: 0.032, bassGain: 0.05,
    },
    { // "Nebula Drift" — lambat & melayang, untuk wallpaper nebula
      name: "Nebula Drift",
      tempo: 82,
      bass: [82.41, 82.41, 98, 73.42],
      lead: [329.63, 392, 440, 493.88, 587.33],
      waveLead: "triangle", waveBass: "sine",
      leadGain: 0.045, bassGain: 0.065,
    },
  ];

  function getCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function scheduleNote(freq, time, dur, type, gainVal) {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(gainVal, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(time);
      osc.stop(time + dur + 0.05);
    } catch (e) { /* ignore */ }
  }

  function tick() {
    const c = getCtx();
    const track = TRACKS[trackIndex];
    const stepDur = 60 / track.tempo / 2; // not-8
    while (nextNoteTime < c.currentTime + SCHEDULE_AHEAD) {
      const bassNote = track.bass[stepIndex % track.bass.length];
      scheduleNote(bassNote, nextNoteTime, stepDur * 1.8, track.waveBass, track.bassGain);
      if (stepIndex % 2 === 0) {
        const leadNote = track.lead[Math.floor(Math.random() * track.lead.length)];
        scheduleNote(leadNote, nextNoteTime, stepDur * 0.9, track.waveLead, track.leadGain);
      }
      stepIndex++;
      nextNoteTime += stepDur;
    }
  }

  function start(index) {
    stop();
    trackIndex = ((index % TRACKS.length) + TRACKS.length) % TRACKS.length;
    const c = getCtx();
    masterGain = c.createGain();
    masterGain.gain.value = muted ? 0 : 1;
    masterGain.connect(c.destination);
    stepIndex = 0;
    nextNoteTime = c.currentTime + 0.05;
    schedulerId = setInterval(tick, LOOKAHEAD_MS);
  }

  function stop() {
    if (schedulerId) { clearInterval(schedulerId); schedulerId = null; }
    if (masterGain) {
      try { masterGain.disconnect(); } catch (e) { /* ignore */ }
      masterGain = null;
    }
  }

  return {
    start, stop,
    pickRandomTrack() { return Math.floor(Math.random() * TRACKS.length); },
    trackCount() { return TRACKS.length; },
    setMuted(val) {
      muted = val;
      if (masterGain) masterGain.gain.value = val ? 0 : 1;
    },
    isMuted() { return muted; },
  };
})();
