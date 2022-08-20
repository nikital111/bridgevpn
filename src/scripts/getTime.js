const abi = require('../abi.json');

export default async function getTime(web3,contractAddress) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const start = await MyContract.methods.timeToStartSales().call({from:acc});
    const end = await MyContract.methods.timeToStopSales().call({from:acc});

   // console.log(tokens);

    return [start*1000,end*1000];
}