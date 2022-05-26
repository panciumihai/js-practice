function Stash(initialValues = [], maxSize = -1) {
  this.stash = [...initialValues];
  this.maxSize = maxSize;

  // const push = (value) => {
  //   if (isFull()) return;
  //   stash.push(value);
  // };

  // const top = () => stash[stash.length - 1];

  // const pop = () => {
  //   if (isEmpty()) return;
  //   stash.pop();
  // };

  // const isEmpty = () => stash.length === 0;

  // const isFull = () => maxSize >= 0 && stash.length >= maxSize;

  // const getSize = () => stash.length;

  // const getValues = () => {
  //   return stash;
  // };

  // return {
  //   getValues,
  //   getSize,
  //   push,
  //   top,
  //   pop,
  //   isEmpty,
  //   isFull,
  // };
}

Object.assign(Stash.prototype, {
  push: function (value) {
    if (this.isFull()) return;
    this.stash.push(value);
  },
  top() {
    this.stash[this.stash.length - 1];
  },
  pop() {
    if (this.isEmpty()) return;
    this.stash.pop();
  },
  isEmpty() {
    return this.stash.length === 0;
  },
  isFull() {
    return this.maxSize >= 0 && this.stash.length >= this.maxSize;
  },
  getSize() {
    return this.stash.length;
  },
  getValues() {
    return this.stash;
  },
});
