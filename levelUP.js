function levelUP() {

    player.x = 150;
    player.y = 350;
    levelCount += 1;
    button2.destroy();
    button = this.physics.add.sprite(840, 318, 'Button1');
    block1 = this.add.sprite(1855, 110, 'Block');
    block2 = this.add.sprite(1855, 170, 'Block');
}
