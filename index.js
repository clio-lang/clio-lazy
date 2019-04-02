// laziness for clio

doEval = obj => {
  if (!obj.hasOwnProperty('value')) {
    obj.value = obj()
  }
  while (obj.value.eval) {
    obj.value = obj.value.eval();
  }
}

var handler = {
  get: (obj, prop) => {
    if (prop == 'eval') {
      return obj;
    }
    doEval(obj);
    prop = obj.value[prop]
    if (typeof prop === 'function') {
      prop = prop.bind(obj.value);
      prop.bind = (...args) => Function.prototype.bind.apply(obj.value, args);
    }
    return prop
  },
  getPrototypeOf: (obj) => {
    doEval(obj);
    return obj.value.constructor.prototype
  },
  has: (obj, key) => {
    doEval(obj);
    return key in obj.value;
  },
  apply: (obj, context, args) => {
    doEval(obj);
    return obj.value.apply(obj, args);
  },
  ownKeys: (obj) => {
    doEval(obj);
    return Object.keys(obj.value);
  },
  getOwnPropertyDescriptor(obj, key) {
    doEval(obj);
    if (typeof obj.value == 'object') {
      return Object.getOwnPropertyDescriptor(obj.value, key)
    }
  }
};

const lazy = (fn) => (...args) => new Proxy(() => fn(...args), handler);
module.exports = lazy;
