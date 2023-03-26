class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        // code to get x
        return this.#x
    }

    getY() {
        // code to get y
        return this.#y
    }

    static moveToNewPosition(position, direction) {
        switch (direction) {
            case Direction.Right:
                return new Position(position.getX() + 1, position.getY())
            case Direction.RightUp:
                return new Position(position.getX() + 1, position.getY() + 1)
            case Direction.LeftUp:
                return new Position(position.getX(), position.getY() + 1)
            case Direction.Left:
                return new Position(position.getX() - 1, position.getY())
            case Direction.LeftDown:
                return new Position(position.getX(), position.getY() - 1)
            case Direction.RightDown:
                return new Position(position.getX() + 1, position.getY() - 1)
        }
    }

    toString() {
        return this.getX().toString() + " " + this.getY().toString();
    }
}

class World {
    #height
    #width
    #map

    constructor(map) {
        this.#map = map;
        this.#height = this.#map.length;
        this.#width = this.#map[0].length;
    }

    height() {
        return this.#height;
    }

    width() {
        return this.#width;
    }

    cellAt(position) {
        if (!(0 <= position.getX() && position.getX() < this.#width && 0 <= position.getY() && position.getY() < this.#height)) {
            throw new Error("Bounds is not true!");
        }
        return this.#map[position.getY()][position.getX()];
    }

    // return: cell after move
    sensedCell(position, direction) {
        return this.cellAt(Position.moveToNewPosition(position, direction));
    }

    isObstructedAt(position) {
        return this.cellAt(position).isObstructed();
    }

    isOccupiedAt(position) {
        return this.cellAt(position).isOccupied();
    }

    setBugAt(position, bug) {
        this.cellAt(position).setBug(bug);
    }

    getBugAt(position) {
        return this.cellAt(position).getBug();
    }

    removeBugAt(position) {
        this.cellAt(position).removeBug();
    }

    setFoodAt(position, value) {
        this.cellAt(position).setFood(value);
    }

    getFoodAt(position) {
        this.cellAt(position).getFood();
    }

    isFriendlyBaseAt(position, color) {
        return this.cellAt(position).isFriendlyBase(color);
    }

    isEnemyBaseAt(position, color) {
        return this.cellAt(position).isEnemyBase(color);
    }

    setMarkerAt(position, color, number) {
        // TODO
    }

    clearMarkerAt(position, color, number) {
        // TODO
    }

    isFriendlyMarkerAt(position, color, number) {
        // TODO
    }

    isEnemyMarkerAt(position, color, number) {
        // TODO
    }

    toString() {
        let result = "";
        for (let i = 0; i < this.#height; i++) {
            result += "Line " + i.toString() + ":\n";
            for (let j = 0; j < this.#width; j++) {
                result += this.#map[i][j].toString() + "\n";
            }
        }

        return result;
    }
}