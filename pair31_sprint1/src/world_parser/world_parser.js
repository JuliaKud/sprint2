/*
 * Module responsible for reading and parsing world files.
 */

class WorldParsingError extends Error {
    constructor(message) {
        super(message);
    }
}

class WorldParser {


    /*
     * Parse file selected by the given input element.
     */
    static parseFile(input) {
        return new Promise((resolve, reject) => {
            if (input.files && input.files[0]) {
                let file = input.files[0];
                let reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    try {
                        resolve(WorldParser.parseString(e.target.result));
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

    /*
     * Convert string representation of a world into world model.
     */
    static parseString(str) {
        let lines = str.split("\n");
        let tokens = lines.map((line) => {
            return line.split(" ");
        })

        let width = parseInt(tokens[0][0]);
        let height = parseInt(tokens[1][0]);

        if (isNaN(height) || isNaN(width)) {
            throw new WorldParsingError("Cannot read the height and/or the width")
        }

        if (tokens.length !== height + 2) {
            throw new WorldParsingError("The field does not correspond to the indicated dimensions")
        }

        let map = [];

        for (let i = 0; i < height; i++) {
            if (tokens[i + 2].length !== width) {
                throw new WorldParsingError("The field does not correspond to the indicated dimensions");
            }
            map.push([]);
            for (let j = 0; j < width; j++) {
                map[i].push(this.#parseCell(tokens[i + 2][j]));
            }
        }

        return new World(map);
    }

    static #parseCell(c) {
        if (c === '#') {
            return new WorldCell(true, 0, null);
        } else if (c === "+") {
            return new WorldCell(false, 0, Colors.RED);
        } else if (c === "-") {
            return  new WorldCell(false, 0, Colors.BLACK);
        } else if (c === ".") {
            return new WorldCell(false, 0, null);
        } else if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(c)) {
            return new WorldCell(false, parseInt(c), null);
        } else {
            throw new WorldParsingError("Value out of legal");
        }
    }

    // static

}