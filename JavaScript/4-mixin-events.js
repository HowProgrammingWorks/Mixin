'use strict';

const extend = (obj, mixin) => (
  Object.keys(mixin).forEach(key => obj[key] = mixin[key]), obj
);

const obj1 = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };

const mexinEvents = {
  toString() {
    return this.name + ' was born in ' + this.city + ' in ' + this.born;
  },
  age() {
    return new Date().getFullYear() - new Date(this.born + '').getFullYear();
  }
};

extend(obj1, mexinEvents);
console.log(obj1);
console.log(obj1.toString());
console.log('His age is ' + obj1.age() + ' as of today');
