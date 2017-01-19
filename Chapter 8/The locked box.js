"use strict"

var box = {
	locked: false,
	unlock: function() { this.locked = false; },
	lock: function() { this.locked = true; },
	_content: [],
	get content() {
		if (this.locked) throw new Error("Заперто!");
		return this._content;
	}
};


function withBoxUnlocked(body) {
	try {
		box.unlock();
		body();
	} catch (e) {
		console.log(e.message);
	} finally {
		box.lock();
	}
}


withBoxUnlocked(function() {
	box.content.push("золотишко");
});

try {
	withBoxUnlocked(function() {
		throw new Error("Пираты на горизонте! Отмена!");
	});
} catch (e) {
	console.log("Произошла ошибка:", e);
}

console.log(box.locked);
