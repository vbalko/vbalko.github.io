const ethEnabled = async () => {
  if (window.ethereum) {
    await window.ethereum.send("eth_requestAccounts");

    window.web3 = new Web3(window.ethereum);

    return true;
  }

  return false;
};

const initMetamask = () => {
  if (!ethEnabled()) {
    alert("Please install MetaMask to use this dApp!");
  } else {
    //$("#toast").removeClass("hidden");
    //alert("Metamask ok");
      showToast('Metamask connected!',2500);
  }
};

const initWalletInfo = () => {
    const network = web3tools.getNetwork();
    console.log(`Network: ${network}`);
    $("#lbl_network").html("11");
}

const showToast = (text,timeout) => {
    $('#toast').html(text);
    $('#toast').removeClass('hidden');
    window.setTimeout(() => {
        $('#toast').addClass('hidden');
    }, timeout);
};

const web3tools = {
    getNetwork: () => {
        const id = window.web3.net.getId();
        let name = "";
        if (id == "250") {
            name = `Fantom Opera (${id})`;
        } else {
            name = `Other network (${id})`;
        }
        return name;
    }
};