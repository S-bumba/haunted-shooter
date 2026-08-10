class UIScene extends Phaser.Scene {

    constructor() {
        super("UIScene");
    }

    create() {

        // Score
        this.score = 0;

        this.scoreText = this.add.text(
            20,
            20,
            "SCORE : 0",
            {
                fontSize: "28px",
                fontFamily: "Arial",
                color: "#FFD700"
            }
        ).setScrollFactor(0);

        // Level
        this.level = 1;

        this.levelText = this.add.text(
            20,
            60,
            "LEVEL : 1",
            {
                fontSize: "24px",
                fontFamily: "Arial",
                color: "#FFFFFF"
            }
        ).setScrollFactor(0);

        // Health
        this.health = 100;

        this.healthText = this.add.text(
            20,
            100,
            "HEALTH : 100",
            {
                fontSize: "24px",
                fontFamily: "Arial",
                color: "#00FF00"
            }
        ).setScrollFactor(0);

        // Coins
        this.coins = 0;

        this.coinText = this.add.text(
            20,
            140,
            "COINS : 0",
            {
                fontSize: "24px",
                fontFamily: "Arial",
                color: "#FFD700"
            }
        ).setScrollFactor(0);

        // Watermark
        this.add.text(
            1260,
            690,
            "👑 BUMBA",
            {
                fontSize: "20px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        )
        .setOrigin(1,1)
        .setScrollFactor(0);

    }

    addScore(value){

        this.score += value;

        this.scoreText.setText("SCORE : " + this.score);

    }

    setHealth(value){

        this.health = value;

        this.healthText.setText("HEALTH : " + value);

    }

    addCoin(value){

        this.coins += value;

        this.coinText.setText("COINS : " + this.coins);

    }

    nextLevel(){

        this.level++;

        this.levelText.setText("LEVEL : " + this.level);

    }

}