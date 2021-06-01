class Metamask {
  constructor(message) {
    this.message = message;
    this.currentProvider = undefined;
    this._signer = undefined;
    this.connected = false;
    this._account = "";
    this.network = "";
    this.balance = "";
    this.onFantom = false;
  }

  get isConnected() {
    return this.connected;
  }

  get account() {
    return (async () => {
      if (!this._account) {
        await this.getAccount();
      }
      return this._account;
    })();
  }

  async connect() {
    this.connected = false;
    this.injProvider = await detectEthereumProvider();
    if (this.injProvider) {
      if (this.injProvider !== window.ethereum) {
        this.message.showToast("Do you have multiple wallets installed?");
        console.error("Do you have multiple wallets installed?");
        return false;
      } else {
        this.message.showToast("Metamask connected!");
        this.currentProvider = new ethers.providers.Web3Provider(
          this.injProvider
        );
        this._signer = this.currentProvider.getSigner(0);
        this.connected = true;
        return true;
      }
    } else {
      this.message.showToast("Please install MetaMask!");
      console.error("Please install MetaMask!");
      return false;
    }
  }

  // async connect() {
  //     ethereum.request({ method: 'eth_requestAccounts' })
  // }

  async getAccount() {
    /***********************************************************/
    /* Handle user accounts and accountsChanged (per EIP-1193) */
    /***********************************************************/
    try {
      const currentAccount = await ethereum.request({
        method: "eth_accounts",
      });
      this.handleAccountsChanged(currentAccount);
    } catch (err) {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error(err);
    }

    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    ethereum.on("accountsChanged", this.handleAccountsChanged);
    return this._account;
  }

  async requestConnect(event) {
    const that = this;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      event.data.handleAccountsChanged(accounts);
      await event.data.connect();
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  }

  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      this.message.showToast("Please connect to MetaMask.");
      console.log("Please connect to MetaMask.");
      this.connected = false;
      $(document).trigger("metamask:account:changed", this._account);
    } else if (accounts[0] !== this._account) {
      this._account = accounts[0];
      this.connected = true;
      $(document).trigger("metamask:account:changed", this._account);
      // Do any other work!
    }
  }

  async getNetwork() {
    const chainId = await ethereum.request({ method: "eth_chainId" });
    const chainIdDec = parseInt(chainId, 16);
    //web3tools.handleChainChanged(chainId);
    ethereum.on("chainChanged", this.handleChainChanged);
    let name = "";
    if (chainIdDec == "250") {
      name = `Fantom Opera (${chainIdDec})`;
    } else {
      name = `Other network (${chainIdDec})`;
    }
    return name;
  }

  handleChainChanged(_chainId) {
    this.network = _chainId;
    $(document).trigger("metamask:chain:changed", this._chainId);
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  async getBalance() {
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: [this._account, "latest"],
    });
    return parseInt(balance, 16) / 10 ** 18;
  }
}
