import * as GNE from "../../_GNE/dist/index.js";
import Game from "./modules/game.js";

GNE.GameNugget.viewDir = "../../../../src/js/views";

GNE.GameNugget.mountApp(new Game());

GNE.GameNugget.start();
