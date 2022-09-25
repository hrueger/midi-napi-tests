const midi = require("@julusian/midi");

console.log("This should rather fail with an error instead of logging to console but continuing to run");

const input = new midi.Input();
const output = new midi.Output();

const inputCount = input.getPortCount();
const inputNames = [];
for (let i = 0; i < inputCount; i++) {
  inputNames[i] = input.getPortName(i);
}
const outputCount = output.getPortCount();
const outputNames = [];
for (let i = 0; i < outputCount; i++) {
    outputNames[i] = output.getPortName(i);
}

console.log("Input ports:", inputNames);
console.log("Output ports:", outputNames);

// open all ports
for (let i = 0; i < inputCount; i++) {
    input.openPort(i);
}
for (let i = 0; i < outputCount; i++) {
    output.openPort(i);
}
