'use strict';

class Figure {
  constructor(x, y, ...sides) {
    this.x = x;
    this.y = y;
    this.sides = sides;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.sides}]`;
  }
}

const equilateral = (Figure, n) => class extends Figure {
  constructor(x, y, side) {
    const sides = [];
    for (let i = 0; i < n; i++)
      sides[i] = side;
    super(x, y, ...sides);
  }
};

const Square = equilateral(Figure, 2);
const p1 = new Square(10, 20, 50);

const Hexagon = equilateral(Figure, 6);
const p2 = new Hexagon(10, 20, 50);

console.log(p1.toString());
console.log(p2.toString());
