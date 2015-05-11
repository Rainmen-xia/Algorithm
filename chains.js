
function chain(input, fs) {
//implement the "chain" function
	var fn = fs[0](input);
	for(var i=1;i<fs.length;i++){
		fn = fs[i](fn);
	}
	console.log(fn);
	return fn;
}
function add(str){
	return str+2;
}

function sub(str){
	return str*2;
}

function div(str){
	return str-2;
}

chain(2,[add,sub,div]);
