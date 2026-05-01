/** example of usage **

let anim = new Animation({
  draw: function (p) {
    document.querySelector("#anim").style.width = p * 880 + "px";
  },
  timing: function (t) {
    return t;
  },
  duration: 3000,
  onEnd: function () {
    console.log("animation ended");
  },
});

anim.start();
*/

export class Animation {
  constructor({ draw, timing, duration, onEnd }) {
    this.draw = draw;
    this.timing = timing;
    this.duration = duration;
    this.onEnd = function () {
      if (typeof onEnd === "undefined") return;
      onEnd();
    };
  }
  start() {
    this.running = true;
    this.start = performance.now();
    this.animate();
  }
  animate() {
    var next = requestAnimationFrame(this.animate.bind(this));
    let time = performance.now();
    let timeFraction = (time - this.start) / this.duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = this.timing(timeFraction);

    if (typeof this.draw === "function") this.draw(progress);

    if (!this.running || progress >= 1) {
      cancelAnimationFrame(next);
      this.onEnd();
    }
  }
  stop() {
    this.running = false;
  }
}

// eslint-disable-next-line no-unused-vars
export function linear(timeFraction) {
  return timeFraction;
}
// eslint-disable-next-line no-unused-vars
export function easeOut(timeFraction) {
  return Math.pow(timeFraction, 1 / 1.99);
}
// eslint-disable-next-line no-unused-vars
export function easeOutCubic(timeFraction) {
  return 1 - Math.pow(1 - timeFraction, 3);
}
