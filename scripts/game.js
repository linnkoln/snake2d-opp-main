import Canvas from "./canvas.js";
import GameLoop from "./gameLoop.js";
import Snake from "./snake.js";
import Score from "./score.js";
import Berry from "./berry.js";

class Game { //класс запускающий игру

    constructor( GameContainer, ScoreContainer) { // получаем html контейнеры в которых будет храниться игра 

        //инициализиуем данные об игре

        this.canvas = new Canvas(GameContainer);
        this.snakes = [new Snake(), new Snake(100, 160), new Snake(100, 100)];

        this.berry = new Berry(this.canvas);
        this.score = new Score(ScoreContainer, 0);
        new GameLoop( this.update.bind(this), this.draw.bind(this) );

    }

    update() { // апдейт игры во время начала 
        for (let snake of this.snakes) {
            snake.update(this.berry, this.score, this.canvas, this.snakes);
        }
        
       
    }

    draw() {

        this.canvas.context.clearRect( 0, 0, this.canvas.element.width, this.canvas.element.height );

        for (let snake of this.snakes) {
            snake.draw(this.canvas.context);
        }
        
        this.berry.draw( this.canvas.context);

    }

}

new Game(document.querySelector(".canvas-wrapper"), document.querySelector(".game-score .score-count"));