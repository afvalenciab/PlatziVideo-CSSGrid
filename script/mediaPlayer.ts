
class MediaPlayer {
  media: HTMLMediaElement;
  plugins: Array<any>;
  container: HTMLElement;

  constructor(config: any) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initPlugins();
  }

  private initPlayer() {
    this.container = document.createElement('div');
    this.container.style.position = 'relative';
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  private initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run(this);
    });
  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

  stop() {
    this.media.load();
  }

  toggle() {
    if (this.media.paused) {
      this.media.play();
    } else {
      this.media.pause();
    }
  }

  mute() {
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

  toggleMute() {
    if (this.media.muted) {
      this.media.muted = false;
    } else {
      this.media.muted = true;
    }
  }
}

export default MediaPlayer;
