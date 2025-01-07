const targetText = "Hello :]";
const matrixText = document.getElementById("matrixText");
const mainContent = document.getElementById("mainContent");
const loadingScreen = document.getElementById("loadingScreen");

let displayText = Array(targetText.length).fill(" ");
let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

function getRandomChar() {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function transitionLetter(index, callback) {
  let iterations = 0;

  const interval = setInterval(() => {
    displayText[index] = getRandomChar();
    matrixText.textContent = displayText.join("");

    if (iterations > 7) {
      clearInterval(interval);
      displayText[index] = targetText[index];
      matrixText.textContent = displayText.join("");
      if (callback) callback();
    }

    iterations++;
  }, 50);
}

function startEffect() {
  let currentIndex = 0;

  function next() {
    if (currentIndex < targetText.length) {
      transitionLetter(currentIndex, next);
      currentIndex++;
    } else {
      setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
      }, 1000);
    }
  }

  next();
}

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

startEffect();
drawMatrix();
