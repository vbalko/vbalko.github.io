import { state } from "../state.js";

class Transaction {
  constructor(addr, txData) {
    this.isInit = false;
    this._ownAdress = addr;
    this._txData = txData;
  }

  set ownAdress(adr) {
    this.ownAdress = adr;
  }

  get ownAdress() {
    return this._ownAdress;
  }

  get amount() {
    return this._txData.value;
  }

  get precisionAmount() {
    return this.tokenToPrecision();
  }

  get txValue() {
    return this.getTxTokenValue();
  }

  get txData() {
    return this._txData;
  }

  get tokenName() {
    return this._txData.tokenName;
  }

  get tokenSymbol() {
    return this._txData.tokenSymbol;
  }

  get contract() {
    return this._txData.contractAddress;
  }

  attach(txData) {
    this._txData = txData;
  }

  async isOut() {
    return this._txData.from.toUpperCase() ==
      (await this.ownAdress).toUpperCase()
      ? true
      : false;
  }

  async getTxTokenValue() {
    let val = this.tokenToPrecision();
    return (await this.isOut()) ? (val *= -1) : val;
  }

  tokenToPrecision() {
    return this._tokenToPrecision(this.txData.value, this.txData.tokenDecimal);
  }

  _tokenToPrecision(value, precision) {
    return Number(value) / 10 ** precision;
  }
}

export const tx = Transaction;
