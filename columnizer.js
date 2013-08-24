var _ = require('underscore'),
    colors = require('colors');

// remove terminal escape characters before returning length
function len(string) {
    return string.replace(/\033\[[0-9;]*m/g, '').length;
}

// pad
function pad(string, target) {
    return string + (new Array(target - len(string)).join(' '));
}

// splits single line into several by words break so each line is not longer than maxLength
function splitWordsByLength(string, maxLength) {
    if (!maxLength || string.length <= maxLength) return [string];
    var words = string.split(" "),
      lines = [],
      buffer = [],
      bufLen = 0,
      SPACE = 1;
    _.each(words, function(word) {
        while (word.length > maxLength) {
            lines.push(word.substr(0, maxLength));
            word = word.substr(maxLength);
        }
        if (bufLen + word.length > maxLength) {
            lines.push(buffer.join(" "));
            buffer = [];
            bufLen = 0;
        }
        buffer.push(word);
        bufLen += word.length + SPACE;
    });
    if (buffer.length) lines.push(buffer.join(" "));
    return lines;
}

var Columnizer = function Columnizer(table) {
    var keys,
        self = this;
    if (table && table[0] instanceof Array) {
        this.table = table;
    } else if (table && typeof table[0] === 'object') {
        keys = _.keys(table[0]);
        this.table = [keys];
        _.each(table, function (object) {
            var row = [],
                i = 0,
                l = keys.length;
            for (; i < l ; i++) {
                row.push(object[keys[i]]);
            }
            self.table.push(row);
        });
    } else {
        this.table = [];
    }
};

Columnizer.prototype.row = function (args) {
    this.table.push(Array.prototype.slice.call(arguments, 0));
};

Columnizer.prototype.print = function (columnPadding, headers, maxColumnWidth) {
    console.log(this.toString(columnPadding, headers, maxColumnWidth));
};

Columnizer.prototype.toString = function (columnPadding, headers, maxColumnWidth) {
    var padding = columnPadding || 5,
        totalColumns = _.max(this.table, function (item) { return item.length; }).length,
        colWidths = [],
        printTable = [],
        result = [];

    // first we figure out what the max length is for each column
    _.each(this.table, function (row, index) {
        var itemsRows = [],
            rowsCount = 1;
        _.each(row, function (item, i) {
            var str = item.toString();
            var oldLen = colWidths[i] || 0, newLen = len(str);
            colWidths[i] = Math.max(oldLen, newLen);
            if (maxColumnWidth !== undefined) {
                colWidths[i] = Math.min(colWidths[i], maxColumnWidth);
                var rows = splitWordsByLength(str, maxColumnWidth);
                rowsCount = Math.max(rows.length, rowsCount);
                itemsRows.push(rows);
            }
            else {
                itemsRows.push([str]);
            }
        });
        while (rowsCount-->0) {
            printTable.push(_.map(itemsRows, function(mr) {return mr.shift() || ''}));
        }
    });

    // now we can build our table
    _.each(printTable, function (row, index) {
        _.each(row, function (item, i) {
            // remove padding of the latest colum
            var isLastColumn = i == totalColumns - 1;
            row[i] = isLastColumn ? row[i] : pad(item.toString(), colWidths[i] + padding);
            if (index === 0 && headers) row[i] = row[i].bold;
        });
        result.push(row.join(''));
    });

    return result.join('\n');
};

// our export
module.exports = Columnizer;
