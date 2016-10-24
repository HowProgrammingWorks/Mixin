'use strict';

// Assign metadata to array elements
//   data - array of objects
//   metadata - data describes PrototypeClass structure
// Returns: built PrototypeClass
//
function assignMetadata(data, metadata) {
  let proto = buildPrototype(metadata);
  assignPrototype(data, proto);
  return proto;
}

// Assign prototype to records array or single record
//   data - array of objects
//   proto - dynamically built prototipe to be assigned
//
function assignPrototype(data, proto) {
  if (Array.isArray(data)) {
    data.forEach(item => item.__proto__ = proto.prototype);
  } else data.__proto__ = proto.prototype;
}

// Build Prototype from Metadata
//
function buildPrototype(metadata) {
  let protoClass = function ProtoClass() {};
  let index = 0, fieldDef, buildGetter, fieldType;
  for (let name in metadata) {
    fieldDef = metadata[name];
    fieldType = typeof(fieldDef);
    if (fieldType !== 'function') fieldType = fieldDef;
    buildGetter = accessors[fieldType];
    if (buildGetter) buildGetter(protoClass, name, index++, fieldDef);
  }
  return protoClass;
}

let accessors = {

  string: function(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get: function() {
        return this[index];
      },
      set: function(value) {
        this[index] = value;
      }
    });
  },

  Date: function(proto, name, index) {
    Object.defineProperty(proto.prototype, name, {
      get: function() {
        return new Date(this[index]);
      },
      set: function(value) {
        this[index] = value instanceof Date ? value.toISOString() : value;
      }
    });
  },

  function: function(proto, name, index, fieldDef) {
    //console.log({proto, name, index, fieldDef});
    Object.defineProperty(proto.prototype, name, { get: fieldDef });
  }

};

// Define Data Source
//
let data = [
  ['Marcus Aurelius', 'Rome', '212-04-26'],
  ['Victor Glushkov', 'Rostov on Don', '1923-08-24'],
  ['Ibn Arabi', 'Murcia', '1165-11-16'],
  ['Mao Zedong', 'Shaoshan', '1893-12-26'],
  ['Rene Descartes', 'La Haye en Touraine', '1596-03-31']
];

// Define metadata to build prototype dynamically
//
let metadata = {
  name: 'string',
  city: 'string',
  born: 'Date',
  age: function() {
    return (
      new Date().getFullYear() -
      new Date(this.born + '').getFullYear()
    );
  }
};

// Define query using regular JavaScript syntax
//
let query = person => (
  person.name !== '' &&
  person.age > 25 &&
  person.city === 'Rome'
);

// Build prototype and assign to array elements
assignMetadata(data, metadata);

// Apply query to dataset
let res = data.filter(query);
console.dir(res);
