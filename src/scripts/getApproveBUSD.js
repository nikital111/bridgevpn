const abi = require('../config/abiBUSD.json');

export default async function getApproveBUSD(web3, contractAddress, target) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(abi, contractAddress);

    const res = await MyContract.methods.allowance(acc, target).call({ from: acc });

    return res / 10 ** 18;
}