import { state } from "../../state.js";

export class WLP {
  constructor() {
    this.FTMApi = state.FTMScan;
    this.tokenSymbol = "WLP";
    this.name = "WakaSwap LP Token";
    this.adress = "0x696885e9581bd33ee9877bd8750ddda65381ff01";
    (async () => {
      this.totalSupply = await this.getTotalSupply();
    })();
  }

  async getTotalSupply() {
    return await this.FTMApi.getERC20TokenTotalSupply(this.adress);
  }
}
