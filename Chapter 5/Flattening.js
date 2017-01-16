"use strict"

var arrays = [[1, 2, 4], [6, 7], [7]];

console.log(arrays.reduce(function (arr, current) {
	return arr.concat(current);
}));
