(function(){
	function Node(data){
		this.data = data;
		this.next = null;
	}

	function LinkedList(){
		this._length = 0;
		this.head = null;
	}

	LinkedList.prototype = {
		add: function(value){
			let node = new Node(value);
			let currentNode = this.head;

			if(!currentNode){
				this.head = node;
				this._length ++;

				return node;
			}

			while(currentNode.next){
				currentNode = currentNode.next;
			}

			currentNode.next = node;
			this._length ++;
			return node;
		},

		searchNodeAt: function(position){
			let currentNode = this.head;
			let length = this._length;
			let count = 1;
			let message = {failure: 'Failure: non-existent node in this list.'};

			if(length === 0 || position < 1 || position > length){
				throw new Error(message.failure);
			}

			while(count < position){
				currentNode = currentNode.next;
				count ++;
			}

			return currentNode;
		},

		remove: function(position){
			let currentNode = this.head;
			let length = this._length;
			let count = 0;
			let message = {failure: 'Failure: non-existent node in this list.'};
			let beforeNodeToDelete = null;
			let nodeToDelete = null;
			let deletedNode = null;

			if(position < 0 || position > length){
				throw new Error(message.failure);
			}

			if(position === 1){
				this.head = currentNode.next;
				deletedNode = currentNode;
				currentNode = null;
				this._length --;

				return deletedNode;
			}

			while(count < position){
				beforeNodeToDelete = currentNode;
				nodeToDelete = currentNode.next;
				currentNode = currentNode.next;
				count ++;
			}

			beforeNodeToDelete.next = nodeToDelete.next;
			deletedNode = nodeToDelete;
			nodeToDelete = null;
			this._length --;

			return deletedNode;
		}
	}

	window.Node = Node;
	window.LinkedList = LinkedList;
})();