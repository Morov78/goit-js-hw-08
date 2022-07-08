import Vimeo from '@vimeo/player';
// import _ from 'lodash';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

setStartVideoPosition();
player.on('play', function () {
  console.log('Video is played!');
});
player.on('pause', function () {
  console.log('Video is paused!');
});
player.on('timeupdate', throttle(onSetTimeToStorage, 1000));
// player.on('timeupdate', _.throttle(onSetTimeToStorage, 1000));
function setStartVideoPosition() {
  const startVideoPosition =
    localStorage.getItem('videoplayer-current-time') || '0';
  player
    .setCurrentTime(startVideoPosition)
    .then(function (seconds) {
      console.log('відео стартує з', seconds, 'cекунди');
    })
    .catch(function (error) {
      console.log('Помилка', error.message);
    });
}
function onSetTimeToStorage({ seconds }) {
  console.log('поточний час відтворення:', seconds);
  localStorage.setItem('videoplayer-current-time', seconds);
}
