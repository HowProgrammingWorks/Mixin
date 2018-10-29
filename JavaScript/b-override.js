'use strict';

const extend = (obj, mixin) => {
  for (let i = 0; i < mixin.length; i++) {
    const k = Object.keys(mixin[i])[1];
    if (!obj[k]) obj[k] = mixin[i][k];
    else if (mixin[i].override === true)
      obj[k] = mixin[i][k];
  }
  return obj;
};

// Usage

const obj1 = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  born: '121-04-26'
};

const mix2 = [
  {
    override: true,
    toString() {
      return `${this.name} - ${this.city} - ${this.born}`;
    }
  },
  {
    override: false,
    age() {
      const year = new Date().getFullYear();
      const born = new Date(this.born).getFullYear();
      return year - born;
    }
  },
  {
    override: true,
    name: 'Pavlo Skoropadsky',
  },
  {
    override: false,
    city: 'Kyiv',
  }
];

extend(obj1, mix2);
console.dir(obj1);
console.log(obj1.toString());
console.log(`His age is ${obj1.age()} as of today`);
