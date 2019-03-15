
var str = "7 * 8 + 23 + (25 * 35)";
console.log(7 * 8 + 23 + (25 * 35));

//中缀转后缀方法    //改进：可以size运算小数  ：  用正则把 + - * / ( ) 改为 ' + ' ' - ' ' * ' ' / ' ' ( ' ' ) '  (意思就是在这些运算符前后加上空格)然后以空格拆分字符串，这样就可以将小数整体存入数组 ，不过对于 有 + - 号的运算无能为力，只能通过人为将 + - 号转化为 加减法
//
//再次改进： 可以运算正负号，遍历字符串，如果出现一个运算符，而且后面紧跟一个或多个+ - 运算符，将后面的一个或多个运算符和紧跟其后的数字一起存入数组，如果后面多出的运算符不是 + - 符号 直接报错
function math( str ){
	var arr = [], 					//运算符栈
		str_end = [],			 	//结果数组
		num = '0123456789', 
		c, cha, index, j = 0;

	for(var i = 0, len = str.length; i < len ; i++){

		cha = str.charAt(i);
		index = i; 						// 存储当前字符的索引

		if( num.indexOf(cha) !== -1 ){	//如果是数字

			while(true){				//如果紧挨着的后面还是数字，把他们看成一个数
				if( num.indexOf(str.charAt( i+1 )) == -1){
					break ;
				}else{
					i++;
				}
			}
			str_end[j++] = (str.slice(index, i+1));

		}
		else{							//如果不是数字

			switch(cha){

				case '(': 				//如果是 左括号，直接进栈
				case '*': 				//如果是 * / ,直接进栈，因为四则运算中没有比他们优先度更高的运算符了
				case '/':
					arr.push(cha); break;

				case ')': 				//如果是 右括号，在栈中找第一个左括号，将其上面的所有运算符出栈并进后缀栈，让这个左括号出栈
					while( (c = arr.pop()) && c !== '('){
							str_end[j++] = c;
					}
					break;

				case '+': 				//如果是 + - 
				case '-':
										//如果栈顶是 * /，因为没有比+ - 优先级更低的，所以让第一个括号之上的运算符全部出栈
					if(arr[arr.length-1] == '*' || arr[arr.length-1] == '/' ){
						while( (c = arr.pop()) && c !== '(' ){
							str_end[j++] = c;
						}
					}
					arr.push(cha);	//入栈
					break;

			}
		}
	}
	
	while(c = arr.pop()){		//将剩余的运算符出栈
		str_end[j++] = c;
	}

	return str_end;
}

var end = math(str);
alert(end);



//后缀运算方法
function meth2( stack ){
	var arr = [],										//这个栈存数字
		totel = 0,
		prev, next, n, tl;
	for(var i = 0, len = stack.length; i < len; i++){
	 	n = stack[i];
		if( tl = Number(n) ) {				//如果是数字
			arr.push(tl);
			console.log('totel=' + totel + ',arr=' + arr);
		}else{
			prev = Number(arr.pop());
			next = Number(arr.pop());
			switch( n ){
				case '+':
					totel = prev + next; break;
				case '-':
					totel = prev - next; break;
				case '*':
					totel = prev * next; break;
				case '/':
					totel = prev / next; break;
			}
			arr.push(totel);
			console.log('totel=' + totel + ',arr=' + arr);
		}
	}
	return totel;
}

console.log(meth2(end));
