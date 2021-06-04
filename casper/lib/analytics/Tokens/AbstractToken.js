import { state } from "../../state.js";

export class AbstractToken {
  constructor(tokenAdress, abi) {
    (async () => {
      const tokenContract = await state.metamask.getContract(tokenAdress, abi); //new ethers.cont 0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83;
      const tokenName = await tokenContract.name();
      const tokenSymbol = await tokenContract.symbol();
      const totalSupply = await tokenContract.totalSupply();
      const decimals = await tokenContract.decimals();

      const totalSupplyFormatted = ethers.utils.formatUnits(
        totalSupply,
        decimals
      );

      this.tokenInfo = {
        name: tokenName || "AbstractToken",
        adress: tokenAdress || "AbstractAdress",
        symbol: tokenSymbol || "AbstractSymbol",
        totalSupply: { raw: totalSupply, formatted: totalSupplyFormatted },
        contractObj: tokenContract || undefined,
        decimals: decimals || 0,
      };
    })();
    this._abi = abi;
  }

  formattedSupply() {
    return ethers.utils.formatEther(this.tokenInfo.totalSupply);
  }

  get abi() {
    return this._abi;
  }

  get info() {
    return this.tokenInfo;
  }

  // async init(tokenAdress, abi) {
  //   const tokenContract = state.metamask.getContract(tokenAdress, abi); //new ethers.cont 0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83;
  //   const name = tokenContract().name();
  // }
}
