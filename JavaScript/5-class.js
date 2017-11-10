'use strict';

const Rect = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

const equilateral = Category => class extends Category {
  constructor(x, y, side) {
    super(x, y, side, side);
  }
};

const Square = equilateral(Rect);

const p1 = new Square(10, 20, 50);
console.log(p1.toString());
