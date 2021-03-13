 var config = {
     type: Phaser.AUTO,
     width: 2100,
     height: 800,
     physics: {
         default: 'arcade',
         arcade: {
             gravity: {
                 y: 500
             }
         }
     },
     scene: {
         preload: preload,
         create: create,
         update: update
     }
 };
 var game = new Phaser.Game(config);
 var groundlayer;
 var player;
 var deadPlayer;
 var levelCount = 1;
 var spike;
 var flag;
 var enemy;
 var enemyMaxX = 1775;
 var enemyminX = 670;
 var Deaths = 0;
 var walking;
 var canJump = true;
 var text;
 var mPlatMaxX = 1650;
 var mPlatMaxY = 600;
 var mPlatMinX = 1450;
 var mPlatMinY = 400;

 function preload() {

     //************************Loading tilemap***************************//

     this.load.tilemapTiledJSON('map', 'assets/Map5.json');
     this.load.image('tileset', 'assets/tileset.png', {
         frameWidth: 70,
         frameHeight: 70
     });
     //************************Loading Player***************************//
     this.load.spritesheet('Player', 'assets/ZombiePoses/Player.png', {
         frameWidth: 80,
         frameHeight: 110
     });
     this.load.image('deadPlayer', 'assets/ZombiePoses/Idle.png')
     //************************Loading Enemy***************************//
     this.load.spritesheet('Enemy', 'assets/Damage/enemy.png', {
         frameWidth: 80,
         frameHeight: 110
     });
     //************************Loading Button***************************//
     this.load.image('Button1', 'assets/Platforms/Button1.png');
     this.load.image('Button2', 'assets/Platforms/Button2.png');
     //************************Loading Spikes***************************//
     this.load.spritesheet('Spike', 'assets/Damage/SpikeSpiteSheet.png', {
         frameWidth: 70,
         frameHeight: 30
     });
     this.load.spritesheet('Flags', 'assets/Flag/Flag.png', {
         frameWidth: 120,
         frameHeight: 125
     });
     //************************Loading Sounds***************************//
     this.load.audio('audio_Walking', ['assets/Sound/footstep01.ogg'])
     this.load.audio('Death', ['assets/Sound/Death.mp3'])
     //************************Loading Block***************************//
     this.load.image('Block', 'assets/Platforms/Block.png');
     this.load.image('platMid', 'assets/Platforms/plat_side_mid.png');
     this.load.image('platRight', 'assets/Platforms/plat_side_right.png');
     this.load.image('platLeft', 'assets/Platforms/plat_side_left.png');
     this.load.image('plat_sLeft', 'assets/Platforms/plat_s_left.png');
     this.load.image('plat_sRight', 'assets/Platforms/plat_s_right.png');
     this.load.image('mPlat', 'assets/Platforms/mPlat.png');

 }


 function create() {

     //************************Adding TileMap***************************//
     var map = this.make.tilemap({
         key: 'map'
     });
     var tileset = map.addTilesetImage('tileset');
     groundlayer = map.createStaticLayer('Tile Layer 1', tileset, 0, 0).setInteractive();

     map.setCollisionBetween(1, 25); //Setting Collision of Tilemap//


     block1 = this.add.sprite(1855, 110, 'Block');
     block2 = this.add.sprite(1855, 170, 'Block');
     platMid = this.physics.add.sprite(105, 524, 'platMid');
     platMid2 = this.physics.add.sprite(175, 524, 'platMid');
     platMid3 = this.physics.add.sprite(525, 454, 'platMid');
     platRight = this.physics.add.sprite(245, 524, 'platRight');
     platRight2 = this.physics.add.sprite(595, 454, 'platRight');
     platLeft = this.physics.add.sprite(455, 454, 'platLeft');
     platsLeft = this.physics.add.sprite(805, 384, 'plat_sLeft');
     platsLeft2 = this.physics.add.sprite(1225, 454, 'plat_sLeft');
     platsLeft3 = this.physics.add.sprite(1645, 314, 'plat_sLeft');
     platsRight = this.physics.add.sprite(875, 384, 'plat_sRight');
     platsRight2 = this.physics.add.sprite(1295, 454, 'plat_sRight');
     platsRight3 = this.physics.add.sprite(1715, 314, 'plat_sRight');
     mPlat = this.physics.add.sprite(1450, 400, 'mPlat');
     mPlat2 = this.physics.add.sprite(1050, 400, 'mPlat');
     platMid.body.setAllowGravity(false);
     platMid2.body.setAllowGravity(false);
     platMid3.body.setAllowGravity(false);
     platRight.body.setAllowGravity(false);
     platRight2.body.setAllowGravity(false);
     platLeft.body.setAllowGravity(false);
     platsLeft.body.setAllowGravity(false);
     platsLeft2.body.setAllowGravity(false);
     platsLeft3.body.setAllowGravity(false);
     platsRight.body.setAllowGravity(false);
     platsRight2.body.setAllowGravity(false);
     platsRight3.body.setAllowGravity(false);
     mPlat.body.setAllowGravity(false);
     mPlat2.body.setAllowGravity(false);
     platMid.body.immovable = true
     platMid2.body.immovable = true
     platMid3.body.immovable = true
     platRight.body.immovable = true
     platRight2.body.immovable = true
     platLeft.body.immovable = true
     platsLeft.body.immovable = true
     platsLeft2.body.immovable = true
     platsLeft3.body.immovable = true
     platsRight.body.immovable = true
     platsRight2.body.immovable = true
     platsRight3.body.immovable = true
     mPlat.body.immovable = true
     mPlat2.body.immovable = true


     //************************Adding Player***************************//

     player = this.physics.add.sprite(150, 435, 'Player').setInteractive();
     player.setBounce(0.2);

     this.physics.add.collider(player, groundlayer); //Adding Collision of Player amd Floor//
     this.physics.add.collider(player, platMid);
     this.physics.add.collider(player, platMid2);
     this.physics.add.collider(player, platMid3);
     this.physics.add.collider(player, platRight);
     this.physics.add.collider(player, platRight2);
     this.physics.add.collider(player, platLeft);
     this.physics.add.collider(player, platsLeft);
     this.physics.add.collider(player, platsLeft2);
     this.physics.add.collider(player, platsLeft3);
     this.physics.add.collider(player, platsRight);
     this.physics.add.collider(player, platsRight2);
     this.physics.add.collider(player, platsRight3);
     this.physics.add.collider(player, mPlat);
     this.physics.add.collider(player, mPlat2);

     //************************Adding Enemy***************************//

     enemy = this.physics.add.sprite(700, 575, 'Enemy');
     enemy.setVelocityX(-200);
     this.physics.add.collider(enemy, groundlayer);

     //************************Adding Spikes***************************//

     spike = this.physics.add.sprite(1260, 405, 'Spike').setScale(0.5);
     spike1 = this.physics.add.sprite(316, 620, 'Spike');
     spike2 = this.physics.add.sprite(384, 620, 'Spike');
     this.physics.add.collider(spike, groundlayer);
     this.physics.add.collider(spike1, groundlayer);
     this.physics.add.collider(spike2, groundlayer);


     //************************Adding Flag***************************//

     flag = this.physics.add.sprite(2000, 147, 'Flags');
     this.physics.add.collider(flag, groundlayer);
     this.anims.create({
         key: 'mFlag',
         frames: this.anims.generateFrameNumbers('Flags', {
             start: 0,
             end: 1
         }),
         frameRate: 2,
         repeat: -1
     });

     //************************Button***************************//
     button = this.physics.add.sprite(840, 318, 'Button1');
     //************************Player Death***************************//

     this.physics.add.overlap(player, enemy, killPlayer, null, this);
     this.physics.add.overlap(player, spike, killPlayer, null, this);
     this.physics.add.overlap(player, spike1, killPlayer, null, this);
     this.physics.add.overlap(player, flag, levelUP, null, this);
     this.physics.add.overlap(player, groundlayer, canJump, null, this);


     //**************************Player Animation*********************//
     this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('Player', {
             start: 1,
             end: 2
         }),
         frameRate: 5,
         repeat: 0
     });
     this.anims.create({
         key: 'up',
         frames: [{
             key: 'Player',
             frame: 4
         }],
         frameRate: 1
     });
     this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('Player', {
             start: 5,
             end: 6
         }),
         frameRate: 5,
         repeat: 0
     });

     //***************************Enemy Animation*****************//

     this.anims.create({
         key: 'Mleft',
         frames: this.anims.generateFrameNumbers('Enemy', {
             start: 0,
             end: 1
         }),
         frameRate: 5,
         repeat: -1
     });
     this.anims.create({
         key: 'Mright',
         frames: this.anims.generateFrameNumbers('Enemy', {
             start: 2,
             end: 4
         }),
         frameRate: 5,
         repeat: -1
     });
     //************************Adding Sound***************************//
     this.walking = this.sound.add('audio_Walking');
     this.Death = this.sound.add('Death');

     text = this.add.text(100, 100, 'Deaths: ' + Deaths, {
         fontFamily: 'Anton',
         fontSize: 30
     });

 }

 function update() {
     if (levelCount == 0) {

     }
     //********************************Player Controlls************************//
     if (levelCount == 1) {

         cursors = this.input.keyboard.createCursorKeys();

         if (cursors.left.isDown) {
             player.setVelocityX(-160);
             player.anims.play('left', true);
             this.walking.play();
         } else if (cursors.right.isDown) {
             player.setVelocityX(160);
             player.anims.play('right', true);
         } else {
             player.setVelocityX(0);
         }
         if (cursors.up.isDown && player.body.touching.down) {
             player.setVelocityY(-350);
             player.anims.play('up', true);
             canJump = false;
         } //***********Jump not Fully Working*********//
     }
     if (levelCount == 2) {
         if (cursors.left.isDown) {
             player.setVelocityX(160);
             player.anims.play('right', true);
         } else if (cursors.right.isDown) {
             player.setVelocityX(-160);
             player.anims.play('left', true);
         } else {
             player.setVelocityX(0);
         }
         if (cursors.up.isDown && player.body.touching.down) {
             player.setVelocityY(-330);
             player.anims.play('up', true);

         }
     }
     if (levelCount == 3) {
         groundlayer.once('pointerdown', movePlayer, this);
     }
     if (levelCount == 4) {
         levelCount = 1;
     }
     //************************Enemy Movement***************************//

     if (player.y != enemy.y) {
         if (enemy.x >= enemyMaxX) {
             enemy.setVelocityX(-200);
             enemy.anims.play('Mleft', true);
         } else if (enemy.x <= enemyminX) {
             enemy.setVelocityX(200);
             enemy.anims.play('Mright', true);
         }
     } else if (player.y == enemy.y) {
         if (enemy.x > player.x) {
             enemy.setVelocityX(-1000);
             enemy.anims.play('Mleft', true);
         } else if (enemy.x < player.x) {
             enemy.setVelocityX(1000);
             enemy.anims.play('Mright', true);
         }
     }
     if (mPlat.x >= mPlatMaxX) {
         mPlat.setVelocityX(-100);
     } else if (mPlat.x <= mPlatMinX) {
         mPlat.setVelocityX(100);
     }
     if (mPlat2.y >= mPlatMaxY) {
         mPlat2.setVelocityY(-100);
     } else if (mPlat2.y <= mPlatMinY) {
         mPlat2.setVelocityY(100);
     }


     flag.anims.play('mFlag', true);
     this.physics.add.collider(button, groundlayer);
     this.physics.add.overlap(player, button, pressButton, null, this);
 }
