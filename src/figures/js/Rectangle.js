export class Rectangle {
  constructor () {
    this.base = null;
    this.height = null;
  }

  init ({ base, height }) {
    this.base = base;
    this.height = height;
  }

  getArea () {
    const area = this.base * this.height;
    return area;
  }

  getPerimeter () {
    const perimeter = (this.base * 2) + (this.height * 2);
    return perimeter;
  }
}
