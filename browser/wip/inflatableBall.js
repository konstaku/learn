export class inflatableDiv {
    constructor(event, id) {
        this.id = id;
        this.diameter = 10;
        this.centerCoordinates = { x: event.x, y: event.y };
        this.div = document.createElement('div');
        this.div.style.backgroundColor = this.getRandomHexNumber();
        this.div.style.position = 'absolute';
        this.div.style.left =
            this.centerCoordinates.x - this.diameter / 2 + 'px';
        this.div.style.top =
            this.centerCoordinates.y - this.diameter / 2 + 'px';
        this.div.style.width = this.diameter + 'px';
        this.div.style.height = this.diameter + 'px';
        this.div.style.borderRadius = this.diameter + 'px';

        document.body.append(this.div);
        this.inflate();
    }

    inflate() {
        this.interval = setInterval(() => {
            this.diameter += 10;
            this.div.style.width = this.diameter + 'px';
            this.div.style.height = this.diameter + 'px';
            this.div.style.borderRadius = this.diameter + 'px';
            this.div.style.left =
                this.centerCoordinates.x - this.diameter / 2 + 'px';
            this.div.style.top =
                this.centerCoordinates.y - this.diameter / 2 + 'px';
        }, 1);
    }

    stopInflating() {
        clearInterval(this.interval);
    }

    getRandomHexNumber() {
        const randomNumber = Math.floor(Math.random() * 16777215);
        const randomHexNumber = randomNumber.toString(16).padStart(6, '0');
        return '#' + randomHexNumber;
    }
}
