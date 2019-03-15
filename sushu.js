	
	function find( num ) {
		let bool;
		if( num > 5 ){
			bool = ( num % 2 ) && ( num % 3 ) && ( num % 5 ) ? true : false;
		}else{
			bool = ( 0 === num ) || ( 1 === num ) || ( 4 === num ) ? false : true;
		}
		return bool;
	}
	console.log(find(14));

	{
		let i = 15;
		while( i-- ) {
			console.log( i + ':' +find( i ) );
		}
	}


	{
		let arr = [0, 1, 4, 5, 7, 8];
		console.log( 501 - 487 );
		function getMinTo( arr ) { // 无法解决当数组中出现 大于9 或 小于0 的情况 
			var odd_ev = arr / 2,
				length = arr.length,
				c, d;

			if( odd_ev ) {	 //odd_ev为奇数
				c = d = 0;
				for ( let i = 0, len = length / 2; i < len; ++i){
					c = arr[length - 1 - i] + c * 10;
					d = arr[i] + d * 10;
					if( 0 === arr[0] ){
						if( i < 2 ) d = arr[1] * 10;
					}
				}
			}else{			//odd_ev为偶数
				c = arr[length / 2 - 1];
				d = arr[length/2];
				for( let i = 0, len = length / 2 - 1; i < len; ++i ){
					c = arr[length - 1 - i] + c * 10;
					d = arr[i] + d * 10;
				}
			}
			return Math.abs( c - d );
		}

		console.log(getMinTo(arr));
	}

	{ 	//构建 树 数据结构

		function Node( value ){
			this.value  = value;
			this.left = null;
			this.right = null;
		}
	
	}



