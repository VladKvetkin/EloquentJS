function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  var reg = /\/\.\.(\/|$)/g;
  return "." + decodeURIComponent(path).replace(reg, "/");
}
