const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();

client.connectRTUBuffered("COM5", { baudRate: 9600 });
client.setID(1);

//try export defoult
export function getMeters(){
      /*
  client.readInputRegisters(30073, 2).then((res) => {
    console.log(decodeFloat(res.data));
  });
  */

  return {
    voltagell1: 232.448,
    voltagell2: 233.691,
    voltagell3: 236.301,
    currentl1: 88.498,
    currentl2: 102.555,
    currentl3: 97.336,
    activePowerL1: 236.301,
    activePowerL2: 236.301,
    activePowerL3: 236.301
};
}


setInterval(function () {
  
  client.readInputRegisters(30073, 2).then((res) => {
    console.log(decodeFloat(res.data));
  });

  return {
    voltagell1: 232.448,
    voltagell2: 233.691,
    voltagell3: 236.301,
    currentl1: 88.498,
    currentl2: 102.555,
    currentl3: 97.336,
    activePowerL1: 236.301,
    activePowerL2: 236.301,
    activePowerL3: 236.301
};
});

function modbusRegistersToDouble(registers) {
  var buffer = new ArrayBuffer(8);
  var view = new DataView(buffer);

  view.setUint16(0, registers[0], false);
  view.setUint16(2, registers[1], false);
  view.setUint16(4, registers[2], false);
  view.setUint16(6, registers[3], false); 

  return view.getFloat64(0, false) / 1000;
}

function decodeFloat(registers) {
  if (registers.length !== 2) {
    throw new Error(
      "Invalid number of registers. Floating-point decoding requires exactly two 16-bit registers."
    );
  }

  const combined = (registers[0] << 16) | registers[1];

  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];

  return floatNumber;
}

function decodeFloatL4(registers) {
  if (registers.length !== 4) {
    throw new Error(
      "Invalid number of registers. Floating-point decoding requires exactly four 16-bit registers."
    );
  }

  const combined =
    (registers[0] << 48) |
    (registers[1] << 32) |
    (registers[2] << 16) |
    registers[3];

  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];

  return floatNumber;
}


module.exports={
  readModBusElMeter:getMeters
}