//watching a file for changes

'use strict';
const fs = require('fs')
fs.watch('target.txt', () => console.log('File changed!'))
console.log('Now watching target.txt for changes...')

//NOTES
/*
-'use strict': strict mode diables problematic JavaScript features/throws errors (best practice to use strict mode)
-const: a var declared with const must be assigned a value & cannot be reassigned as that would cause a runtime error (best practice: const is default, never use var (hoisting))
-'require()': pulls in a Node.js module & returns it; output is usually a JS object, can also be a function
-'watch()': takes a path to a file and a callback function which invokes whenever the file changes
-arrow functions do NOT create a new scope for `this`
*/