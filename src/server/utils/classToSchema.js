import { Schema } from 'mongoose';

function isAttribute(obj) {
  if (
    obj === String
    || obj === Number
    || obj === Boolean
    || obj === Date
    || obj === Schema.Types.Mixed
    || obj === Schema.Types.ObjectId
  ) {
    return true;
  }

  return false;
}

function getAllProps(obj) {
  const props = {
    methods: {},
    staticMethods: {},
    attributes: {},
    staticAttributes: {},
    system: {},
    pre: {},
  };

  const usedNames = new Set();
  /* eslint-disable */
  do {
    const tempStatics = Object.getOwnPropertyNames(obj.constructor).filter(value =>
      value !== 'schema' &&
        'model' &&
        value !== 'Types' &&
        value !== 'length' &&
        value !== 'name' &&
        value !== 'prototype' &&
        !usedNames.has(value));

    tempStatics.forEach(value => {
      const pValue = obj.constructor[value];
      if (typeof pValue === 'function' && !isAttribute(pValue)) {
        props.staticMethods[value] = pValue;
      } else {
        props.staticAttributes[value] = pValue;
      }

      usedNames.add(value);
    });

    const temp = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .filter((value, i, arr) =>
        value !== 'constructor' &&
          (i == 0 || value !== arr[i - 1]) &&
          !usedNames.has(value));
    temp.forEach(value => {
      const pValue = obj[value];
      if (value === 'plugins') {
        props.system[value] = pValue;
      } else if (value === 'pre') {
        props[value] = pValue;
      } else if (typeof pValue === 'function' && !isAttribute(pValue)) {
        props.methods[value] = pValue;
      } else {
        props.attributes[value] = pValue;
      }

      usedNames.add(value);
    });
  } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));
  /* eslint-enable */
  return props;
}

export default function classToSchema(obj, schemaOptions) {
  const props = getAllProps(obj);
  const schema = new Schema(props.attributes, schemaOptions);

  schema.statics = props.staticMethods;
  schema.methods = props.methods;
  props.system.plugins.forEach(item => {
    schema.plugin(...item);
  });
  Object.entries(props.pre).forEach(item => {
    schema.pre(item[0], item[1]);
  });

  return schema;
}
