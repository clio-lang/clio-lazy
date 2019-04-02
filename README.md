# clio-lazy
Lazy evaluation for Clio and JS

## Usage in Clio

In Clio all functions are lazy by default.

## Usage in JavaScript

You need to use `lazy` to wrap your functions:

```
const lazy = require("clio-lazy");
const lazyAdd = lazy((a, b) => a + b);
const myLazyNumber = lazyAdd(2, 3);
// ^ this will be evaluated only when the value is needed!
// for example if we do:
console.log(myLazyNumber);
// or if we do:
const notLazy = myLazyNumber + 2;
```
