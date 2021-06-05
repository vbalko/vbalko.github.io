import { state } from "../state.js";

class UIHanlder {
  constructor() {
    // this.events = {
    //   menu: {
    //     wallet: "ui:menu:wallet",
    //     analytics: "ui:menu:analytics",
    //     zap: "ui:menu:zap",
    //     contracts: "ui:menu:contracts",
    //   },
    // };
    this.dummy = "coming soon";
    this.elements = {
      main: {
        ftmprice: { id: "#ftmprice", method: "html", mark: true },
        menu: {
          wallet: {
            id: "#btn_wallet",
            event: state.topicNames.ui.menu.wallet,
            mark: true,
          },
          analytics: {
            id: "#btn_analytics",
            event: state.topicNames.ui.menu.analytics,
            mark: true,
          },
          zap: {
            id: "#btn_zap",
            event: state.topicNames.ui.menu.zap,
            mark: true,
          },
          contracts: {
            id: "#btn_contracts",
            event: state.topicNames.ui.menu.contracts,
            mark: true,
          },
        },
        tabs: {
          wallet: { id: "#walletTab" },
          analytics: { id: "#analyticsTab" },
          zap: { id: "#zapTab" },
          contracts: { id: "#contractsTab" },
        },
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

    //main menu subscribe
    for (let item in this.elements.main.menu) {
      let el = this.elements.main.menu[item];
      $(el.id).click(() => {
        //$(document).trigger(el.event, this);
        $.Topic(state.topicNames.ui.menuTabChanged).publish(el.event);
        $.Topic(el.event).publishWith(this, [el.event]);
      });

      //subscribe to main menu events
      //$(document).on(el.event, this.handleMainMenu);
      $.Topic(el.event).subscribe(this.handleMainMenu);
    }
  }

  handleMainMenu(event) {
    //const that = window.casper.ui;
    this.hideAllMenuContainers();
    if (event === state.topicNames.ui.menu.wallet) {
      $("#walletTab").removeClass("hidden");
    }

    if (event === state.topicNames.ui.menu.analytics) {
      $("#analyticsTab").removeClass("hidden");
    }
  }

  hideAllMenuContainers() {
    for (let tab in this.elements.main.tabs) {
      let el = this.elements.main.tabs[tab];
      $(el.id).addClass("hidden");
    }
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

export const uiHanlder = new UIHanlder();
