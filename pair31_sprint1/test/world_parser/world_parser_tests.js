const WORLD_PARSER_TESTS = [
    new Test("world_parser_01", () => {
       const INPUT = "8\n" +
           "9\n" +
           "# # # # # # # #\n" +
           "# 9 9 . . . . #\n" +
           "# 9 # . - - - #\n" +
           "# . # - - - - #\n" +
           "# . . 5 - - - #\n" +
           "# + + + + + 5 #\n" +
           "# + + + + + + #\n" +
           "# + + + + + . #\n" +
           "# # # # # # # #";

       let world = WorldParser.parseString(INPUT);

        if (world.height() !== 9 || world.width() !== 8) {
            throw new Error("height() & width() assertions failed");
        }
    }),

    new Test("world_parser_02", () => {
        const INPUT = "10\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - - - #\n" +
            "# . # - - - - - - #\n" +
            "# . . 5 - - - - - #\n" +
            "# + + + + + 5 . .\n" +
            "# + + + + + + # . #\n" +
            "# + + + + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";

        try {
            let world = WorldParser.parseString(INPUT);
        } catch (e) {
            return;
        }

        throw new Error("Error is not detected");
    }),

    new Test("world_parser_03", () => {
        const INPUT = "9\n" +
            "10\n" +
            "# # # # # # # # # #\n" +
            "# 9 9 . . . . 3 3 #\n" +
            "# 9 # . - - - - - #\n" +
            "# . # - - - - - - #\n" +
            "# + + + + + 5 . . #\n" +
            "# + + + X + + # . #\n" +
            "# + + + + + . # 9 #\n" +
            "# 3 3 . . . . 9 9 #\n" +
            "# # # # # # # # # #";

        try {
            let world = WorldParser.parseString(INPUT);
        } catch (e) {
            return;
        }

        throw new Error("Error is not detected");
    }),
];