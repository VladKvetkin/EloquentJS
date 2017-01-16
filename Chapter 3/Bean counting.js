function countChar(str, char) {
	var countChar = 0;

	for (var i = 0; i < str.length; ++i) {
		if (str[i] == char)
			++countChar;
	}

	return countChar;
}
