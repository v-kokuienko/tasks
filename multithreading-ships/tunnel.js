const Mutex = require("./mutex");
const Ship = require("./ship");

class Tunnel {
  maxShipsInTunel = 10;
  minShipsInTunel = 0;
  shipsCounter;
  mutex;
  sharedStoreArray;
  store;

  constructor(bufferTunnelStore, initial = false) {
    this.initial = initial;
    this.mutex = new Mutex(bufferTunnelStore, 0, initial);
    this.mutex.enter();
    this.sharedStoreArray = new Int32Array(bufferTunnelStore);
    this.mutex.leave();

    const dec = new TextDecoder();
    const decoded = dec.decode(this.sharedStoreArray);
    const filteredDecoded = decoded.match(/{[^\\]*}/g)
      ? decoded.match(/{[^\\]*}/g)[0]
      : "{}";
    try {
      this.store = JSON.parse(filteredDecoded);
    } catch (e) {
      console.log("Failed to parse filteredDecoded", {
        sharedStoreArray: this.sharedStoreArray,
        decoded,
        filteredDecoded,
        e,
      });
    }

    this.shipsCounter = Object.keys(this.store).length;
  }

  add(id, size, type, loaded) {
    if (this.shipsCounter < this.maxShipsInTunel) {
      this.mutex.enter();
      this.store[id] = { size, type, loaded };

      const enc = new TextEncoder();
      const rawStringStore = JSON.stringify(this.store);
      const lengthDiff =
        (Math.ceil(rawStringStore.length / 4) - rawStringStore.length / 4) * 4;
      const storeString32 = lengthDiff
        ? rawStringStore.concat("0".repeat(lengthDiff))
        : rawStringStore;
      const encoded8 = enc.encode(storeString32); // Uint8Array, need convert to Int32Array
      const encoded32 = new Int32Array(encoded8.buffer);

      this.sharedStoreArray.fill(0, 0);
      this.sharedStoreArray.set(encoded32, 1);

      this.shipsCounter++;
      console.log(
        "Tunnel count",
        this.shipsCounter,
        this.initial,
        this.store
      );
      this.mutex.leave();
    }
  }

  get(shipType) {
    if (this.shipsCounter > this.minShipsInTunel) {
      for (let [id, ship] of Object.entries(this.store)) {
        if (ship.type === shipType) {
          this.mutex.enter();
          this.shipsCounter--;

          delete this.store[id];

          const enc = new TextEncoder();

          const rawStringStore = JSON.stringify(this.store);
          const lengthDiff =
            (Math.ceil(rawStringStore.length / 4) - rawStringStore.length / 4) *
            4;
          const storeString32 = lengthDiff
            ? rawStringStore.concat("0".repeat(lengthDiff))
            : rawStringStore;
          const encoded8 = enc.encode(storeString32); // Uint8Array, need convert to Int32Array
          const encoded32 = new Int32Array(encoded8.buffer);

          //console.log("encoded32", this.store);

          this.sharedStoreArray.fill(0, 0);
          this.sharedStoreArray.set(encoded32, 1);

          this.mutex.leave();

          return { id, ship };
        }
      }
    }
  }
}

module.exports = Tunnel;
