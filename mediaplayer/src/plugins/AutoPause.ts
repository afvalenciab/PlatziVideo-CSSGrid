import MediaPlayer from '../mediaPlayer';

class AutoPause {
  private threshold: number;
  private player: MediaPlayer;
  private pauseByScroll: boolean;
  private pauseByVisibility: boolean;

  constructor() {
    this.threshold = 0.5;
    this.handlerIntersection = this.handlerIntersection.bind(this);
    this.handlerVisibility = this.handlerVisibility.bind(this);
    this.pauseByScroll = false;
    this.pauseByVisibility = false;
  }

  run(player: any) {
    this.player = player;
    const observer = new IntersectionObserver(this.handlerIntersection, {
      threshold: this.threshold,
    });

    document.addEventListener('visibilitychange', this.handlerVisibility);

    observer.observe(player.media);
  }

  private handlerIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    
    // const isVisible = entry.intersectionRatio >= this.threshold;
    const isVisible = entry.isIntersecting;

    if (isVisible) {
      if (this.pauseByScroll) {
        this.player.media.play();
        this.pauseByScroll = false;
      }
    } else if (this.player.media.paused === false) {
      this.player.media.pause();
      this.pauseByScroll = true;
    }
  }

  private handlerVisibility() {
    const isVisible = document.visibilityState === 'visible';

    if (isVisible) {
      if (this.pauseByVisibility === true) {
        this.player.media.play();
        this.pauseByVisibility = false;
      }
    } else if (this.player.media.paused === false) {
      this.player.media.pause();
      this.pauseByVisibility = true;
    }
  }
}

export default AutoPause;
