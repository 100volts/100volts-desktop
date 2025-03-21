const readline = require("readline");
const http = require("http");
//set up modbus for reading
const ModbusRTU = require("modbus-serial");
const client = new ModbusRTU();
client.connectRTUBuffered("COM3", { baudRate: 9600 });
client.setID(1);

function getTodaysDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  console.log(formattedDate);
  return formattedDate;
}

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

  // Combine the four registers into a single 32-bit integer
  const combined =
    (registers[0] << 48) |
    (registers[1] << 32) |
    (registers[2] << 16) |
    registers[3];
  const floatNumber = new Float32Array(new Uint32Array([combined]).buffer)[0];
  return floatNumber;
}

const metersIdList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];

const getMetersValue = async (meters) => {
  var volatageMeter = [];
  try {
    // get value of all meters
    for (let meter of meters) {
      await sleep(50);
      const activePowerData = await getMeterValue(meter.id);
      const len2Data = await getMeterValueLen2(meter.id);
      const len2DataNodecode= await getMeterValueLen2ConCalculation(meter.id)
      volatageMeter.push({
        name: meter.name,
        value: activePowerData,
        voltageL1: len2Data[0],
        voltageL2: len2Data[1],
        voltageL3: len2Data[2],
        currentL1: len2Data[3],
        currentL2: len2Data[4],
        currentL3: len2Data[5],
        activePowerL1: len2Data[6],
        activePowerL2: len2Data[7],
        activePowerL3: len2Data[8],
        powerFactorL1: len2Data[9],
        powerFactorL2: len2Data[10],
        powerFactorL3: len2Data[11],
          totActivePower: len2Data[12],
        time: len2DataNodecode[0],
      });
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
    let val = await client.readInputRegisters(801, 4).then((res) => {
      return modbusRegistersToDouble(res.data);
    });
    return val;
  } catch (e) {
    return -1;
  }
};

const getMeterValueLen2 = async (id) => {
  const addresses = [1, 3, 5, 13, 15, 17, 25, 27, 29, 37, 39, 41, 65, 799,]; //all addresses for len2
  let allFoundAddressData = [];
  for (let address of addresses) {
    try {
      await client.setID(id);
      let val = await client.readInputRegisters(address, 2).then((res) => {
        allFoundAddressData.push(decodeFloat(res.data));
      });
    } catch (e) {
      return -1;
    }
  }
  console.log("Len 2 Volt data", allFoundAddressData);
  return allFoundAddressData;
};

const getMeterValueLen2ConCalculation = async (id) => {
  const addresses = [ 799,]; 
  let allFoundAddressData = [];
  for (let address of addresses) {
    try {
      await client.setID(id);
      let val = await client.readInputRegisters(address, 2).then((res) => {
        allFoundAddressData.push(res.data);
      });
    } catch (e) {
      return -1;
    }
  }
  console.log("Len 2 Volt data", allFoundAddressData);
  return allFoundAddressData;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const dataPrep = [
    { id: 1, name: "TBA-8" },
    { id: 2, name: "Ampak" },
    { id: 3, name: "Ledena Voda" },
    { id: 4, name: "Hladilnici" },
    { id: 5, name: "Kompresorno" },
    { id: 6, name: "Priemno" },
    { id: 7, name: "Trafo1" },
    { id: 8, name: "Homo UHT" },
    { id: 9, name: "Priem KM" },
    { id: 10, name: "Priem UHT" },
  ];
  const header = [
    "Meter Name",
    "Active Energy",
    "Voltage L1",
    "Voltage L2",
    "Voltage L3",
    "Current L1",
    "Current L2",
    "Current L3",
    "Active power L1",
    "Active power L2",
    "Active power L3",
    "Power factor L1",
    "Power factor L2",
    "Power factor L3",
    "Total active power",
    "Time",
  ];
  const totalPowerData = await getMetersValue(dataPrep);
  console.log();
  const names = totalPowerData.map((item) => item.name);
  const values = totalPowerData.map((item) => item.value);
  const combined = totalPowerData.map((item) => [
    item.name,
    item.value,
    item.voltageL1,
    item.voltageL2,
    item.voltageL3,
    item.currentL1,
    item.currentL2,
    item.currentL3,
    item.activePowerL1,
    item.activePowerL2,
    item.activePowerL3,
    item.powerFactorL1,
    item.powerFactorL2,
    item.powerFactorL3,
      item.totActivePower,
    item.time,
  ]);
  combined.unshift(header);

  console.log("Exel Date:", combined);

  const XLSX = require("xlsx");
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(combined);
  XLSX.utils.book_append_sheet(workbook, worksheet, getTodaysDate());
  XLSX.writeFile(workbook, "output.xlsx");
  console.log("Excel file has been created successfully.");
}

main();