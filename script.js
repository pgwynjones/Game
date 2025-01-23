// Set up the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player object
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height / 2 - 25,
  width: 50,
  height: 50,
  color: "red",
  speed: 5
};

// Variables for touch control
let touchStartX = 0;
let touchStartY = 0;

// Draw player on the canvas
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update the player's position based on touch swipes
function updatePlayerPosition(deltaX, deltaY) {
  player.x += deltaX;
  player.y += deltaY;

  // Prevent the player from going off-screen
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

// Touch events
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault(); // Prevent scrolling

  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStartX;
  const deltaY = touch.clientY - touchStartY;

  // Update the player based on swipe distance
  updatePlayerPosition(deltaX * 0.05, deltaY * 0.05);

  // Update touch start for continuous movement
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

// Main game loop
function gameLoop() {
  clearCanvas();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
