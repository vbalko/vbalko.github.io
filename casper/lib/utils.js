const utils = {
  getFTMPrice: async () => {
    const ret = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=fantom&vs_currencies=usd"
    ).then((response) => response.json());
    return ret.fantom.usd;
  },
  tokenToPrecision: (value, precision) => Number(value) / 10 ** precision,
};

const chainContracts = {
  spookyStableLP: "0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c",
  fantomAddress: ethers.utils.getAddress(
    "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
  ),
  usdcAddress: ethers.utils.getAddress(
    "0x04068da6c83afcfa0e13ba15a6696662335d5b75"
  ),
  masterChefAddress: "0x2b2929E785374c651a81A63878Ab22742656DcDd",
  strategies: {
    booStrat: "0x8aC0Cd0710AD12D9748e3638CFB65296cF13F916",
    spiritStrat: "0x42eE4062C6fBD4C454dC3890D71980b320EE8040",
    liquidStrat: "0x400528CBb7b4C7597eeeCA9Eb8132916eEeB5914",
    hyperStrat: "0xBe053b076afd08eDbB6b8668F18A7f5760466b74",
    iceStratSushi: "0x2DF7339d5f82E1E585AC6b17251187DDe570Ed15",
    iceStratSpooky: "0x050e18dC8B88c2bEE3788Ba384032A12F66AD5d8",
    wakaStrat: "0x60E63c1AE57CA40976fCf597D86D734141f34b5E",
    steakStrat: "0x1Ad4b5B783B92a59ACcF7E3380c7F726799d68B9",
    booLPAddress: "0xEc7178F4C41f346b2721907F5cF7628E388A7a58",
  },
  coins: {
    AAVE: {
      name: "AAVE",
      address: "0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B",
    },
    ANY: { name: "ANY", address: "0xdDcb3fFD12750B45d32E084887fdf1aABAb34239" },
    ATRI: {
      name: "ATRI",
      address: "0x0370dC24570ED93DB0b67d20340923E56c0aADD9",
    },
    AURORA: {
      name: "AURORA",
      address: "0xbc2451AaD349b6B43FD05F4F0cC327F8A6bcA2d4",
    },
    BADGER: {
      name: "BADGER",
      address: "0x753fbc5800a8C8e3Fb6DC6415810d627A387Dfc9",
    },
    BAND: {
      name: "BAND",
      address: "0x46E7628E8b4350b2716ab470eE0bA1fa9e76c6C5",
    },
    BEAN: {
      name: "BEAN",
      address: "0xbAc5d43A56696e5D0CB631609E85798f564b513b",
    },
    BNB: { name: "BNB", address: "0xd67de0e0a0fd7b15dc8348bb9be742f3c5850454" },
    BOO: { name: "BOO", address: "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE" },
    BUSD: {
      name: "BUSD",
      address: "0xc931f61b1534eb21d8c11b24f3f5ab2471d4ab50",
    },
    COVER: {
      name: "COVER",
      address: "0xB01E8419d842beebf1b70A7b5f7142abbaf7159D",
    },
    CREAM: {
      name: "CREAM",
      address: "0x657A1861c15A3deD9AF0B6799a195a249ebdCbc6",
    },
    CRV: { name: "CRV", address: "0x1E4F97b9f9F913c46F1632781732927B9019C68b" },
    CZTEARS: {
      name: "CZTEARS",
      address: "0x907f1A48918Bb5DE07c12443CAB0e6EEfCC611BC",
    },
    DAI: { name: "DAI", address: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E" },
    FRAX: {
      name: "FRAX",
      address: "0xaf319E5789945197e365E7f7fbFc56B130523B33",
    },
    FTM: { name: "FTM", address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83" },
    fUSD: {
      name: "fUSD",
      address: "0xad84341756bf337f5a0164515b1f6f993d194e1f",
    },
    fUSDT: {
      name: "fUSDT",
      address: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    },
    FXS: { name: "FXS", address: "0x82F8Cb20c14F134fe6Ebf7aC3B903B2117aAfa62" },
    ICE: { name: "ICE", address: "0xf16e81dce15B08F326220742020379B855B87DF9" },
    LINK: {
      name: "LINK",
      address: "0xb3654dc3d10ea7645f8319668e8f54d2574fbdc8",
    },
    LQDR: {
      name: "LQDR",
      address: "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9",
    },
    MM: { name: "MM", address: "0xbfaf328fe059c53d936876141f38089df0d1503d" },
    ORI: { name: "ORI", address: "0x0575f8738EFdA7F512e3654F277C77e80C7d2725" },
    SFI: { name: "SFI", address: "0x924828a9Fb17d47D0eb64b57271D10706699Ff11" },
    SNX: { name: "SNX", address: "0x56ee926bD8c72B2d5fa1aF4d9E4Cbb515a1E3Adc" },
    SPIRIT: {
      name: "SPIRIT",
      address: "0x5Cc61A78F164885776AA610fb0FE1257df78E59B",
    },
    SUSHI: {
      name: "SUSHI",
      address: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC",
    },
    STEAK: {
      name: "STEAK",
      address: "0x05848B832E872d9eDd84AC5718D58f21fD9c9649",
    },
    USDC: {
      name: "USDC",
      address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    },
    WAKA: {
      name: "WAKA",
      address: "0xf61cCdE1D4bB76CeD1dAa9D4c429cCA83022B08B",
    },
    WBTC: {
      name: "WBTC",
      address: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
    },
    WETH: {
      name: "WETH",
      address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
    },
    WOOFY: {
      name: "WOOFY",
      address: "0xD0660cD418a64a1d44E9214ad8e459324D8157f1",
    },
    YFI: { name: "YFI", address: "0x29b0Da86e484E1C0029B56e817912d778aC0EC69" },
    ZOO: { name: "ZOO", address: "0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56" },
  },
};

const abis = {
  erc20abi: JSON.parse(
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"constant":true,"inputs":[],"name":"ERR_INVALID_ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERR_NO_ERROR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
  ),
  strategyAbiBoo: JSON.parse(
    '[{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCallFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTreasuryFee","type":"uint256"}],"name":"CallFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"TotalFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToWftmRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"securityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_callFee","type":"uint256"}],"name":"updateCallFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalFee","type":"uint256"}],"name":"updateTotalFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTreasury","type":"address"}],"name":"updateTreasury","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wftm","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  uniTokenAbi: JSON.parse(
    '[{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]'
  ),
  chefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract SpookyToken","name":"_boo","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_booPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MaxAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boo","outputs":[{"internalType":"contract SpookyToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"booPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxBooPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accBOOPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_booPerSecond","type":"uint256"}],"name":"setBooPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  liquidChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract LqdrToken","name":"_lqdr","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_lqdrPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetFeeAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"lqdrPerBlock","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqdr","outputs":[{"internalType":"contract LqdrToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lqdrPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingLqdr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"name":"poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accLqdrPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_lqdrPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  spiritChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract SpiritToken","name":"_spirit","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_spiritPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSpirit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accSpiritPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"spirit","outputs":[{"internalType":"contract SpiritToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spiritPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_spiritPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  spookyChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract SpookyToken","name":"_boo","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_booPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"MaxAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"boo","outputs":[{"internalType":"contract SpookyToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"booPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxBooPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBOO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accBOOPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_booPerSecond","type":"uint256"}],"name":"setBooPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  hyperChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract HyperOrillium","name":"_ori","type":"address"},{"internalType":"contract HyperMechs","name":"_mechs","type":"address"},{"internalType":"address","name":"_devAddr","type":"address"},{"internalType":"address","name":"_lpFeeAddr","type":"address"},{"internalType":"uint256","name":"_oriPerSecond","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enterMechs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"leaveMechs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpFeeAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_lpFeeAddr","type":"address"}],"name":"lpFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mechs","outputs":[{"internalType":"contract HyperMechs","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ori","outputs":[{"internalType":"contract HyperOrillium","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oriPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingOrillium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accOrilliumPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  popsicleChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract IERC20","name":"_ice","type":"address"},{"internalType":"uint256","name":"_icePerSecond","type":"uint256"},{"internalType":"uint32","name":"_startTime","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"addSeconds","type":"uint32"}],"name":"changeEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ice","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"icePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingIce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"stakingTokenTotalAmount","type":"uint256"},{"internalType":"uint256","name":"accIcePerShare","type":"uint256"},{"internalType":"uint32","name":"lastRewardTime","type":"uint32"},{"internalType":"uint16","name":"allocPoint","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_icePerSecond","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setIcePerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"bool","name":"direct","type":"bool"},{"internalType":"bool","name":"renounce","type":"bool"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"remainingIceTokenReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  wakaChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract WakaToken","name":"_waka","type":"address"},{"internalType":"address","name":"_maintenanceAddr","type":"address"},{"internalType":"uint256","name":"_wakaStartTime","type":"uint256"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_bonusEndTime","type":"uint256"},{"internalType":"uint256","name":"_bonusBeforeBulkTimePeriod","type":"uint256"},{"internalType":"uint256","name":"_bonusBeforeCommonDifference","type":"uint256"},{"internalType":"uint256","name":"_bonusEndCommonDifference","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"accWakaPerShareMultiple","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusBeforeBulkTimePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusBeforeCommonDifference","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndBulkTimePeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndCommonDifference","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bonusEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_maintenanceAddr","type":"address"}],"name":"changeMaintenanceAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getTotalRewardInfo","outputs":[{"internalType":"uint256","name":"totalReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"},{"internalType":"uint256","name":"_wakaInitTime","type":"uint256"},{"internalType":"uint256","name":"_bulkTimePeriod","type":"uint256"},{"internalType":"uint256","name":"_commonDifference","type":"uint256"}],"name":"getTotalRewardInfoInSameCommonDifference","outputs":[{"internalType":"uint256","name":"totalReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maintenance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxRewardTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingWaka","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accWakaPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"waka","outputs":[{"internalType":"contract WakaToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wakaBonusEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wakaStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  steakChefAbi: JSON.parse(
    '[{"inputs":[{"internalType":"contract IERC20","name":"_steak","type":"address"},{"internalType":"contract IERC20","name":"_ifusd","type":"address"},{"internalType":"uint256","name":"_steakPerSecond","type":"uint256"},{"internalType":"uint32","name":"_startTime","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"FeeCollected","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"addSeconds","type":"uint32"}],"name":"changeEndTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"collect","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ifusd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSteak","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"stakingToken","type":"address"},{"internalType":"uint256","name":"stakingTokenTotalAmount","type":"uint256"},{"internalType":"uint256","name":"accSteakPerShare","type":"uint256"},{"internalType":"uint32","name":"lastRewardTime","type":"uint32"},{"internalType":"uint16","name":"allocPoint","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint16","name":"_allocPoint","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeReceiver","type":"address"}],"name":"setFeeReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_harvestFee","type":"uint256"}],"name":"setHarvestFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_steakPerSecond","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"setSteakPerSecond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"steak","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"steakPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"remainingSteakTokenReward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
  ),
  reaperVaultAbi: JSON.parse(
    '[{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"DepositsIncremented","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"TermsAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"WithdrawalsIncremented","type":"event"},{"inputs":[],"name":"agreeToTerms","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"constructionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasReadAndAcceptedTerms","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"initialize","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
  strategyAbiWaka: JSON.parse(
    '[{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newCallFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newTreasuryFee","type":"uint256"}],"name":"CallFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"TotalFeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokenToWftmRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"securityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uniRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_callFee","type":"uint256"}],"name":"updateCallFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_totalFee","type":"uint256"}],"name":"updateTotalFee","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newTreasury","type":"address"}],"name":"updateTreasury","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wftm","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
  ),
};

class chainUtils {
  constructor(metamask) {
    this.metamask = metamask;
    this.provider = this.metamask.currentProvider;
  }

  async init() {
    this.signer = await this.provider.getSigner(0);
    this.fantom = await new ethers.Contract(
      chainContracts.fantomAddress,
      abis.erc20abi,
      this.signer
    );
    this.usdc = await new ethers.Contract(
      chainContracts.usdcAddress,
      abis.erc20abi,
      this.signer
    );
    this.Strategy = await new ethers.Contract(
      chainContracts.strategies.booStrat,
      abis.strategyAbiBoo,
      this.signer
    );
    this.MasterChef = await new ethers.Contract(
      chainContracts.masterChefAddress,
      abis.chefAbi,
      this.signer
    );
    this.Unitoken = await new ethers.Contract(
      chainContracts.strategies.booLPAddress,
      abis.uniTokenAbi,
      this.signer
    );
  }

  async getContractObj(adr, abi) {
    return await new ethers.Contract(adr, abi, this.signer);
  }

  async findFantomPairingData(otherToken) {
    let otherStrat;
    let pairInfo;
    let targetToken;

    switch (otherToken) {
      case "0xbc2451AaD349b6B43FD05F4F0cC327F8A6bcA2d4": //aurora
        otherStrat = this.Strategy.attach(
          "0x8b5307B9e22BDC5a9ac1ce7B802d7206E17c4546"
        );
        targetToken = this.Unitoken.attach(
          "0x483D07BC99CdD1DF66F64aE0A769A70725C46fA4"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE": //boo
        otherStrat = this.Strategy.attach(
          "0x8aC0Cd0710AD12D9748e3638CFB65296cF13F916"
        );
        targetToken = this.Unitoken.attach(
          "0xEc7178F4C41f346b2721907F5cF7628E388A7a58"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": //dai
        otherStrat = this.Strategy.attach(
          "0xE2FAD0Ce7535cdd90A731CF0e067880b800F4Ef2"
        );
        targetToken = this.Unitoken.attach(
          "0xe120ffBDA0d14f3Bb6d6053E90E63c572A66a428"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0xaf319E5789945197e365E7f7fbFc56B130523B33": //frax
        otherStrat = this.Strategy.attach(
          "0xd83e20a99685b45831D308f7Cc65306FBC3ef436"
        );
        targetToken = this.Unitoken.attach(
          "0x0eC0E1629E776272FA3E55548D4A656BE0EEdcF4"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x049d68029688eAbF473097a2fC38ef61633A3C7A": //fusdt
        otherStrat = this.Strategy.attach(
          "0xB5cf8877C50A43c6597013D296AA31679D829FfF"
        );
        targetToken = this.Unitoken.attach(
          "0x5965E53aa80a0bcF1CD6dbDd72e6A9b2AA047410"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9": //lqdr
        otherStrat = this.Strategy.attach(
          "0x400528CBb7b4C7597eeeCA9Eb8132916eEeB5914"
        );
        targetToken = this.Unitoken.attach(
          "0xfA7cA6E6D17368e0a1fA9C75f2eBE5A8d7bE9fc6"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x5Cc61A78F164885776AA610fb0FE1257df78E59B": //spirit
        otherStrat = this.Strategy.attach(
          "0x42eE4062C6fBD4C454dC3890D71980b320EE8040"
        );
        targetToken = this.Unitoken.attach(
          "0x30748322B6E34545DBe0788C421886AEB5297789"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": //usdc
        otherStrat = this.Strategy.attach(
          "0x0E6aDe2Dec2C4e93503b5A17c2FA94719a886747"
        );
        targetToken = this.Unitoken.attach(
          "0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0x29b0Da86e484E1C0029B56e817912d778aC0EC69": //yfi
        otherStrat = this.Strategy.attach(
          "0x6DE53A0EBe18753861021e4491FF2A17e2430C69"
        );
        targetToken = this.Unitoken.attach(
          "0xBf4d61d4cec3a9DFf7452D8987E1Cc2943e2EB4C"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      case "0xAd84341756Bf337f5a0164515b1f6F993D194E1f": //fusd
        otherStrat = this.Strategy.attach(
          "0x9E9d9438f8BF835e3E6E82a448420f20FFeF9c3e"
        );
        targetToken = this.Unitoken.attach(
          "0xBaf1B2fD16f7294ca158B3F1065e5f27F9c72b61"
        );
        pairInfo = await this.findAnyFantomPairData(otherStrat, targetToken);
        return pairInfo;
      default:
        return "undefined";
    }
  }

  async findAnyFantomPairData(strategy, targetToken) {
    let strategySupply = await this.getStrategyLPSupply(strategy);
    let uTokens = await this._getLPAndTokensUnderlying(strategy);
    let lpAddress = ethers.utils.getAddress(uTokens[0]);
    let ERC20 = this.fantom;

    let other;
    let priceInfo;
    let firstSymbol;
    let secondSymbol;
    let firstContract;
    let secondContract;

    if (uTokens[1] === chainContracts.fantomAddress) {
      other = ethers.utils.getAddress(uTokens[2]);
      firstContract = await ERC20.attach(uTokens[1]);
      secondContract = await ERC20.attach(other);
      firstSymbol = await firstContract.symbol();
      secondSymbol = await secondContract.symbol();
      priceInfo = await this.findOtherTokenPriceUSDAgainstFantom(
        lpAddress,
        other,
        targetToken
      );
    } else if (
      uTokens[2] === ethers.utils.getAddress(chainContracts.fantomAddress)
    ) {
      other = ethers.utils.getAddress(uTokens[1]);
      firstContract = await ERC20.attach(uTokens[2]);
      secondContract = await ERC20.attach(other);
      firstSymbol = await firstContract.symbol();
      secondSymbol = await secondContract.symbol();
      priceInfo = await this.findOtherTokenPriceUSDAgainstFantom(
        lpAddress,
        other,
        targetToken
      );
    } else {
      let referenceInfo;
      let reference;
      let referencePrice;
      referenceInfo = await this.findFantomPairingData(uTokens[1]);
      reference = ethers.utils.getAddress(uTokens[1]);
      other = ethers.utils.getAddress(uTokens[2]);
      firstContract = await ERC20.attach(reference);
      secondContract = await ERC20.attach(other);
      firstSymbol = await firstContract.symbol();
      secondSymbol = await secondContract.symbol();
      if (referenceInfo === "undefined") {
        referenceInfo = await this.findFantomPairingData(uTokens[2]);
        reference = ethers.utils.getAddress(uTokens[2]);
        other = ethers.utils.getAddress(uTokens[1]);
        firstContract = await ERC20.attach(reference);
        secondContract = await ERC20.attach(other);
        firstSymbol = await firstContract.symbol();
        secondSymbol = await secondContract.symbol();
      }

      referencePrice = referenceInfo.otherTokenPrice;
      priceInfo = await this.findOtherTokenPriceUSDAgainstOtherToken(
        lpAddress,
        reference,
        referencePrice,
        other,
        targetToken
      );
    }

    return {
      fantomPrice: priceInfo[0],
      otherTokenPrice: priceInfo[1],
      lpTotalValue: priceInfo[2],
      totalLPSupply: priceInfo[3],
      firstTokenSymbol: firstSymbol,
      firstTokenBalance: priceInfo[4],
      totalFirstTokenPrice: priceInfo[5],
      secondTokenSymbol: secondSymbol,
      secondTokenBalance: priceInfo[6],
      totalSecondTokenPrice: priceInfo[7],
      strategySupply: strategySupply,
    };
  }

  async findOtherTokenPriceUSDAgainstFantom(
    lpTokenAddress,
    otherAddress,
    targetToken
  ) {
    let dollarFactor = await this.findFantomDollarFactor();
    let fantomPrice = await this.findFantomUSDPrice();
    let fantomBalance = await this.fantom.balanceOf(lpTokenAddress);
    let scrubbedLPSupply = await this.getTotalSupply(targetToken);
    let scrubbedFantomBalance = ethers.utils.formatEther(fantomBalance);
    let scrubbedOtherBalance = await this.findOtherTokenBalance(
      otherAddress,
      lpTokenAddress
    );
    let fantomPoolToDollarValue =
      parseFloat(scrubbedFantomBalance) / dollarFactor;
    let otherTokenPrice = fantomPoolToDollarValue / scrubbedOtherBalance;
    let fantomHalf = parseFloat(scrubbedFantomBalance) * fantomPrice;
    let otherHalf = scrubbedOtherBalance * otherTokenPrice;
    let lpTotalValue = fantomHalf + otherHalf;
    return [
      fantomPrice,
      otherTokenPrice,
      lpTotalValue,
      scrubbedLPSupply,
      scrubbedFantomBalance,
      fantomHalf,
      scrubbedOtherBalance,
      otherHalf,
    ];
  }

  async findOtherTokenPriceUSDAgainstOtherToken(
    lpTokenAddress,
    referenceAddress,
    referencePrice,
    otherAddress,
    targetToken
  ) {
    let dollarFactor = 1 / referencePrice;
    let referenceBalance = await this.findOtherTokenBalance(
      referenceAddress,
      lpTokenAddress
    );
    let otherBalance = await this.findOtherTokenBalance(
      otherAddress,
      lpTokenAddress
    );
    let lpSupply = await this.getTotalSupply(targetToken);
    let referencePoolToDollarValue = referenceBalance / dollarFactor;
    let otherTokenPrice = referencePoolToDollarValue / otherBalance;
    let referenceHalf = referenceBalance * referencePrice;
    let otherHalf = otherBalance * otherTokenPrice;
    let lpTotalValue = referenceHalf + otherHalf;
    return [
      referencePrice,
      otherTokenPrice,
      lpTotalValue,
      lpSupply,
      referenceBalance,
      referenceHalf,
      otherBalance,
      otherHalf,
    ];
  }

  async getYields(strategy, pid, targetToken, fees, emissionMult) {
    const depFee = parseFloat(fees.depositFee);
    const intFee = parseFloat(fees.interestFee);

    let rewardData = await this.rewardTokenPairData(strategy, targetToken);
    let poolInfo = await this.getPoolInfo(strategy, pid, targetToken);
    let poolData = await this.findAnyFantomPairData(strategy, targetToken);
    let totalSupply = poolData.totalLPSupply;
    let farmSupply = poolInfo.farmBalance;
    let farmShare = farmSupply / totalSupply;
    let farmValue = poolData.lpTotalValue * farmShare;
    let rewardTokenPrice = rewardData.otherTokenPrice;
    let percent = poolInfo.poolAllocation / poolInfo.totalAllocation;
    let poolEmissions = poolInfo.emissionsPerSecond * percent;
    let emissionsPerSec =
      parseFloat(emissionMult) * rewardTokenPrice * poolEmissions;
    let emissionsPerDay = (emissionsPerSec * 86400) / (1 + intFee);
    let emissionsPerWeek = (emissionsPerSec * 604800) / (1 + intFee);
    let emissionsPerMonth = (emissionsPerSec * 2592000) / (1 + intFee);
    let emissionsPerYear = (emissionsPerSec * 31104000) / (1 + intFee);
    let emissionsPerDaym = (emissionsPerSec * 86400) / (1 + 0);
    let emissionsPerWeekm = (emissionsPerSec * 604800) / (1 + 0);
    let emissionsPerMonthm = (emissionsPerSec * 2592000) / (1 + 0);
    let emissionsPerYearm = (emissionsPerSec * 31104000) / (1 + 0);
    const dpr = emissionsPerDay / (farmValue * (1 + depFee));
    const dpy = (1 + dpr / 96) ** 96 - 1;

    const wpr = emissionsPerWeek / (farmValue * (1 + depFee));
    const wpy = (1 + wpr / 672) ** 672 - 1;

    const mpr = emissionsPerMonth / (farmValue * (1 + depFee));
    const mpy = (1 + mpr / 2880) ** 2880 - 1;

    const apr = emissionsPerYear / (farmValue * (1 + depFee));
    const apy = (1 + apr / 35040) ** 35040 - 1;

    const dprm = emissionsPerDaym / (farmValue * (1 + 0));
    const dpym = (1 + dprm / 1) ** 1 - 1;

    const wprm = emissionsPerWeekm / (farmValue * (1 + 0));
    const wpym = (1 + wprm / 7) ** 7 - 1;

    const mprm = emissionsPerMonthm / (farmValue * (1 + 0));
    const mpym = (1 + mprm / 1) ** 1 - 1;

    const aprm = emissionsPerYearm / (farmValue * (1 + 0));
    const apym = (1 + aprm / 2) ** 2 - 1;

    const yields = {
      orig: {
        day: dpy * 100,
        week: wpy * 100,
        month: mpy * 100,
        year: apy * 100,
        dpr: dpr * 100,
        wpr: wpr * 100,
        mpr: mpr * 100,
        apr: apr * 100,
      },
      man: {
        day: dpym * 100,
        week: wpym * 100,
        month: mpym * 100,
        year: apym * 100,
      },
    };

    return yields;
  }

  async getUserUnderlyingData(reaperVault, strategy, targetToken) {
    const addr = await this.signer.getAddress();
    let ppFullShare = await reaperVault.getPricePerFullShare();
    ppFullShare = ethers.utils.formatEther(ppFullShare);

    let balance = await reaperVault.balanceOf(addr);
    balance = ethers.utils.formatEther(balance);
    const userUnderlying = ppFullShare * balance;

    let pairData = await this.findAnyFantomPairData(strategy, targetToken);
    const lpShare = userUnderlying / pairData.totalLPSupply;
    let firstTokenUserBalance = pairData.firstTokenBalance * lpShare;
    let secondTokenUserBalance = pairData.secondTokenBalance * lpShare;
    let firstTokenUserBalanceUSD = pairData.totalFirstTokenPrice * lpShare;
    let secondTokenUserBalanceUSD = pairData.totalSecondTokenPrice * lpShare;

    return {
      firstTokenSymbol: pairData.firstTokenSymbol,
      firstTokenBalance: firstTokenUserBalance,
      firstTokenBalanceUSD: firstTokenUserBalanceUSD,
      secondTokenSymbol: pairData.secondTokenSymbol,
      secondTokenBalance: secondTokenUserBalance,
      secondTokenBalanceUSD: secondTokenUserBalanceUSD,
    };
  }

  async findPNL(vault, strategy, targetToken, signer) {
    const addr = await this.signer.getAddress();
    let withdrawals = await vault.cumulativeWithdrawals(addr);
    withdrawals = ethers.utils.formatEther(withdrawals);
    let deposits = await vault.cumulativeDeposits(addr);
    deposits = ethers.utils.formatEther(deposits);
    let shares = await vault.balanceOf(addr);
    shares = ethers.utils.formatEther(shares);
    let ppFullShare = await vault.getPricePerFullShare();
    ppFullShare = ethers.utils.formatEther(ppFullShare);
    let vaultedLP = parseFloat(shares) * parseFloat(ppFullShare);
    let totalSystemLP = parseFloat(withdrawals) + vaultedLP;
    let profitLP = totalSystemLP - parseFloat(deposits);
    let lpInfo = await this.findAnyFantomPairData(strategy, targetToken);
    let profitLPShare = profitLP / lpInfo.totalLPSupply;
    let profitUSD = lpInfo.lpTotalValue * profitLPShare;
    return {
      profitInTokens: profitLP,
      profitInUSD: profitUSD,
      deposits: deposits,
      withdrawals: withdrawals,
    };
  }

  async getTvl(strategy, targetToken) {
    const jsonStuff = await this.findAnyFantomPairData(strategy, targetToken);
    const div = jsonStuff.strategySupply / jsonStuff.totalLPSupply;
    return div * jsonStuff.lpTotalValue;
  }

  async getUserLpValue(lps, strategy, targetToken) {
    const jsonStuff = await this.findAnyFantomPairData(strategy, targetToken);
    const div = parseFloat(lps) / jsonStuff.totalLPSupply;
    return div * jsonStuff.lpTotalValue;
  }

  async getPoolInfo(strategy, pid, targetToken) {
    let chef = await strategy.masterChef();
    let { perBlock, newChef, totalBalance } = await this.emissionPerSecond(
      chef,
      targetToken
    );
    let totalAllocPoint = await newChef.totalAllocPoint();
    let poolInfo = await newChef.poolInfo(pid);
    let info;
    if (
      chef === "0xbf513aCe2AbDc69D38eE847EFFDaa1901808c31c" ||
      chef === "0x59cC5f5F9309448Fe4a7Bd2dB8eB2DaC0F8fCEA7"
    ) {
      //popsicle check
      info = {
        poolAllocation: poolInfo[4],
        totalAllocation: totalAllocPoint.toNumber(),
        farmBalance: parseFloat(ethers.utils.formatEther(totalBalance)),
        emissionsPerSecond: parseFloat(ethers.utils.formatEther(perBlock)),
      };
    } else if (chef === "0xaEF349E1736b8A4B1B243A369106293c3a0b9D09") {
      info = {
        poolAllocation: ethers.utils.formatEther(poolInfo[1]),
        totalAllocation: ethers.utils.formatEther(totalAllocPoint),
        farmBalance: parseFloat(ethers.utils.formatEther(totalBalance)),
        emissionsPerSecond: parseFloat(ethers.utils.formatEther(perBlock)),
      };
    } else {
      info = {
        poolAllocation: poolInfo[1].toNumber(),
        totalAllocation: totalAllocPoint.toNumber(),
        farmBalance: parseFloat(ethers.utils.formatEther(totalBalance)),
        emissionsPerSecond: parseFloat(ethers.utils.formatEther(perBlock)),
      };
    }
    return info;
  }

  async emissionPerSecond(masterChefAddress, targetToken) {
    let perBlock;
    let totalBalance;
    let newChef = await this.MasterChef.attach(masterChefAddress);
    switch (masterChefAddress) {
      case "0x742474dAE70Fa2AB063aB786b1fBe5704e861a0c": //liquid
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.liquidChefAbi,
          this.signer
        );
        perBlock = await newChef.lqdrPerBlock();
        totalBalance = await targetToken.balanceOf(
          "0x742474dAE70Fa2AB063aB786b1fBe5704e861a0c"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093": //spirit
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.spiritChefAbi,
          this.signer
        );
        perBlock = await newChef.spiritPerBlock();
        totalBalance = await targetToken.balanceOf(
          "0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0x2b2929E785374c651a81A63878Ab22742656DcDd": //boo
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.spookyChefAbi,
          this.signer
        );
        perBlock = await newChef.booPerSecond();
        totalBalance = await targetToken.balanceOf(
          "0x2b2929E785374c651a81A63878Ab22742656DcDd"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0x90Df158ff7c31aD1d81ddDb1D8ab9d0eCBCeDa20": //hyper
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.hyperChefAbi,
          this.signer
        );
        perBlock = await newChef.oriPerSecond();
        totalBalance = await targetToken.balanceOf(
          "0x90Df158ff7c31aD1d81ddDb1D8ab9d0eCBCeDa20"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0xbf513aCe2AbDc69D38eE847EFFDaa1901808c31c": //ice
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.popsicleChefAbi,
          this.signer
        );
        perBlock = await newChef.icePerSecond();
        totalBalance = await targetToken.balanceOf(
          "0xbf513aCe2AbDc69D38eE847EFFDaa1901808c31c"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0xaEF349E1736b8A4B1B243A369106293c3a0b9D09": // waka
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.wakaChefAbi,
          this.signer
        );
        let block = await this.provider.getBlock();
        let blockNumber = block.timestamp;
        perBlock = await newChef.getTotalRewardInfo(
          blockNumber - 1,
          blockNumber
        );
        totalBalance = await targetToken.balanceOf(
          "0xaEF349E1736b8A4B1B243A369106293c3a0b9D09"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      case "0x59cC5f5F9309448Fe4a7Bd2dB8eB2DaC0F8fCEA7": //steak
        newChef = await new ethers.Contract(
          masterChefAddress,
          abis.steakChefAbi,
          this.signer
        );
        perBlock = await newChef.steakPerSecond();
        totalBalance = await targetToken.balanceOf(
          "0x59cC5f5F9309448Fe4a7Bd2dB8eB2DaC0F8fCEA7"
        );
        return {
          perBlock: perBlock,
          newChef: newChef,
          totalBalance: totalBalance,
        };
      default:
        return { perBlock: -1, newChef: newChef, totalBalance: -1 };
    }
  }

  async rewardTokenPairData(strategy, targetToken) {
    let reward = await strategy.rewardToken();
    let newStrat;
    let pairData;
    switch (reward) {
      case "0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE": //boo
        newStrat = strategy.attach(chainContracts.strategies.booStrat);
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      case "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9": //liquid
        newStrat = strategy.attach(chainContracts.strategies.liquidStrat);
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      case "0x5Cc61A78F164885776AA610fb0FE1257df78E59B": //spirit
        newStrat = strategy.attach(chainContracts.strategies.spiritStrat);
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      case "0xf16e81dce15B08F326220742020379B855B87DF9": //ice
        newStrat = await strategy.attach(
          chainContracts.strategies.iceStratSushi
        );
        let router = await newStrat.uniRouter();
        if (router === "0xF491e7B69E4244ad4002BC14e878a34207E38c29") {
          newStrat = await strategy.attach(
            chainContracts.strategies.iceStratSpooky
          );
        }
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      case "0xf61cCdE1D4bB76CeD1dAa9D4c429cCA83022B08B": //waka
        newStrat = await strategy.attach(chainContracts.strategies.wakaStrat);
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      case "0x05848B832E872d9eDd84AC5718D58f21fD9c9649": //steak
        newStrat = await strategy.attach(chainContracts.strategies.steakStrat);
        pairData = await this.findAnyFantomPairData(newStrat, targetToken);
        return pairData;
      default:
        return {
          fantomPrice: 0,
          otherTokenPrice: 0,
          lpTotalValue: 0,
          totalLPSupply: 0,
          strategySupply: 0,
        };
    }
  }
  async findOtherTokenBalance(otherAddress, lpTokenAddress) {
    let otherToken = await new ethers.Contract(
      otherAddress,
      abis.erc20abi,
      this.signer
    );
    let decimals = await otherToken.decimals();
    let otherBalance = await otherToken.balanceOf(lpTokenAddress);
    let stuff;

    if (decimals === 18) {
      stuff = ethers.utils.formatEther(otherBalance);
    } else {
      stuff = ethers.utils.formatUnits(otherBalance, decimals);
    }
    if (typeof stuff === "string") {
      return parseFloat(stuff);
    }
    return stuff;
  }

  async getTotalSupply(targetToken) {
    let lpBalance = await targetToken.totalSupply();
    return parseFloat(ethers.utils.formatEther(lpBalance));
  }

  async getStrategyLPSupply(strategy) {
    let lpStrategyBalance = await strategy.balanceOf();
    let scrubbedLpStrategyBalance = parseFloat(
      ethers.utils.formatEther(lpStrategyBalance)
    );
    return scrubbedLpStrategyBalance;
  }

  async _getLPAndTokensUnderlying(reaperAutoCompound) {
    const _lpToken = await reaperAutoCompound.lpPair();
    const _token0 = await reaperAutoCompound.lpToken0();
    const _token1 = await reaperAutoCompound.lpToken1();
    return [_lpToken, _token0, _token1];
  }

  /*
   *  little trick how to get price of fantom in dollar
   *  using usdc stable coin
   *  get some FTM / USDC LP Pair -> there should be always
   *  same dollar value of both pairs. And we know that usdc
   *  has dollar value of 1
   * Algorithm.
   *  get how many FTM are in that LP pair vault
   *  get how many USDC are in that LP pair vault
   *  find a ratio - how many ftms are needed for that
   *  many dollars - and thats a price
   */
  async findFantomUSDPrice() {
    let fantomHalfSpooky = await this.fantom.balanceOf(
      chainContracts.spookyStableLP
    );
    //ftm got 18 decimals
    let scrubbedFantomHalfSpooky = ethers.utils.formatEther(fantomHalfSpooky);
    let usdcHalfSpooky = await this.usdc.balanceOf(
      chainContracts.spookyStableLP
    );
    //usdc got only 6 - method decimals in contract
    let scrubbedUsdcHalfSpooky = ethers.utils.formatUnits(usdcHalfSpooky, 6);
    let price =
      parseFloat(scrubbedUsdcHalfSpooky) / parseFloat(scrubbedFantomHalfSpooky);
    return price;
  }

  async findFantomDollarFactor() {
    const _fantomPrice = await this.findFantomUSDPrice();
    return 1 / _fantomPrice;
  }
}

class etherUtils {
  constructor(metamask) {
    this.metamask = metamask;
    this.provider = this.metamask.currentProvider;
    this.PAIN =
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    this.ERROR_CODE_TX_REJECTED_BY_USER = 4001;
  }

  async init() {
    try {
      const signer = provider.getSigner(0);
      const addr = await signer.getAddress();
      //   dispatch({ type: "walletAddress", content: addr });
      const checkNet = window.ethereum.networkVersion === "250";
      //   dispatch({ type: "onFantomNetwork", content: checkNet });
    } catch (error) {
      return;
    }
  }

  async approveSpend(reaperVault, targetToken) {
    try {
      const maxAllowance = this.PAIN;
      const tx = await targetToken.approve(reaperVault.address, maxAllowance);
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      } else if (receipt.status === 1) {
        this.approved = true; //setApproved(true);
        return this.approved;
      }
    } catch (error) {
      if (error.code === this.ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }

  async approveReset(reaperVault, targetToken) {
    try {
      const tx = await targetToken.approve(reaperVault.address, 0);
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      } else if (receipt.status === 1) {
        this.approved = false; //setApproved(false);
        return this.approved;
      }
    } catch (error) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }

  async checkApproval(reaperVault, targetToken) {
    //this.provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const signer = this.provider.getSigner(0);
      const addr = await signer.getAddress();
      const uinteger = await targetToken.allowance(addr, reaperVault.address);

      if (uinteger._hex !== ethers.BigNumber.from("0x00")._hex) {
        this.approved = true; //setApproved(true);
      } else {
        this.approved = false; //setApproved(false);
      }
      return this.approved;
    } catch (error) {
      if (error.code === this.ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }

  async checkDepositMaxPotential(targetToken, setInputMax) {
    try {
      const signer = this.provider.getSigner(0);
      const addr = await signer.getAddress();
      let balance = await targetToken.balanceOf(addr);
      balance = ethers.utils.formatEther(balance);
      return balance; //setInputMax(balance);
    } catch (error) {
      if (error.code === this.ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }

  async checkWithdrawMaxPotential(reaperVault, setInputMax) {
    try {
      const signer = this.provider.getSigner(0);
      const addr = await signer.getAddress();
      /*
    let ppFullShare = await reaperVault.getPricePerFullShare();
    ppFullShare = ethers.utils.formatEther(ppFullShare);
    */
      let balance = await reaperVault.balanceOf(addr);
      balance = ethers.utils.formatEther(balance);
      /*
    const underlyingValue = ppFullShare * balance;
    const finalValue = ethers.utils.formatEther(parseInt(underlyingValue.toString()));
    console.log(finalValue);
    */
      return balance; //setInputMax(balance);
    } catch (error) {
      if (error.code === this.ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }
    }
  }
}
