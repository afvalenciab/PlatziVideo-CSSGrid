import MediaPlayer from './mediaPlayer.js';
import AutoPlay from './plugins/AutoPlay.js';

const video = document.querySelector('.video__item');
const buttonPlay = document.querySelector('#button__play__pause');
const buttonStop = document.querySelector('#button__stop');
const buttonMute = document.querySelector('#button__mute');
const iconPlay = document.querySelector('#icon-play');
const iconMute = document.querySelector('#icon-mute');

const player = new MediaPlayer({ el: video, plugins: [new AutoPlay()] });

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

// function Persona(name) {
//   this.name = name;  
//   this.getNombre = function () {
//     console.log(`Nombre del hijo ${this.name}`);
//   };
// }

// function Persona2(name) {
//   this.name = name;
//   this.hijo = 'manuel';
// }

// Persona2.prototype.getName = function () {
//   console.log(`Nombre del Padre ${this.name}`);
// };

// Persona2.prototype.getHijo = function () {
//   console.log(`Nombre del hijo hijo ${this.hijo}`);
// };

// function heredaDe(prototipoHijo, protopipoPadre) {
// 	let fn = function () {};
// 	fn.prototype = protopipoPadre.prototype;
// 	prototipoHijo.prototype = new fn;
// 	prototipoHijo.prototype.constructor = prototipoHijo;
// }

// heredaDe(Persona, Persona2);

// const felipe = new Persona2('felipe');
// felipe.getName();
// felipe.getHijo();

// const andres = new Persona('andres');
// andres.getNombre();
// andres.getName();
// andres.getHijo();
// console.log(felipe);
// console.log(andres);
