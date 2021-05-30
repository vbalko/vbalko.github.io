const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send("eth_requestAccounts");

    window.web3 = new Web3(window.ethereum);

    return true;
  }

  return false;
};

if (!ethEnabled()) {
  alert("Please install MetaMask to use this dApp!");
} else {
  alert("Metamask ok");
}
