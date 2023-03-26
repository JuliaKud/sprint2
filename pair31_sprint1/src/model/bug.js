const BugState = {
    Alive: 0,
    Dead: 1
}

const Side = {
    Left: -1,
    Right: 1
}

class Bug {
    #id;
    #color;
    #state;
    #direction;
    #position; // null or position
    #hasFood; // boolean
    #world;
    #brain;

    constructor(id, color, state = BugState.Alive, direction, position = null, hasFood = false, world, brain) {
        this.#id = id;
        this.#color = color;
        this.#state = state;
        this.#direction = direction;
        this.#position = position;
        this.#hasFood = hasFood;
        this.#world = world;
        this.#brain = brain;
    }

    kill() {
        // code to kill the bug
        this.state = BugState.Dead
    }

    getId() {
        // code to get id of the bug
        return this.#id;
    }

    getColor() {
        // code to get the color of the bug
        return this.#color;
    }

    getPosition() {
        // code to get the position of the bug
        return this.#position;
    }

    setPosition(position) {
        // code to set the position of the bug
        this.#position = position
    }

    getDirection() {
        return this.#direction;
    }

    getHasFood() {
        //code to get answer: Does bug have food?
        return this.#hasFood;
    }

    // -1 = Left, +1 = Right, but any number may be
    rotateBug(side) {
        this.#direction = (this.#direction + side + 6) % 6;
    }


    moveBug() {
        // code to move bug from oldPosition to newPosition
        const oldCell = this.#world.cellAt(this.getPosition());
        const newCell = this.#world.cellAt(Position.moveToNewPosition(this.getPosition(), this.#direction));
        // throw new Error(newCell.toString())

        // check
        if (newCell.isObstructed() || newCell.isOccupied()) {
            return; // may be throw error
        }

        // update information
        this.#position = Position.moveToNewPosition(this.getPosition(), this.#direction);
        newCell.setBug(this);
        oldCell.removeBug();
    }

    // take food from cell
    takeFood() {
        if (this.getHasFood()) {
            throw new Error("Bug has food!");
        }

        const cell = this.#world.cellAt(this.getPosition());
        if (cell.deleteFood()) {
            this.#hasFood = true;
        } else {
            throw new Error("Cell doesn't have food" + this.getPosition().getX().toString() + " " + this.getPosition().getY().toString())
        }
    }

    // put food in cell
    dropFood() {
        if (!this.getHasFood()) {
            throw new Error("Bug hasn't food!");
        }

        const cell = this.#world.cellAt(this.getPosition());
        if (cell.addFood()) {
            this.#hasFood = false;
        } else {
            throw new Error("Cell has 9 food")
        }
    }

    doOneBrainTask() {
        // TODO
    }


    toString() {
        // TODO
        return `Bug ${this.#id}: position() (${this.#color}) `;
    }
}