let head_block = document.getElementById("snake-head");
let head = {"x": 14, "y": 14};
let food = {"x": 12, "y": 12};
let direction = "";
let segments = [];
let gameLoop = null;

console.log("Adding keydown listener...");
document.addEventListener("keydown", setDirection);

function setDirection(e) {
  pressed = e.key;
 
  if (pressed == "w" && direction != "s") {
    direction = pressed;
  }
  else if (pressed == "a" && direction != "d") {
    direction = pressed;
  }
  else if (pressed == "s" && direction != "w") {
    direction = pressed;
  }
  else if (pressed == "d" && direction != "a") {
    direction = pressed;
  }
  
}


function move() { 
  if (direction == "w") {
    head.y -= 1;
  }
  else if (direction == "a") {
    head.x -= 1;
  }
  else if (direction == "s") {
    head.y += 1;
  }
  else if (direction == "d") {
    head.x += 1;
  }
  
  if (head.x < 0 || head.x > 29 || head.y < 0 || head.y > 29) {
    alert("Game Over!");
    clearInterval(gameLoop);
    resetGame();
    return;
  }
  
  for (let segment of segments) {
    if (head.x === segment.x && head.y === segment.y) {
      alert("Game Over!");
      clearInterval(gameLoop);
      resetGame();
      return;
    }
  }
  
  if (head.x == food.x && head.y == food.y) {
    let tailSegment = segments.length > 0 ? {...segments[segments.length - 1]} : {...head};
    segments.push(tailSegment);
    
    const oldFood = document.getElementById("food");
    if (oldFood) {
      oldFood.remove();
     }
    
    placeFood();
  }
  
  for (let i = segments.length - 1; i > 0; i--) {
    segments[i] = {...segments[i - 1]};
  }
  
  if (segments.length > 0) {
    segments[0] = {x: head.x, y: head.y};
  }
  
  head_block.style.gridRowStart = head.y + 1;
  head_block.style.gridRowEnd = head.y + 2;
  head_block.style.gridColumnStart = head.x + 1;
  head_block.style.gridColumnEnd = head.x + 2;
  
  const boundingBox = document.getElementById("bounding-box");
  document.querySelectorAll(".segment:not(#snake-head)").forEach(segment => segment.remove());
  
  for (let i = 0; i < segments.length; i++) {
    let segment = document.createElement("div");
    segment.classList.add("segment");
    boundingBox.appendChild(segment);
    segment.style.gridRowStart = segments[i].y + 1;
    segment.style.gridRowEnd = segments[i].y + 2;
    segment.style.gridColumnStart = segments[i].x + 1
    segment.style.gridColumnEnd = segments[i].x + 2
  }
  
  let foodBlock = document.getElementById("food");
    if (!foodBlock) {
      foodBlock = document.createElement("div");
      foodBlock.id = "food";
      foodBlock.classList.add("food");
      boundingBox.appendChild(foodBlock);
    }
    foodBlock.style.gridRowStart = food.y + 1;
    foodBlock.style.gridRowEnd = food.y + 2;
    foodBlock.style.gridColumnStart = food.x + 1;
    foodBlock.style.gridColumnEnd = food.x + 2;
}

function placeFood() {
  let newX, newY;
  do {
    newX = Math.floor(Math.random() * 30);
    newY = Math.floor(Math.random() * 30);
  } while (isFoodOnSnake(newX, newY));
    
   food = {x: newX, y: newY};
}

function isFoodOnSnake(x, y) {
  if (head.x === x && head.y === y) return true
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].x === x && segments[i].y === y) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  if (gameLoop !== null) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  
  head.x = 14;
  head.y = 14;
  direction = "";
  segments = [];
  
  head_block.style.gridRowStart = 15;
  head_block.style.gridRowEnd = 16;
  head_block.style.gridColumnStart = 15;
  head_block.style.gridColumnEnd = 16;
  
  document.querySelectorAll(".segment:not(#snake-head)").forEach(segment => segment.remove());
  document.getElementById("food")?.remove();
  
  placeFood();  // Place new food
  gameLoop = setInterval(move, 200)
}

resetGame();