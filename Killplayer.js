function killPlayer(player, enemy) {
    deadPlayer = this.physics.add.sprite(player.x, player.y, 'deadPlayer');
    deadPlayer.setBounce(0.2);
    deadPlayer.body.rotation = 270;
    player.x = 150;
    player.y = 430;
    this.physics.add.collider(deadPlayer, groundlayer);
    this.physics.add.collider(player, deadPlayer);
    Deaths += 1;
    this.Death.play();
    text.destroy();
    text = this.add.text(100, 100, 'Deaths: ' + Deaths, {
        fontFamily: 'Anton',
        fontSize: 30
    });

}
