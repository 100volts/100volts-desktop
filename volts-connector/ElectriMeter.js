import ModbusRTU from "modbus-serial";

export default class{
    constructor(
    name,address,value,
    voltageL1,voltageL2,voltageL3,
    currentL1,currentL2,currentL3,
    activePowerL1,activePowerL2,activePowerL3,
    powerFactorL1,powerFactorL2,powerFactorL3,
    totActivePower
    ){
        this.name=name;
        this.address=address;
        this.value=value;
        this.voltageL1=voltageL1;
        this.voltageL2=voltageL2;
        this.voltageL3=voltageL3;
        this.currentL1=currentL1;
        this.currentL2=currentL2;
        this.currentL3=currentL3;
        this.activePowerL1=activePowerL1;
        this.activePowerL2=activePowerL2;
        this.activePowerL3=activePowerL3;
        this.powerFactorL1=powerFactorL1;
        this.powerFactorL2=powerFactorL2;
        this.powerFactorL3=powerFactorL3;
        this.totActivePower=totActivePower;
    }

    getMeterByAddress(address,company){
        //TODO add api call
        //TODO call setAddressName
    }

    async setAddressName(address,name){

    }

    async setMeter(
        name,address,value,
        voltageL1,voltageL2,voltageL3,
        currentL1,currentL2,currentL3,
        activePowerL1,activePowerL2,activePowerL3,
        powerFactorL1,powerFactorL2,powerFactorL3,
        totActivePower
        ){
            this.name=name;
            this.address=address;
            this.value=value;
            this.voltageL1=voltageL1;
            this.voltageL2=voltageL2;
            this.voltageL3=voltageL3;
            this.currentL1=currentL1;
            this.currentL2=currentL2;
            this.currentL3=currentL3;
            this.activePowerL1=activePowerL1;
            this.activePowerL2=activePowerL2;
            this.activePowerL3=activePowerL3;
            this.powerFactorL1=powerFactorL1;
            this.powerFactorL2=powerFactorL2;
            this.powerFactorL3=powerFactorL3;
            this.totActivePower=totActivePower;
        }

    async readModbusData(){
        //Prep
        const client = new ModbusRTU();
        client.connectRTUBuffered("COM3", { baudRate: 9600 });
        //Read
        getMeterValue(this.address)
        //TODO call setMeter
    }


    async sendMerterDataRequestPost(postMeterData) {
        const meterOptions = {
          hostname: "192.168.0.102",
          port: 8081,
          path: "/elmeter/data",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postMeterData),
            Authorization: `Bearer ${accesToken}`,
          },
          protocol: "http:",
        };
        return new Promise((resolve, reject) => {
          const req = http.request(meterOptions, (res) => {
            let responseData = "";
      
            res.on("data", (chunk) => {
              responseData += chunk;
            });
      
            res.on("end", () => {
              resolve(responseData);
            });
          });
      
          req.on("error", (e) => {
            reject(`Problem with request: ${e.message}`);
          });
          req.write(postMeterData);
          req.end();
        });
    }
} 

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