// Dark Mode Toggle
const toggle = document.getElementById('dark-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Game Logic – bouncing colorful balls
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const balls = Array.from({ length: 10 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  dx: 2 + Math.random() * 2,
  dy: 2 + Math.random() * 2,
  radius: 15,
  color: `hsl(${Math.random() * 360}, 70%, 60%)`
}));

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let ball of balls) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) ball.dy *= -1;

    drawBall(ball);
  }
  requestAnimationFrame(update);
}

update();
