import MediaPlayer from '../mediaPlayer';

class AutoPlay {
  run(player: MediaPlayer) {
    if (player.media.muted === false) {
      player.media.muted = true;
    }
    player.play();
  }
}


export default AutoPlay;
