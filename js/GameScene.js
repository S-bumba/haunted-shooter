class GameScene extends Phaser.Scene {

    constructor() {

        super("GameScene");

        // Player
        this.player = null;
        this.gun = null;

        // Controls
        this.keys = null;

        // Groups
        this.bullets = null;
        this.enemies = null;
		this.witches = null;
		
		// ==========================
		// SNAKE GROUP
		// ==========================

		this.snakes = null;

        // Sounds
        this.fireSound = null;
        this.hitSound = null;

        // Game
        this.score = 0;
        this.playerSpeed = 280;
		
		// ==========================
		// LEVEL SYSTEM
		// ==========================

		this.level = 1;

		this.forwardSpeed = 80;

		this.levelTargetX = 12000;

		this.levelComplete = false;
		
		// ==========================
		// LEVEL 2 SETTINGS
		// ==========================

		this.level2Speed = 110;
		this.level2TargetX = 12000;
		
		// ==========================
		// COIN SYSTEM
		// ==========================

		this.coins = 0;
		
		// ==========================
		// JUMP SYSTEM
		// ==========================

		this.jumpVelocity = 0;
		this.gravity = 900;
		this.isJumping = false;
		this.groundY = 0;
		
		// ==========================
		// PLAYER HEALTH / LIVES
		// ==========================

		this.playerLives = 3;
		this.playerInvulnerable = false;
		this.gameOver = false;

        // Shooting
        this.lastShot = 0;
        this.fireRate = 150;

    }

    create() {


		// ==========================
		// GAME BACKGROUND
		// ==========================

		// Long scrolling background
		this.backgrounds = [];

		for (let x = 640; x < 12000; x += 1280) {

			const bg = this.add.image(
				x,
				360,
				"background"
			);

			bg.setDisplaySize(
				1280,
				720
			);

			bg.setDepth(-100);

			this.backgrounds.push(bg);
		}


		// ==========================
		// CAMERA BACKGROUND COLOR
		// ==========================

		this.cameras.main.setBackgroundColor(
			"#101020"
		);


		// ==========================
		// PHYSICS WORLD BOUNDS
		// ==========================

		this.physics.world.setBounds(
			0,
			0,
			12000,
			720
		);

		// তারপর Sounds...

        // ==========================
		// Sounds
		// ==========================

		this.fireSound = this.sound.add("shoot_new", {
			volume: 1
		});

		this.hitSound = this.sound.add("hit_new", {
			volume: 1
		});

		this.laserSound = this.sound.add("laser_new", {
			volume: 1
		});

		console.log(
			"SHOOT SOUND LOADED:",
			this.cache.audio.exists("shoot_new")
		);

		console.log(
			"HIT SOUND LOADED:",
			this.cache.audio.exists("hit_new")
		);

		console.log(
			"LASER SOUND LOADED:",
			this.cache.audio.exists("laser_new")
		);

        // ==========================
        // Player
        // ==========================

        this.player = this.physics.add.sprite(
            220,
            360,
            "player"
        );

        this.player.setScale(0.20);

        this.player.setCollideWorldBounds(true);
		console.log(this.player.body);

        this.player.setDepth(10);
		
		// ==========================
		// PLAYER COLLISION BODY
		// ==========================

		this.player.body.setSize(
			this.player.body.width * 0.55,
			this.player.body.height * 0.65
		);

		this.player.body.setOffset(
			this.player.body.width * 0.40,
			this.player.body.height * 0.25
		);
		
		// ==========================
		// CAMERA FOLLOW PLAYER
		// ==========================

		this.cameras.main.startFollow(
			this.player,
			true,
			0.08,
			0.08
		);

		this.cameras.main.setBounds(
			0,
			0,
			12000,
			720
		);
		
		// ==========================
		// JUMP SETTINGS
		// ==========================

		this.groundY = this.player.y;

		this.jumpVelocity = 0;

		this.isJumping = false;

        // ==========================
		// Gun
		// ==========================

		this.gun = this.add.image(
			this.player.x,
			this.player.y,
			"gun"
		);

		this.gun.setScale(0.10);

		this.gun.setOrigin(0.15, 0.5);

		this.gun.setDepth(20);


		// ==========================
		// PC JUMP KEY
		// ==========================

		this.jumpKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);


		// ==========================
		// MOBILE JUMP BUTTON
		// ==========================

		this.jumpButton = this.add.text(
			1120,
			610,
			"JUMP",
			{
				fontSize: "24px",
				fontStyle: "bold",
				color: "#FFFFFF",
				backgroundColor: "#222222",
				padding: {
					left: 20,
					right: 20,
					top: 14,
					bottom: 14
				}
			}
		)
		.setOrigin(0.5)
		.setScrollFactor(0)
		.setDepth(1000)
		.setInteractive({
			useHandCursor: true
		});

		this.jumpButton.on("pointerdown", () => {

			this.playerJump();

		});

        // ==========================
		// Camera
		// ==========================

		// Camera follow OFF

        // ==========================
		// KEYBOARD CONTROLS
		// ==========================

		this.keys = this.input.keyboard.addKeys({

			W: Phaser.Input.Keyboard.KeyCodes.W,
			S: Phaser.Input.Keyboard.KeyCodes.S,
			A: Phaser.Input.Keyboard.KeyCodes.A,
			D: Phaser.Input.Keyboard.KeyCodes.D

		});

		this.input.keyboard.enabled = true;

        // ==========================
        // Bullet Group
        // ==========================

        this.bullets = this.physics.add.group();

        // ==========================
        // Enemy Group
        // ==========================

        this.enemies = this.physics.add.group();
		this.witches = this.physics.add.group();
		
		// ==========================
		// SNAKE GROUP
		// ==========================

		this.snakes = this.physics.add.group();
		
		// ==========================
		// LEVEL 1 SNAKES
		// ==========================

		this.spawnSnake(2200, 580);
		this.spawnSnake(3800, 600);
		this.spawnSnake(5400, 570);
		this.spawnSnake(7000, 610);
		this.spawnSnake(8500, 580);
		this.spawnSnake(10000, 600);
		
		// ==========================
		// LEVEL 1 TARGET POINT
		// ==========================

		this.targetPoint = this.add.rectangle(
			this.levelTargetX,
			360,
			80,
			600,
			0xffd700,
			0.25
		);

		this.targetPoint.setStrokeStyle(
			5,
			0xffd700,
			1
		);

		this.targetPoint.setDepth(5);

		this.add.text(
			this.levelTargetX - 150,
			80,
			"LEVEL 1 TARGET",
			{
				fontSize: "28px",
				color: "#FFD700",
				fontStyle: "bold"
			}
		).setDepth(10);
				
		
		
		// ==========================
		// Mouse Aim
		// ==========================

		this.input.on("pointermove", (pointer) => {

			this.gun.x = this.player.x + 18;
			this.gun.y = this.player.y;

			this.gun.rotation = Phaser.Math.Angle.Between(

				this.gun.x,
				this.gun.y,
				pointer.worldX,
				pointer.worldY

			);

		});

        // ==========================
        // Mouse Shoot
        // ==========================

        this.input.on(

            "pointerdown",

            this.shoot,

            this

        );

        // ==========================
        // UI
        // ==========================

        this.levelText = this.add.text(

            20,
            20,

            "LEVEL 1",

            {

                fontSize: "28px",

                color: "#FFD700"

            }

        ).setScrollFactor(0);

        this.scoreText = this.add.text(

            20,
            60,

            "SCORE : 0",

            {

                fontSize: "24px",

                color: "#FFFFFF"

            }

        ).setScrollFactor(0);
		
		// ==========================
		// COIN UI
		// ==========================

		this.coinText = this.add.text(
			20,
			130,
			"🪙 COINS : 0",
			{
				fontSize: "24px",
				color: "#FFD700",
				fontStyle: "bold"
			}
		).setScrollFactor(0);
		
		// ==========================
		// PLAYER LIFE UI
		// ==========================

		this.lifeText = this.add.text(
			20,
			95,
			"❤️ LIFE : 3",
			{
				fontSize: "24px",
				color: "#FF3333",
				fontStyle: "bold"
			}
		).setScrollFactor(0);

        // ==========================
        // Spawn Enemies
        // ==========================

        for (let i = 0; i < 5; i++) {
			this.spawnEnemy();
		}

		for (let i = 0; i < 2; i++) {
			this.spawnWitch();
		}
        // ==========================
        // Physics Collision
        // ==========================

        this.physics.add.overlap(

            this.bullets,

            this.enemies,

            this.hitEnemy,

            null,

            this

        );

        this.physics.add.overlap(

            this.player,

            this.enemies,

            this.playerHit,

            null,

            this

        );
		
		this.physics.add.overlap(
			this.bullets,
			this.witches,
			this.hitWitch,
			null,
			this
		);
		
		// ==========================
		// BULLET HIT SNAKE COLLISION
		// ==========================

		this.physics.add.overlap(
			this.bullets,
			this.snakes,
			this.hitSnake,
			null,
			this
		);

		// ==========================
		// PLAYER HIT BY WITCH
		// ==========================

		this.physics.add.overlap(
			this.player,
			this.witches,
			this.playerHitByWitch,
			null,
			this
		);

		// ==========================
		// END CREATE()
		// ==========================

		}
		
		// ==========================
		// BULLET HIT SNAKE
		// ==========================

		hitSnake(bullet, snake) {

			if (!bullet || !bullet.active) {
				return;
			}

			if (!snake || !snake.active) {
				return;
			}

			if (this.hitSound) {
				this.hitSound.play();
			}

			// Remove bullet
			bullet.destroy();

			// Remove snake
			snake.destroy();

			// ==========================
			// SCORE
			// ==========================

			this.score += 40;

			if (this.scoreText) {
				this.scoreText.setText(
					"SCORE : " + this.score
				);
			}

			// ==========================
			// COIN +3
			// ==========================

			this.coins += 3;

			if (this.coinText) {
				this.coinText.setText(
					"🪙 COINS : " + this.coins
				);
			}

			console.log("SNAKE KILLED → +3 COINS");
		}


		// ==========================
		// PLAYER HIT BY WITCH
		// ==========================

		playerHitByWitch(player, witch) {

			if (this.gameOver) {
				return;
			}

			if (!player || !player.active) {
				return;
			}

			if (!witch || !witch.active) {
				return;
			}

			console.log("PLAYER HIT BY WITCH");

			if (this.hitSound) {
				this.hitSound.play();
			}

			// Remove witch
			witch.destroy();

			// Reduce life
			this.playerLives--;

			console.log(
				"PLAYER LIFE:",
				this.playerLives
			);

			// Update Life UI
			if (this.lifeText) {
				this.lifeText.setText(
					"❤️ LIFE : " + this.playerLives
				);
			}

			// Game Over
			if (this.playerLives <= 0) {
				this.gameOver();
			}
		}


		
	
		// ==========================
		// SHOOT
		// ==========================

		shoot(pointer) {

			console.log("================================");
			console.log("SHOOT FUNCTION CALLED");

			const now = this.time.now;

			if (now - this.lastShot < this.fireRate) {
				return;
			}

			this.lastShot = now;

		// ==========================
		// SHOOT SOUND
		// ==========================

		console.log("FIRE SOUND OBJECT:", this.fireSound);

		if (this.fireSound) {

			console.log("PLAYING SHOOT SOUND");

			this.fireSound.stop();

			this.fireSound.play({
				volume: 1
			});

		} else {

			console.error("FIRE SOUND NOT FOUND!");

		}

		// ==========================
		// CREATE BULLET
		// ==========================

		const bullet = this.bullets.create(
			this.gun.x,
			this.gun.y,
			"fire"
		);

		bullet.setScale(0.06);
		bullet.setDepth(15);

		bullet.body.allowGravity = false;

		bullet.rotation = this.gun.rotation;

		// ==========================
		// BULLET VELOCITY
		// ==========================

		this.physics.velocityFromRotation(
			this.gun.rotation,
			900,
			bullet.body.velocity
		);

		console.log(
			"BULLET:",
			bullet.x,
			bullet.y,
			bullet.body.velocity.x,
			bullet.body.velocity.y
		);

	}

		// ==========================
		// SPAWN ENEMY
		// ==========================

		spawnEnemy() {

			const enemy = this.physics.add.sprite(

				Phaser.Math.Between(900, 1250),

				Phaser.Math.Between(80, 650),

				"bat"

			);

			enemy.setScale(0.50);

			enemy.setDepth(5);

			enemy.setCollideWorldBounds(true);

			// ==========================
			// Smaller collision body
			// ==========================

			enemy.body.setSize(
				enemy.body.width * 0.55,
				enemy.body.height * 0.55
			);

			enemy.body.setOffset(
				enemy.body.width * 0.40,
				enemy.body.height * 0.40
			);

			// Add to enemy group
			this.enemies.add(enemy);

		}


		// ==========================
		// SPAWN WITCH
		// ==========================

		spawnWitch() {

			const witch = this.physics.add.sprite(

				Phaser.Math.Between(900, 1250),

				Phaser.Math.Between(80, 650),

				"witch"

			);

			// Witch size
			witch.setScale(0.08);

			witch.setDepth(6);

			witch.setCollideWorldBounds(true);

			// ==========================
			// Smaller collision body
			// ==========================

			witch.body.setSize(
				witch.body.width * 0.55,
				witch.body.height * 0.55
			);

			witch.body.setOffset(
				witch.body.width * 0.40,
				witch.body.height * 0.40
			);

			// Add to witch group
			this.witches.add(witch);

		}
		
		// ==========================
		// SPAWN SNAKE
		// ==========================

		spawnSnake(x, y) {

			const snake = this.snakes.create(
				x,
				y,
				"snake"
			);

			snake.setScale(0.12);

			snake.setDepth(10);

			snake.setCollideWorldBounds(true);

			snake.body.setAllowGravity(false);

			return snake;
		}
		
		// ==========================
		// BULLET HIT ENEMY
		// ==========================

		hitEnemy(bullet, enemy) {

			if (this.hitSound) {
				this.hitSound.play();
			}

			// Remove bullet
			bullet.destroy();

			// Remove bat
			enemy.destroy();

		// ==========================
		// SCORE
		// ==========================

		this.score += 10;

		this.scoreText.setText(
			"SCORE : " + this.score
		);

		// ==========================
		// COIN +1
		// ==========================

		this.coins += 1;

		this.coinText.setText(
			"🪙 COINS : " + this.coins
		);

		console.log(
			"BAT KILLED → +1 COIN"
		);

		// Spawn new bat
		this.spawnEnemy();

	}
	
	// ==========================
	// BULLET HIT WITCH
	// ==========================

	hitWitch(bullet, witch) {

		if (this.hitSound) {
			this.hitSound.play();
		}

		// Remove bullet
		bullet.destroy();

		// Remove witch
		witch.destroy();

		// ==========================
		// SCORE
		// ==========================

		this.score += 25;

		this.scoreText.setText(
			"SCORE : " + this.score
		);

		// ==========================
		// COIN +2
		// ==========================

		this.coins += 2;

		this.coinText.setText(
			"🪙 COINS : " + this.coins
		);

		console.log(
			"WITCH KILLED → +2 COINS"
		);

		// Spawn new witch
		this.spawnWitch();

	}

    // ==========================
	// PLAYER HIT
	// ==========================

	playerHit(player, enemy) {

		// Already Game Over হলে আর কিছু করবে না
		if (this.gameOver) {
			return;
		}

		// Invulnerable থাকলে hit count হবে না
		if (this.playerInvulnerable) {
			return;
		}

		console.log("PLAYER HIT");

		// ==========================
		// REMOVE ENEMY
		// ==========================

		if (enemy && enemy.active) {
			enemy.destroy();
		}

		// ==========================
		// LIFE -1
		// ==========================

		this.playerLives--;

		console.log(
			"PLAYER LIFE:",
			this.playerLives
		);

		// ==========================
		// UPDATE LIFE UI
		// ==========================

		this.lifeText.setText(
			"❤️ LIFE : " + this.playerLives
		);

		// ==========================
		// GAME OVER
		// ==========================

		if (this.playerLives <= 0) {

			this.playerLives = 0;

			this.gameOver = true;

			this.lifeText.setText(
				"❤️ LIFE : 0"
			);

			console.log("GAME OVER");

			this.showGameOver();

			return;
		}

		// ==========================
		// TEMPORARY INVULNERABILITY
		// ==========================

		this.playerInvulnerable = true;

		// Player blink
		this.tweens.add({
			targets: this.player,
			alpha: 0.3,
			duration: 120,
			yoyo: true,
			repeat: 8
		});

		// 2 seconds protection
		this.time.delayedCall(2000, () => {

			this.playerInvulnerable = false;

			if (this.player && this.player.active) {
				this.player.setAlpha(1);
			}

		});

	}


	// ==========================
	// SHOW GAME OVER
	// ==========================

	showGameOver() {

		console.log("SHOWING GAME OVER");

		// Stop physics
		this.physics.pause();

		// Stop player
		if (this.player && this.player.body) {
			this.player.body.stop();
		}

		// ==========================
		// DARK OVERLAY
		// ==========================

		const overlay = this.add.rectangle(
			640,
			360,
			1280,
			720,
			0x000000,
			0.75
		);

		overlay.setDepth(100);

		// ==========================
		// GAME OVER
		// ==========================

		const gameOverText = this.add.text(
			640,
			230,
			"GAME OVER",
			{
				fontSize: "64px",
				fontStyle: "bold",
				color: "#FF0000",
				stroke: "#000000",
				strokeThickness: 8
			}
		);

		gameOverText
			.setOrigin(0.5)
			.setDepth(101);

		// ==========================
		// FINAL SCORE
		// ==========================

		const finalScoreText = this.add.text(
			640,
			330,
			"FINAL SCORE : " + this.score,
			{
				fontSize: "30px",
				fontStyle: "bold",
				color: "#FFFFFF"
			}
		);

		finalScoreText
			.setOrigin(0.5)
			.setDepth(101);

		// ==========================
		// PLAY AGAIN BUTTON
		// ==========================

		const playAgainButton = this.add.rectangle(
			640,
			440,
			260,
			70,
			0x00AA44,
			1
		);

		playAgainButton
			.setDepth(101)
			.setInteractive({
				useHandCursor: true
			});

		const playAgainText = this.add.text(
			640,
			440,
			"PLAY AGAIN",
			{
				fontSize: "30px",
				fontStyle: "bold",
				color: "#FFFFFF"
			}
		);

		playAgainText
			.setOrigin(0.5)
			.setDepth(102);

		// ==========================
		// BUTTON HOVER
		// ==========================

		playAgainButton.on("pointerover", () => {

			playAgainButton.setFillStyle(
				0x00DD55,
				1
			);

			playAgainText.setScale(1.05);

		});

		playAgainButton.on("pointerout", () => {

			playAgainButton.setFillStyle(
				0x00AA44,
				1
			);

			playAgainText.setScale(1);

		});

		// ==========================
		// PLAY AGAIN CLICK
		// ==========================

		playAgainButton.on("pointerdown", () => {

			console.log("PLAY AGAIN CLICKED");

			this.scene.restart();

		});
		
	}
	
		/// ==========================
		// PLAYER JUMP
		// ==========================

		playerJump() {

			// Already in air
			if (this.isJumping) {
				return;
			}

			this.isJumping = true;

			// Jump strength
			this.jumpVelocity = -430;
		}
	
	// ==========================
	// UPDATE
	// ==========================

	update() {

		// ==========================
		// PLAYER MOVEMENT
		// ==========================

		let moveX = 0;

		if (this.keys.A.isDown) {
			moveX = -1;
		}

		if (this.keys.D.isDown) {
			moveX = 1;
		}

		// Move player directly
		this.player.x += moveX * this.playerSpeed / 60;
		
		// ==========================
		// AUTO FORWARD MOVEMENT
		// ==========================

		if (!this.levelComplete) {

			this.player.x += this.forwardSpeed / 60;

		}


		// ==========================
		// LEVEL TARGET CHECK
		// ==========================

		if (
			this.player.x >= this.levelTargetX &&
			!this.levelComplete
		) {

			this.levelComplete = true;

			// Stop forward movement
			this.forwardSpeed = 0;

			console.log("LEVEL 1 COMPLETE!");

			// ==========================
			// LEVEL COMPLETE SCREEN
			// ==========================

			this.add.rectangle(
				640,
				360,
				1280,
				720,
				0x000000,
				0.65
			)
			.setScrollFactor(0)
			.setDepth(100);

			this.add.text(
				640,
				300,
				"LEVEL 1 COMPLETE!",
				{
					fontSize: "52px",
					fontStyle: "bold",
					color: "#FFD700",
					stroke: "#000000",
					strokeThickness: 8
				}
			)
			.setOrigin(0.5)
			.setScrollFactor(0)
			.setDepth(101);

			this.add.text(
				640,
				380,
				"TARGET REACHED",
				{
					fontSize: "28px",
					fontStyle: "bold",
					color: "#FFFFFF"
				}
			)
			.setOrigin(0.5)
			.setScrollFactor(0)
			.setDepth(101);

		}
		

		// ==========================
		// PC SPACE JUMP
		// ==========================

		if (
			Phaser.Input.Keyboard.JustDown(this.jumpKey)
		) {
			this.playerJump();
		}


		// ==========================
		// JUMP PHYSICS
		// ==========================

		if (this.isJumping) {

			this.jumpVelocity += this.gravity / 60;

			this.player.y += this.jumpVelocity / 60;

			// Ground
			if (this.player.y >= this.groundY) {

				this.player.y = this.groundY;

				this.jumpVelocity = 0;

				this.isJumping = false;

			}
		}
		

		// ==========================
		// KEEP PLAYER INSIDE GAME
		// ==========================

		this.player.x = Phaser.Math.Clamp(
			this.player.x,
			50,
			this.levelTargetX
		);

		this.player.y = Phaser.Math.Clamp(
			this.player.y,
			50,
			670
		);

		// ==========================
		// GUN FOLLOW
		// ==========================

		this.gun.x = this.player.x + 18;
		this.gun.y = this.player.y;

		// ==========================
		// ENEMY FOLLOW PLAYER
		// ==========================

		this.enemies.children.each((enemy) => {

			if (!enemy.active) return;

			this.physics.moveToObject(
				enemy,
				this.player,
				90
			);

		});
		
		// ==========================
		// SNAKE FOLLOW PLAYER
		// ==========================

		this.snakes.children.each((snake) => {

			if (!snake.active) return;

			this.physics.moveToObject(
				snake,
				this.player,
				65
			);

		});

		// ==========================
		// WITCH FOLLOW PLAYER
		// ==========================

		this.witches.children.each((witch) => {

			if (!witch.active) return;

			this.physics.moveToObject(
				witch,
				this.player,
				75
			);

		});

		// ==========================
		// BULLET CLEANUP
		// ==========================

		this.bullets.children.each((bullet) => {

			if (!bullet.active) return;

			if (
				bullet.x < -100 ||
				bullet.x > 1380 ||
				bullet.y < -100 ||
				bullet.y > 820
			) {
				bullet.destroy();
			}

		});

	}

		}