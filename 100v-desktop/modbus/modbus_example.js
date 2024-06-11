// create an empty modbus client
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

// open connection to a serial port
client.connectRTUBuffered("COM5", { baudRate: 9600 });
client.setID(1);

// read the values of 10 registers starting at address 0
// on device number 1. and log the values to the console.
setInterval(function () {
  //30005 -l1
  /*
  client
    .readInputRegisters(801, 2)
    .then(function (d) {
      const floatA = d.buffer.readFloatBE(0);
      const floatB = d.buffer.readFloatBE(4);
      const floatC = d.buffer.readFloatBE(8);
      console.log("Receive:", floatA, floatB, floatC);
    })
    .catch(function (e) {
      console.log(e.message);
    });
*/
  /*
  client
    .readDiscreteInputs(801, 4)
    .then(function (d) {
      console.log("Receive:", d.data);
    })
    .catch(function (e) {
      console.log(e.message);
    });
    */
  /*
  client
    .readCoils(801, 4)
    .then(function (d) {
      console.log("Receive:", d.data);
    })
    .catch(function (e) {
      console.log(e.message);
    });
    */
  /*
  client.readHoldingRegisters(801, 4).then((res) => {
    //console.log(decodeFloat(res.data));
    //console.log(decodeFloatL4(res.data));
    console.log(res.data);
  });
  */
  client.readInputRegisters(30073, 2).then((res) => {
    console.log(decodeFloat(res.data));
    //console.log(modbusRegistersToDouble(res.data));
    //console.log(decodeFloatL4(res.data));
    //console.log(res.data);
  });

  /*
  client.readHoldingRegisters(1, function (err, data) {
    console.log(data.data);
  });
  /*
  client.readHoldingRegisters(1, 2, function (err, data) {
    console.log(data.data);
  });
  */
}, 1000);

function modbusRegistersToDouble(registers) {
  // Create a buffer and a view to manipulate the bytes
  var buffer = new ArrayBuffer(8);
  var view = new DataView(buffer);

  // Assuming the registers are in big-endian format
  view.setUint16(0, registers[0], false); // Most significant register
  view.setUint16(2, registers[1], false);
  view.setUint16(4, registers[2], false);
  view.setUint16(6, registers[3], false); // Least significant register

  // Get the double value from the buffer
  return view.getFloat64(0, false) / 1000;
}

function decodeFloat(registers) {
  // Make sure we have exactly two registers
  if (registers.length !== 2) {
    throw new Error(
      "Invalid number of registers. Floating-point decoding requires exactly two 16-bit registers."
    );
  }

  // Combine the two registers into a single 32-bit integer
  const combined = (registers[0] << 16) | registers[1];

  // Interpret the integer as a 32-bit floating-point number
  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];

  return floatNumber;
}

function decodeFloatL4(registers) {
  // Make sure we have exactly four registers
  if (registers.length !== 4) {
    throw new Error(
      "Invalid number of registers. Floating-point decoding requires exactly four 16-bit registers."
    );
  }

  // Combine the four registers into a single 32-bit integer
  const combined =
    (registers[0] << 48) |
    (registers[1] << 32) |
    (registers[2] << 16) |
    registers[3];

  // Interpret the integer as a 32-bit floating-point number
  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];

  return floatNumber;
}
