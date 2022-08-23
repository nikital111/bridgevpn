const abi = require('../abi.json');

export default async function getSupply(web3,contractAddress) {


    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const totalSupply = await MyContract.methods.totalSupply().call();
    const maxSupply = await MyContract.methods.MAX_SUPPLY().call();

    return [totalSupply/100,maxSupply/100];
}