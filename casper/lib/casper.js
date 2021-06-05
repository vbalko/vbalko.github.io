import { message } from "./tools/message.js";
import { Analytics } from "./analytics/index.js";
import { state } from "./state.js";
import { uiHanlder } from "./ui/uihandler.js";
import { config } from "./config.js";

export class Casper {
  constructor() {
    console.log(`>>> Casper initialized`);
    this.state = state; //new State();
    // export const mm =new Messages("toast");
    this.message = message;
    // this.state.metamask = metamask;
    //this.state.FTMScan = new FTMScan(this.message);
    this.ui = uiHanlder;

    //this.analytics = new Analytics("", this.message);
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

    const theader = `<caption>Wallet Balances</caption><thead><tr><th>Token</th><th>Name</th><th>Balance</th></tr></thead><tbody>`;
    let table = aBalances.reduce((acc, curr) => {
      acc += `<tr><td>${curr.symbol}</td><td>${curr.name}</td><td>${formatNr(
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
      this.message.showToast("Connect to metamask");
      //const connectOk = await this.metamask.connect();
    }
    return this.isConnected;
  }

  async test() {
    this.chainUtils = new chainUtils(this.metamask);
    await this.chainUtils.init();
    //await this.chainUtils.findFantomUSDPrice();
    this.analytics = new Analytics("", this.message);
    const ret = await this.chainUtils.getYields(
      await this.chainUtils.getContractObj(
        "0x8aC0Cd0710AD12D9748e3638CFB65296cF13F916",
        abis.strategyAbiBoo
      ),
      0,
      await this.chainUtils.getContractObj(
        "0xEc7178F4C41f346b2721907F5cF7628E388A7a58",
        abis.reaperVaultAbi
      ),
      { depositFee: "0", interestFee: "0.045", withdrawFee: "0" },
      "1"
    );
    // const ret = await this.chainUtils.findFantomPairingData(
    //   "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE"
    // );
    console.log(ret);
  }

  metamaskConnected(event) {
    const casper = window.casper;
    if (casper.isConnected) {
      (async () => {
        await casper.ui.toggleConnectButtonVisibility();
        await casper.mainInfo();
        await casper.walletInfo();
        await casper.walletBalances();

        await casper.test();
      })();
    } else {
      casper.ui.toggleConnectButtonVisibility();
    }
  }

  setConnectMetamask() {
    // $("#btn_connect").click(() => alert("abc"));
    this.ui.handleConnectButton(this.metamask, this.metamask.requestConnect);
    //$(document).on("metamask:account:changed", this.metamaskConnected);
    $.Topic(state.topicNames.metamask.account.changed).subscribe(
      this.metamaskConnected
    );
    // $(document).on("metamask:chain:changed", (event) => alert("chain"));
    $.Topic(state.topicNames.metamask.chain.changed).subscribe((event) =>
      alert("chain changed")
    );
    //this.metamask.requestConnect);
    //   if (!this.isConnected) {
    //     const connectOk = await this.metamask.connect();
    //   }
    //   return this.isConnected;
    // }
  }
}
