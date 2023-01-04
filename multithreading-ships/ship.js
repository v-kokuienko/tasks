class Ship {
    loaded = 0;
    size;
    type;
    id;

    constructor(id, size, type, loaded = 0) {
        this.loaded = loaded;
        this.id = id;
        this.size = size;
        this.type = type;
    }

    load(count) {
        this.loaded += count;
    }

    isFullyLoaded() {
        return this.loaded == this.size;
    }

    getId() {
        return this.id;
    }

    getLoad() {
        return this.loaded;
    }

    getType() {
        return this.type;
    }

    getSize() {
        return this.size;
    }
}

module.exports = Ship;