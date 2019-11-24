'use strict';

const accessors = {

  string(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get() {
        return this[index];
      },
      set(value) {
        this[index] = value;
      }
    });
  },

  Date(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get() {
        return new Date(this[index]);
      },
      set(value) {
        this[index] = value instanceof Date ? value.toISOString() : value;
      }
    });
  },

  function(proto, name, index, fieldDef) {
    Object.defineProperty(proto.prototype, name, { get: fieldDef });
  }

};

// Assign prototype to records array or single record
//   data - array of objects
//   proto - dynamically built prototipe to be assigned

const assignPrototype = (data, proto) => {
  if (Array.isArray(data)) {
    data.forEach(item => item.__proto__ = proto.prototype);
  } else {
    Object.setPrototypeOf(data, proto.prototype);
  }
};

// Build Prototype from Metadata

const buildPrototype = metadata => {
  const protoClass = function ProtoClass() {};
  let index = 0, fieldDef, buildGetter, fieldType;
  for (const name in metadata) {
    fieldDef = metadata[name];
    fieldType = typeof fieldDef;
    if (fieldType !== 'function') fieldType = fieldDef;
    buildGetter = accessors[fieldType];
    if (buildGetter) buildGetter(protoClass, name, index++, fieldDef);
  }
  return protoClass;
};

// Assign metadata to array elements
//   data - array of objects
//   metadata - data describes PrototypeClass structure
// Returns: built PrototypeClass

const assignMetadata = (data, metadata) => {
  const proto = buildPrototype(metadata);
  //Object.setPrototypeOf(data, proto);
  assignPrototype(data, proto);
  return proto;
};

// Usage

// Define Data Source

const data = [
  ['Marcus Aurelius', 'Rome', '212-04-26'],
  ['Victor Glushkov', 'Rostov on Don', '1923-08-24'],
  ['Ibn Arabi', 'Murcia', '1165-11-16'],
  ['Mao Zedong', 'Shaoshan', '1893-12-26'],
  ['Rene Descartes', 'La Haye en Touraine', '1596-03-31']
];

console.dir({ data });

// Define metadata to build prototype dynamically

const metadata = {
  name: 'string',
  city: 'string',
  born: 'Date',
  age() {
    return (
      new Date().getFullYear() -
      new Date(this.born).getFullYear()
    );
  },
  toString() {
    return [this.name, this.city, this.born, this.age].join(', ');
  }
};

// Define query using regular JavaScript syntax

const query = ({ name, age, city }) => (
  name !== '' &&
  age > 25 &&
  city === 'Rome'
);

// Build prototype and assign to array elements
assignMetadata(data, metadata);

// Apply query to dataset
const res = data.filter(query);
console.dir({ res });
console.dir({ age: res[0].age });
