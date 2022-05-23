import { GLOBAL_SETTINGS } from './globals';

enum SCROLL_DIR {
  up = -1,
  dn = 1
}

class Scroller {
  public speed: number;
  private deltaT: number;
  private deltaH: number;

  private scrollStartY: number;
  private scrollStartTime: number;
  private scrollDirection: SCROLL_DIR;
  private intervalId: number;

  private movingInDir: SCROLL_DIR | null;

  constructor(
    speedREMpSec = GLOBAL_SETTINGS.scrollSpeed,
    private step = GLOBAL_SETTINGS.scrollStep
  ) {
    this.speed = speedREMpSec;

    this.deltaT = (1000 * this.step) / this.speed;
    this.deltaH = GLOBAL_SETTINGS.rem * this.step;

    this.scrollStartY = Infinity;
    this.scrollStartTime = 0;
    this.scrollDirection = SCROLL_DIR.up;
    this.intervalId = 0;

    this.movingInDir = null;
  }

  updateParams(direction: SCROLL_DIR) {
    this.scrollDirection = direction;
    this.scrollStartTime = new Date().getTime();
    this.scrollStartY = window.scrollY;
  }

  isScrolling(direction: SCROLL_DIR) {
    return (
      direction === this.scrollDirection &&
      new Date().getTime() < this.scrollStartTime + this.deltaT
    );
  }

  scroll(direction: SCROLL_DIR) {
    if (!this.isScrolling(direction)) {
      this.updateParams(direction);

      setTimeout(
        () => window.scrollTo(0, this.scrollStartY + direction * this.deltaH),
        this.deltaT
      );
    }
  }

  startMovingUpwards() {
    if (this.movingInDir === SCROLL_DIR.up) return;

    this.stopMoving();
    this.intervalId = setInterval(
      () => this.scroll(SCROLL_DIR.up),
      this.deltaT + 1
    );
    this.movingInDir = SCROLL_DIR.up;
  }

  startMovingDownwards() {
    if (this.movingInDir === SCROLL_DIR.dn) return;

    this.stopMoving();
    this.intervalId = setInterval(
      () => this.scroll(SCROLL_DIR.dn),
      this.deltaT + 1
    );
    this.movingInDir = SCROLL_DIR.dn;
  }

  stopMoving() {
    this.intervalId && clearInterval(this.intervalId);
    this.intervalId = 0;

    this.movingInDir = null;
  }
}

export { Scroller, SCROLL_DIR };
