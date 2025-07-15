const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load images
const bird = new Image();
bird.src = "assets/bird.jpeg";

const bg = new Image();
bg.src = "assets/bg.jpeg";

const pipe = new Image();
pipe.src = "assets/pipe.jpeg";

// Game variables
let birdX = 50;
let birdY = 150;
let gravity = 1.5;
let velocity = 0;
let score = 0;

// Pipes
let pipes = [];
pipes[0] = {
  x: canvas.width,
  y: Math.floor(Math.random() * -200)
};

// Game loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background scroll
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Pipes
  for (let i = 0; i < pipes.length; i++) {
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipe, pipes[i].x, pipes[i].y + pipe.height + 100);

    pipes[i].x -= 2;

    if (pipes[i].x === 150) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * -200)
      });
    }

    // Collision detection
    if (
      birdX + bird.width >= pipes[i].x &&
      birdX <= pipes[i].x + pipe.width &&
      (birdY <= pipes[i].y + pipe.height || birdY + bird.height >= pipes[i].y + pipe.height + 100)
    ) {
      location.reload(); // restart
    }

    if (pipes[i].x + pipe.width === birdX) {
      score++;
    }
  }

  // Bird
  ctx.drawImage(bird, birdX, birdY);

  velocity += gravity;
  birdY += velocity;

  if (birdY + bird.height >= canvas.height) {
    location.reload(); // hit ground
  }

  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 25);

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", () => {
  velocity = -12;
});

bird.onload = draw;
