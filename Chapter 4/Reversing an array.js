"use strict"

function reverseArray(arr) {
	var revArr = [];

	for (var i = arr.length - 1; i >= 0; --i)
		revArr.push(arr[i]);

	return revArr;
}


function reverseArrayInPlace(arr) {
	var i = Math.floor(arr.length / 2);

	for (var j = 0; j < i; ++j) {
		var tmp = arr[arr.length - j - 1];
		arr[arr.length - j - 1] = arr[j];
		arr[j] = tmp;
	}

	return arr;
}
