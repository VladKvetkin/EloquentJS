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

function evaluate(expr, env) {
	switch(expr.type) {
		case "value":
			return expr.value;

		case "word":
			if (expr.name in env)
				return env[expr.name];
			else
				throw new ReferenceError("Неопределенная переменная " + expr.name);

		case "apply":
			if (expr.operator.type == "word" &&
					expr.operator.name in specialForms)
				return specialForms[expr.operator.name](expr.args, env);

			var op = evaluate(expr.operator, env);
			if (typeof op != "function")
				throw new TypeError("Приложение не является функцией");
			return op.apply(null, expr.args.map(function(arg) {
				return evaluate(arg, env);
			}));
	}
}

var specialForms = Object.create(null);

specialForms["if"] = function(args, env) {
	if (args.length != 3)
		throw new SyntaxError("Неправильное количество аргументов");

	if (evaluate(args[0], env) !== false)
		return evaluate(args[1], env);
	else
		return evaluate(args[2], env);
};

specialForms["while"] = function(args, env) {
	if (args.length != 2)
		throw new SyntaxError("Неправильное количество аргументов");

	while (evaluate(args[0], env) !== false)
		evaluate(args[1], env);

	return false;
};

specialForms["do"] = function(args, env) {
	var value = false;

	args.forEach(function(arg) {
		value = evaluate(arg, env);
	});
	return value;
};

specialForms["define"] = function(args, env) {
	if (args.length != 2 || args[0].type != "word")
		throw new SyntaxError("Плохое использование define");
	var value = evaluate(args[1], env);
	env[args[0].name] = value;
	return value;
};

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
	topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["print"] = function(value) {
	console.log(value);
	return value;
}


function run() {
	var env = Object.create(topEnv);
	var program = Array.prototype.slice
								.call(arguments, 0).join("\n");
	return evaluate(parse(program), env);
}


specialForms["fun"] = function(args, env) {
	if (!args.length)
		throw new SyntaxError("Функции нужно тело");

	function name(expr) {
		if (expr.type != "word")
			throw new SyntaxError("Имена аргументов должны быть переменными");
		return expr.name;
	}

	var argNames = args.slice(0, args.length - 1).map(name);
	var body = args[args.length - 1];

	return function() {
		if (arguments.length != argNames.length)
			throw new TypeError("Неверное количество аргументов");
		var localEnv = Object.create(env);
		for (var i = 0; i < arguments.length; ++i)
			localEnv[argNames[i]] = arguments[i];
		return evaluate(body, localEnv);
	}
}

topEnv["array"] = function() {
	return Array.prototype.slice.call(arguments, 0);
};

topEnv["length"] = function(array) {
	return array.length;
};

topEnv["element"] = function(array, i) {
	return array[i];
}

specialForms["set"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
		throw new SyntaxError("Плохое использование set");

	var value = evaluate(args[1], env);

	if (Object.prototype.hasOwnProperty.call(env, args[0].name))
		env[args[0].name] = value;
	else if (Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(env), args[0].name))
		Object.getPrototypeOf(env)[args[0].name] = value;
	else
		throw new ReferenceError("Переменная " + args[0].name + " не задана");

	return value;
};

run("do(define(x, 4),",
    "   define(setx, fun(val, set(x, val))),",
    "   setx(50),",
    "   print(x))");
// 50
run("set(quux, true)");
// ReferenceError
