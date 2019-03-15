

var buffer = new ArrayBuffer(8);//length  要创建的数组缓冲区的大小，以字节为单位。
var a = new Int16Array(buffer);
alert(a.BYTES_PER_ELEMENT);//返回不同类型的数组对象的元素大小的数字值。  2
alert(a.TypedArray.length);//数组的长度   2 
alert(a.TypedArray.name);  //返回构造器的名称
alert(a.TypedArray.prototype);//TypedArray的原型.