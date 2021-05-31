class Casper {
  constructor() {
    console.log(`>>> Casper initialized`);
    this.state = new State();
    this.message = new Messages("toast");
    this.state.metamask = new Metamask(this.message);
    this.ui = new UIHanlder();
  }

  get isConnected() {
    return this.state.metamask.isConnected;
  }

  get metamask() {
    return this.state.metamask;
  }

  async walletInfo() {
    await this.connectMetamask();
    const acc = await this.metamask.getAccount();
    const network = await this.metamask.getNetwork();
    const balance = await this.metamask.getBalance();
    this.ui.setWalletInfo(acc, network, balance);
  }

  async mainInfo() {
    await this.connectMetamask();
    const updateFTM = async () => {
      const ftm = await utils.getFTMPrice();
      this.ui.setFTMPrice(`FTM: ${ftm}`);
    };
    updateFTM();
    //update price every 60s
    window.setInterval(updateFTM, 6 * 10 * 1000);
  }

  async connectMetamask() {
    if (!this.isConnected) {
      const connectOk = await this.metamask.connect();
    }
    return this.isConnected;
  }
}

class Messages {
  constructor(element) {
    this.elementName = element;
    this.element = $(`#${element}`);
  }

  showToast = (text, timeout = 2500) => {
    this.element.html(text);
    this.element.removeClass("hidden");
    window.setTimeout(() => {
      this.element.addClass("hidden");
    }, timeout);
  };
}

class UIHanlder {
  constructor() {
    this.dummy = "coming soon";
    this.elements = {
      main: {
        ftmprice: { id: "#ftmprice", method: "html", mark: true },
      },
      wallet: {
        account: { id: "#input_account", method: "val", mark: false },
        network: { id: "#input_network", method: "val", mark: false },
        balance: { id: "#input_balance", method: "val", mark: false },
      },
    };
  }

  setWalletInfo(account, network, balance) {
    console.log(`Account: ${account}`);
    console.log(`Network: ${network}`);
    console.log(`Balance: ${balance}`);
    this.setElementValue(this.elements.wallet.account, account);
    this.setElementValue(this.elements.wallet.network, network);
    this.setElementValue(this.elements.wallet.balance, balance);
  }

  setFTMPrice(message) {
    console.log(`FTMPrice: ${message}`);
    this.setElementValue(this.elements.main.ftmprice, message);
  }

  setElementValue(element, value) {
    if (element.mark) {
      value = `<mark>${value}</mark>`;
    }
    const el = $(element.id);
    if (element.method === "html") {
      el.html(value || this.dummy);
    }
    if (element.method === "val") {
      el.val(value || this.dummy);
    }
  }
}

const showFTMPrice = async () => {
  const price = await utils.getFTMPrice();
  $("#ftmprice").html(`<mark>FTM: ${price}</mark>` || "coming soon");
};
