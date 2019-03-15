
function SUBARRAY(max_left,max_right,sum){
	this.max_left = max_left;
	this.max_right = max_right;
	this.sum = sum;
}

function FIND_MAX_CROSSING_SUBARRAY(A,low,mid,high){
	var left_sum = -Infinity;
	var right_sum = -Infinity;
	var sum_L = 0;
	var sum_R = 0;
	var max_left = mid;
	var max_right = mid + 1;

	for(var i = mid; i >= low; i--){
		sum_L += A[i];
		if(sum_L > left_sum){
			left_sum = sum_L;
			max_left = i;
		}
	}

	for(var j = mid+1; j <= high; j++){
		sum_R += A[j];
		if(sum_R > left_sum){
			right_sum = sum_R;
			max_right = j;
		}
	}

	return new SUBARRAY( max_left, max_right, left_sum + right_sum);
}

function FIND_MAXIMUM_SUBARRAY(A,low,high){

	if( low == high ){
		return new SUBARRAY( low, high, A[low] );
	}

	var mid = Math.floor( (low+high)/2 );

	var left = FIND_MAXIMUM_SUBARRAY( A, low, mid );
	var right = FIND_MAXIMUM_SUBARRAY( A, mid+1, high);
	var cross = FIND_MAX_CROSSING_SUBARRAY( A, low, mid, high );

	if( left.sum >= right.sum && left.sum >= cross.sum ){
		return left;
	}else if( right.sum >= left.sum && right.sum >= cross.sum ){
		return right;
	}else{
		return cross;
	}

}


var A = [-2,-2,-1,2,-1,3,2,1,0,6,8,3];

var result = FIND_MAXIMUM_SUBARRAY(A,0, A.length-1);

console.log(result);