
function pascalsTriangle(n) {
  var pas = [];
  var pos,p;
  for(var i = 0; i < n; i ++){
	p = [];
	for(var j = 0; j <= i; j++){ 
	  if(j==0||j==i){ 
		p.push(1)
	  }else{
		p.push(pos[j]+pos[j-1]);
	  };
	}
    pos = p;
    pas = pas.concat(p);
	console.log(pas);
  }

	return pas;
}
console.log(pascalsTriangle(5));

