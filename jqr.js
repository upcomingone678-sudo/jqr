const canvas = document.getElementById('carrom-canvas');
const ctx = canvas.getContext('2d');

// Draw board with corners
function drawBoard() {
  ctx.clearRect(0, 0, 400, 400);

  // Board squares
  ctx.strokeStyle = '#884700';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 360, 360);

  // Pockets (corners)
  for (let i = 0; i < 4; i++) {
    const cx = (i === 0 || i === 3) ? 30 : 370;
    const cy = (i < 2) ? 30 : 370;
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#222';
    ctx.fill();
  }
}
drawBoard();

// Striker position
let strikerX = 200;
let strikerY = 370;
let strikerRadius = 18;
let strikerVY = 0;

// Draw striker
function drawStriker() {
  ctx.beginPath();
  ctx.arc(strikerX, strikerY, strikerRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#227bea';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00356b';
  ctx.stroke();
}

// Animate striker
function shootStriker() {
  strikerVY = -6;
  requestAnimationFrame(animateStriker);
}

function animateStriker() {
  if (strikerY - strikerRadius > 20 && strikerVY < 0) {
    drawBoard();
    strikerY += strikerVY;
    drawStriker();
    requestAnimationFrame(animateStriker);
  } else {
    strikerY = 370;
    drawBoard();
    drawStriker();
  }
}

drawStriker();

// Shoot button event
document.getElementById('shoot-btn').addEventListener('click', shootStriker);
