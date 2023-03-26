class Marker {
    static N_MARKERS = 6;

    #data;

    constructor() {
        this.#data = [];
        for (let i = 0; i < N_COLORS; ++i) {
            this.#data.push((new Array(Marker.N_MARKERS)).fill(false));
        }
    }

    set(color, type, value) {
        this.#data[color][type] = value;
    }

    get(color, type) {
        return this.#data[color][type];
    }

    toString() {
        return JSON.stringify(this.#data);
    }
}

class WorldCell {
    #obstructed;
    #bug = null; // null or Bug
    #food; // int 0-9
    #marker;
    #base; // null or Color

    constructor(obstructed, food, base) {
        this.#obstructed = obstructed;
        this.#food = food;
        this.#marker = new Marker();
        this.#base = base;
    }

    isObstructed() {
        return this.#obstructed;
    }

    isOccupied() {
        return this.#bug !== null;
    }

    setBug(bug) {
        this.#bug = bug;
    }

    getBug() {
        return this.#bug;
    }

    removeBug() {
        this.setBug(null);
    }

    setFood(value) {
        this.#food = value;
    }

    getFood() {
        return this.#food;
    }

    // boolean
    addFood() {
        if (this.#food === 9) {
           return false;
        }
        this.#food++;
        return true;
    }

    deleteFood() {
        if (this.#food === 0) {
            return false;
        }
        this.#food--;
        return true;
    }

    isFriendlyBase(color) {
        return this.#base === color;
    }

    isEnemyBase(color) {
        return this.#base !== null && !this.isFriendlyBase(color);
    }

    toString() {
        return JSON.stringify({
            'obstructed': this.#obstructed,
            'bug': this.#bug === null ? null : this.#bug.toString(),
            'food': this.#food,
            'marker': this.#marker.toString(),
            'base': this.#base
        });
    }

    // TODO: other getters and setters


}
