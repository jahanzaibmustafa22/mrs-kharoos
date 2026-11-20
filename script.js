/* =========================================================
   PERSONALIZATION: Change her name here if you'd like!
========================================================= */
const HER_NAME = "Mrs Kharoos"; // e.g., "Ayesha", "Zoya", "My Queen"

document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("her-name");
  if (nameEl && HER_NAME) {
    nameEl.textContent = HER_NAME;
  }

  initStarAndPetalCanvas();
  initCountdown();
  initCakeInteraction();
  initScrollReveal();
  initMusicBox();
  initLoveBurstButton();
});

/* =========================================================
   1. AUTOMATIC MIDNIGHT (12:00 AM) COUNTDOWN & UNLOCK
========================================================= */
function initCountdown() {
  const countdownScreen = document.getElementById("countdown-screen");
  const celebrationScreen = document.getElementById("celebration-screen");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const previewBtn = document.getElementById("preview-btn");

  // Calculate tonight's exact 12:00 AM (00:00:00 of the next day)
  const now = new Date();
  const midnightTarget = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0, 0, 0, 0
  );

  let unlocked = false;

  function unlockCelebration() {
    if (unlocked) return;
    unlocked = true;

    countdownScreen.classList.add("fade-out");
    setTimeout(() => {
      countdownScreen.classList.add("hidden");
      celebrationScreen.classList.remove("hidden");
      triggerMidnightFireworks();
      // Reveal hero immediately
      document.querySelector(".hero-section").classList.add("visible");
    }, 900);
  }

  // Preview button so you can test the surprise before 12 AM
  previewBtn.addEventListener("click", unlockCelebration);

  const timerInterval = setInterval(() => {
    const currentTime = new Date();
    const diff = midnightTarget - currentTime;

    if (diff <= 0) {
      clearInterval(timerInterval);
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      unlockCelebration();
      return;
    }

    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(hrs).padStart(2, "0");
    minutesEl.textContent = String(mins).padStart(2, "0");
    secondsEl.textContent = String(secs).padStart(2, "0");
  }, 250);
}

/* =========================================================
   2. FLOATING STARLIGHT & FALLING ROSE PETALS CANVAS
========================================================= */
function initStarAndPetalCanvas() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Create twinkling stars
  const stars = Array.from({ length: 95 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.8 + 0.4,
    alpha: Math.random(),
    speed: Math.random() * 0.015 + 0.005
  }));

  // Create romantic floating rose petals
  const petals = Array.from({ length: 28 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 8 + 6,
    speedY: Math.random() * 0.9 + 0.4,
    speedX: Math.random() * 0.8 - 0.4,
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.03,
    color: Math.random() > 0.4 ? "rgba(255, 94, 142, 0.42)" : "rgba(255, 182, 193, 0.35)"
  }));

  function animateBackground() {
    ctx.clearRect(0, 0, width, height);

    // Draw Stars
    stars.forEach((star) => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0.15) star.speed *= -1;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 208, 138, ${star.alpha})`;
      ctx.fill();
    });

    // Draw Rose Petals
    petals.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.angle) * 0.4;
      p.angle += p.spin;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animateBackground);
  }

  animateBackground();
}

/* =========================================================
   3. FIREWORKS & HEART CONFETTI EFFECTS (FX CANVAS)
========================================================= */
let particles = [];
let fxAnimating = false;

function spawnBurst(x, y, count = 75) {
  const colors = ["#ff5e8e", "#ffb6c1", "#f7d08a", "#ffffff", "#ff85a2"];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 6.5 + 2;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 1.5,
      size: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008,
      isHeart: Math.random() > 0.45
    });
  }
  if (!fxAnimating) runFxLoop();
}

function triggerMidnightFireworks() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  spawnBurst(w * 0.25, h * 0.35, 85);
  setTimeout(() => spawnBurst(w * 0.75, h * 0.3, 85), 350);
  setTimeout(() => spawnBurst(w * 0.5, h * 0.25, 110), 750);
  setTimeout(() => spawnBurst(w * 0.35, h * 0.45, 70), 1200);
  setTimeout(() => spawnBurst(w * 0.65, h * 0.4, 70), 1550);
}

function runFxLoop() {
  const canvas = document.getElementById("fx-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  fxAnimating = true;

  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.07; // gentle gravity
      p.alpha -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;

      if (p.isHeart) {
        drawHeart(ctx, p.x, p.y, p.size * 1.8);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    particles = particles.filter((p) => p.alpha > 0);

    if (particles.length > 0) {
      requestAnimationFrame(step);
    } else {
      fxAnimating = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(step);
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  ctx.fill();
}

/* =========================================================
   4. INTERACTIVE CANDLE BLOWING
========================================================= */
function initCakeInteraction() {
  const cakeTrigger = document.getElementById("cake-trigger");
  const flames = document.querySelectorAll(".flame");
  const smokes = document.querySelectorAll(".smoke");
  const statusEl = document.getElementById("wish-status");
  let candlesOut = false;

  cakeTrigger.addEventListener("click", () => {
    if (candlesOut) return;
    candlesOut = true;

    flames.forEach((f) => f.classList.add("out"));
    smokes.forEach((s) => s.classList.add("rise"));

    const rect = cakeTrigger.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + 40, 100);

    statusEl.innerHTML = "💖 May every single wish you made tonight come true, my love! 💖";
  });
}

/* =========================================================
   5. SMOOTH SCROLL REVEAL FOR SECTIONS
========================================================= */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* =========================================================
   6. LOVE & ROSES BURST BUTTON
========================================================= */
function initLoveBurstButton() {
  const btn = document.getElementById("love-burst-btn");
  btn.addEventListener("click", () => {
    triggerMidnightFireworks();
  });
}

/* =========================================================
   7. ROMANTIC PIANO / MUSIC BOX MELODY (WEB AUDIO API)
========================================================= */
function initMusicBox() {
  const toggleBtn = document.getElementById("music-toggle");
  const label = document.getElementById("music-label");
  let audioCtx = null;
  let isPlaying = false;
  let loopTimeout = null;

  // Happy Birthday melody notes (frequency in Hz, duration in ms)
  const melody = [
    [261.63, 350], [261.63, 200], [293.66, 550], [261.63, 550], [349.23, 550], [329.63, 950],
    [261.63, 350], [261.63, 200], [293.66, 550], [261.63, 550], [392.00, 550], [349.23, 950],
    [261.63, 350], [261.63, 200], [523.25, 550], [440.00, 550], [349.23, 550], [329.63, 550], [293.66, 950],
    [466.16, 350], [466.16, 200], [440.00, 550], [349.23, 550], [392.00, 550], [349.23, 1100]
  ];

  function playNote(freq, duration) {
    if (!audioCtx || !isPlaying) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.14, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration / 1000);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration / 1000);
  }

  function playSequence(index = 0) {
    if (!isPlaying) return;
    if (index >= melody.length) {
      loopTimeout = setTimeout(() => playSequence(0), 1200);
      return;
    }
    const [freq, dur] = melody[index];
    playNote(freq, dur);
    loopTimeout = setTimeout(() => playSequence(index + 1), dur + 60);
  }

  toggleBtn.addEventListener("click", () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (isPlaying) {
      isPlaying = false;
      clearTimeout(loopTimeout);
      label.textContent = "Play Melody";
    } else {
      if (audioCtx.state === "suspended") audioCtx.resume();
      isPlaying = true;
      label.textContent = "Pause Melody";
      playSequence(0);
    }
  });
}