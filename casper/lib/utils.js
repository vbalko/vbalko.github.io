const utils = {
  getFTMPrice: async () => {
    const ret = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd"
    ).then((response) => response.json());
    return ret.fantom.usd;
  },
  tokenToPrecision: (value, precision) => Number(value) / 10 ** precision,
};
