//document is ready
document.addEventListener("DOMContentLoaded", function () {
  const frame = document.querySelector("#game-frame");
  const head = document.querySelector("#head");
  const foodItem = document.querySelector("#food-item");
  let snakeTailPosition = [];

  const frameWidth = frame.clientWidth;
  const frameHeight = frame.clientHeight;
  const snakeHeadWidth = head.clientWidth;
  const snakeHeadHeight = head.clientHeight;
  let speed = 0;
  let direction = "right";
  let snakeLength = 2;

  //create style element and add "tail" class
  const style = document.createElement("style");
  style.innerHTML = `
  .tail {
    background-color: red;
    position: absolute;
    padding:10px;
    display: inline-block;
    border-radius: 10px;
  }
  `;
  //attach style element with html global head tag
  document.head.appendChild(style);
  //increase tail of snake
  const updateTailCoods = (headPosition) => {
    for (let l = 0; l < snakeLength; l++)
      if (!snakeTailPosition[l])
        //if array is empty
        snakeTailPosition[l] = { x: 0, y: 0 }; //set default coords

    //exchange coords in the reverse order
    for (let l = snakeLength - 1; l >= 0; l--)
      if (l == 0)
        //head coords transfer to first tail node
        snakeTailPosition[l] = headPosition;
      else snakeTailPosition[l] = snakeTailPosition[l - 1];

    //create tail node element
    let numberOfTailNodes = head.parentNode.querySelectorAll(".tail").length;
    if (numberOfTailNodes != snakeLength)
      for (let n = 0; n < snakeLength - numberOfTailNodes; n++) {
        const element = document.createElement("div");
        element.setAttribute("class", "tail"); //set class attribute
        head.parentNode.appendChild(element);
      }

    //positioning the snake tail nodes
    let tails = head.parentNode.querySelectorAll(".tail");
    tails.forEach((t, i) => {
      t.style.left = snakeTailPosition[i].x + "px";
      t.style.top = snakeTailPosition[i].y + "px";
    });
  };

  //assign food a random position coords
  const foodPosition = () => {
    const step = 20;
    const position = { x: 0, y: 0 };
    //700px(width of frame)/20(step)=35steps(total steps)
    const numberOfSteps = { x: frameWidth / step, y: frameHeight / step };
    //numberOfSteps.x-1 means reduce 1 step in the x-axis
    //+1 is added at the end because -->odd number position 1, 21, 41
    position.x = Math.floor(Math.random() * (numberOfSteps.x - 1)) * step + 1;
    position.y = Math.floor(Math.random() * (numberOfSteps.y - 1)) * step + 1;
    ///////////////////////////////////////////////////////
    return position;
  };

  /////////////display food//////////////////////////////
  const generateFood = () => {
    const { x, y } = foodPosition();
    foodItem.style.display = "inline-block";
    foodItem.style.left = x + "px"; //x position
    foodItem.style.top = y + "px"; //y position
    //////////////////////////////////////////////////////
  };
  generateFood(); //runtime generate food
  ////////food ate//////////////////
  const foodCollision = () => {
    const xHeadPosition = parseInt(head.style.left, 10);
    const yHeadPosition = parseInt(head.style.top, 10);
    const xFoodPosition = parseInt(foodItem.style.left, 10);
    const yFoodPosition = parseInt(foodItem.style.top, 10);
    const margin = 20; //10radius =>food and 10radius => snake head
    if (
      xHeadPosition + margin >= xFoodPosition &&
      xHeadPosition - margin <= xFoodPosition &&
      yHeadPosition + margin >= yFoodPosition &&
      yHeadPosition - margin <= yFoodPosition
    ) {
      ////
      generateFood(); //recreate new food item
      snakeLength++; //increase length of snake
      speed = speed + 5; //increase speed
    }
  };

  //keyboard event listener
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        direction = direction === "right" ? "right" : "left";
        break;
      case "ArrowRight":
        direction = direction === "left" ? "left" : "right";
        break;
      case "ArrowUp":
        direction = direction === "down" ? "down" : "up";
        break;
      case "ArrowDown":
        direction = direction === "up" ? "up" : "down";
        break;
      default:
        break;
    }
  });
  const moveSnake = () => {
    const left = parseInt(head.style.left, 10) || 0;
    const top = parseInt(head.style.top, 10) || 0;
    foodCollision(); //check foodItem and snake head collision
    updateTailCoods({ x: left, y: top });
    //headCollision();
    switch (direction) {
      case "right":
        if (left >= frameWidth - 30) {
          head.style.left = 0;
          break;
        }
        head.style.left = left + 20 + "px";
        break;
      case "left":
        if (left <= 0) {
          head.style.left = frameWidth - snakeHeadWidth + "px";
          break;
        }
        head.style.left = left - 20 + "px";
        break;
      case "up":
        head.style.top = top - 20 + "px";
        if (top <= 0) head.style.top = frameHeight - snakeHeadHeight + "px";
        break;
      case "down":
        if (top >= frameHeight - 30) {
          head.style.top = 0;
          break;
        }
        head.style.top = top + 20 + "px";
        break;
      default:
        break;
    }
    setTimeout(() => moveSnake(), 500 - speed);
  };

  moveSnake();
});
