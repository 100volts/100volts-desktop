import AbstactView from "./AbstactView.js"

export default class extends AbstactView{
    constructor(){
        super();
        this.setTitle("ElMetrs")
    }

    //we use asyc bocouse you can add inf from api
    async getHtml(){
        return `
           <div class="el-meter">
  <link rel="stylesheet" href="../../global.css" />
  <link rel="stylesheet" href="style.css" />
  <div class="meter">
    <h1 class="meterL">Voltage</h1>
    <div class="meterL">V1: <a id="voltagell1"></a> V</div>
    <div class="meterL">V2: <a id="voltagell2"></a> V</div>
    <div class="meterL">V3: <a id="voltagell3"></a> V</div>
  </div>
  <div class="current meter">
    <h1>Current</h1>
    <div class="meterL">
      L1: <a class="currentl" id="currentl1"></a> A
    </div>
    <div class="meterL">
      L2: <a class="currentl" id="currentl2"></a> A
    </div>
    <div class="meterL">
      L3: <a class="currentl" id="currentl3"></a> A
    </div>
  </div>
  <div class="active-power meter">
    <h1>Active Power</h1>
    <div class="meterL">
      L1: <a id="activePowerL1"></a> kW
    </div>
    <div class="meterL">
      L2: <a id="activePowerL2"></a> kW
    </div>
    <div class="meterL">
      L3: <a id="activePowerL3"></a> kW
    </div>
  </div>
</div>
<button id="read-meter" class="side-bar-button">
  Read electric meter
</button>
        `;
    }
}
