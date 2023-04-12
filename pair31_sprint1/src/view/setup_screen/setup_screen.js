const COLOR_TO_BRAIN_INPUT_ELEMENT = {};
COLOR_TO_BRAIN_INPUT_ELEMENT[Colors.RED] = document.getElementById("setupScreen__brainOneFile");
COLOR_TO_BRAIN_INPUT_ELEMENT[Colors.BLACK] = document.getElementById("setupScreen__brainTwoFile");

class SetupScreen {
    static onNextButtonPressed() {
        document.getElementById("setupScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = null;
    }

    static onWorldFileChanged(event) {
        if (event.target.value === "" || event.target.value === null || event.target.value === undefined) {
            return;
        }

        WorldParser.parseFile(event.target).then((world) => {
            if (world !== null) {
                console.log("World file loaded successfully.");
                console.log(world.toString());
            }
        }).catch((e) => {
            document.getElementById("setupScreen__worldFile").value = "";
            window.alert(e);
        });
    }

    static onBugBrainFileChanged(event, color) {
        if (event.target.value === "" || event.target.value === null || event.target.value === undefined) {
            return;
        }

        BrainParser.assembleFile(event.target).then((brain) => {
            if (brain !== null) {
                console.log("Bug brain file for color " + color.toString() + " loaded successfully.");
                console.log(brain.toString());
            }
        }).catch((e) => {
            COLOR_TO_BRAIN_INPUT_ELEMENT[color].value = "";
            window.alert(e);
        });
    }
}

document.getElementById("setupScreen__worldFile").onchange = SetupScreen.onWorldFileChanged;

document.getElementById("setupScreen__brainOneFile").onchange = (event) => {
    return SetupScreen.onBugBrainFileChanged(event, Colors.RED);
};
document.getElementById("setupScreen__brainTwoFile").onchange = (event) => {
    return SetupScreen.onBugBrainFileChanged(event, Colors.BLACK);
};

document.getElementById("setupScreen__nextButton").onclick = SetupScreen.onNextButtonPressed;