const readline = require("readline");
const http = require("http");

function getTodaysDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate);
  return formattedDate;
}
//set up modbus for reading
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.connectRTUBuffered("COM3", { baudRate: 9600 });
client.setID(1);

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
  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];
  return floatNumber;
}

const metersIdList = [1, 3, 5];

const getMetersValue = async (meters) => {
  var volatageMeter = [];
  try {
    // get value of all meters
    for (let meter of meters) {
      await sleep(50);
      const voltData = await getMeterValue(meter);
      console.log(voltData);
      volatageMeter.push(voltData);
      await sleep(100);
    }
  } catch (e) {
    // if error, handle them here (it should not)
    console.log(e);
  } finally {
    return volatageMeter;
  }
};

const getMeterValue = async (id) => {
  try {
    await client.setID(id);
    let val = await client.readInputRegisters(1, 2).then((res) => {
      return decodeFloat(res.data);
    });

    return val;
  } catch (e) {
    return -1;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const vlatageData = await getMetersValue(metersIdList);
  console.log();

  const dataPrep = [["V-L1", "V-L2", "V-L3"]];
  const data = dataPrep.push(vlatageData);
  console.log("Voltage Date:", vlatageData);
  console.log("Array of arrays", data);

  const XLSX = require("xlsx");
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, getTodaysDate());
  XLSX.writeFile(workbook, "output.xlsx");
  console.log("Excel file has been created successfully.");
}

main();
