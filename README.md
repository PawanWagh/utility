# utility
Repo for common utility functions
Contains utility functions for common tasks like typechecking, arrays processing, etc.

HOW TO USE - 
1. Include above module in your root folder
2. Import module - `const utility = require('./utility');`

eg: utility.isNull(null); // -> true
eg: utility.isNull('pawan'); // -> false

WARNING - 
Includes some utility functions related to core nodejs modules so wont be working on browsers. I'll commiting a new module whcich will be browser compatible.
