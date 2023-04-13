class QuitPopUp {
    static onYesButtonPressed() {
    //    handle 'yes' button
    }

    static onNoButtonPressed() {
        document.getElementById("gameScreen").style.display = null;
        document.getElementById("quitPopUp").style.display = "none";
    }
}

document.getElementById("noBtn").onclick = QuitPopUp.onNoButtonPressed
document.getElementById("yesBtn").onclick = QuitPopUp.onYesButtonPressed