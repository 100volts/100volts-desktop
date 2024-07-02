window.hund_volts = window.hund_volts || {};

function getMeters(){
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

window.hund_volts.elmeter = (function() {
    return getMeters()
})();



(function initElMeter() {
    function readMeter() {
      document.getElementById("currentl1").textContent = hund_volts.elmeter.currentl1;
      document.getElementById("currentl2").textContent = hund_volts.elmeter.currentl2;
      document.getElementById("currentl3").textContent = hund_volts.elmeter.currentl3;
  
      document.getElementById("voltagell1").textContent = hund_volts.elmeter.voltagell1;
      document.getElementById("voltagell2").textContent = hund_volts.elmeter.voltagell2;
      document.getElementById("voltagell3").textContent = hund_volts.elmeter.voltagell3;
  
      document.getElementById("activePowerL1").textContent = hund_volts.elmeter.activePowerL1;
      document.getElementById("activePowerL2").textContent = hund_volts.elmeter.activePowerL2;
      document.getElementById("activePowerL3").textContent = hund_volts.elmeter.activePowerL3;

      alert("Metters have been read");
      document.getElementById("output").innerText = "Metters have been read!";
    }

    function createMeter(){
      let div = document.createElement('div');
      div.id = 'content';
      div.innerHTML = '<p>CreateElement example</p>';
      document.body.appendChild(div);

      alert("Metters have been created");
      document.getElementById("output").innerText = "Metters have been created!";
    }

    document.getElementById("read-meter").onclick = readMeter;
    document.getElementById("create-meter").onclick = createMeter;
})();