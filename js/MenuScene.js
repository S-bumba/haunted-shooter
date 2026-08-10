class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }

    create() {

        // Background
        this.cameras.main.setBackgroundColor("#050510");

        // Title
        this.add.text(
            this.cameras.main.centerX,
            100,
            "👻 HAUNTED SHOOTER",
            {
                fontSize: "48px",
                color: "#FFD700",
                fontStyle: "bold",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // Subtitle
        this.add.text(
            this.cameras.main.centerX,
            160,
            "Created By BUMBA",
            {
                fontSize: "22px",
                color: "#FFFFFF",
                fontFamily: "Arial"
            }
        ).setOrigin(0.5);

        // PLAY Button
        const playBtn = this.add.text(
            this.cameras.main.centerX,
            300,
            "▶ PLAY",
            {
                fontSize: "38px",
                color: "#00FF00",
                backgroundColor: "#111111",
                padding: {
                    left: 25,
                    right: 25,
                    top: 12,
                    bottom: 12
                }
            }
        ).setOrigin(0.5);

        playBtn.setInteractive({ useHandCursor: true });

        playBtn.on("pointerover", () => {
            playBtn.setScale(1.1);
        });

        playBtn.on("pointerout", () => {
            playBtn.setScale(1);
        });

        playBtn.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

        // Footer
        this.add.text(
            this.cameras.main.centerX,
            670,
            "Version 1.0",
            {
                fontSize: "18px",
                color: "#888888"
            }
        ).setOrigin(0.5);

    }

}