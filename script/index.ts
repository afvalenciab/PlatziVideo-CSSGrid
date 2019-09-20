import MediaPlayer from './mediaPlayer';
import AutoPlay from './plugins/AutoPlay';
import AutoPause from './plugins/AutoPause';
import AdsPlugins from './plugins/Ads';

const video = document.querySelector('.video__item');
const buttonPlay: HTMLElement = document.querySelector('#button__play__pause');
const buttonStop: HTMLElement = document.querySelector('#button__stop');
const buttonMute: HTMLElement = document.querySelector('#button__mute');
const iconPlay = document.querySelector('#icon-play');
const iconMute = document.querySelector('#icon-mute');

const player = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause(), new AdsPlugins() ] });

function changeStatusVideo({ media }) {
  if (media.paused) {
    iconPlay.classList.remove('icon-pause');
    iconPlay.classList.add('icon-play2');
  } else {
    iconPlay.classList.remove('icon-play2');
    iconPlay.classList.add('icon-pause');
  }
}

function changeSoundVideo({ media }) {
  if (media.muted) {
    iconMute.classList.add('icon-mute');
    iconMute.classList.remove('icon-unmute');
  } else {
    iconMute.classList.add('icon-unmute');
    iconMute.classList.remove('icon-mute');
  }
}

changeStatusVideo(player);
changeSoundVideo(player);

buttonPlay.onclick = () => {
  player.toggle();

  if (iconPlay.classList.contains('icon-play2')) {
    changeStatusVideo(player);
  } else {
    changeStatusVideo(player);
  }
};

buttonStop.onclick = () => {
  player.stop();
  changeStatusVideo(player);
};

buttonMute.onclick = () => {
  player.toggleMute();
  changeSoundVideo(player);
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js').catch((error) => {
    console.log(error);
  });
}
