/* ==========================================
   HAUNTED SHOOTER
   main.js
   Developer : BUMBA
========================================== */

window.addEventListener("load", () => {

    // Hide HTML Loading Screen
    const loading = document.getElementById("loading-screen");

    if (loading) {
        loading.style.display = "none";
    }

    // Start Phaser Game
    new Phaser.Game(config);

});