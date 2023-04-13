class GameScreen {
    static onQuitButtonPressed() {
        document.getElementById("gameScreen").style.display = "none";
        document.getElementById("quitPopUp").style.display = null;
    }
}

document.getElementById("quitBtn").onclick = GameScreen.onQuitButtonPressed