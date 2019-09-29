var ne = console.error;
console.error=function(){
 Array.prototype.push.call(arguments,{"rainmenxia":1});
  ne.apply(this, arguments);
}
console.error("test");