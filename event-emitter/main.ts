const EventEmitter = require("events");

// maximum call stack exceeded
const eventEmitter = new EventEmitter();

eventEmitter.on("event1", () => {
  setTimeout(() => {
    console.log("First event here!");
    eventEmitter.emit("event2");
  });
});

eventEmitter.on("event2", () => {
  setTimeout(() => {
    console.log("Second event here!");
    eventEmitter.emit("event3");
  });
});

eventEmitter.on("event3", () => {
  setTimeout(() => {
    console.log("Third event here!");
    eventEmitter.emit("event1");
  });
});

// eventEmitter.emit("event1");

class MyEventEmitter extends EventEmitter {
  counter = 0;
}

const emitter = new MyEventEmitter();

emitter.on("event", function () {
  console.log(this.counter++);
});

// Trigger emitter once
// emitter.once("event", function () {
//   console.log(this.counter++);
// });

emitter.emit("event"); // 0
emitter.emit("event"); // nothing happens
emitter.emit("event"); // nothing happens
