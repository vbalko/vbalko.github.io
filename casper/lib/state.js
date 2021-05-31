class State {
  constructor() {
    this._metamask = {
      provider: undefined,
    };
    this._FTMScan = {
      provider: undefined,
    };
  }

  get metamask() {
    return this._metamask.provider;
  }

  set metamask(value) {
    this._metamask.provider = value;
  }

  get FTMScan() {
    return this._FTMScan.provider;
  }

  set FTMScan(value) {
    this._FTMScan.provider = value;
  }

  //   get adress() {
  //     return this._metamask.adress;
  //   }

  //   set adress(value) {
  //     this._metamask.adress = value;
  //   }

  //   get network() {
  //     return this._metamask.network;
  //   }

  //   set network(value) {
  //     this._metamask.network = value;
  //   }

  //   get balance() {
  //     return this._metamask.balance;
  //   }

  //   set balance(value) {
  //     this._metamask.balance = value;
  //   }
}
