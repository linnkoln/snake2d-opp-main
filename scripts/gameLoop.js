import Config from "./config.js";

export default class GameLoop {

    constructor( update, draw ) {

        this.update = update;
        this.draw = draw;

        this.config = new Config();

        this.animate = this.animate.bind(this);
        this.animate();

    }

    animate() {

        requestAnimationFrame( this.animate ); // каждый кадр запрашиваем отрисовку
        if ( ++this.config.step < this.config.maxStep) { // не прорисовываем все кадры кроме тех, что обозначены шагом
            return;
        }
        this.config.step = 0; //после прорисовки крдра очищаем шаги прорисовки

        this.update();
        this.draw();

    }

}