let snake;
let rez = 20;
let food;
let w;
let h;
let gameState = "title";
let points = 0;

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);

}

function keyPressed() {

  if (gameState === "title" || gameState === "done") {
    if (keyCode === ENTER || keyCode === RETURN) {
      snake = new Snake();
      foodLocation();
      points = 0;
      gameState = "play";
    }
    return;
  }

  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (key == ' ') {
    snake.grow();
  }

}

function draw() {
  background(220);

  if (gameState === "title") {
    textAlign(CENTER, CENTER);
    textSize(30);
    text("SNAKE GAME", width / 2, height / 2 - 20);
    textSize(15);
    text("Press ENTER to Start", width / 2, height / 2 + 20);
  }

  else if (gameState === "play") {
    scale(rez);
    if (snake.eat(food)) {
      points++;
      foodLocation();
    }
    snake.update();
    snake.show();

    if (snake.endGame()) {
      gameState = "done";
    }

    noStroke();
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
  }

  else if (gameState === "done") {
    background(255, 0, 0);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(30);
    text("GAME OVER", width / 2, height / 2 - 40);
    textSize(20);
    text("Score: " + points, width / 2, height / 2);
    textSize(15);
    text("Press ENTER to Restart", width / 2, height / 2 + 40);
  }
}
