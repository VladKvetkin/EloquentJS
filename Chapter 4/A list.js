"use strict"

function arrayToList(arr) {
	for (var i = arr.length - 1; i >= 0; --i) {
		var nextRest = list || null;
		var list = {};

		list["value"] = arr[i];
		list["rest"] = nextRest;
	}

	return list;
}


function listToArray(list) {
	var arr = [];
	arr.push(list.value);
	var rest = list.rest;

	while (rest) {
		arr.push(rest.value);
		rest = rest["rest"];
	}

	return arr;
}


function prepend(elem, list) {
	return {value: elem, rest: list}
}


function nth(list, index) {
	if (!list.rest && index != 0) return undefined;
	return (index != 0) ? nth(list.rest, --index) : list.value;
}
