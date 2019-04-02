const lazy = require('./index.js');

const lazyAdd = lazy((a, b) => a + b);
const lazyDict = lazy((dict) => dict);
const lazyFn = lazy((fn) => fn);

const lazyLoop = lazy(function (i) {
    if (i == 0) return "done"
    return lazyLoop(--i);
});

test('recursion limit (2m recursive calls)', async () => {
    expect(lazyLoop(2000000) == 'done').toEqual(true)
});

test('return type: function', async () => {
    expect(lazyFn(a => a)('test') == 'test').toEqual(true)
});

test('lazy object: property access', async () => {
    expect('a' in lazyDict({ a: 2 })).toEqual(true)
});

test('lazy object: keys', async () => {    
    expect(Object.keys(lazyDict({ a: 2 }))).toEqual(['a'])
});

test('lazy object: hasOwnProperty', async () => {    
    expect(lazyDict({ a: 2 }).hasOwnProperty('a')).toEqual(true)
});


test('lazy object: key', async () => {
    var a = {};
    a[lazyAdd(2, 3)] = 'key must be 5!';
    expect(a[5]).toEqual('key must be 5!')
});

test('lazy instanceof', async () => {    
    expect(lazyAdd(2, 3) instanceof Number).toEqual(true)
});

test('lazy add', async () => {    
    expect(lazyAdd(2, 3) + 4).toEqual(9)
});

test('lazy add: equality', async () => {    
    expect(5 == lazyAdd(2, 3)).toEqual(true)
});

test('lazy add: comparison', async () => {    
    expect(6 > lazyAdd(2, 3)).toEqual(true)
});

