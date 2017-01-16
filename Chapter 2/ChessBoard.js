function chessBoard(n) {
	var hashSymbol = '#', spaceSymbol = ' ';

	for (var i = 1; i <= n; ++i) {
		var output = '';

		while (output.length != n) {

			if (i % 2 != 0) {
				if ((output.length + 1) % 2 != 0)
					output +=	hashSymbol;
				else
					output +=	spaceSymbol;
			} else {
			 	if ((output.length + 1) % 2 != 0)
					output +=	spaceSymbol;
				else
					output +=	hashSymbol;
			 }
		}

		console.log(output);
	}
}
