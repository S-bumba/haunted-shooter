class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        // =====================================================
        // LOADING UI
        // =====================================================

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        const loadingText = this.add.text(
            centerX,
            centerY - 70,
            "HAUNTED SHOOTER",
            {
                fontSize: "32px",
                fontFamily: "Arial",
                color: "#FFD700",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        const statusText = this.add.text(
            centerX,
            centerY - 25,
            "Loading assets...",
            {
                fontSize: "20px",
                fontFamily: "Arial",
                color: "#FFFFFF"
            }
        ).setOrigin(0.5);

        const percentText = this.add.text(
            centerX,
            centerY + 25,
            "0%",
            {
                fontSize: "24px",
                fontFamily: "Arial",
                color: "#00FF00"
            }
        ).setOrigin(0.5);


        // =====================================================
        // LOADING BAR
        // =====================================================

        const barWidth = 400;
        const barHeight = 25;

        const barBackground = this.add.rectangle(
            centerX,
            centerY + 70,
            barWidth,
            barHeight,
            0x222222
        );

        const progressBar = this.add.rectangle(
            centerX - barWidth / 2,
            centerY + 70,
            0,
            barHeight,
            0x00ff00
        ).setOrigin(0, 0.5);


        // =====================================================
        // IMAGES
        // =====================================================

        this.load.image(
            "player",
            "assets/images/player_new.png"
        );

        this.load.image(
            "gun",
            "assets/images/gun_new.png"
        );

        this.load.image(
            "bat",
            "assets/images/bat.png"
        );

        this.load.image(
            "witch",
            "assets/images/witch_new.png"
        );

        this.load.image(
            "fire",
            "assets/images/fire_new.png"
        );

        this.load.image(
            "background",
            "assets/images/background.png"
        );

        this.load.image(
            "snake",
            "assets/images/snake.png"
        );


        // =====================================================
        // AUDIO
        // =====================================================

        this.load.audio(
            "laser_new",
            "assets/audio/laser_new.wav"
        );

        this.load.audio(
            "shoot_new",
            "assets/audio/shoot_new.wav"
        );

        this.load.audio(
            "hit_new",
            "assets/audio/hit_new.wav"
        );


        // =====================================================
        // LOADING PROGRESS
        // =====================================================

        this.load.on("progress", (value) => {

            const percent = Math.floor(value * 100);

            percentText.setText(percent + "%");

            progressBar.width = barWidth * value;

            statusText.setText(
                "Loading assets... " + percent + "%"
            );

        });


        // =====================================================
        // FILE LOAD ERROR
        // =====================================================

        this.load.on("loaderror", (file) => {

            console.error(
                "ASSET LOAD ERROR:",
                file.key,
                file.src
            );

            statusText.setText(
                "ERROR: " + file.key
            );

            statusText.setColor("#FF0000");

        });


        // =====================================================
        // COMPLETE
        // =====================================================

        this.load.on("complete", () => {

            console.log("==============================");
            console.log("HAUNTED SHOOTER");
            console.log("All assets loading completed.");
            console.log("==============================");

            loadingText.destroy();
            statusText.destroy();
            percentText.destroy();
            barBackground.destroy();
            progressBar.destroy();

        });

    }


    create() {

        // =====================================================
        // ASSET CHECK
        // =====================================================

        console.log("========== ASSET CHECK ==========");

        console.log(
            "Player:",
            this.textures.exists("player")
        );

        console.log(
            "Gun:",
            this.textures.exists("gun")
        );

        console.log(
            "Bat:",
            this.textures.exists("bat")
        );

        console.log(
            "Witch:",
            this.textures.exists("witch")
        );

        console.log(
            "Fire:",
            this.textures.exists("fire")
        );

        console.log(
            "Background:",
            this.textures.exists("background")
        );

        console.log(
            "Snake:",
            this.textures.exists("snake")
        );

        console.log("================================");


        // =====================================================
        // CHECK AUDIO
        // =====================================================

        console.log(
            "Laser:",
            this.cache.audio.exists("laser_new")
        );

        console.log(
            "Shoot:",
            this.cache.audio.exists("shoot_new")
        );

        console.log(
            "Hit:",
            this.cache.audio.exists("hit_new")
        );


        // =====================================================
        // START MENU
        // =====================================================

        console.log("Starting MenuScene...");

        this.scene.start("MenuScene");

    }

}


// =========================================================
// EXPORT
// =========================================================

if (typeof module !== "undefined" && module.exports) {
    module.exports = BootScene;
}
