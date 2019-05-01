<img src="/docs/cover.png" align="center">

**Lazy Clio** provides lazy evaluation for both **Clio** and **JavaScript** languages.

## Usage in Clio

In Clio all functions are lazy by default.

## Usage in JavaScript

You need to use `lazy` to wrap your functions:

```javascript
const lazy = require("clio-lazy");

const lazyAdd      = lazy((a, b) => a + b);
const myLazyNumber = lazyAdd(2, 3);
//    ^ this will be evaluated only when the value is needed!

// for example if we do:
console.log(myLazyNumber);

// or if we do:
const notLazy = myLazyNumber + 2;
```

# License
Apache 2.0