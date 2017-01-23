"use strict"

function parseExpression(program) {
	program = skipSpace(program);
	var match, expr;

	if (match = /^"([^"]*)"/.exec(program))
		expr = {type: "value", value: match[1]};
	else if (match = /^\d+\b/.exec(program))
		expr = {type: "value", value: Number(match[0])};
	else if (match = /^[^\s(),"]+/.exec(program))
		expr = {type: "word", name: match[0]};
	else
		throw new SyntaxError("Неожиданный синтаксис: " + program)

	return parseApply(expr, program.slice(match[0].length));
}


function skipSpace(string) {
	var skip = string.match(/(?:\s*(?:#.*\n)?)*/);
	return string.slice(skip[0].length);
}


function parseApply(expr, program) {
	program = skipSpace(program);
	if (program[0] != "(")
		return {expr: expr, rest: program};

	program = skipSpace(program.slice(1));
	expr = {type: "apply", operator: expr, args: []};
	while (program[0] != ")") {
		var arg = parseExpression(program);
		expr.args.push(arg.expr);
		program = skipSpace(arg.rest);
		if (program[0] == ",")
			program = skipSpace(program.slice(1));
		else if (program[0] != ")")
			throw new SyntaxError("Ожидается ',' или ')'");
	}
	return parseApply(expr, program.slice(1));
}


function parse(program) {
	var result = parseExpression(program);
	if (skipSpace(result.rest).length > 0)
		throw new SyntaxError("Неожиданный текст после программы");
	return result.expr;
}

console.log(parse("# hello\nx"));
console.log(parse("a # one\n    # two\n()"));
