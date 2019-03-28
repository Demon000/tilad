class Sprite {
    constructor(options) {
        this.loaded = false;
        this.content = new Image();
        this.options = options;
    }

    load(cb) {
        this.content.onload = () => {
            this.loaded = true;
            cb(this);
        };

        this.content.src = this.options.src;
    }

    get(options) {
        return this.content;
    }
}
