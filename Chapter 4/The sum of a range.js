"use strict"

function range(a, b, h) {
	var arr = [];
	var h = h || 1;

	if (h < 0) {
		for (var i = a; i >= b; i += h)
			arr.push(i);
	} else {
		for (var i = a; i <= b; i += h)
			arr.push(i);
	}

	return arr
}


function sum(range) {
	return range.reduce(function (initValue, currValue) {
		return initValue + currValue;
	}, 0)
}
