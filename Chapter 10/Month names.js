(function(exports) {
	var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
								"Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

	exports.name = function(number) {
		return months[number];
	};

	exports.number = function(name) {
		return months.indexOf(name);
	};

})(this.month = {});

console.log(month.name(2));
// Март
console.log(month.number("Ноябрь"));
// 10
