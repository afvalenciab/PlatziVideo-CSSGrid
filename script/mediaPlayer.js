
function MediaPlayer(config) {
  this.media = config.el;
  this.plugins = config.plugins || [];

  this.initPlugins();
}

MediaPlayer.prototype.initPlugins = function () {
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    get muted() {
      return this.media.muted;
    },

    set muted(value) {
      if (value === true) {
        this.media.muted = true;
      } else {
        this.media.muted = false;
      }
    },
  };

  this.plugins.forEach((plugin) => {
    plugin.run(player);
  });
};

MediaPlayer.prototype.play = function () {
  this.media.play();
};

MediaPlayer.prototype.pause = function () {
  this.media.pause();
};

MediaPlayer.prototype.stop = function () {
  this.media.load();
};

MediaPlayer.prototype.toggle = function () {
  if (this.media.paused) {
    this.media.play();
  } else {
    this.media.pause();
  }
};

MediaPlayer.prototype.mute = function () {
  this.media.muted = true;
};

MediaPlayer.prototype.unmute = function () {
  this.media.muted = false;
};

MediaPlayer.prototype.toggleMute = function () {
  if (this.media.muted) {
    this.media.muted = false;
  } else {
    this.media.muted = true;
  }
};

export default MediaPlayer;

// class MediaPlayer{
//   constructor(config){
//     this.media = config.el
//   }

//   play(){
//     this.media.play()
//   }

//   pause(){
//     this.media.pause()
//   }

//   toggle(){
//     if (this.media.paused){
//       this.media.play()
//     }else{
//       this.media.pause()
//     }
//   }
// }

// const player = new MediaPlayer({el: video})
// button.onclick = () => player.toggle()
