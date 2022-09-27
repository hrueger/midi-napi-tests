/* const midi = require("@julusian/midi");
const output = new midi.Output();

const PORT = 2;
console.log("Opening Port", output.getPortName(PORT));
output.openPort(0);
console.log("Opened Port");

console.log("Sending...");
output.sendMessage([0x90, 5, 127]);
output.sendMessage([0x90, 5, 0]);
output.sendMessage([0x90, 5, 127]);
output.sendMessage([0x90, 5, 0]);
console.log("Sent.");
*/

const easymidi = require("easymidi");
const outputs = easymidi.getOutputs();
const output = outputs.find((o) => o.includes("IAC"));
console.log("Outputting to", output);
const o = new easymidi.Output(output);
o.send("noteon", {
    channel: 2,
    note: 5,
    velocity: 127
});
o.send("noteon", {
    channel: 2,
    note: 5,
    velocity: 0
});