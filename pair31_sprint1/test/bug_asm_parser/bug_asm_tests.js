const BUG_ASM_TESTS = [
    new Test("bug_asm_01", () => {
        const INPUT = "sense ahead 1 3 food ; [ 0]\n" +
            "move 2 0 ; [ 1]\n" +
            "pickup 8 0 ; [ 2]\n" +
            "flip 3 4 5 ; [ 3]\n" +
            "turn left 0 ; [ 4]\n" +
            "flip 2 6 7 ; [ 5]\n" +
            "turn right 0 ; [ 6]\n" +
            "move 0 3 ; [ 7]\n" +
            "sense ahead 9 11 home ; [ 8]\n" +
            "move 10 8 ; [ 9]\n" +
            "drop 0 ; [ 10]\n" +
            "flip 3 12 13 ; [ 11]\n" +
            "turn left 8 ; [ 12]\n" +
            "flip 2 14 15 ; [ 13]\n" +
            "turn right 8 ; [ 14]\n" +
            "move 8 11 ; [ 15]";

        let brain = BrainParser.assemble(INPUT);

        if (brain.length !== 16) {
            throw new Error("length assertion failed");
        }
    }),

    new Test("bug_asm_02", () => {
        const INPUT = "move 1 0; [0]\n" +
            "sense ahead 2 1 food ; [ 1]\n" +
            "move 3 0 ; [ 2]\n" +
            "pickup 4 0 ; [ 3]\n" +
            "turn left 5 ; [ 4]\n" +
            "turn left 6 ; [ 5]\n" +
            "turn left 7 ; [6]\n" +
            "move 8 0 ; [7]\n" +
            "move 9 0 ; [8]\n" +
            "drop 10 ; [9]\n" +
            "turn right 11 ; [10]\n" +
            "turn right 12 ; [11]\n" +
            "turn right 0; [12]";

        let brain = BrainParser.assemble(INPUT);

        if (brain.length !== 13) {
            throw new Error("length assertion failed");
        }
    }),

    new Test("bug_asm_03", () => {
        const INPUT = "sense unrecognizable_word 1 3 food ; [ 0]\n" +
            "move 2 0 ; [ 1]\n" +
            "pickup 8 0 ; [ 2]\n" +
            "flip 3 4 5 ; [ 3]\n" +
            "turn left 0 ; [ 4]\n" +
            "flip 2 6 7 ; [ 5]\n" +
            "turn right 0 ; [ 6]\n" +
            "move 0 3 ; [ 7]\n" +
            "sense ahead 9 11 home ; [ 8]\n" +
            "move 10 8 ; [ 9]\n" +
            "drop 0 ; [10]\n" +
            "flip 3 12 13 ; [11]\n" +
            "turn left 8 ; [12]\n" +
            "flip 2 14 15 ; [13]\n" +
            "turn right 8 ; [14]\n" +
            "move 8 11 ; [15]";

        try {
            let brain = BrainParser.assemble(INPUT);
        } catch (e) {
            if (e.message === "Invalid direction") {
                return;
            }
        }

        throw new Error("Error is not detected");
    }),

    new Test("bug_asm_04", () => {
        const INPUT = "sense ahead 1 3 food ; [ 0]\n" +
            "move 2 0 ; [ 1]\n" +
            "pickup 8 0 ; [ 2]\n" +
            "flip 3 4 5 ; [ 3]\n" +
            "turn left 0 ; [ 4]\n" +
            "flip 2 6 1223674 ; [ 5]\n" +
            "turn right 0 ; [ 6]\n" +
            "move 0 3 ; [ 7]\n" +
            "sense ahead 9 11 home ; [ 8]\n" +
            "move 10 8 ; [ 9]\n" +
            "drop 0 ; [10]\n" +
            "flip 3 12 13 ; [11]\n" +
            "turn left 8 ; [12]\n" +
            "flip 2 14 15 ; [13]\n" +
            "turn right 8 ; [14]\n" +
            "move 8 11 ; [15]";

        try {
            let brain = BrainParser.assemble(INPUT);
        } catch (e) {
            if (e.message === "Invalid label") {
                return;
            }
        }

        throw new Error("Error is not detected");
    }),

    new Test("bug_asm_05", () => {
        const INPUT = "sense ahead 1 3 food ; [ 0]\n" +
            "move 2 ; [ 1] absent value\n" +
            "pickup 8 0 ; [ 2]\n" +
            "flip 3 4 5 ; [ 3]\n" +
            "turn left 0 ; [ 4]\n" +
            "flip 2 6 7 ; [ 5]\n" +
            "turn right 0 ; [ 6]\n" +
            "move 0 3 ; [ 7]\n" +
            "sense ahead 9 11 home ; [ 8]\n" +
            "move 10 8 ; [ 9]\n" +
            "drop 0 ; [10]\n" +
            "flip 3 12 13 ; [11]\n" +
            "turn left 8 ; [12]\n" +
            "flip 2 14 15 ; [13]\n" +
            "turn right 8 ; [14]\n" +
            "move 8 11 ; [15]";

        try {
            let brain = BrainParser.assemble(INPUT);
        } catch (e) {
            if (e.message === "Invalid label") {
                return;
            }
        }

        throw new Error("Error is not detected");
    }),

    new Test("bug_asm_06", () => {
        const INPUT = "mv 1 0; [0]\n" +
            "sense ahead 2 1 food ; [ 1]\n" +
            "move 3 0 ; [ 2]\n" +
            "pickup 4 0 ; [ 3]\n" +
            "turn left 5 ; [ 4]\n" +
            "turn left 6 ; [ 5]\n" +
            "turn left 7 ; [6]\n" +
            "move 8 0 ; [7]\n" +
            "move 9 0 ; [8]\n" +
            "drop 10 ; [9]\n" +
            "turn right 11 ; [10]\n" +
            "turn right 12 ; [11]\n" +
            "turn right 0; [12]";

        try {
            let brain = BrainParser.assemble(INPUT);
        } catch (e) {
            if (e.message === "Unknown command") {
                return;
            }
        }

        throw new Error("Error is not detected");
    }),
];