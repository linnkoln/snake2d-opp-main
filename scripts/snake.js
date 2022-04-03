import Config from "./config.js";

export default class Snake {
	
	constructor(startX = 160, startY = 160){

		this.config = new Config(); //конфигурация игры

		//начальное положение 
		this.x = startX;
		this.y = startY;

		//скорость змейки
		this.dx = this.config.sizeCell; 
		this.dy = 0;

		//хвост змейки
		this.tails = [];
		this.maxTails = 3;

		this.control();

	}

	update( berry, score, canvas, snakes) {
		this.x += this.dx;
		this.y += this.dy;
	
		if (this.x < 0) {
			this.x = canvas.element.width - this.config.sizeCell;
		} else if ( this.x >= canvas.element.width ) {
			this.x = 0;
		}
	
		if (this.y < 0) {
			this.y = canvas.element.height - this.config.sizeCell;
		} else if ( this.y >= canvas.element.height ) {
			this.y = 0;
		}
	
		this.tails.unshift( { x: this.x, y: this.y } );
	
		if ( this.tails.length > this.maxTails ) {
			this.tails.pop();
		}
	

		for (snake of snakes) {
			snake.tails.forEach((el, index) => {

				if (el.x === berry.x && el.y === berry.y) {
					this.maxTails++;
					score.incScore();
					berry.randomPosition();
				}

				for (let i = index + 1; i < this.tails.length; i++) {

					if (el.x == this.tails[i].x && el.y == this.tails[i].y) {
						this.death();
						score.setToZero();
						berry.randomPosition();
					}

				}
			});
        }


	}

	draw(context) { //отрисовка змейки

		this.tails.forEach( (el, index) => { //отрисовываем каждый квадратик змейки
			if (index == 0) {
				context.fillStyle = "#6AA121";
			} else {
				context.fillStyle = "#437C17";
			}
			context.fillRect( el.x, el.y, this.config.sizeCell, this.config.sizeCell );
		} );

	}

	death() { //смерть

		this.x = 160;
		this.y = 160;
		this.dx = this.config.sizeCell;
		this.dy = 0;
		this.tails = [];
		this.maxTails = 3;

	}

	control() { // контроллеры упрваления
		
		document.addEventListener("keydown",  (e) => {
			if ( !(this.dy > 0 ) && (e.code == "KeyW" || e.code == "ArrowUp")  ) { //проверяется две клавиши и условие чтобы змейка не врезалась сама в себя при смене направления
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			} else if (!(this.dx > 0) && (e.code == "KeyA" || e.code == "ArrowLeft") ) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			} else if (!(this.dy < 0) && (e.code == "KeyS" || e.code == "ArrowDown") ) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			} else if (!(this.dx < 0) && (e.code == "KeyD" || e.code == "ArrowRight")) {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		});

	}

}