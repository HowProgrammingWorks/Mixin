'use strict';

const extend = (obj, mixin) => {
  const prototype = {};
  Object.keys(mixin).forEach(key => {
    prototype[key] = mixin[key];
  });
  obj.__proto__ = prototype;
  return obj;
};

const obj1 = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  born: '121-04-26'
};

const mix1 = {
  toString() {
    return `${this.name} was born in ${this.city} in ${this.born}`;
  },
  age() {
    const year = new Date().getFullYear();
    const born = new Date(this.born).getFullYear();
    return year - born;
  },
  born: '1898',
};

extend(obj1, mix1);
console.log('Object: ', obj1);
console.log('Object prototype: ', obj1.__proto__);
console.log(obj1.toString());
console.log(`His age is ${obj1.age()} as of today`);
