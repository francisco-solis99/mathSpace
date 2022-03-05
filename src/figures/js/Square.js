export class Square {
  constructor () {
    this.side = null;
  }

  init ({ side }) {
    this.side = side;
  }

  getArea () {
    const area = this.side * this.side;
    return area;
  }

  getPerimeter () {
    const perimeter = 4 * this.side;
    return perimeter;
  }
}
