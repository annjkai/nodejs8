#!/usr/bin/env node
'use strict'
require('fs').createReadStream(process.argv[2]).pipe(process.stdout)

//NOTES
/*
-starting the first line with #! means the program can be executed directly in Unix-like system (doesn't need to be passed into the `node` program)
*/