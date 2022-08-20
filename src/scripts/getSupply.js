const abi = require('../abi.json');

export default async function getSupply(web3,contractAddress) {
    const [acc] = await web3.eth.getAccounts();

    const MyContract = new web3.eth.Contract(abi,contractAddress);

    const totalSupply = await MyContract.methods.totalSupply().call({from:acc});
    const maxSupply = await MyContract.methods.MAX_SUPPLY().call({from:acc});

   // console.log(tokens);

    return [totalSupply/100,maxSupply/100];
}