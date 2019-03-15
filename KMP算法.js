
	var S = 'abbdsgrrabcdefg';
	var T = 'abc';
	var next = [];

	//获取子串在 i-1位置 字符串前后相同的字符个数的数组,数组长度为串长度,而第一位要存0,所以最后一位字符是不会进行计算和存储的
	//比如子串 'ababacd' i = 0时 数组中存 0 
	//									i = 1 时, i-1位置0,也就是第一位的字符只有一个，所以存1
	//									i = 2 时, i-1位置1,也就是第二位的字符为 b,字符串头是 a,尾是b,不相同,存1
	//									i = 3 时, i-1位置2,也就是第三位的字符为 a,字符串头是 a,尾是a,相同,存2
	//									i = 4 时, i-1位置3,也就是第四位的字符为 b,字符串头是 ab,尾是ab,相同,存3
	//									i = 5 时, i-1位置4,也就是第五位的字符为 a,字符串头是 aba,尾是aba,相同,存4
	//									i = 6 时, i-1位置5,也就是第六位的字符为 c,字符串头是 a,尾是c,不相同,存1
	//									
	//存储算法：					
	//									i = 1, j = 0, next[0] = [0];
	//									第一次： j==0  成立
	//													j++;(1) i++;(2)  next[i-1] = j;(next[1] = 1) 
	//													
	//									第二次： j!=0  && T[1]!=T[0]    T[1]:b  T[0]:a
 	//													j = next[j-1];(j = next[0] = 0)
	//													j==0  成立
	//													j++;(1) i++;(3)  next[i-1] = j;(next[2] = 1) 
	//													
	//									第三次： T[2]==T[0]  成立					T[2]:a  T[0]:a
	//													j++;(2) i++;(4)  next[i-1] = j;(next[3] = 2) 
	//													
	//									第四次： T[3]==T[1] 成立					T[3]:b  T[1]:b
	//													j++;(3) i++;(5)  next[i-1] = j;(next[4] = 3) 
	//													
	//									第五次：	T[4]==T[2] 成立					T[4]:a  T[2]:a
	//													j++;(4) i++;(6)  next[i-1] = j;(next[5] = 4)
	//													
	//									第六次：	j!=0  &&  T[5]!==T[3]   T[5]:c  T[3]:b 
	//													j = next[j-1];(j = next[3] = 2)
	//													
	//													j!=0  &&  next[j]!=next[5]		(next[2]==a)
	//													j = next[j-1];(j = next[1] = 1) 
	//													
	//													j!=0  &&  next[j]!=next[5]		(next[1]==b)
	//													j = next[j-1];(j = next[0] = 0) 
	//													
	//													j==0  成立
	//													j++;(1) i++;(7)  next[i-1] = j;(next[6] = 1) 
	function getIndex( T ){
		var i = 1, j = 0;     
		next[0] = 0;
		while( i < T.length ){  //abab [0, 1, 1, 2, 3]
			if( j == 0 || T[i-1] == T[j-1] ){ //T[i-1]表示后缀的单个字符(当前的字符)，T[j-1]表示前缀的单个字符(上一次匹配到的字符)
				i++;
				j++;
				if( T[i-1] == T[j-1] )//如果当前字符与前缀字符相同，则将前缀字符的next值赋给next在i-1位置的值
					next[i-1] = next[j-1];
				else							//如果当前字符与前缀字符不同，则 j 为 next在 i-1 位置的值
					next[i-1] = j;
			}else{
				j = next[j-1];			//若字符不相同，
			}
		}
		return next;
	}

	var arr = getIndex('abac');//0 1 1 2  => 0 1 0 2
	console.log(arr);


	function index( S, T, pos ){
		if( pos < 0 || pos >= S.length ) return new Error("数组越界");
 		var i = pos; j = 0;
		var next = getIndex( T );

		while( i < S.length && j < T.length ){
			if( S[ i ] == T[ j ]  || j == 0 ){
				i++;
				j++;
			}else{
				j = next[j-1];
			}
		}

		if( j == T.length ){
			return i - T.length;
		}

		return -1;
	}

	console.log(index(S, T, 0));


	/*
		原版在c中是这样写的：
				将串存在(顺序线性表)数组中,第一位也就是array[0]存放字符串长度

				getNext方法：
				void getNext( String T, int *next ){
					int i, j;
					i = 1;
					j = 0;
					next[1] = 0;
					
					while( i < T[0] ){
						if( i==0 || T[i] == T[j] ){
							++i;
							++j;
							if( T[i] != T[j] )
								next[i] = j;
							else
								next[i] = next[j];
						}else{
							j = next[j];
						}
					}
				}

				index方法:
				void index( String S, String T, int pos){
					int i = pos;
					int j = 1;
					int next[225];
					getNext( T, next );

					while( i <= S[0] && j <= T[0] ){
						if( j==0 || S[i] == T[j]){
							++i;
							++j;
						}else{
							j = next[j];
						}
					}
					if( j > T[0] ){
						return i - T[0];
					}
					else{
						return 0;
					}
				}
				因为c中数组第一位也就是array[0]存放字符串长度,所以取值都是从1开始的：i=1;j=1;
				因为next数组要和字符串索引对应上，所以在c中next是从1下标开始的：next[1]=0;
				在getnext方法中 i 和 j 分别为 1 0 ，是为了能够比较字符串前缀与后缀是否相同，并且用j来暂存前缀字符的位置，用i来暂存后缀字符的位置
				因为js中的字符串算是类数组，直接可以进行索引取值的操作,所以它的第一位是占用的，这种情况下，就需要将c中的方法稍微更改一下，比如 i-1 j-1 next[0] = 0;等等操作。

				
				此算法参见 《大话数据结构》 P_135 KMP算法(朴素查找算法的改进)

	 */
