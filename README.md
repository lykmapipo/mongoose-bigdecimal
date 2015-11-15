mongoose-bigdecimal
=====================

[![Build Status](https://travis-ci.org/lykmapipo/mongoose-bigdecimal.svg?branch=master)](https://travis-ci.org/lykmapipo/mongoose-bigdecimal)

BigDecimal schema type for [mongoose](https://github.com/Automattic/mongoose) based on [big.js](https://github.com/MikeMcl/big.js/).

*Note!: [`valueOf()`](http://mikemcl.github.io/big.js/#valueOf) implementation of big.js has been overridden to return `Number` than `String`*

## Installation
```sh
$ npm install --save mongoose-bigdecimal
```

## Usage

```javascript
var mongoose = require('mongoose');
require('mongoose-bigdecimal');
var Schema = mongoose.Schema;
var BigDecimal = require('big.js');

//define your schema
var ProductSchema = new Schema({
    price: {
        type: Schema.Types.BigDecimal,
        required: true,
        index:true
    },
    discounts:[{
        type: Schema.Types.BigDecimal
    }]
});
Product = mongoose.model('Product', ProductSchema);

//use it
var book = new Product();
book.price = new BigDecimal(12);
book.save(done);
...

```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```

* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) 2015 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 