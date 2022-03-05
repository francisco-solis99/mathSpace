export class Triangle {
  constructor () {
    this.baseSide = null;
    this.heightSide = null;
  }

  init ({ side1, side2 }) {
    this.baseSide = side1;
    this.heightSide = side2;
  }

  getArea () {
    const area = (this.baseSide * this.heightSide) / 2;
    return area;
  }

  getPerimeter () {
    const perimeter = this.baseSide + (2 * this.heightSide);
    return perimeter;
  }
}
