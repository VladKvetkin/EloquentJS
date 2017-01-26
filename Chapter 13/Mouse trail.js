<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Mouse trail</title>
</head>
<body>

<style>
  .trail {
    position: absolute;
    height: 6px; width: 6px;
    border-radius: 3px;
    background: teal;
  }
  body {
    height: 300px;
  }
</style>

<script>
	var trails = [];

	for (var i = 0; i < 6; ++i) {
		var trail = document.createElement("div");
		trail.className = "trail";
		trails.push(trail);
		document.body.appendChild(trail);
	}

	var currentTrail = 0;

	addEventListener("mousemove", function(event) {

		if (currentTrail >= trails.length)
			currentTrail = 0;

		trails[currentTrail].style.top = (event.pageY - 5)+ "px";
		trails[currentTrail].style.left = (event.pageX - 5) + "px";

		currentTrail++;
	});
</script>

</body>
</html>
