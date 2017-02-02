<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Autocompletion</title>
</head>
<body>
	<input type="text" id="field">
	<div id="suggestions" style="cursor: pointer;"></div>
	<script>
		var terms = [];
		for (var name in window)
			terms.push(name);

		var field = document.querySelector("#field");
		var suggestions = document.querySelector("#suggestions");
		var list = document.createElement("ul");
		suggestions.appendChild(list);

		field.addEventListener("input", function() {
			var text = field.value;
			var reg = new RegExp("^" + text, "i");

			for (var i = list.children.length - 1; i >= 0; --i) {
				if (list.children[i].tagName == "LI") {
					if (list.children[i].textContent.search(reg) == -1 || text == "")
						list.removeChild(list.children[i]);
				}
			}

			terms.forEach(function(term) {
				var inList = Array.prototype.some.call(list.children, function(item) {
					return term == item.textContent;
				});
				if (term.search(reg) != -1 && text != "" && !inList) {
					var suggestion = document.createElement("li");
					suggestion.textContent = term;
					suggestion.addEventListener("click", function(event) {
						field.value = event.target.textContent;
					});
					list.appendChild(suggestion);
				}
			});
		});
	</script>
</body>
</html>
