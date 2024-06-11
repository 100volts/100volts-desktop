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
  return view.getFloat64(0, false);
}

// Example usage with your provided data:
var registers = [16749, 709, 52262, 21805]; // Your actual register values
var doubleValue = modbusRegistersToDouble(registers);
console.log(doubleValue);
