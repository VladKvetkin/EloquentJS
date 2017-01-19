"use strict"

function MultiplicatorUnitFailure(message) {
	this.message = message;
	this.stack = (new Error()).stack;
}

MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);

function primitiveMultiply(a, b) {
	if (Math.random() < 0.5)
		return a * b;
	else
		throw new MultiplicatorUnitFailure("Рандом не на нашей стороне!");
}

function reliableMultiply(a, b) {
	while(true) {
		try {
			return primitiveMultiply(a, b);
		} catch (e) {
			if (e instanceof MultiplicatorUnitFailure)
				console.log(e.message);
			else
				throw e;
		}
	}
}

console.log(reliableMultiply(8, 8));
