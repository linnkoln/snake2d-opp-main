export default class Config {
	//класс конфикугации для игры

	constructor() {
		this.step = 0; // начальный шаг прорисовки
		this.maxStep = 6; // максимальный шаг анимации
		this.sizeCell = 16; // размер одной клетки
		this.sizeBerry = this.sizeCell / 4; // размер ягоды

	}

}