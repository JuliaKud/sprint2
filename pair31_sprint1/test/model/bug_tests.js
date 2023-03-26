
const BUG_TESTS = [
    new Test("bug_01", () => {
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

        let bug = new Bug(1, 1, BugState.Alive, Direction.Right, new Position(1, 1), false, world, null)

        world.setBugAt(bug.getPosition(), bug)
        bug.moveBug()

        if(!(bug.getPosition().toString() === (new Position(2, 1)).toString())) {
            throw new Error("move works bad3" + bug.getPosition().toString())
        }
    }),

    new Test("bug_02", () => {
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

        let bug = new Bug(1, 1, BugState.Alive, Direction.Right, new Position(3, 1), false, world, null)

        world.setBugAt(bug.getPosition(), bug)

        if(!(bug.getPosition().toString() === (new Position(3, 1)).toString())) {
            throw new Error("Error" + bug.getPosition().toString())
        }

        bug.moveBug()
        if(!(bug.getPosition().toString() === (new Position(4, 1)).toString())) {
            throw new Error("move works bad1" + bug.getPosition().toString())
        }

        bug.rotateBug(3)
        if (bug.getDirection() !== Direction.Left) {
            throw new Error("rotate work bad")
        }

        bug.moveBug()
        if(!(bug.getPosition().toString() === (new Position(3, 1)).toString())) {
            throw new Error("move works bad2" + bug.getPosition().toString())
        }

        bug.moveBug()
        if(!(bug.getPosition().toString() === (new Position(2, 1)).toString())) {
            throw new Error("move works bad3" + bug.getPosition().toString())
        }

        bug.takeFood()
        if(!(bug.getHasFood())) {
            throw new Error("bug can't put food")
        }
    }),
];