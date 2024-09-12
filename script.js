const web3 = new Web3(window.ethereum || window.web3.currentProvider);
let userAddress = "";
//const recipientAddress = "0xE34f9f6e66E8d90798D362aF119d783c31425Fe6"; // Recipient's wallet address
const recipientAddress = getElementById("recepientAddress").value;
const usdtContractAddress = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"; // USDT contract address on BSC
const usdtABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
]; // USDT contract ABI
const usdtContract = new web3.eth.Contract(usdtABI, usdtContractAddress);

async function connectWallet() {
  if (
    typeof window.ethereum !== "undefined" ||
    typeof window.web3 !== "undefined"
  ) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      userAddress = accounts[0];

      const connectButton = document.querySelector(".btn-secondary");
      connectButton.textContent = "Connected";
      connectButton.classList.remove("btn-secondary");
      connectButton.classList.add("btn-success");

      console.log("Connected account:", userAddress);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function redirectToPaymentStatus(status, address, amount, hash) {
  // Store the transaction details in sessionStorage
  sessionStorage.setItem("transactionStatus", status);
  sessionStorage.setItem("userAddress", address);
  sessionStorage.setItem("amountSent", amount);
  sessionStorage.setItem("transactionHash", hash);

  // Redirect to the payment status page
  window.location.href = "paymentStatus.html";
}

async function buyTokens() {
  const paymentMethod = usdt;
  const tokenAmount = document.getElementById("tokenAmount").value;

  if (!userAddress) {
    alert("Please connect your wallet first!");
    return;
  }

  try {
    if (paymentMethod === "bnb") {
      const receipt = await sendBNB(tokenAmount);
      redirectToPaymentStatus(
        "success",
        userAddress,
        tokenAmount,
        receipt.transactionHash
      );
    } else if (paymentMethod === "usdt") {
      const receipt = await sendUSDT(tokenAmount);
      redirectToPaymentStatus(
        "success",
        userAddress,
        tokenAmount,
        receipt.transactionHash
      );
    } else {
      throw new Error("Please select a valid payment method!");
    }
  } catch (error) {
    redirectToPaymentStatus(
      "failed",
      userAddress,
      tokenAmount,
      "",
      error.message
    );
  }
}

async function sendBNB(tokenAmount) {
  try {
    const valueInWei = web3.utils.toWei(tokenAmount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await web3.eth.estimateGas({
      from: userAddress,
      to: recipientAddress,
      value: valueInWei,
    });

    const receipt = await web3.eth.sendTransaction({
      from: userAddress,
      to: recipientAddress,
      value: valueInWei,
      gasPrice: gasPrice,
      gas: estimatedGas,
    });
    return receipt;
  } catch (error) {
    console.error(error);
    throw new Error("Insufficient Balance! Failed to purchase using BNB.");
  }
}

async function sendUSDT(tokenAmount) {
  try {
    const valueInWei = web3.utils.toWei(tokenAmount, "ether"); // USDT uses 18 decimal places
    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await usdtContract.methods
      .transfer(recipientAddress, valueInWei)
      .estimateGas({ from: userAddress });

    const receipt = await usdtContract.methods
      .transfer(recipientAddress, valueInWei)
      .send({
        from: userAddress,
        gasPrice: gasPrice,
        gas: estimatedGas,
      });

    // Redirect to paymentStatus.html on successful transaction
    return receipt;
  } catch (error) {
    console.error(error);
    throw new Error("Insufficient Balance! Failed to purchase using USDT.");
  }
}
