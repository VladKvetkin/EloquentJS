var http = require("http");

var types = ["text/plain", "text/html", "application/json", "application/rainbows+unicorns"];

types.forEach(function(type) {
	requestAuthor(type);
});

function requestAuthor(type) {
	var request = http.request({
	hostname: "eloquentjavascript.net",
	path: "/author",
	method: "GET",
	headers: {Accept: type}
	}, function(response) {
		response.on("data", function(chunk) {
			console.log(chunk.toString());
		});
	}).end();
}
