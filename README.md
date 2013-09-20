# columnizer

A simple tool for printing text in nice columns in the terminal.


## Installing

```shell
npm install columnizer
```

## How do I use it?
```js
var Columnizer = require('columnizer');


var stooges = [
  {name: "Larry", height: "short", fat: false},
  {name: "Curly", height: "medium or tall", fat: false},
  {name: "Moe", height: "tall", fat: true}
];

// create an object to start with
var example = new Columnizer;

// call it's row method and pass in agruments
// each subsequent argument is another column

// first we'll add some column headers
example.row("Name", "Height", "Girth");

// then add some data (and do some tweaking of that);
stooges.forEach(function (stooge) {
  example.row(stooge.name, stooge.height, (stooge.fat) ? "corpulent" : "skinny");
});

// then when we're ready, just print it out:
example.print();

// will print this:
/*
Name     Height            Girth        
Larry    short             skinny       
Curly    medium or tall    skinny       
Moe      tall              corpulent    
*/

// or you may provide some options
example.print(/*padding*/3, /*print headers in bold*/true, /*max column width*/9);

//will print this:
/*
__Name__  __Height__  __Girth__
Larry  short      skinny
Curly  medium or  skinny
       tall
Moe    tall       corpulent
*/

```

## Changelog

**0.1.0**

  - Adding length method

## Licence

MIT
