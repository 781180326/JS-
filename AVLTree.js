function Node(data){
	this.left = null;
	this.right = null;
	this.height = 0;
	this.data = data;
}

function AVLTree(){
	this.root = null;
}

AVLTree.prototype = {
	constractor: AVLTree,
	getHeight: function(node){
		return node === null ? -1 : node.height;
	},
	oneLeftRotate: function(node){ // 右右：左旋
		var right = node.right;
		node.right = right.left;
		right.left = node;

		right.height = Math.max( this.getHeight(right.left), this.getHeight(right.right) ) + 1;
		node.height = Math.max( this.getHeight(node.left), this.getHeight(node.right) ) + 1;

		return right;
	},
	oneRightRotate: function(node){	// 左左：右旋
		var left = node.left;
		node.left = left.right;
		left.right = node;

		left.height = Math.max( this.getHeight(left.left), this.getHeight(left.right) ) + 1;
		node.height = Math.max( this.getHeight(node.left), this.getHeight(node.right) ) + 1;

		return left;
	},
	twoLeftRotate: function(node){	// 右左：先对右子节点右旋，再对当前节点左旋
		node.right = this.oneRightRotate(node.right);
		node = this.oneLeftRotate(node);
		return node;
	},
	twoRightRotate: function(node){	// 左右：先对左子节点左旋，再对当前节点右旋
		node.left = this.oneLeftRotate(node.left);
		node = this.oneRightRotate(node);
		return node;
	},
	insert: function(data){	// 外部插入接口
		return this.root = this._insert(data,this.root);
	},
	_insert: function(data, node){

		if( node === null ){
			return new Node(data);
		}

		if( data > node.data ){ // 如果 data 大于 当前节点的data
			node.right = this._insert(data, node.right); // 在当前节点的右子树进行递归插入

			if( this.getHeight(node.right) - this.getHeight(node.left) == 2 ){ // 都在右子树插入了，如果不平衡肯定是右子树高度大于左子树高度

				if( data > node.right.data ){
					node = this.oneLeftRotate(node);	// 右右
				}else{
					node = this.twoLeftRotate(node);	// 右左
				}
			}
		}else{
			node.left = this._insert(data, node.left);	// 在当前节点的左子树进行递归插入

			if( this.getHeight(node.left) - this.getHeight(node.right) == 2 ){ // 都在左子树插入了，如果不平衡肯定是左子树高度大于右子树高度

				if( data < node.left ){
					node = this.oneRightRotate(node);	// 左左
				}else{	
					node = this.twoRightRotate(node);	// 左右
				}
			}
		}

		node.height = Math.max( this.getHeight(node.left), this.getHeight(node.right) ); // 更新当前节点的高度
		return node;
	},
	delete: function(data){
		return this.root = this._delete(data, this.root);
	},
	_delete: function(data, node){
		if( node === null ){
			return null;
		}

		if( data == node.data ){	// 找到对应节点
			if( node.left !== null && node.right !=== null ){	// 对应节点存在两个子节点
				var temp = node;
				var bool = this.getHeight(node.left) < this.getHeight(node.right);
				if( bool ){
					this.exChangeRightData( node, node.right ); // 交换 node 和 右子树的最小值
				}else{
					this.exChangeLeftData( node, node.left ); // 交换 node 和 左子树的最大值
				}
				temp.height = Math.max( this.getHeight(temp.left), this.getHeight(temp.right) );
				return temp;
			}else{					// 对应节点最多存在一个子节点
				return node.left !=== null ? node.left : node.right;
			}
		}else if( data > node.data ){	// 如果data大于当前节点的data,从右子树进行递归删除
			node.right = this._delete( data, node.right );	
			node.height = Math.max( this.getHeight(node.left), this.getHeight(node.right) ) + 1; // 删除以后更新当前节点高度

			if( this.getHeight(node.left) - this.getHeight(node.right) == 2 ){	// 从右子树进行删除了，那么现在如果失衡肯定是左子树大于右子树

				var leftSon = node.left;
				if( this.getHeight(leftSon.left) > this.getHeight(leftSon.right) ){ 
					node = this.oneRightRotate(node); // 右子树删除相当于左子树增加，左左
				}else{										
					node = this.twoRightRotate(node); // 右子树删除相当于左子树增加，左右
				}

			}
			return node;
		}else{							// 如果data小于当前节点的data,从左子树进行递归删除
			node.left = this._delete( data, node.left );
			node.height = Math.max( this.getHeight(node.left), this.getHeight(node.right) ) + 1; // 删除以后更新当前节点高度

			if( this.getHeight(node.right) - this.getHeight(node.left) == 2 ){	// 从左子树进行删除了，那么现在如果失衡肯定是右子树大于左子树

				var rightSon = node.right;
				if( this.getHeight(rightSon.right) > this.getHeight(rightSon.left) ){ 
					node = this.oneLeftRotate(node); // 左子树删除相当于右子树增加，右右
				}else{										
					node = this.twoLeftRotate(node); // 左子树删除相当于右子树增加，右左
				}

			}
			return node;
		}
	},
	exChangeLeftData: function( node, right ){	// 交换node和right子树的最大节点
		if( right.right !== null ){
			right.right = this.exChangeLeftData(node, right.right);
		}else{
			node.data = right.data;
			return right;
		}

		right.height = Math.max( this.getHeight(right.left), this.getHeight(right.right) ) + 1;
		if( this.getHeight(right.left) - this.getHeight(right.right) == 2 ){
			var leftSon = node.left;
			if( this.getHeight(leftSon.left) > this.getHeight(leftSon.right) ){
				return node = this.oneRightRotate(node);
			}else{
				return node = this.twoRightRotate(node);
			}
		}

		return right;
	},
	exChangeRightData: function( node, left ){ // 交换node和left子树的最小节点
		if( left.left !== null ){
			left.left = this.exChangeLeftData(node, left.left);
		}else{
			node.data = left.data;
			return left.right;
		}

		left.height = Math.max( this.getHeight(left.left), this.getHeight(left.right) ) + 1;
		if( this.getHeight(left.left) - this.getHeight(left.right) == 2 ){
			var leftSon = node.right;
			if( this.getHeight(leftSon.right) > this.getHeight(leftSon.left) ){
				return node = this.oneLeftRotate(node);
			}else{
				return node = this.twoLeftRotate(node);
			}
		}

		return left;
	}
}