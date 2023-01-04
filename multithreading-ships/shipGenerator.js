const Tunnel = require('./tunnel');

const SHIP_TYPES = ['BREAD', 'BANANA', 'DRESS'];

const SHIP_SIZE = [10, 50, 100];

class ShipGenerator {
    tunnel;
    shipCount;

    constructor(bufferTunnelStore, shipCount) {
        this.tunnel = new Tunnel(bufferTunnelStore, true);
        this.shipCount = shipCount;
    }

    run() {
        let count = 0;

        while(count < this.shipCount) {
            count++;
            this.tunnel.add(this.generateId(), this.getRandomSize(), this.getRandomType(), 0);
        }
    }

    generateId() {
        return Math.floor(Math.random()*1000000);
    }

    getRandomSize() {
        return SHIP_SIZE[Math.floor(Math.random()*SHIP_SIZE.length)];
    }

    getRandomType() {
        return SHIP_TYPES[Math.floor(Math.random()*SHIP_TYPES.length)];
    }
}

module.exports = ShipGenerator;