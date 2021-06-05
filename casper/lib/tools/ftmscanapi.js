import { message } from "./message.js";
import { state } from "../state.js";

class FTMScan {
  constructor() {
    this.class = "FTMScan8";
    this.message = message;
  }

  logError(msg, method, showToast = false) {
    const errmsg = `ERR: ${this.class}/${method} <<< ${msg}`;
    console.log(errmsg);
    if (showToast) {
      this.message.showToast(errmsg);
    }
  }

  async getFTMBalance(adress = this.adress) {
    const url = `https://api.ftmscan.com/api?module=account&action=balance&address=${adress}&tag=latest&apikey=YourApiKeyToken`;
    const balance = await this.makeAPICall(url);
    return balance.result;
  }

  async getFTMTxs(adress = this.adress) {
    const url = `https://api.ftmscan.com/api?module=account&action=txlist&address=${adress}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;
    const txs = await this.makeAPICall(url);
    return txs.result;
  }

  async getERC20Txs(adress = this.adress) {
    const url = `https://api.ftmscan.com/api?module=account&action=tokentx&address=${adress}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    const txs = await this.makeAPICall(url);
    state.ERC20Txs = txs.result;
    return txs.result;
  }

  async getERC20TokenTotalSupply(adress) {
    const url = `https://api.ftmscan.com/api?module=stats&action=tokensupply=${adress}&apikey=YourApiKeyToken`;
    const txs = await this.makeAPICall(url);
    return txs.result;
  }

  async getERC20TokenAccountBalance(contractAdress, account) {
    const url = `https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=${contractAdress}&address=${account}&tag=latest&apikey=YourApiKeyToken`;
    const txs = await this.makeAPICall(url);
    return txs.result;
  }

  /*
   * get array of unique tokens among transaction history
   */

  getUniqueTokens(aTxs) {
    const aUniqueTokens = [...new Set(aTxs.map((item) => item.tokenSymbol))];
  }

  /*
   * filters transactions where sender and receiver are same
   * These are probably mistakes and dont have effect on balance
   */
  filterSameAdressTx(aTxs) {
    return aTxs.filter((item) => item.to != item.from);
  }

  async makeAPICall(url) {
    const method = "makeAPICall";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        this.logError(response.status, method, true);
        throw new Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error;
    }
  }

  //TODO: hodit tuto funkcionalitu niekam na lepsie miesto
  async getERC20TokensBalance(adress) {
    const sumHistoryTokenAmount = (aHist, token) =>
      aHist
        .filter((item) => item.tokenSymbol == token)
        .reduce((acc, curr) => {
          acc += getTxTokenValue(curr);
          return acc;
        }, 0);
    const isOut = (ownAdress, txn) => {
      return txn.from.toUpperCase() == ownAdress.toUpperCase() ? true : false;
    };
    const getTxTokenValue = (txn) => {
      let val = utils.tokenToPrecision(txn.value, txn.tokenDecimal);
      return isOut(adress, txn) ? (val *= -1) : val;
    };

    const getTokenContract = (aTxs, token) => {
      return aTxs.find((item) => item.tokenSymbol === token).contractAddress;
    };
    const getTokenName = (aTxs, token) => {
      return aTxs.find((item) => item.tokenSymbol === token).tokenName;
    };

    const aERC20Txs = await this.getERC20Txs(adress);
    //remove transactions, where from and to are same - dont have effect on balance when you send tokens to yourself
    const aHistory = []
      .concat(aERC20Txs)
      .filter((item) => item.to != item.from);
    // const FTMTxs = await this.getFTMTxs(adress);
    // const aHistory = aERC20Txs.concat(
    //   FTMTxs.map((item) => {
    //     item.tokenSymbol = "FTM";
    //     item.tokenDecimal = 18;
    //     return item;
    //   })
    // );
    const aUniqueTokens = [...new Set(aHistory.map((item) => item.tokenSymbol))]
      .map((item) => {
        return {
          symbol: item,
          name: getTokenName(aHistory, item),
          amount: sumHistoryTokenAmount(aHistory, item),
          contract: getTokenContract(aHistory, item),
        };
      })
      .filter((item) => item);

    //workaround - FTM balance se pocita nejak divne, tak balance doplnim z api

    return aUniqueTokens.concat([
      {
        symbol: "FTM",
        name: "Fantom",
        amount: ethers.utils.formatEther(await this.getFTMBalance(adress)),
        contract: "0x4e15361fd6b4bb609fa63c81a2be19d873717870",
      },
    ]);

    // return aUniqueTokens;
  }
}

export const FTMApi = new FTMScan();
