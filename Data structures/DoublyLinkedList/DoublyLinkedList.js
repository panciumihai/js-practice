function ListNode(value, previous = null, next = null) {
  this.value = value;
  this.next = next;
  this.previous = previous;
}

function DoublyLinkedList() {
  this.first = null;
  this.last = this.first;
  this.length = 0;
}

Object.assign(DoublyLinkedList.prototype, {
  // ---- insert ----

  insertFirst(value) {
    if (this.first) {
      const newNode = new ListNode(value, null, this.first);
      newNode.next.previous = newNode;
      this.first = newNode;
    } else {
      this.first = new ListNode(value);
      this.last = this.first;
    }
    this.length++;
  },

  insertLast(value) {
    if (this.last) {
      const newNode = new ListNode(value, this.last, null);
      this.last.next = newNode;
      this.last = newNode;
    } else {
      this.first = this.last = new ListNode(value);
    }
    this.length++;
  },

  insertAfter(nodeValue, newValue) {
    let currentNode = this.first;

    while (currentNode !== null && currentNode.value !== nodeValue) {
      currentNode = currentNode.next;
    }

    if (currentNode === null) {
      throw new Error(`"${nodeValue}" value doesn't exist in the list!`);
    }

    const newNode = new ListNode(newValue, currentNode);

    if (currentNode.next) {
      newNode.next = currentNode.next;
      currentNode.next.previous = newNode;
    }
    currentNode.next = newNode;
    this.length++;
  },

  // // ---- delete ----

  deleteFirst() {
    if (this.first) {
      const nextNode = this.first.next;
      if (nextNode) {
        nextNode.previous = null;
        this.first = nextNode;
      } else {
        this.last = this.first = null;
      }
      this.length--;
    }
  },

  deleteLast() {
    if (this.last) {
      const previousNode = this.last.previous;

      if (previousNode) {
        previousNode.next = null;
        this.last = previousNode;
      } else {
        this.last = this.first = null;
      }
      this.length--;
    }
  },

  deleteNode(nodeValue) {
    let currentNode = this.first;
    while (currentNode !== null) {
      if (currentNode.value !== nodeValue) {
        currentNode = currentNode.next;
        continue;
      }

      this.length--;
      if (currentNode.previous === null && currentNode.next === null) {
        this.deleteFirst();
        currentNode = currentNode.next;
        continue;
      }

      if (currentNode.previous === null && currentNode.next !== null) {
        this.deleteFirst();
        currentNode = currentNode.next;
        continue;
      }

      if (currentNode.previous !== null && currentNode.next !== null) {
        currentNode.previous.next = currentNode.next;
        currentNode.next.previous = currentNode.previous;
        currentNode = currentNode.next;
        continue;
      }

      if (currentNode.previous !== null && currentNode.next === null) {
        this.deleteLast();
        currentNode = currentNode.next;
        continue;
      }

      currentNode = currentNode.next;
    }
  },

  // // ---- display ----

  displayForward() {
    let array = [];
    let currentNode = this.first;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array);
    return array;
  },

  displayBackward() {
    let array = [];
    let currentNode = this.last;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.previous;
    }

    console.log(array);
    return array;
  },
});
