class BootScene extends Phaser.Scene {

    constructor() {
        super("BootScene");
    }

    preload() {

        // ==========================
        // IMAGES
        // ==========================

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


        // ==========================
		// AUDIO
		// ==========================

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

        // ==========================
        // LOADING TEXT
        // ==========================

        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 30,
            "Loading...",
            {
                fontSize: "30px",
                color: "#FFD700"
            }
        ).setOrigin(0.5);


        const percentText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 20,
            "0%",
            {
                fontSize: "22px",
                color: "#FFFFFF"
            }
        ).setOrigin(0.5);


        // ==========================
        // LOADING PROGRESS
        // ==========================

        this.load.on("progress", (value) => {

            percentText.setText(
                Math.floor(value * 100) + "%"
            );

        });


        // ==========================
        // LOAD COMPLETE
        // ==========================

        this.load.on("complete", () => {

            loadingText.destroy();
            percentText.destroy();

        });

    }


    create() {

        console.log("==========================");
        console.log("Assets Loaded Successfully");
        console.log("==========================");


        // ==========================
        // CHECK ASSETS
        // ==========================

        console.log(
            "Player     :",
            this.textures.exists("player")
        );

        console.log(
            "Gun        :",
            this.textures.exists("gun")
        );

        console.log(
            "Bat        :",
            this.textures.exists("bat")
        );

        console.log(
            "Witch      :",
            this.textures.exists("witch")
        );

        console.log(
            "Fire       :",
            this.textures.exists("fire")
        );

        console.log(
            "Background :",
            this.textures.exists("background")
        );


        // ==========================
        // START MENU
        // ==========================

        this.scene.start("MenuScene");

    }

}