import { state } from "../../state.js";

export class AbstractFarm {
  constructor(contractAdress, abi) {
    this.notImplemented = "Not Implemented";

    (async () => {
      this.farmContract = await state.metamask.getContract(contractAdress, abi);
    })();

    this.vaultTypes = {
      LP: { name: "Liquidity Pair", short: "LP" },
      SS: { name: "Single stack", short: "SS" },
      AC: { name: "Auto Compound", short: "AC" },
    };
    this.provider = { name: name || "Abstract" };
    this.subscribeToTxLoaded();
  }

  set vaultType(type) {
    this.vaultType = type;
  }

  get providerName() {
    return this.provider.name;
  }

  async getContract(contractAdress, abi) {
    return await state.metamask.getContract(contractAdress, abi);
  }

  getTokenName() {
    return this.notImplemented;
  }

  subscribeToTxLoaded() {
    $.Topic(state.topicNames.analytics.txLoaded).subscribe((aTxs) => {
      console.log("Abstract farm: tx loaded");
      this.aTxs = aTxs; //TODO: v topicu neexistuje tohle this - je tam jquery this
    });
  }
}
