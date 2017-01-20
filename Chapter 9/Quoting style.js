"use strict"

var str = "hello: 'privet aren't ', abd - 'adf', aren't he's you're 'h' ' '"

console.log(str.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

