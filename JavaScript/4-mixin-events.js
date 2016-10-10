'use strict';

let extend = (obj, mixin) => (
  Object.keys(mixin).forEach(key => obj[key] = mixin[key]), obj
);

let obj1 = { name: 'Marcus Aurelius', city: 'Rome', born: 121 };

let mexinEvents = {
  toString: function() {
    return this.name + ' was born in ' + this.city + ' in ' + this.born;
  },
  age: function() {
    return new Date().getFullYear() - new Date(this.born + '').getFullYear();
  }
};

extend(obj1, mix1);
console.log(obj1);
console.log(obj1.toString());
console.log('His age is ' + obj1.age() + ' as of today');
