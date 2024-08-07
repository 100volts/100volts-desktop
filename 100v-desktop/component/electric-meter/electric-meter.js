window.hund_volts = window.hund_volts || {};
var allMeters= [];
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

function displayElMeter(elMeters) {
  const dataListElement = document.getElementById('meters-container');
  const com=document.getElementById('cars');
  elMeters.forEach(elMeter => {
      const meterDiv= document.createElement('div');
      const meterDivName= document.createElement('h1');
      meterDivName.innerHTML=`${elMeter.name} Id:${elMeter.id}`
      meterDiv.className = 'cofiged-metter';
      meterDiv.id = elMeter.id;
      meterDiv.innerHTML = `
      <div class="meters">
        <div class="meter voltage">
          <h1 class="meterL">Voltage</h1>
          <div class="meterL">
            V1: <a id="voltagell1${elMeter.id}"></a> V
          </div>
          <div class="meterL">
            V2: <a id="voltagell2${elMeter.id}"></a> V
          </div>
          <div class="meterL">
            V3: <a id="voltagell3${elMeter.id}"></a> V
          </div>
        </div>
        <div class="current meter">
          <h1>Current</h1>
          <div class="meterL">
            L1: <a class="currentl" id="currentl1${elMeter.id}"></a> A
          </div>
          <div class="meterL">
            L2: <a class="currentl" id="currentl2${elMeter.id}"></a> A
          </div>
          <div class="meterL">
            L3: <a class="currentl" id="currentl3${elMeter.id}"></a> A
          </div>
        </div>
        <div class="active-power meter">
          <h1>Active Power</h1>
          <div class="meterL">
            L1: <a id="activePowerL1${elMeter.id}"></a> kW
          </div>
          <div class="meterL">
            L2: <a id="activePowerL2${elMeter.id}"></a> kW
          </div>
          <div class="meterL">
            L3: <a id="activePowerL3${elMeter.id}"></a> kW
          </div>
        </div>
        </div>
        `;
      dataListElement.appendChild(meterDivName);
      dataListElement.appendChild(meterDiv);
      console.log('COM: '+com.value)
  });
}


(function initElMeter() {
    var modal = document.getElementById("myModal");
    document.getElementsByClassName("close").onclick = modelDisplay;
    modal.style.display = "none";

    function readMeter() {
      console.log("Read meters")
      allMeters.forEach(emeter=>{
        document.getElementById(`currentl1${emeter.eid}`).textContent = hund_volts.elmeter.currentl1;
        document.getElementById(`currentl2${emeter.eid}`).textContent = hund_volts.elmeter.currentl2;
        document.getElementById(`currentl3${emeter.eid}`).textContent = hund_volts.elmeter.currentl3;
    
        document.getElementById(`voltagell1${emeter.eid}`).textContent = hund_volts.elmeter.voltagell1;
        document.getElementById(`voltagell2${emeter.eid}`).textContent = hund_volts.elmeter.voltagell2;
        document.getElementById(`voltagell3${emeter.eid}`).textContent = hund_volts.elmeter.voltagell3;
    
        document.getElementById(`activePowerL1${emeter.eid}`).textContent = hund_volts.elmeter.activePowerL1;
        document.getElementById(`activePowerL2${emeter.eid}`).textContent = hund_volts.elmeter.activePowerL2;
        document.getElementById(`activePowerL3${emeter.eid}`).textContent = hund_volts.elmeter.activePowerL3;
      });
      const port=document.getElementById("port")
      alert(`Metters have been read on port: ${port.value} !`);
      modal.style.display = "none";
      console.log("All meters are read")
      document.getElementById("userId").disabled =false;
      document.getElementById("name").disabled=false;
    }

    function createMeter(){
      modal.style.display = "block";
      console.log("registerd on click create-meter")
    }

    function modelDisplay() {
      modal.style.display = "none";
      console.log("registerd on click modelDisplay")
    };

    function submitForm() {
      var name = document.getElementById("name").value;
      var userId =
        document.getElementById("userId").value;
      console.log("Name: " + name);
      console.log("ID: " + userId);
      modal.style.display = "none";
      allMeters.push({ename: name, eid:userId});
      displayElMeter([{id:userId,name:name}])
      console.log(allMeters)
      document.getElementById("name").value="";
      document.getElementById("userId").value="";
    }
    

    document.getElementById("read-meter").onclick = readMeter;
    document.getElementById("create-meter").onclick = createMeter;
    document.getElementById("mater-create-form").onclick = submitForm;
    console.log("Sript end");
})(document.window);