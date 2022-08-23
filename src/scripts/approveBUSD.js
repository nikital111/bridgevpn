const abi = require('../config/abiBUSD.json');

export default async function approveBUSD(web3, contractAddress, value, target, callback) {
    const [acc] = await web3.eth.getAccounts();

    let st = value.toString();
    let myValue = web3.utils.toWei(st);

    const MyContract = new web3.eth.Contract(abi, contractAddress);

    MyContract.methods.approve(target, myValue).send({ from: acc })
        .on('transactionHash', function (hash) {
            console.log(hash, ' hash')
        })
        .on('receipt', function (receipt) {
            callback('popupApprove', false);
            console.log(receipt, ' receipt');
        })
        .on('error', console.error);
}