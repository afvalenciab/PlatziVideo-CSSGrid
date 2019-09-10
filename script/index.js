import MediaPlayer from './mediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

const video = document.querySelector('.video__item');
const button = document.querySelector('.button__play__pause');

const player = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });
button.onclick = () => player.toggle();
