function insertSort(A){
	for(var i = 1; i < A.length; i++){
		var key = A[i];
		var j = i -1;
		while( j >= 0 && A[j] > key ){
			A[j+1] = A[j];
			j = j - 1;
		}
		A[j+1] = key;
	}
}

var A = [2,2,1,2,-1,3,2,1,0,6,8,3];

insertSort(A);

console.log(A);

// 稳定