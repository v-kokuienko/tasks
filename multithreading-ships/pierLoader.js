const Tunnel = require("./tunnel");
const Ship = require("./ship");

const LOAD_SIZE = 10;

class PierLoader {
  tunnel;
  shipType;
  threadId;

  constructor(bufferTunnelStore, shipType, threadId) {
    this.tunnel = new Tunnel(bufferTunnelStore);
    this.shipType = shipType;
    this.threadId = threadId;
  }

  run() {
    let count = 0;

    while(count < 10) {
      count++;
      const shipData = this.tunnel.get(this.shipType);

      if (shipData) {
        const ship = new Ship(shipData.id, shipData.ship.size, shipData.ship.type, shipData.ship.loaded);
        while (!ship.isFullyLoaded()) {
          ship.load(LOAD_SIZE);
        }
        console.log('|_______________________________________________________________________________________|')
        console.log('|                                                                                       |')
        console.log('@@@@@@@@@@@@@@@@@@@@ LOADED', ship)
        console.log('|_______________________________________________________________________________________|')
        console.log('|                                                                                       |')
      }
    }
  }
}

module.exports = PierLoader;
