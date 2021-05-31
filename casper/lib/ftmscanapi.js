class FTMScan {
  constructor(message) {
    this.class = "FTMScan";
    this.message = message;
  }

  logError(msg, method, showToast = false) {
    const errmsg = `ERR: ${this.class}/${method} <<< ${msg}`;
    console.log(errmsg);
    if (showToast) {
      this.message.showToast(errmsg);
    }
  }

  async getERC20Txs(adress) {
    const url = `https://api.ftmscan.com/api?module=account&action=tokentx&address=${adress}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    const txs = await this.makeAPICall(url);
    return txs.result;
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

    const aHistory = await this.getERC20Txs(adress);
    const aUniqueTokens = [...new Set(aHistory.map((item) => item.tokenSymbol))]
      .map((item) => {
        return {
          symbol: item,
          amount: sumHistoryTokenAmount(aHistory, item),
        };
      })
      .filter((item) => item);

    return aUniqueTokens;
  }
}
