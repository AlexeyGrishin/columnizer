var Columnizer = require('../columnizer');

describe("when column limit is specified", function() {
    var LIMIT = 4;
    function columnize() {
        var columnizer = new Columnizer();
        columnizer.row.apply(columnizer, arguments);
        return columnizer.toString(3, null, LIMIT).trim();
    }

    it("shall print smaller item in one line (as usual)", function() {
        expect(columnize("1", "12", "123", "1234")).toEqual("1  12  123  1234")
    });
    it("shall print larger item in one line if it cannot be broken", function() {
        expect(columnize("linecannotbroke", "123")).toEqual("line  123\ncann  \notbr  \noke")
    });
    describe("shall print larger item in several lines", function() {
        it("for first column", function() {
            expect(columnize("line wrap", "123")).toEqual("line  123\nwrap")
        });
        it("for second column too", function() {
            expect(columnize("123", "line wrap")).toEqual("123  line\n     wrap")
        });
        it("for several columns", function() {
            expect(columnize("one ring", "to rule them all", "one", "ring to find them")).toEqual(
                "one   to    one  ring\n" +
                "ring  rule       to\n" +
                "      them       find\n" +
                "      all        them"
            )
        })
    });

});

describe("when column limit is not specified", function() {
    function columnize() {
        var columnizer = new Columnizer();
        columnizer.row.apply(columnizer, arguments);
        return columnizer.toString(3, null).trim();
    }
    it("shall print long items as usual, in one line", function() {
        expect(columnize(
            "1", "1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0", "2"
        )).toEqual(
                "1  1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0  2"
            )
    });
});