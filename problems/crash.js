const midi = require("@julusian/midi");
const { Worker, isMainThread, parentPort } = require("worker_threads");

const input = new midi.Input();
const output = new midi.Output();

const inputCount = input.getPortCount();
const outputCount = output.getPortCount();

// create an input for each input and open the port
for (let i = 0; i < inputCount; i++) {
    if (i % 2 === (isMainThread ? 0 : 1)) {
        const input = new midi.Input();
        console.log("Opening input port", input.getPortName(i), "from", isMainThread ? "main" : "worker", "thread");
        input.openPort(i);
    }
}
// as well for the outputs
for (let i = 0; i < outputCount; i++) {
    if (i % 2 === (isMainThread ? 0 : 1)) {
        console.log("Opening output port", input.getPortName(i), "from", isMainThread ? "main" : "worker", "thread");
        const output = new midi.Output();
        output.openPort(i);
    }
}

// create a new worker thread with this script if we're not running as a worker thread already

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on("message", (msg) => {
        console.log(msg);
    });
    worker.postMessage("Hello from main thread");
    setTimeout(() => {
        worker.terminate();
        console.log("Terminated worker thread");
        // start worker again
        setTimeout(() => {
            const w = new Worker(__filename);
            console.log("Started worker thread again");
        }, 1000)
    }, 2000);
} else {
    // we're running as a worker thread
    parentPort.on("message", (event) => {
        console.log(event);
        parentPort.postMessage("Hello from worker thread");
    });
    parentPort.postMessage("Hello from worker thread");
}
setTimeout(() => {
    // keepalive
}, 50000000)