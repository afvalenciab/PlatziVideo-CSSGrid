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
    <style>
      .ads {
        position: absolute;
        width: 600px;
        height: 80px;
        background: #FFF;
        bottom: 15px;
        left: 50%;
        transform: translateX(-50%);
      }
      .ads a {
        text-decoration: none;
        color: #000;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
      .ads a img {
        width: 70px;
        height: 70px;
      }
      .ads a div {
        width: 530px;
        padding: 5px;
        box-sizing: border-box;
        font-size: 14px;
      }
      .ads a div h5 {
        margin: 0;
        font-size: 16px;
        margin-bottom: 5px;
      }
      .ads a div p {
        margin: 0;
      }    
    </style>
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
