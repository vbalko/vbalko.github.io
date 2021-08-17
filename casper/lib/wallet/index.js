import { state } from "../state.js";
import { tx } from "./transaction.js";

class Wallet {
  constructor() {
    this.scanApi = state.FTMScan;
    this.metamask = state.metamask;
    this.message = state.message;
    this.txs;
    this.tokenTxs;
    // this._ownAdress;
  }

  async walletInfo() {
    try {
      this.metamask.checkConnection();
      const account = await this.metamask.account;
      const network = await this.metamask.getNetwork();
      const balance = await this.scanApi.getFTMBalance(
        await this.metamask.account
      );
    } catch (err) {}
  }

  formatNr(nr) {
    if ($.type(nr) === "string") return nr;
    if (!nr) return nr;
    if (nr.toFixed(3) == 0) return nr.toFixed(18);
    return nr;
  }

  async getTokenBalances() {
    const account = this.metamask.account;

    await this.groupByTokens();
    const aBalances = [];
    for (let idx in this.tokenTxs.groups) {
      let token = this.tokenTxs.groups[idx];
      let tokenInfo = {
        symbol: token.tokenSymbol,
        name: token.tokenName,
        amount: await this.sumAmounts(token.transactions),
        contract: token.tokenContract,
      };
      aBalances.push(tokenInfo);
    }
    return aBalances;
  }

  async sumAmounts(aTxs) {
    let sum = 0;
    for (let tx of aTxs) {
      sum += await tx.getTxTokenValue();
    }
    return sum;
    // return await aTxs.reduce(async (acc, curr) => {
    //   acc += await curr.getTxTokenValue();
    //   return acc;
    // }, Promise.resolve(0));
  }

  get txCount() {
    return this.txs.length;
  }

  //create object with token and their txs grouped
  //key have to be syntetic number, because token symbol is not unique eg. xWaka
  async groupByTokens() {
    await this.getAllTxs();
    const map = {};
    let tokenCount = 0;
    //tx.ownAdress = this.metamask.account;
    const tokenTxs = this.txs.reduce((acc, curr) => {
      let _tx = new tx(this.metamask.account, curr);
      if (map[_tx.contract] === undefined) {
        map[_tx.contract] = tokenCount;
        acc[tokenCount] = {
          tokenSymbol: _tx.tokenSymbol,
          tokenName: _tx.tokenName,
          tokenContract: _tx.contract,
          transactions: [],
        };
        tokenCount++;
      }
      let idx = map[_tx.contract];
      acc[idx].transactions.push(_tx);
      return acc;
    }, {});
    this.tokenTxs = {
      map: map,
      groups: tokenTxs,
    };
    return this.tokenTxs;
  }
  /*
   * get all transactions if they are not already loaded
   * @param force - force reload transactions
   */
  async getAllTxs(force = false) {
    if (!this.txs || force) {
      this.txs = await this.scanApi.getERC20Txs(await this.metamask.account);
    }
  }

  async getERC20TokensBalance() {
    //get All Txs of adress
    const aERC20Txs = this.txs;
  }
}

export const wallet = new Wallet();
