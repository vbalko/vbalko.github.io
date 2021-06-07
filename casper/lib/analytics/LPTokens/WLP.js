import { state } from "../../state.js";

export class WLP {
  constructor() {
    this.FTMApi = state.FTMScan;
    this.tokenSymbol = "WLP";
    this.name = "WakaSwap LP Token";
    this.adress = "0x696885e9581bd33ee9877bd8750ddda65381ff01";
    this.abi = state.abis.ERC20_ABI;

    (async () => {
      this.tokenContract = await state.metamask.getContract(
        this.adress,
        state.abis.ERC20_ABI
      );
      this.totalSupply = await this.getTotalSupply();
    })();
  }

  async getTotalSupply() {
    return await this.FTMApi.getERC20TokenTotalSupply(this.adress);
  }

  async decimals() {
    return await rewarTokenContract.decimals();
  }

  async getTokenInfo(stakingAddress) {
    const myAccount = state.metamask.account;
    const decimals = await this.decimals();
    return {
      adress,
      name: await this.tokenContract.name(),
      symbol: await this.tokenContract.symbol(),
      totalSupply: await this.tokenContract.totalSupply(),
      decimals: this.decimals(),
      staked:
        (await this.tokenContract.balanceOf(stakingAddress)) / 10 ** decimals,
      unstaked:
        (await this.tokenContract.balanceOf(myAccount)) / 10 ** decimals,
      contract: this.tokenContract,
      tokens: [this.adress],
    };
  }
}
