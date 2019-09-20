import MediaPlayer from "../../mediaPlayer";
import Ads, { Ad } from "./Ads";

class AdsPlugins {
  private player: MediaPlayer;
  private media: HTMLMediaElement;
  private ads: Ads;
  private currentAd: Ad;
  private adsContainer: HTMLElement;

  constructor() {
    this.ads = Ads.getInstance();
    this.adsContainer = document.createElement('div');
    this.handlerTimeUpdate = this.handlerTimeUpdate.bind(this);
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.media = this.player.media;
    this.player.container.appendChild(this.adsContainer);
    this.media.addEventListener("timeupdate", this.handlerTimeUpdate);
  }

  private handlerTimeUpdate() {
    const currentTime = Math.floor(this.media.currentTime);
    if (currentTime % 15 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    if (this.currentAd) {
      return;
    }

    const ad = this.ads.getAd();
    this.currentAd = ad;
    this.adsContainer.innerHTML = `
    <div class="ads">
      <a href="${this.currentAd.url} target = "_blank">
        <img src="${this.currentAd.imageUrl}" />
        <div>
          <h5>${this.currentAd.title}</h5>
          <p>${this.currentAd.body}</p>
        </div>
      </a>
    </div>
    `;

    setTimeout(() => {
      this.currentAd = null;
      this.adsContainer.innerHTML = '';
    }, 8000);
  }
}

export default AdsPlugins;
