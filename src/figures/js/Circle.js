export class Circle {
  constructor () {
    this.ratio = null;
  }

  init ({ ratio }) {
    this.ratio = ratio;
  }

  getArea () {
    const area = (this.ratio ** this.ratio) * Math.PI;
    return area;
  }

  getPerimeter () {
    const perimeter = 2 * Math.PI * this.ratio;
    return perimeter;
  }
}
