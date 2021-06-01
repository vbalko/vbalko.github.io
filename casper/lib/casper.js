class Casper {
  constructor() {
    console.log(`>>> Casper initialized`);
    this.state = new State();
    this.message = new Messages("toast");
    this.state.metamask = new Metamask(this.message);
    this.state.FTMScan = new FTMScan(this.message);
    this.ui = new UIHanlder();
  }

  get isConnected() {
    return this.state.metamask.isConnected;
  }

  get metamask() {
    return this.state.metamask;
  }

  get FTMScan() {
    return this.state.FTMScan;
  }

  async walletInfo() {
    await this.connectMetamask();
    const acc = await this.metamask.getAccount();
    const network = await this.metamask.getNetwork();
    const balance = await this.FTMScan.getFTMBalance(
      await this.metamask.account
    ); //this.metamask.getBalance();
    this.ui.setWalletInfo(
      acc,
      network,
      `FTM: ${ethers.utils.formatEther(balance)}`
    );
  }

  async mainInfo() {
    await this.connectMetamask();
    const updateFTM = async () => {
      const ftm = await utils.getFTMPrice();
      this.ui.setFTMPrice(`FTM: $${ftm}`);
    };
    updateFTM();
    //update price every 60s
    window.setInterval(updateFTM, 6 * 10 * 1000);
  }

  async walletBalances() {
    const formatNr = (nr) => {
      if ($.type(nr) === "string") return nr;
      if (!nr) return nr;
      if (nr.toFixed(3) == 0) return nr.toFixed(18);
      return nr;
    };
    const aBalances = await this.FTMScan.getERC20TokensBalance(
      await this.metamask.account
    );

    const theader = `<caption>Wallet Balances</caption><thead><tr><th>Token</th><th>Balance</th></tr></thead><tbody>`;
    let table = aBalances.reduce((acc, curr) => {
      acc += `<tr><td>${curr.symbol}</td><td>${formatNr(
        curr.amount
      )}</td></tr>`;
      return acc;
    }, theader);
    table += `</tbody>`;

    this.ui.displayTable("balances", table);
    this.ui.handleWalletBalanceRowClick(
      { tab: aBalances, account: await this.metamask.account },
      (event) => {
        const tokenSymbol = $(event.currentTarget).children("td:eq(0)").text();
        const row = event.data.tab.find((item) => item.symbol === tokenSymbol);
        window.open(
          `https://ftmscan.com/token/${row.contract}?a=${event.data.account}`
        );
        //alert(`${row.contract}`);
      }
    );

    //console.table(table);
  }

  async connectMetamask() {
    if (!this.isConnected) {
      this.ui.showToast("Connect to metamask");
      //const connectOk = await this.metamask.connect();
    }
    return this.isConnected;
  }

  metamaskConnected() {
    const casper = window.casper;
    if (casper.isConnected) {
      (async () => {
        await casper.ui.toggleConnectButtonVisibility();
        await casper.mainInfo();
        await casper.walletInfo();
        await casper.walletBalances();
      })();
    } else {
      casper.ui.toggleConnectButtonVisibility();
    }
  }

  setConnectMetamask() {
    // $("#btn_connect").click(() => alert("abc"));
    this.ui.handleConnectButton(this.metamask, this.metamask.requestConnect);
    $(document).on("metamask:account:changed", this.metamaskConnected);
    //this.metamask.requestConnect);
    //   if (!this.isConnected) {
    //     const connectOk = await this.metamask.connect();
    //   }
    //   return this.isConnected;
    // }
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
        account: {
          id: "#input_account",
          method: "html",
          mark: false,
          small: true,
        },
        network: {
          id: "#input_network",
          method: "html",
          mark: false,
          small: true,
        },
        balance: {
          id: "#input_balance",
          method: "html",
          mark: false,
          small: true,
        },
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
    if (element.small) {
      value = `<small>${value}</small>`;
    }
    const el = $(element.id);
    if (element.method === "html") {
      el.html(value || this.dummy);
    }
    if (element.method === "val") {
      el.val(value || this.dummy);
    }
  }

  displayTable(element, content) {
    $(`#${element}`).append(content);
  }

  toggleConnectButtonVisibility() {
    $(`#btn_connect`).toggleClass("hidden");
  }

  handleConnectButton(data, handler) {
    $(`#btn_connect`).click(data, handler);
  }

  handleWalletBalanceRowClick(data, handler) {
    $(`#balances tr`).click(data, handler);
  }
}

const showFTMPrice = async () => {
  const price = await utils.getFTMPrice();
  $("#ftmprice").html(`<mark>FTM: ${price}</mark>` || "coming soon");
};
