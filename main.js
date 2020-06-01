import { CountUp } from './js/CountUp.min.js';

window.onload = function() {
  var countUp = new CountUp('stats-player-kills', 2000);
  countUp.start();
}