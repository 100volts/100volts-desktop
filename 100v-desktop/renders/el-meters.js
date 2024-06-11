const { ipcRenderer } = require("electron");

function changeValue() {
  var element = document.getElementById("changeableValue");
  element.textContent = "New Value";
}
