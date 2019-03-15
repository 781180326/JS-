function swap(A,i,j){
	var temp;
	temp = A[i];
	A[i] = A[j];
	A[j] = temp;
}

function partition(A,l,r){
	var x = A[r];
	var i = l-1;
	for(var j = l; j < r; j++){
		if(A[j] <= x){
			i++;
			swap(A,i,j);
		}
	}
	swap(A,i+1,r);
	return i+1;
}

function random_partition(A,l,r){
	var i = Math.ceil(Math.random()*(r-l)+l);
	swap(A,i,r);
	return partition(A,l,r);
}

function quickSort(A,l,r){
	if(l < r){
		var q = random_partition(A,l,r);
		quickSort(A,l,q-1);
		quickSort(A,q+1,r);
	}
}


var A = [-1,-44,3,4,2,78,343,2,34,0];
quickSort(A,0,A.length-1);
console.log(A);