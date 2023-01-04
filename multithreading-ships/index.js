"use strict";

const ShipGenerator = require("./shipGenerator");
const PierLoader = require("./pierLoader");
const threads = require("worker_threads");
const { Worker, isMainThread } = threads;

const SHIP_TYPES = ["BANANA", "BREAD", "DRESS"];

if (isMainThread) {
  const buffer = new SharedArrayBuffer(1000);

  const shipGenerator = new ShipGenerator(buffer, 10);
  shipGenerator.run();

  const worker1 = new Worker(__filename, { workerData: buffer });
  worker1.on("error", (err) => console.log('Worker #', worker1.threadId, SHIP_TYPES[worker1.threadId-1], err));

  const worker2 = new Worker(__filename, { workerData: buffer });
  worker2.on("error", (err) => console.log('Worker #', worker2.threadId, SHIP_TYPES[worker2.threadId-1], err));

  const worker3 = new Worker(__filename, { workerData: buffer });
  worker3.on("error", (err) => console.log('Worker #', worker3.threadId, SHIP_TYPES[worker3.threadId-1], err));
} else {
  const { threadId, workerData } = threads;

  new PierLoader(workerData, SHIP_TYPES[threadId - 1], threadId).run();
}
