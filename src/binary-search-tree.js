const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data ) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }
    this._addNode(this.rootNode, newNode);
  }
  _addNode(current, newNode) {
    if (newNode.data < current.data) {
      if (!current.left) {
        current.left = newNode;
      } else {
        this._addNode(current.left, newNode);
      }
    } else {
      if (!current.right) {
        current.right = newNode;
      } else {
        this._addNode(current.right, newNode);
      }
    }
  }

  _findNode(current, data) {
    if (!current) {
      return null;
    }
    if (data === current.data) {
      return current;
    }
    return data < current.data
        ? this._findNode(current.left, data)
        : this._findNode(current.right, data);
  }
  find( data ) {
    return this._findNode(this.rootNode, data);
  }

  has( data ) {
    return this.find(data) !== null;
  }

  remove( data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }
  _removeNode(current, data) {
    if (!current) {
      return null;
    }
    if (data < current.data) {
      current.left = this._removeNode(current.left, data);
    } else if (data > current.data) {
      current.right = this._removeNode(current.right, data);
    } else {
      if (!current.left) {
        return current.right;
      } else if (!current.right) {
        return current.left;
      }
      current.data = this._minNode(current.right).data;
      current.right = this._removeNode(current.right, current.data);
    }
    return current;
  }
  min() {
    const minNode = this._minNode(this.rootNode);
    return minNode ? minNode.data : null;
  }
  _minNode(current) {
    if (!current) {
      return null;
    }
    while (current.left) {
      current = current.left;
    }
    return current;
  }
  max() {
    const maxNode = this._maxNode(this.rootNode);
    return maxNode ? maxNode.data : null;
  }
  _maxNode(current) {
    if (!current) {
      return null;
    }
    while (current.right) {
      current = current.right;
    }
    return current;
  }
}

module.exports = {
  BinarySearchTree
};