const createNode = (value, previous = null, next = null) => {
  this.value = value;
  this.previous = next;
  this.next = previous;
  return {
    value,
    previous,
    next,
  };
};

const DoublyLinkedList = () => {
  this.first = null;
  this.last = this.first;
  this.length = 0;

  // ---- insert ----

  const insertFirst = (value) => {
    if (first) {
      const newNode = createNode(value, null, first);
      newNode.next.previous = newNode;
      first = newNode;
    } else {
      first = createNode(value);
      last = first;
    }
    length++;
  };

  const insertLast = (value) => {
    console.log(length);
    if (last) {
      const newNode = createNode(value, last, null);
      last.next = newNode;
      last = newNode;
    } else {
      first = last = createNode(value);
    }
    length++;
  };

  const insertAfter = (nodeValue, newValue) => {
    let currentNode = first;

    while (currentNode !== null && currentNode.value !== nodeValue) {
      currentNode = currentNode.next;
    }

    if (currentNode === null) {
      throw new Error(`"${nodeValue}" value doesn't exist in the list!`);
    }

    const newNode = createNode(newValue, currentNode);

    if (currentNode.next) {
      newNode.next = currentNode.next;
      currentNode.next.previous = newNode;
    }
    currentNode.next = newNode;
    length++;
  };

  // ---- delete ----

  const deleteFirst = () => {
    if (first) {
      const nextNode = first.next;
      if (nextNode) {
        nextNode.previous = null;
        first = nextNode;
      } else {
        last = first = null;
      }
      length--;
    }
  };

  const deleteLast = () => {
    if (last) {
      const previousNode = last.previous;

      if (previousNode) {
        previousNode.next = null;
        last = previousNode;
      } else {
        last = first = null;
      }
      length--;
    }
  };

  const deleteNode = (nodeValue) => {
    let currentNode = first;
    while (currentNode !== null) {
      if (currentNode.value !== nodeValue) {
        currentNode = currentNode.next;
        continue;
      }

      length--;
      if (currentNode.previous === null && currentNode.next === null) {
        deleteFirst();
        currentNode = currentNode.next;
        continue;
      }

      if (currentNode.previous === null && currentNode.next !== null) {
        deleteFirst();
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
        deleteLast();
        currentNode = currentNode.next;
        continue;
      }

      currentNode = currentNode.next;
    }
  };

  // ---- display ----

  const displayForward = () => {
    let array = [];
    let currentNode = first;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log(array);
    return array;
  };

  const displayBackward = () => {
    let array = [];
    let currentNode = last;

    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.previous;
    }

    console.log(array);
    return array;
  };

  return {
    insertFirst,
    insertLast,
    insertAfter,
    deleteFirst,
    deleteLast,
    deleteNode,
    displayForward,
    displayBackward,
  };
};
