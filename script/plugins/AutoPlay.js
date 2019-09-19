function AutoPlay() {}

AutoPlay.prototype.run = function (player) {
  if (player.muted === false) {
    player.muted = true;
  }

  player.play();
};

export default AutoPlay;
