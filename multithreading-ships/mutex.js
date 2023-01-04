const LOCKED = 0;
const UNLOCKED = 1;

class Mutex {
    lock;

    constructor(shared, offset = 0, initial = false) {
      this.lock = new Int32Array(shared);
      if (initial) Atomics.store(this.lock, 0, UNLOCKED);
      this.owner = false;
    }
  
    enter() {
      let prev = Atomics.exchange(this.lock, 0, LOCKED);
      while (prev !== UNLOCKED) {
        Atomics.wait(this.lock, 0, LOCKED);
        prev = Atomics.exchange(this.lock, 0, LOCKED);
      }
      this.owner = true;
    }
  
    leave() {
      if (!this.owner) return;
      Atomics.store(this.lock, 0, UNLOCKED);
      Atomics.notify(this.lock, 0);
      this.owner = false;
    }
  }

  module.exports = Mutex;