methods.MKCOL = function(path, respond) {
	fs.mkdir(path, function(err) {
		if (err)
			respond(500, error.toString());
		else
			respond(204);
	})
}
