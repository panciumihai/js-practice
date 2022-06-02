function PubSub() {
  this.events = {};
}

Object.assign(PubSub.prototype, {
  subscribe: function (eventName, callback) {
    console.log(`PubSub: someone subscribed to ${eventName} event.`);
    if (callback === null) {
      console.warn('This is not a callback!');
      return;
    }

    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  },
  unsubscribe: function (eventName, callback) {
    console.log(`PubSub: someone unsubscribed from ${eventName}`);
    if (this.events[eventName] && callback !== null)
      this.events[eventName] = this.events[eventName].filter(
        (c) => c.name !== callback.name
      );
  },
  publish: function (eventName, data) {
    console.log(`PubSub: Send a broadcast for ${eventName} event with ${data}`);
    if (this.events[eventName]) {
      this.events[eventName].forEach((c) => {
        c(data);
      });
    }
  },
});
