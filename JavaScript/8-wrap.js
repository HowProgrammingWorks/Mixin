'use strict';

const wrapper = fn => (...args) => {
  console.log('Starting wrapping...');
  console.log('Before call: ', args);
  const res = fn(...args);
  console.log('After call: ', res);
  console.log('Wrapping ended.');
  return fn(...args);
};

const wrap = (obj, ...mix) => {
  for (const i in mix)
    Object.keys(mix[i]).forEach(key => {
      if (obj[key]) return;
      else obj[key] = mix[i][key];
    });

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = wrapper(obj[key]);
    }
  });
  return obj;
};

//USAGE

const obj1 = {
  name: 'Pavlo Skoropadsky',
  title: 'Hetman of Ukraine',
  toString() { console.log(`Heil, ${obj1.name}, great and honorous ${obj1.title}! People of ${obj1.state} congradulates you!`); },
};

const obj2 = {
  state: 'Ukraine',
};
const obj3 = {
  deutscheGrüße(man) { console.log(`${man} gratuliert ${obj1.title} ${obj1.name}!`); },
};

const res = wrap(obj1, obj2, obj3);
res.toString();
res.deutscheGrüße('Kaiser');
