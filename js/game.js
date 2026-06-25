// ============================================================
// Athar's Game — core game logic (Flappy-Bird style + canvas render)
// ============================================================

const Game = (() => {
  // ---- constants ----
  const GRAVITY = 0.5;
  const JUMP_VELOCITY = -8.2;
  const MAX_FALL_SPEED = 11;
  const ATHAR_RADIUS = 23;
  const BASE_SPEED = 2.8;
  const MAX_SPEED = 7.2;
  const BASE_GAP = 185;
  const MIN_GAP = 128;
  const OBSTACLE_WIDTH = 76;
  // Jarak antar rintangan: sama untuk rintangan pertama maupun selanjutnya, diacak
  // sedikit di sekitar nilai dasar tiap kali (tidak linear/gampang ditebak), dan
  // nilai dasarnya makin mengecil seiring kesulitan naik — tapi tidak pernah di
  // bawah MIN_SPACING agar tetap bisa dilewati.
  const BASE_SPACING = 300;
  const MIN_SPACING = 188;
  const SPACING_RANDOM_RATIO = 0.2; // variasi acak +-20% dari nilai dasar saat itu
  const GROUND_HEIGHT = 70;
  const MAX_REVIVES = 3;
  const INVINCIBLE_MS = 1600;

  // Kesulitan naik bertahap per kelipatan N rintangan terlewati (bukan terus-menerus halus)
  const DIFFICULTY_STEP_SCORE = 10;
  const SPEED_PER_STEP = 0.32;
  const GAP_SHRINK_PER_STEP = 8;
  const SPACING_SHRINK_PER_STEP = 11;

  const OBSTACLE_TYPES = [
    { label: "Skripsi", emoji: "📄", edge: "#4be8ff" },
    { label: "Laptop", emoji: "💻", edge: "#8b6bff" },
    { label: "Buku TIK", emoji: "📘", edge: "#5aa7ff" },
    { label: "Penggaris", emoji: "📐", edge: "#ffb454" },
    { label: "Globe", emoji: "🌍", edge: "#38e6b0" },
    { label: "Deadline!", emoji: "⚠️", edge: "#ff5e72" },
  ];

  // 3 karakter yang bisa dimainkan — diacak setiap kali memulai permainan baru
  const CHARACTERS = [
    { id: "athar", name: "Athar", core: "#d6fbff", mid: "#4be8ff", edge: "#1c93b3" },
    { id: "hassel", name: "Hassel", core: "#e9e0ff", mid: "#8b6bff", edge: "#5538b0" },
    { id: "aye", name: "Aye", core: "#ffe9c6", mid: "#ffb454", edge: "#c4791f" },
  ];

  // 3 tema wallpaper — diacak setiap kali memulai permainan baru
  const WALLPAPERS = [
    { id: "aurora", skyTop: "#060914", skyBottom: "#1a2747", bandA: "rgba(75,232,255,0.16)", bandB: "rgba(139,107,255,0.16)", groundTop: "#101a35", groundBottom: "#070b18", edge: "#4be8ff" },
    { id: "grid", skyTop: "#0a0716", skyBottom: "#1d1233", line: "rgba(255,94,138,0.28)", groundTop: "#190f2e", groundBottom: "#0a0616", edge: "#ff5e8a" },
    { id: "nebula", skyTop: "#0c0a1f", skyBottom: "#2a1538", blobA: "rgba(255,180,84,0.16)", blobB: "rgba(139,107,255,0.2)", groundTop: "#1d1130", groundBottom: "#0c0818", edge: "#ffb454" },
  ];

  let canvas, ctx, confettiCanvas, confettiCtx;
  let width = 0, height = 0;
  let state = "idle"; // idle | playing | paused | quiz | gameover
  let rafId = null;
  let lastTime = 0;

  let athar, obstacles, score, obstaclesPassed, best, revivesLeft, invincibleUntil;
  let nextSpawnX, stars, particles, screenShake, lastGapTop;
  let currentCharacter = CHARACTERS[0];
  let currentWallpaper = WALLPAPERS[0];
  let hooks = {};

  function init(canvasEl, confettiEl, callbacks) {
    canvas = canvasEl;
    confettiCanvas = confettiEl;
    ctx = canvas.getContext("2d");
    confettiCtx = confettiCanvas.getContext("2d");
    hooks = callbacks || {};
    resize();
    window.addEventListener("resize", resize);
    resetState();
    renderIdleBackground();
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    [canvas, confettiCanvas].forEach((c) => {
      c.width = width * dpr;
      c.height = height * dpr;
      c.style.width = width + "px";
      c.style.height = height + "px";
    });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (state === "idle") renderIdleBackground();
  }

  function resetState() {
    // acak karakter & wallpaper setiap permainan baru dimulai
    currentCharacter = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    currentWallpaper = WALLPAPERS[Math.floor(Math.random() * WALLPAPERS.length)];

    athar = { x: Math.max(90, width * 0.22), y: height / 2, vy: 0, rotation: 0 };
    obstacles = [];
    score = 0;
    obstaclesPassed = 0;
    best = Number(localStorage.getItem("athar_highscore") || 0);
    revivesLeft = MAX_REVIVES;
    invincibleUntil = 0;
    lastGapTop = null;
    stars = makeStars();
    particles = [];
    screenShake = 0;

    // Sistem spawn berbasis posisi dunia: setiap rintangan (termasuk yang pertama)
    // memakai jarak acak yang SAMA terhadap rintangan sebelumnya, jadi tidak ada lagi
    // jarak ganjil antara rintangan ke-1 dan ke-2. Rintangan yang posisinya sudah
    // "jatuh tempo" (<= lebar layar) langsung dimunculkan agar layar tidak kosong lama.
    nextSpawnX = athar.x + currentSpacing();
    let guard = 0;
    while (nextSpawnX <= width + 20 && guard < 50) {
      spawnObstacle(nextSpawnX);
      nextSpawnX += currentSpacing();
      guard++;
    }
  }

  function makeStars() {
    const arr = [];
    for (let i = 0; i < 50; i++) {
      arr.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.75,
        r: 0.6 + Math.random() * 1.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.05 + Math.random() * 0.12,
      });
    }
    return arr;
  }

  function getCharacterName() { return currentCharacter.name; }

  // step bertambah 1 setiap kelipatan DIFFICULTY_STEP_SCORE rintangan terlewati
  // (pakai hitungan rintangan, bukan skor — karena skor sekarang acak 10-15 per rintangan)
  function difficultyStep() {
    return Math.floor(obstaclesPassed / DIFFICULTY_STEP_SCORE);
  }

  // Poin per rintangan: acak 10-15, makin tinggi untuk gap yang makin sempit (makin sulit)
  function pointsForObstacle(o) {
    const gapSize = o.gapBottom - o.gapTop;
    const t = Math.max(0, Math.min(1, (BASE_GAP - gapSize) / (BASE_GAP - MIN_GAP)));
    const minPts = 10, maxPts = 15;
    const base = minPts + t * (maxPts - minPts);
    const jittered = base + (Math.random() * 2 - 1) * 1.2;
    return Math.max(minPts, Math.min(maxPts, Math.round(jittered)));
  }

  function currentSpeed() {
    return Math.min(MAX_SPEED, BASE_SPEED + difficultyStep() * SPEED_PER_STEP);
  }

  function currentGap() {
    return Math.max(MIN_GAP, BASE_GAP - difficultyStep() * GAP_SHRINK_PER_STEP);
  }

  function currentSpacing() {
    const base = Math.max(MIN_SPACING, BASE_SPACING - difficultyStep() * SPACING_SHRINK_PER_STEP);
    // diacak tiap dipanggil agar jarak antar rintangan tidak terasa linear/mudah ditebak
    const variance = base * SPACING_RANDOM_RATIO;
    const randomized = base + (Math.random() * 2 - 1) * variance;
    return Math.max(MIN_SPACING, randomized);
  }

  function speedLevel() {
    return 1 + difficultyStep();
  }

  // ---- public controls ----
  function start() {
    resetState();
    state = "playing";
    lastTime = performance.now();
    cancelAnimationFrame(rafId);
    loop(lastTime);
  }

  function restart() {
    start();
  }

  function pause() {
    if (state !== "playing") return;
    state = "paused";
  }

  function resume() {
    if (state !== "paused") return;
    state = "playing";
    lastTime = performance.now();
  }

  function isPlaying() { return state === "playing"; }
  function isPaused() { return state === "paused"; }

  function jump() {
    if (state !== "playing") return;
    athar.vy = JUMP_VELOCITY;
    hooks.onJump && hooks.onJump();
  }

  function getScore() { return score; }
  function getObstaclesPassed() { return obstaclesPassed; }
  function getBest() { return best; }
  function getRevivesLeft() { return revivesLeft; }
  function getSpeedLevel() { return speedLevel(); }

  // called by main.js after player answers quiz correctly
  function reviveAthar() {
    athar.y = height / 2;
    athar.vy = 0;
    obstacles.forEach((o) => { if (o.x < athar.x + 150) o.x += 220; });
    invincibleUntil = performance.now() + INVINCIBLE_MS;
    revivesLeft -= 1;
    state = "playing";
    lastTime = performance.now();
  }

  // called when player fails quiz -> finalize game over
  function finalizeGameOver() {
    state = "gameover";
    if (score > best) {
      best = score;
      localStorage.setItem("athar_highscore", String(best));
    }
    cancelAnimationFrame(rafId);
  }

  function goToMenu() {
    state = "idle";
    cancelAnimationFrame(rafId);
    resize();
    renderIdleBackground();
  }

  // ---- main loop ----
  function loop(now) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(34, now - lastTime);
    lastTime = now;
    if (state === "playing") {
      update(dt);
    }
    draw();
  }

  function update(dt) {
    const t = dt / 16.6667; // normalize to ~60fps steps

    // physics
    athar.vy = Math.min(MAX_FALL_SPEED, athar.vy + GRAVITY * t);
    athar.y += athar.vy * t;
    athar.rotation = Math.max(-0.45, Math.min(0.9, athar.vy * 0.06));

    // stars drift slowly (parallax)
    stars.forEach((s) => {
      s.x -= s.speed * t;
      if (s.x < -4) s.x = width + 4;
    });

    // particles (confetti handled separately on its own canvas)

    // spawn obstacles — nextSpawnX ikut "bergeser" seperti rintangan lain, dan begitu
    // posisinya jatuh tempo (mencapai tepi layar) rintangan baru langsung dimunculkan
    // di posisi itu juga, sehingga jarak antar rintangan selalu konsisten dengan currentSpacing()
    const spd = currentSpeed();
    nextSpawnX -= spd * t;
    if (nextSpawnX <= width + 20) {
      spawnObstacle(nextSpawnX);
      nextSpawnX += currentSpacing();
    }

    // move obstacles
    obstacles.forEach((o) => { o.x -= spd * t; });
    obstacles = obstacles.filter((o) => o.x + OBSTACLE_WIDTH > -20);

    // scoring: passed obstacle — poin acak 10-15, lebih tinggi untuk rintangan yang gap-nya lebih sempit (lebih sulit)
    obstacles.forEach((o) => {
      if (!o.passed && o.x + OBSTACLE_WIDTH < athar.x - ATHAR_RADIUS) {
        o.passed = true;
        obstaclesPassed += 1;
        score += pointsForObstacle(o);
        SoundFX.score();
        hooks.onScoreChange && hooks.onScoreChange(score);
      }
    });

    // collisions
    const invincible = performance.now() < invincibleUntil;
    const groundY = height - GROUND_HEIGHT;
    if (!invincible) {
      let hit = false;
      if (athar.y + ATHAR_RADIUS >= groundY || athar.y - ATHAR_RADIUS <= 0) {
        hit = true;
      }
      for (const o of obstacles) {
        if (athar.x + ATHAR_RADIUS > o.x && athar.x - ATHAR_RADIUS < o.x + OBSTACLE_WIDTH) {
          if (athar.y - ATHAR_RADIUS < o.gapTop || athar.y + ATHAR_RADIUS > o.gapBottom) {
            hit = true;
            break;
          }
        }
      }
      if (hit) {
        handleCollision();
      }
    }
  }

  function handleCollision() {
    SoundFX.hit();
    athar.y = Math.max(ATHAR_RADIUS + 4, Math.min(height - GROUND_HEIGHT - ATHAR_RADIUS - 4, athar.y));
    athar.vy = 0;
    state = "quiz"; // freeze gameplay loop logic (draw still runs)
    hooks.onDeath && hooks.onDeath();
  }

  function spawnObstacle(overrideX) {
    const groundY = height - GROUND_HEIGHT;
    const margin = Math.max(40, Math.min(70, height * 0.09));
    const availableHeight = Math.max(MIN_GAP, groundY - margin * 2);
    const gap = Math.min(currentGap(), availableHeight);

    const minTop = margin;
    const maxTop = Math.max(minTop, groundY - gap - margin);

    let gapTop;
    if (lastGapTop === null) {
      // rintangan pertama: posisi tengah-ish agar mudah, tidak ekstrem atas/bawah
      const mid = (minTop + maxTop) / 2;
      const wiggle = (maxTop - minTop) * 0.25;
      gapTop = mid + (Math.random() * 2 - 1) * wiggle;
    } else {
      // tinggi-rendah gap diacak bebas (acak penuh dalam rentang yang ada), tapi tetap
      // dibatasi sedikit relatif ke rintangan sebelumnya supaya tidak ada lompatan yang
      // mustahil dikejar — batasnya dilonggarkan agar terasa benar-benar acak, bukan halus
      const spacing = currentSpacing();
      const maxDelta = Math.min(maxTop - minTop, Math.max(160, spacing * 0.9));
      let low = Math.max(minTop, lastGapTop - maxDelta);
      let high = Math.min(maxTop, lastGapTop + maxDelta);
      if (low > high) { low = minTop; high = maxTop; }
      gapTop = low + Math.random() * (high - low);
    }
    gapTop = Math.max(minTop, Math.min(maxTop, gapTop));
    lastGapTop = gapTop;

    const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
    obstacles.push({
      x: overrideX !== undefined ? overrideX : width + 20,
      gapTop,
      gapBottom: gapTop + gap,
      passed: false,
      type,
    });
  }

  // ---- drawing ----
  function draw() {
    drawBackground();
    drawStars();
    drawThemeDecor();
    obstacles.forEach(drawObstacle);
    drawGround();
    drawAthar();
    drawCameos();
  }

  function drawBackground() {
    const theme = currentWallpaper;
    const g = ctx.createLinearGradient(0, 0, 0, height);
    g.addColorStop(0, theme.skyTop);
    g.addColorStop(1, theme.skyBottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
  }

  function drawStars() {
    const t = performance.now() / 600;
    ctx.save();
    stars.forEach((s) => {
      const twinkle = 0.4 + 0.5 * Math.abs(Math.sin(t * s.speed + s.phase));
      ctx.globalAlpha = twinkle;
      ctx.fillStyle = "#eaf2ff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawThemeDecor() {
    const theme = currentWallpaper;
    const t = performance.now() / 4000;
    const horizon = height - GROUND_HEIGHT;

    if (theme.id === "aurora") {
      [theme.bandA, theme.bandB].forEach((color, i) => {
        const yBase = height * (0.18 + i * 0.14);
        ctx.beginPath();
        ctx.moveTo(0, yBase);
        for (let x = 0; x <= width; x += 40) {
          const y = yBase + Math.sin(x * 0.01 + t * 6 + i * 2) * 26;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, yBase + 120);
        ctx.lineTo(0, yBase + 120);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      });
    } else if (theme.id === "grid") {
      ctx.save();
      ctx.strokeStyle = theme.line;
      ctx.lineWidth = 1;
      const vanishX = width / 2;
      for (let i = -6; i <= 6; i++) {
        ctx.beginPath();
        ctx.moveTo(vanishX + i * 70, horizon - 90);
        ctx.lineTo(vanishX + i * 220, horizon);
        ctx.stroke();
      }
      for (let j = 1; j <= 4; j++) {
        const y = horizon - j * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.globalAlpha = 1 - j * 0.18;
        ctx.stroke();
      }
      ctx.restore();
    } else if (theme.id === "nebula") {
      [{ c: theme.blobA, x: width * 0.22, y: height * 0.28 }, { c: theme.blobB, x: width * 0.78, y: height * 0.4 }].forEach((b, i) => {
        const pulse = 1 + Math.sin(t * 6 + i) * 0.08;
        const r = Math.max(width, height) * 0.32 * pulse;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, b.c);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });
    }
  }

  function drawGround() {
    const theme = currentWallpaper;
    const groundY = height - GROUND_HEIGHT;
    const g = ctx.createLinearGradient(0, groundY, 0, height);
    g.addColorStop(0, theme.groundTop);
    g.addColorStop(1, theme.groundBottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, groundY, width, GROUND_HEIGHT);

    // garis neon di tepi atas ground
    ctx.save();
    ctx.shadowColor = theme.edge;
    ctx.shadowBlur = 12;
    ctx.strokeStyle = theme.edge;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(width, groundY);
    ctx.stroke();
    ctx.restore();

    // pola sirkuit kecil yang bergerak
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    for (let x = (-((performance.now() / 18) % 40)); x < width; x += 40) {
      ctx.fillRect(x, groundY + 10, 20, 3);
    }
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawObstacle(o) {
    const groundY = height - GROUND_HEIGHT;
    const { type } = o;

    ctx.save();
    ctx.shadowColor = type.edge;
    ctx.shadowBlur = 10;
    ctx.fillStyle = "rgba(14,18,38,0.78)";
    ctx.strokeStyle = type.edge;
    ctx.lineWidth = 2;

    // top block
    roundRect(o.x, 0, OBSTACLE_WIDTH, Math.max(0, o.gapTop), 10);
    ctx.fill();
    ctx.stroke();

    // bottom block
    roundRect(o.x, o.gapBottom, OBSTACLE_WIDTH, Math.max(0, groundY - o.gapBottom), 10);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // emoji labels
    ctx.font = "28px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (o.gapTop > 30) ctx.fillText(type.emoji, o.x + OBSTACLE_WIDTH / 2, Math.max(22, o.gapTop - 26));
    if (groundY - o.gapBottom > 30) ctx.fillText(type.emoji, o.x + OBSTACLE_WIDTH / 2, o.gapBottom + 26);
  }

  function drawAthar() {
    const invincible = performance.now() < invincibleUntil;
    const c = currentCharacter;
    ctx.save();
    ctx.translate(athar.x, athar.y);
    ctx.rotate(athar.rotation);
    if (invincible && Math.floor(performance.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }
    // outer glow
    ctx.shadowColor = c.mid;
    ctx.shadowBlur = invincible ? 26 : 16;

    // glow ring if invincible
    if (invincible) {
      ctx.beginPath();
      ctx.arc(0, 0, ATHAR_RADIUS + 7, 0, Math.PI * 2);
      ctx.strokeStyle = "#ffd166";
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
    // energy orb body
    const grad = ctx.createRadialGradient(-6, -7, 3, 0, 0, ATHAR_RADIUS);
    grad.addColorStop(0, c.core);
    grad.addColorStop(0.55, c.mid);
    grad.addColorStop(1, c.edge);
    ctx.beginPath();
    ctx.arc(0, 0, ATHAR_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = c.edge;
    ctx.stroke();

    // facet lines (kesan kristal/elegan, bukan wajah kartun)
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-ATHAR_RADIUS * 0.5, -ATHAR_RADIUS * 0.3);
    ctx.lineTo(ATHAR_RADIUS * 0.4, -ATHAR_RADIUS * 0.55);
    ctx.moveTo(-ATHAR_RADIUS * 0.45, ATHAR_RADIUS * 0.15);
    ctx.lineTo(ATHAR_RADIUS * 0.5, ATHAR_RADIUS * 0.35);
    ctx.stroke();

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawCameos() {
    // dua karakter yang tidak sedang dimainkan tampil sebagai orb kecil di latar
    const others = CHARACTERS.filter((c) => c.id !== currentCharacter.id);
    const t = performance.now() / 600;
    const positions = [
      { x: 46, y: height - GROUND_HEIGHT - 36 + Math.sin(t) * 4 },
      { x: width - 46, y: 56 + Math.cos(t * 0.7) * 4 },
    ];
    others.forEach((c, i) => {
      const p = positions[i];
      if (!p) return;
      ctx.save();
      ctx.globalAlpha = 0.8;
      ctx.shadowColor = c.mid;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = c.mid;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    });
  }

  function renderIdleBackground() {
    obstacles = [];
    if (!athar) athar = { x: width * 0.22, y: height / 2, vy: 0, rotation: 0 };
    if (!stars) stars = makeStars();
    draw();
  }

  // ---- confetti (used on correct quiz answer) ----
  function fireConfetti() {
    const colors = ["#4be8ff", "#8b6bff", "#ffb454", "#38e6b0", "#ff5e8a"];
    const pieces = [];
    for (let i = 0; i < 60; i++) {
      pieces.push({
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 6,
        vy: -Math.random() * 6 - 2,
        size: 4 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: 60 + Math.random() * 30,
        rot: Math.random() * Math.PI,
      });
    }
    let frame = 0;
    function step() {
      frame++;
      confettiCtx.clearRect(0, 0, width, height);
      let alive = false;
      pieces.forEach((p) => {
        if (p.life >= p.maxLife) return;
        alive = true;
        p.life++;
        p.vy += 0.15;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += 0.1;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate(p.rot);
        confettiCtx.globalAlpha = 1 - p.life / p.maxLife;
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        confettiCtx.restore();
      });
      if (alive) requestAnimationFrame(step);
      else confettiCtx.clearRect(0, 0, width, height);
    }
    step();
  }

  return {
    init, start, restart, pause, resume, jump,
    isPlaying, isPaused, getScore, getObstaclesPassed, getBest, getRevivesLeft, getSpeedLevel,
    getCharacterName, reviveAthar, finalizeGameOver, goToMenu, fireConfetti, resize,
  };
})();
