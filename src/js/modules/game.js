import * as GNE from "../../../_GNE/dist/index.js";
import Snake from "./snake.js";

export default class Game {
  score;
  preloadView = "gameView";
  snake = Snake;

  constructor() {
    this.score = new GNE.DHTML.DHTMLReactiveState(0);
  }

  incrementScore() {
    this.score.value++;
  }

  resetScore() {
    this.score.value = 0;
  }
}