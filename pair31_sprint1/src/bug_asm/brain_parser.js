class BrainParsingError extends Error {
    constructor(message) {
        super(message);
    }
}

class BrainParser {
    static #getLabels(programTokens) {
        let strLabels = {};

        for (let i = 0; i < programTokens.length; i++) {
            let lineTokens = programTokens[i];
            if (lineTokens.length < 0) {
                throw new BrainParsingError("Invalid line");
            }

            let command = lineTokens[0];
            if (command.endsWith(':')) {
                let label = command.slice(0, -1);
                if (label in strLabels) {
                    throw new BrainParsingError("Labels conflict");
                }

                strLabels[label] = i;
            }
        }

        return strLabels;
    }

    static #validateDir(token) {
        if (["here", "leftahead", "rightahead", "ahead"].includes(token)) {
            return token;
        }

        throw new BrainParsingError("Invalid direction");
    }

    static #validateTurnDir(token) {
        if (["left", "right"].includes(token)) {
            return token;
        }

        throw new BrainParsingError("Invalid turn direction");
    }

    static #validateCond(token) {
        if (["friend", "foe", "friendwithfood", "foewithfood", "food",
            "rock", "marker", "foemarker", "home", "foehome"].includes(token)) {
            return token;
        }

        throw new BrainParsingError("Invalid condition");
    }

    static #parseLabel(token, programLength, labelsMapping) {
        let position = parseInt(token);
        if (isNaN(position)) {
            position = labelsMapping[token];
        }

        if (position === undefined || position === null || isNaN(position)) {
            throw new BrainParsingError("Invalid label");
        }

        if (position < 0 || position >= programLength) {
            throw new BrainParsingError("Invalid label");
        }

        return position;
    }

    static #assertMinLength(tokens, minLength) {
        if (tokens.length < minLength) {
            throw new BrainParsingError("Missing tokens");
        }
    }

    static #parseLine(tokens, programLength, labelsMapping) {
        if (tokens.length < 1) {
            throw new BrainParsingError("Invalid line");
        }

        if (tokens[0] === "sense") {
            this.#assertMinLength(tokens, 5);
            return new SenseInstruction(
                BrainParser.#validateDir(tokens[1]),
                BrainParser.#validateCond(tokens[4]),
                this.#parseLabel(tokens[2], programLength, labelsMapping),
                this.#parseLabel(tokens[3], programLength, labelsMapping)
            );
        } else if (tokens[0] === "mark") {
            this.#assertMinLength(tokens, 3);
            return new MarkInstruction(
                parseInt(tokens[1]),
                this.#parseLabel(tokens[2], programLength, labelsMapping)
            );
        } else if (tokens[0] === "unmark") {
            this.#assertMinLength(tokens, 3);
            return new UnmarkInstruction(
                parseInt(tokens[1]),
                this.#parseLabel(tokens[2], programLength, labelsMapping)
            );
        } else if (tokens[0] === "pickup") {
            this.#assertMinLength(3);
            return new PickUpInstruction(
                this.#parseLabel(tokens[1], programLength, labelsMapping),
                this.#parseLabel(tokens[2], programLength, labelsMapping)
            );
        } else if (tokens[0] === "drop") {
            this.#assertMinLength(2);
            return new DropInstruction(
                this.#parseLabel(tokens[1], programLength, labelsMapping)
            );
        } else if (tokens[0] === "turn") {
            this.#assertMinLength(2);
            return new TurnInstruction(
                BrainParser.#validateTurnDir(tokens[1])
            );
        } else if (tokens[0] === "move") {
            this.#assertMinLength(3);
            return new MoveInstruction(
                this.#parseLabel(tokens[1], programLength, labelsMapping),
                this.#parseLabel(tokens[2], programLength, labelsMapping)
            );
        } else if (tokens[0] === "flip") {
            this.#assertMinLength(tokens, 4);
            return new FlipInstruction(
                parseInt(tokens[1]),
                this.#parseLabel(tokens[2], programLength, labelsMapping),
                this.#parseLabel(tokens[3], programLength, labelsMapping)
            );
        } else if (tokens[0].endsWith(":")) {
            return new LabelInstruction(tokens[0].slice(0, -1));
        }

        throw new BrainParsingError("Unknown command");
    }

    static #parseTokenized(programTokens) {
        let labelsMapping = this.#getLabels(programTokens);

        let program = [];
        for (let lineTokens of programTokens) {
            program.push(this.#parseLine(lineTokens, programTokens.length, labelsMapping));
        }

        return program;
    }

    static assemble(str) {
        let lines = str.split("\n");
        let tokens = lines.map((line) => {
            return line.split(" ");
        });

        return this.#parseTokenized(tokens);
    }

    static assembleFile(input) {
        return new Promise((resolve, reject) => {
            if (input.files && input.files[0]) {
                let file = input.files[0];
                let reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    try {
                        resolve(BrainParser.assemble(e.target.result));
                    } catch (e) {
                        reject(e);
                    }
                });

                reader.readAsText(file);
            } else {
                resolve(null);
            }
        });
    }
}