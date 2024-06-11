// Function to combine two 16-bit registers into a 32-bit floating-point number
export function decodeFloat(registers) {
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

// Example data
const registers = [17252, 16151];

// Decode the floating-point number
const floatValue = decodeFloat(registers);

console.log("Decoded floating-point value:", floatValue);
