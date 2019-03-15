
function swap(A,i,j){
	var temp;
	temp = A[i];
	A[i] = A[j];
	A[j] = temp;
}

function parent(i){
	return Math.ceil(i/2)-1;
}

function left(i){
	return 2*i+1;
}

function right(i){
	return 2*i+2;
}

function max_heapify(A,i){
	var l = left(i);
	var r = right(i);
	var largest = i;
	if( l < A.heap_size && A[l] > A[i] ){
		largest = l;
	}
	if( r < A.heap_size && A[r] > A[largest] ){
		largest = r;
	}
	if( largest !== i ){
		swap( A,i,largest );
		max_heapify(A,largest);
	}
}

function build_max_heap(A){
	A.heap_size = A.length;
	for(var i = Math.floor(A.length/2)-1; i >= 0; i--){
		max_heapify(A,i);
	}
}

function heapSort(A){
	build_max_heap(A);
	for(var i = A.length-1; i > 0; i--){
		swap(A,0,i);
		A.heap_size--;
		max_heapify(A,0);
	}
}


var A = [-1,-44,3,4,2,78,343,2,34,0];
heapSort(A);
console.log(A);