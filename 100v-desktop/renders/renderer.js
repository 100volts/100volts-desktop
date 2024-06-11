// Assuming you have a name variable
const name = "John Doe";

const voltagell1=232.448;
const voltagell2=233.691;
const voltagell3=236.301;

const currentl1 = 88.498;
const currentl2 = 102.555;
const currentl3 = 97.336;

const activePowerL1=236.301;
const activePowerL2=236.301;
const activePowerL3=236.301;



// Update HTML with the name
document.getElementById("name-display").textContent = name;
document.getElementById("currentl1").textContent = currentl1;
document.getElementById("currentl2").textContent = currentl2;
document.getElementById("currentl3").textContent = currentl3;

document.getElementById("voltagell1").textContent = voltagell1;
document.getElementById("voltagell2").textContent = voltagell2;
document.getElementById("voltagell3").textContent = voltagell3;

document.getElementById("activePowerL1").textContent = activePowerL1;
document.getElementById("activePowerL2").textContent = activePowerL2;
document.getElementById("activePowerL3").textContent = activePowerL3;

