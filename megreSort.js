function merge(A,l,m,r){
	var n1 = m-l+1;
	var n2 = r-m;
	var L = new Array(n1+1);
	var R = new Array(n2+1);

	for(var i = 0; i < n1; i++){
		L[i] = A[l+i];
	}

	for(var j = 0; j < n2; j++){
		R[j] = A[m+j+1]; 
	}

	L[n1] = Infinity;
	R[n2] = Infinity;

	i = 0;
	j = 0;

	for( var k = l; k <= r; k++){
		if( L[i] <= R[j] ){
			A[k] = L[i];
			i++;
		}else{
			A[k] = R[j];
			j++;
		}
	}
}

function mergeSort(A,l,r){
	if(l < r){
		var m = Math.floor((l+r)/2);
		mergeSort(A,l,m);
		mergeSort(A,m+1,r);
		merge(A,l,m,r);
	}
}

var A = [2,2,1,2,-1,3,2,1,0,6,8,3];

mergeSort(A,0,A.length-1);

console.log(A);

//稳定