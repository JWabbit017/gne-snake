"use strict";

export default class Snake {
  static length = 1;
  static x = 0;
  static y = 0;
  static direction = "x+";
  static previousPositions = [];
  
  static get(n) {
    if (n) {
      return document.querySelector(`.snake:nth-child(${n})`);
    }
    
    return document.querySelector(".snake");
  }

  static move(vector, n = 1) {    
    if (Snake.x === 320) Snake.x = 0;
    
    if (Snake.y === 320) Snake.y = 0;

    if (Snake.x === -16) Snake.x = 320;

    if (Snake.y === -16) Snake.y = 320;
    
    if (vector.startsWith("x")) {
      Snake.x += vector.endsWith("+") ? 16 : -16;
    }

    if (vector.startsWith("y")) {
      Snake.y += vector.endsWith("+") ? 16 : -16;
    }

    const snake = Snake.get(n);

    if (!snake) return;

    snake.style.transform = `translate(${Snake.x}px, ${Snake.y}px)`;

    Snake.previousPositions.push([Snake.x, Snake.y]);
  }

  static lengthen() {
    Snake.length++;
  }
}