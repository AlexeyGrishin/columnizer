var Columnizer = require('./columnizer')
  , assert = require('assert');


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
console.log();

// should be able to just add them.
var example2 = new Columnizer(stooges);

example2.print(10, true, 7);
console.log();

// also you may get formatted string with toString method and use it as you wish

var example3 = new Columnizer();
example3.row("one ring", "to rule them all", "one", "ring to find them");
assert.equal(
    example3.toString(3, null, 4),
    "one   to    one  ring\n" +
    "ring  rule       to\n" +
    "      them       find\n" +
    "      all        them"

);