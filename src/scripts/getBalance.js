const abi = require('../abi.json');

export default async function getBalance(web3,contractAddress) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const balance = await MyContract.methods.balanceOf(acc).call({from:acc});

   // console.log(tokens);

    return balance/100;
}