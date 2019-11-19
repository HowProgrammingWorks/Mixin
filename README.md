# Примеси в JavaScript

[![Примеси в JavaScript: mixin, extend, Object.assign, class λ-mixin](https://img.youtube.com/vi/NZMrJ2adEyY/0.jpg)](https://www.youtube.com/watch?v=NZMrJ2adEyY)

Tasks:
- see examples
- implement `extend(obj, ...objects)` so keys from objects will be mixed into obj only if it doesn't contain those keys
- implement `wrap(obj, ...funcs)` so if obj contains func.name it should be wrapped
- implement mixin `logable()`
- implement universal `equilateral` mixin for for N sides (see `6-class.js`)
- implement `emitable` with `Object.defineProperty` (see `6-evants.js`)
- implement mixin for prototypes (not instances)
- implement `extend` for mixins with additional `override:Boolean` flag
```js
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
  }
];

extend(obj1, mix1, mix2);
```
