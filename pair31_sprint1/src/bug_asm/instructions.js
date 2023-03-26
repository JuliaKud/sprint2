class LabelInstruction {
    constructor(label) {
        this.label = label;
    }

    toString() {
        return this.label + ":";
    }
}

class FlipInstruction {
    constructor(p, thenPos, elsePos) {
        this.p = p;
        this.thenPos = thenPos;
        this.elsePos = elsePos;
    }

    toString() {
        return "flip " + this.p.toString() + " " + this.thenPos.toString() + " " + this.elsePos.toString();
    }
}

class MoveInstruction {
    constructor(thenPos, elsePos) {
        this.thenPos = thenPos;
        this.elsePos = elsePos;
    }

    toString() {
        return "move " + this.thenPos.toString() + " " + this.elsePos.toString();
    }
}

class TurnInstruction {
    constructor(dir) {
        this.dir = dir;
    }

    toString() {
        return "turn " + this.dir.toString();
    }
}

class DropInstruction {
    constructor(nextPos) {
        this.nextPos = nextPos;
    }

    toString() {
        return "drop " + this.nextPos.toString();
    }
}

class PickUpInstruction {
    constructor(thenPos, elsePos) {
        this.thenPos = thenPos;
        this.elsePos = elsePos;
    }

    toString() {
        return "pickup " + this.thenPos.toString() + " " + this.elsePos.toString();
    }
}

class UnmarkInstruction {
    constructor(type, thenPos) {
        this.thenPos = thenPos;
        this.type = type;
    }

    toString() {
        return "unmark " + this.type.toString() + " " + this.thenPos.toString();
    }
}

class MarkInstruction {
    constructor(type, thenPos) {
        this.thenPos = thenPos;
        this.type = type;
    }

    toString() {
        return "mark " + this.type.toString() + " " + this.thenPos.toString();
    }
}

class SenseInstruction {
    constructor(dir, cond, thenPos, elsePos) {
        this.dir = dir;
        this.cond = cond;
        this.thenPos = thenPos;
        this.elsePos = elsePos;
    }

    toString() {
        return "sense " + this.dir.toString() + " " + this.thenPos.toString() + " " +
            this.elsePos.toString() + " " + this.cond.toString();
    }
}