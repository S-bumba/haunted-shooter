/* ==========================================
   HAUNTED SHOOTER
   config.js
   Version : 2.0
   Developer : BUMBA
========================================== */

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const config = {

    // ==========================
    // PHASER
    // ==========================

    type: Phaser.AUTO,

    parent: "game-container",

    backgroundColor: "#050510",


    // ==========================
    // RESPONSIVE SCALE
    // ==========================

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH,

        width: GAME_WIDTH,

        height: GAME_HEIGHT

    },


    // ==========================
    // PHYSICS
    // ==========================

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 0
            },

            debug: false,

            fps: 60

        }

    },


    // ==========================
    // RENDER
    // ==========================

    render: {

        pixelArt: false,

        antialias: true

    },


    // ==========================
    // AUDIO
    // ==========================

    audio: {

        disableWebAudio: false

    },


    // ==========================
    // SCENES
    // ==========================

    scene: [

        BootScene,

        MenuScene,

        GameScene,

        UIScene

    ]

};


// ==========================
// START GAME
// ==========================

const game = new Phaser.Game(config);
