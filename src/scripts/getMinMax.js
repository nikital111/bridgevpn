const abi = require('../abi.json');

export default async function getMinMax(web3,contractAddress) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const max = await MyContract.methods.max_purchase().call({from:acc});
    const min = await MyContract.methods.min_purchase().call({from:acc});

   // console.log(tokens);

    return [min/100,max/100];
}