class WelcomeScreen {
    static onStartButtonPressed() {
        document.getElementById("welcomeScreen").style.display = "none";
        document.getElementById("setupScreen").style.display = null;
    }
}

document.getElementById("welcomeScreen__startButton").onclick = WelcomeScreen.onStartButtonPressed