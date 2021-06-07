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
    const UNI_ABI =
      '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
    const pool = await this.chainUtils.getContractObj(
      "0x696885e9581bd33eE9877Bd8750DdDA65381FF01",
      UNI_ABI
    );
    const reserves = await pool.getReserves();
    console.log(`poolinfo: ${reserves}`);
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
