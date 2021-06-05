"use strict";

// import { FTMApi } from "../tools/ftmscanapi.js";
import { WakaFarm } from "./Farms/wakaFarm.js";

import { state } from "../state.js";
import { message } from "../tools/message.js";
import { FTMToken } from "./Tokens/ftmToken.js";

export class Analytics {
  constructor(adress) {
    this.class = "Analytics";
    this.adress = adress;
    this.message = message;
    this.state = state;
    this.api = this.state.FTMScan;
    //console.log(new FTMToken().abi);
    //this.findAnalyticsPairs();
    this.waka = new WakaFarm();
    //console.log(this.waka.providerName);
    $.Topic(state.topicNames.analytics.txLoaded).publish("abc");
    this.subscribeToAccountConnected();
  }

  subscribeToAccountConnected() {
    $.Topic(this.state.topicNames.metamask.account.connected).subscribe(() => {
      this.message.showToast("farm acc conn").bind(this);
    });
  }

  setAdress(adress) {
    this.adress = adress;
  }

  checkAdress() {
    if (!ethers.utils.isAddress(this.adress)) {
      throw new Error(`Value '${this.adress}' is not valid adress!`);
    }
  }

  async getAdressFarms() {
    try {
      this.checkAdress();
      const txs = await this.api.getERC20Txs();
      const aUniqueTokens = this.api.getUniqueTokens(txs);
      state.ERC20Txs = txs;
      state.ERC20Tokens = aUniqueTokens;
    } catch (e) {
      this.logError(e.message, this.findAnalyticsPairs.name, true);
      throw e;
    }
  }

  logError(msg, method, showToast = false) {
    const errmsg = `ERR: ${this.class}/${method} <<< ${msg}`;
    console.log(errmsg);
    if (showToast) {
      this.message.showToast(errmsg);
    }
  }
}
