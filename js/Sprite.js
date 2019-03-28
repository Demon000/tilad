class Sprite {
    constructor(options) {
        this.loaded = false;
        this.content = new Image();
        this.options = options;
    }

    load(cb) {
        const self = this;
        this.content.onload = function() {
            self.loaded = true;
            cb(self);
        };

        this.content.src = this.options.src;
    }

    get(options) {
        return this.content;
    }
}
