const web3 = new Web3(window.ethereum || window.web3.currentProvider);
let userAddress = "";
const recipientAddress = "0xE34f9f6e66E8d90798D362aF119d783c31425Fe6"; // Recipient's wallet address
const usdtContractAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT contract address on BSC
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
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
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

async function buyTokens() {
  const paymentMethod = document.getElementById("paymentMethod").value;
  const tokenAmount = document.getElementById("tokenAmount").value;
  const paymentStatus = document.getElementById("paymentStatus");

  if (!userAddress) {
    alert("Please connect your wallet first!");
    return;
  }

  if (paymentMethod === "bnb") {
    sendBNB(tokenAmount);
  } else if (paymentMethod === "usdt") {
    sendUSDT(tokenAmount);
  } else {
    alert("Please select a valid payment method!");
  }
}

async function sendBNB(tokenAmount) {
  const paymentStatus = document.getElementById("paymentStatus");
  try {
    const valueInWei = web3.utils.toWei(tokenAmount, "ether");
    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await web3.eth.estimateGas({
      from: userAddress,
      to: recipientAddress,
      value: valueInWei,
    });

    await web3.eth.sendTransaction({
      from: userAddress,
      to: recipientAddress,
      value: valueInWei,
      gasPrice: gasPrice,
      gas: estimatedGas,
    });
    // Redirect to paymentStatus.html on successful transaction
    window.location.href = `paymentStatus.html?status=success&address=${userAddress}&amount=${tokenAmount}&hash=${receipt.transactionHash}`;
  } catch (error) {
    console.error(error);
    // Redirect to paymentStatus.html on failed transaction
    window.location.href = `paymentStatus.html?status=failure&address=${userAddress}&amount=${tokenAmount}`;
  }
}

async function sendUSDT(tokenAmount) {
  const paymentStatus = document.getElementById("paymentStatus");
  try {
    const valueInWei = web3.utils.toWei(tokenAmount, "ether"); // USDT uses 18 decimal places
    const gasPrice = await web3.eth.getGasPrice();
    const estimatedGas = await usdtContract.methods
      .transfer(recipientAddress, valueInWei)
      .estimateGas({ from: userAddress });

    await usdtContract.methods.transfer(recipientAddress, valueInWei).send({
      from: userAddress,
      gasPrice: gasPrice,
      gas: estimatedGas,
    });
    // Redirect to paymentStatus.html on successful transaction
    window.location.href = `paymentStatus.html?status=success&address=${userAddress}&amount=${tokenAmount}&hash=${receipt.transactionHash}`;
  } catch (error) {
    console.error(error);
    // Redirect to paymentStatus.html on failed transaction
    window.location.href = `paymentStatus.html?status=failure&address=${userAddress}&amount=${tokenAmount}`;
  }
}
