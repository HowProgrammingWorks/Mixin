'use strict';

const g1 = {};
const g2 = {};
const g3 = { area: 300 };

// Add property area to g2
g2.area = 200;

// Mixin as a function
const mixinCalculateCost = obj => {
  obj.area = obj.area || 0;
  obj.calculateCost = function (price) {
    return this.area * price;
  };
};

// Mixin to single object
mixinCalculateCost(g1);

// Mixin to array of objects
[g1, g2, g3].forEach(mixinCalculateCost);

// metasync
//   .for([g1, g2, g3])
//   .each(mixinCalculateCost);

// Use mixed methods
console.log(g1.calculateCost(5));
console.log(g2.calculateCost(5));
console.log(g3.calculateCost(5));

const t1 = setTimeout(() => {
  console.log('Hello from timer');
}, 1000);

mixinCalculateCost(t1);

t1.area = 10;
console.log(t1.calculateCost(100));
