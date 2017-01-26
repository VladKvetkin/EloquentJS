<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Censored keyboard</title>
</head>
<body>

<input type="text">
<script>
	var field = document.querySelector("input");

	var prohibitedChars = [];
	prohibitedChars.push("Q".charCodeAt(0));
	prohibitedChars.push("X".charCodeAt(0));
	prohibitedChars.push("W".charCodeAt(0));

	field.addEventListener("keydown", function(event) {
		if (prohibitedChars.indexOf(event.keyCode) != -1)
			event.preventDefault();
	});
</script>

</body>
</html>
