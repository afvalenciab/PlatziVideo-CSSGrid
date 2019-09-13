
function MediaPlayer(config) {
  this.media = config.el;
  this.plugins = config.plugins || [];

  this.initPlugins();
}

MediaPlayer.prototype.initPlugins = function () {
  this.plugins.forEach((plugin) => {
    plugin.run(this);
  });
};

MediaPlayer.prototype.play = function () {
  this.media.play();
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
