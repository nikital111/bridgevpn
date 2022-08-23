const abi = require('../abi.json');

export default async function getMinMax(web3,contractAddress) {

    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const max = await MyContract.methods.max_purchase().call();
    const min = await MyContract.methods.min_purchase().call();

   // console.log(tokens);

    return [min/100,max/100];
}