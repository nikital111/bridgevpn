const abi = require('../config/abi.json');

export default async function BuyTokens(web3, contractAddress, value, callback) {
    const [acc] = await web3.eth.getAccounts();

    let st = value.toString();
    let myValue = web3.utils.toWei(st);

    const MyContract = new web3.eth.Contract(abi, contractAddress);

    MyContract.methods.purchase(myValue).send({ from: acc })
        .on('transactionHash', function (hash) {
            console.log(hash, ' hash')
        })
        .on('receipt', function (receipt) {
            callback();
            console.log(receipt, ' receipt');
        })
        .on('error', console.error);
}