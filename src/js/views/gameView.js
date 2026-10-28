import * as GNE from "../../../_GNE/dist/index.js";
import Snake from "../modules/snake.js";

class GameView extends GNE.View {
  static scoreSlot;
  
  constructor() {
    super(GameView.HTML, {
      postWrite: GameView.postWrite,
      a: GameView.a,
      b: GameView.b,
      up: GameView.up,
      down: GameView.down
    });
  }

  static persistentMoveSnake() {    
    Snake.move(Snake.direction);

    for (let i = Snake.length; i > 1; i--) {
      const block = Snake.get(i);

      if (!block) continue;

      block.style.transform = `translate(${Snake.previousPositions[Snake.previousPositions.length - i][0]}px, ${Snake.previousPositions[Snake.previousPositions.length - i][1] - (16 * i)}px)`;
    }
  }

  static eatFood() {
    document.querySelector("#food")?.remove();

    Snake.lengthen();

    GNE.GameNugget.app.incrementScore();

    GameView.spawnFood();

    const newSnake = GNE.g.newElement("div");
    newSnake.setAttribute("class", "snake");

    GNE.GameNugget.display.currentView.querySelector("#arena").appendChild(newSnake);
  }

  static postWrite() {
    GameView.scoreSlot.activate();

    setInterval(() => {
      GameView.persistentMoveSnake();

      const snake = Snake.get(1).getBoundingClientRect();

      const food = document.querySelector("#food").getBoundingClientRect();

      const overlap = !(snake.right < food.left || 
                        snake.left > food.right || 
                        snake.bottom < food.top || 
                        snake.top > food.bottom);

      if (overlap) {
        GameView.eatFood();
      }
    }, 500);

    GameView.spawnFood();
  }

  static spawnFood() {
    const x = Math.ceil(Math.random() * 10);
    const y = Math.ceil(Math.random() * 10);

    const food = GNE.g.newElement("div");
    food.setAttribute("id", "food");

    GNE.GameNugget.display.currentView.querySelector("#arena").appendChild(food);

    food.style.transform = `translate(${x * 28}px, ${y * 28}px)`
  }

  static up() {
    Snake.direction = "y-";
  }

  static down() {
    Snake.direction = "y+";
  }

  static a() {
    Snake.direction = "x+";
  }

  static b() {
    Snake.direction = "x-";
  }

  static HTML() {
    const game = GNE.g.newElement('div');
    game.setAttribute("id", "gameView");

    const stats = GameView.createStats();

    game.appendChild(stats);

    const snake = GNE.g.newElement("div");
    snake.setAttribute("class", "snake");

    const arena = GNE.g.newElement("div");
    arena.setAttribute("id", "arena");

    arena.appendChild(snake);

    game.appendChild(arena);

    return game;
  }

  static createStats() {
    const stats = GNE.g.newElement("div");
    stats.setAttribute("id", "stats");

    const slot = new GNE.DHTML.ReactiveSlot(GNE.GameNugget.app.score, {active: true});

    GameView.scoreSlot = slot;

    const label = GNE.g.newElement("span", "Score: ");

    stats.appendChild(label);

    stats.appendChild(slot.element);

    return stats;
  }
}

export default new GameView();
