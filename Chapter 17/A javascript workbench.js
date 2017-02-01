<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>A JavaScript workbench</title>
</head>
<body>
	<textarea id="code">return "hi";</textarea>
	<button id="button" type="button">Поехали</button>
	<pre id="output"></pre>

	<script>
		var textarea = document.querySelector("#code");
		var button = document.querySelector("#button");
		var output = document.querySelector("#output");

		button.addEventListener("click", function() {
			var text = textarea.value;
			var func = new Function(text);
			try {
				var result = String(func());
				output.textContent = result;
			} catch(e) {
				output.textContent = e.message;
			}
		});
	</script>
</body>
</html>
