var vex = ["q","w","e","r","t","y"];

var create = [
	[0,1,33,65535,43,21],
	[0,0,2,34,5,7],
	[0,0,0,3,45,65535],
	[0,0,0,0,12,34],
	[0,0,0,0,0,12],
	[0,0,0,0,0,0]
];

//创建邻接矩阵
var arr = [];
for(var i = 0; i < 6; i++){
	arr[i] = [];
	arr[i][i] = 0;
}
for(var  i = 0; i < 6; i++){
	for(var  j = i; j < 6; j++){
		arr[i][j] = create[i][j];
		arr[j][i] = create[i][j];
	}
}

//最小生成树:
	var lowercost = [];//存储当前已遍历过的点与其他点之间的最小距离，初始为第0各点到所有点的距离，值为0时代表已经将这个点加入到最小生成树中
	var ajvex = [];//存储某个点的前驱顶点，初始全部为0
	var min; //存储当前状态下最短的路径
	var k;//存储当前状态下最短路径的下标
	for(var i = 0; i < 6; i++){
		lowercost[i] = arr[0][i];//初始化
		ajvex[i] = 0;//初始化
	}
	for(var i = 1; i < 6; i++){
		console.log(lowercost);
		console.log(ajvex);
		k = 0;min = 65535;
		for(var j = 0; j < 6; j++){ // 找当前lowercost中除了0以外的最小值
			if(lowercost[j] !== 0 && lowercost[j] < min){
				min = lowercost[j];
				k = j; //将最小值的下标赋值给k
			}
		}
		console.log(ajvex[k] + "->" + k + ':' +min);//打印前驱顶点到当前顶点k(也就是打印当前最短边)
		lowercost[k] = 0;//当前顶点已经并入最小生成树
		for(var j = 1; j < 6; j++){//把与k点相关的点中，距离比lowercost中值小的替换到lowercost中
			if(lowercost[j] !== 0 && arr[k][j] < lowercost[j]){//如果点还没有加入树并且值比lowercost中的小

				lowercost[j] = arr[k][j];//替换
				ajvex[j] = k;//将这个替换上的顶点的前驱点设置为k,因为这个顶点到k的距离小于到之前所有顶点的距离,如果下一次要输出这个路径那就是 k ->当前顶点
			}
		}

	}

console.log('------------------------------------------');
//深度优先遍历  递归
var viste = [];//初始长度为图中顶点的个数,每个值为false,已经遍历过的点为true
function DFS(arr,i){
	viste[i] = true;
	console.log(vex[i]);  //显示当前点
	for(var j = 0; j < 6; j++){
		if( arr[i][j] !== 0 && arr[i][j]!==65535 && !viste[j]){//如果点不是自身，且和当前点之间有边并且没有被遍历过		
			DFS(arr,j);  //深度递归
		}
	}
}
for(var i = 0; i < 6; i++){//初始化标记数组
	viste[i] = false;
}
for(var i = 0; i < 6; i++){//兼容不连通图
	if( !viste[i] ){
		DFS( arr, i );
	}
}

console.log('------------------------------------------');
//广度优先遍历 队列
var viste = [];
var quere = [];//辅助队列
for(var i = 0; i < 6; i++){
	viste[i] = false;
}
for(var i = 0; i < 6; i++){//这个for循环是为了兼容不连通图
	if(!viste[i]){
		viste[i] = true;
		console.log(vex[i]);//打印当前点
		quere.push(i);
		while( !quere[0] ){//队列不空时
			var k = quere.shift();//将队列第一个出队列并赋值给k，用k去找它的下一层顶点
			for(var j = 0; j < 6; j++){
				if(arr[k][j]!==0 && arr[k][j]!==65535 && !viste[j]){
					viste[j] = true;
					console.log(vex[j]);//打印当前找到的点
					quere.push(j);//将找到的点入队列
				}
			} 
		}
	}
}

//最短路径

 var P = [];//存储最短路径下标的数组
