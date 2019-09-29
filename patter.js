;"use strict";
function partern(n){
  var output = '';
  for(var i =1;i<2*n;i++){
    var j=0;
    while(j<2*n){
      output +=(i>n)?((i==j||(i==2*n-j))?(2*n-i)%10:' '):((i==j||(i==2*n-j))?i%10:' ');
      j++;
    }
  output +='\n';
  }
  return output
}
console.log(partern(3));
