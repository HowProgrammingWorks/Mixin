'use strict';

const scalable = image => {
  image.scale = () => console.log('Image scaled');
};

const lazy = image => {
  const scale = image.scale;
  image.scale = () => setImmediate(() => scale());
};

const image = {};

console.log('Mixin scalable() adds method: scale');
scalable(image);
console.log('Before scale');
image.scale();
console.log('After scale\n');

console.log('Mixin lazy() adds lazy behavior');
lazy(image);
console.log('Before scale');
image.scale();
console.log('After scale');
