const Stash = (initialValues = [], maxSize = -1) => {
  const stash = [...initialValues];

  const push = (value) => {
    if (isFull()) return;
    stash.push(value);
  };

  const top = () => stash[stash.length - 1];

  const pop = () => {
    if (isEmpty()) return;
    stash.pop();
  };

  const isEmpty = () => stash.length === 0;

  const isFull = () => maxSize >= 0 && stash.length >= maxSize;

  const getSize = () => stash.length;

  const getValues = () => {
    return stash;
  };

  return {
    getValues,
    getSize,
    push,
    top,
    pop,
    isEmpty,
    isFull,
  };
};
