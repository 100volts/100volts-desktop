export interface sentron {
  id_client: number; //1-2
  name: string; //GRT-AMPACK // can be renamed!!
  //V
  voltagell1: Float32Array; //232.44857788085938
  voltagell2: Float32Array; //233.69015502929688
  voltagell3: Float32Array; //236.30047607421875
  //A
  currentl1: Float32Array; //88.4985122680664
  currentl2: Float32Array; //102.55569458007812
  currentl3: Float32Array; //97.33610534667969
  //kW
  activePowerL1: Float32Array; //17907.294921875
  activePowerL2: Float32Array; //19665.1171875
  activePowerL3: Float32Array; //27890.21484375
  //na
  PFL1: Float32Array; //0.862960696220398
  PFL2: Float32Array; //0.8359976410865784
  PFL3: Float32Array; //0.874971866607666
  //na
  PFSUM: Float32Array; //0.865540087223053 tot
  //801 kW
  TotalActiveEnergyImportTariff1: DoubleRange; //15281.532642496193
}
