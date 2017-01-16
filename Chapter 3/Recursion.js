"use strict"

function isEven(n) {
	if (n == 0) return true;
	else if (Math.abs(n) == 1) return false;
	else return isEven(Math.abs(n - 2));
}
