import './App.css';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { Routes, Route } from "react-router-dom";
import Header from './Static/Header';
import Documentation from './Pages/Documentation';
import Faq from './Pages/Faq';
import HomeLogin from './Pages/HomeLogin';
import getTime from './scripts/getTime';
import translate from "./lang/translate.json";
import getMinMax from './scripts/getMinMax';
import getSupply from './scripts/getSupply';
import getBalance from './scripts/getBalance';
import BuyTokens from './scripts/buyTokens';
import approveBUSD from './scripts/approveBUSD';
import getApproveBUSD from './scripts/getApproveBUSD';
import { setCounterData } from "./scripts/script";
import Cookies from 'js-cookie';
import { CONTRACT_ADDRESS, BUSD_ADDRESS } from './config/consts';

const contractAddress = CONTRACT_ADDRESS;
const BUSDaddress = BUSD_ADDRESS;

let timer;
let myWeb3;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://capable-divine-knowledge.bsc.discover.quiknode.pro/334922ca23326f3194def4af7df85732b7e2e697/",
      },
    }

  }
};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});


function App() {

  useEffect(() => {
    firstInit();
  }, []);



  const firstInit = async () => {

    if (Cookies.get('lang')) {
      setLang(Cookies.get('lang'));
      document.documentElement.lang = Cookies.get('lang');
    }

    console.log(web3Modal.cachedProvider)
    if (web3Modal.cachedProvider) {
      const provider = await web3Modal.connect();
      myWeb3 = new Web3(provider);
    }
    else {
      myWeb3 = new Web3(Web3.givenProvider || "https://capable-divine-knowledge.bsc.discover.quiknode.pro/334922ca23326f3194def4af7df85732b7e2e697/");
    }

    let acc = '';
    let balance = 0;

    if (web3Modal.cachedProvider) {
      [acc] = await myWeb3.eth.getAccounts();
      balance = await getBalance(myWeb3, contractAddress);
    }

    const [start, end] = await getTime(myWeb3, contractAddress);
    const [min, max] = await getMinMax(myWeb3, contractAddress);
    const [totalSupply, maxSupply] = await getSupply(myWeb3, contractAddress);


    setState({
      wallet: acc,
      balance: balance,
      totalSupply: totalSupply,
      maxSupply: maxSupply,
      start: start,
      end: end,
      min: min,
      max: max
    });



    let time = 0;
    if (Date.now() < start) {
      time = (start - Date.now()) / 1000;
    }
    if (Date.now() < end && Date.now() > start) {
      time = (end - Date.now()) / 1000;
    }
    if (Date.now() > end) {
      time = 0;
    }
    setCounterData(time);
    clearInterval(timer);
    timer = setInterval(() => {
      if (time <= 1) {
        clearInterval(timer);
      }
      time--;
      setCounterData(time);
    }, 1000);
  };

  const [state, setState] = useState({
    wallet: '',
    balance: 0,
    min: 0,
    max: 0,
    totalSupply: 0,
    maxSupply: 0,
    start: 0,
    end: 0
  });
  const [lang, setLang] = useState('ru');
  const [buyed, setBuyed] = useState(0);
  const [amount, setAmount] = useState('');
  const [modal, setModal] = useState({
    errorAgreement: false,
    popupAgreement: false,
    exit: false,
    tokenMore: false,
    tokenLess: false,
    canceledPurchase: false,
    errorEndSale: false,
    tokenEmpty: false,
    notStartedSale: false,
    successPurchase: false,
    popupApprove: false,
    popupChain: false
  });

  useEffect(() => {
    console.log(state);
  }, [state])

  const changeModal = (name, bool) => {
    setModal({ ...modal, [name]: bool });
  };

  const changeLang = (l) => {
    Cookies.set('lang', l, { path: '/', sameSite: 'strict', expires: 360000 });
    setLang(l);
    document.documentElement.lang = l;
  };

  const connectWallet = async () => {
    try {

      const provider = await web3Modal.connect();
      myWeb3 = new Web3(provider);

      if (provider.chainId !== '0x38' && provider.chainId !== 56) {
        if (typeof (provider.chainId) === 'string') {
          changeModal('popupChain', true);
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: '0x38',
              },
            ],
          });
        }
        else {
          changeModal('popupChain', true);
        }
      }

      provider.on("disconnect", async (code, reason) => {
        console.log(code, reason);
        changeModal('popupChain', false);
        setState(
          {
            ...state,
            wallet: '',
            balance: 0,
          }
        );
        setAmount('');
        myWeb3 = new Web3();
        web3Modal.clearCachedProvider();
      });

      provider.on("accountsChanged", async (accounts) => {
        if (accounts[0]) {
          // const [start, end] = await getTime(myWeb3, contractAddress);
          // const [min, max] = await getMinMax(myWeb3, contractAddress);
          // const [totalSupply, maxSupply] = await getSupply(myWeb3, contractAddress);
          const balance = await getBalance(myWeb3, contractAddress);

          setState({
            ...state,
            wallet: accounts[0],
            balance: balance,
          });
        }
        else {
          changeModal('popupChain', false);
          setState(
            {
              ...state,
              wallet: '',
              balance: 0
            }
          );
          myWeb3 = new Web3();
        }
      });



      provider.on("chainChanged", (chainId) => {
        if (chainId !== '0x38') {
          requestChangeChain(provider);
          changeModal('popupChain', true);
        }
        else changeModal('popupChain', false);
      });

      init(myWeb3);
    }
    catch (err) {
      console.log(err)
    }
  }

  const requestChangeChain = async (provider) => {

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x38',
        },
      ],
    });

  };

  const dis = async () => {
    myWeb3 = new Web3();
    setState({
      ...state,
      wallet: '',
      balance: 0
    });
    setAmount('');
    web3Modal.clearCachedProvider();
  };

  const buyTokens = async () => {
    if (!amount) {
      changeModal('tokenEmpty', true);
      return;
    }
    if (+amount < state.min) {
      changeModal('tokenLess', true);
      return;
    }
    if (+amount > state.max) {
      changeModal('tokenMore', true);
      return;
    }
    if (Date.now() < state.start) {
      changeModal('notStartedSale', true);
      return;
    }
    if (Date.now() > state.end) {
      changeModal('errorEndSale', true);
      return;
    }
    try {
      const approved = await getApproveBUSD(myWeb3, BUSDaddress, contractAddress);
      if (approved >= amount) {
        setBuyed(amount);
        BuyTokens(myWeb3, contractAddress, amount, succBuy);
      }
      else changeModal('popupApprove', true);
    }
    catch (err) {
      console.log(err);
      changeModal('canceledPurchase', true);
    }
  };

  const succBuy = async () => {
    changeModal('successPurchase', true);

    setAmount('');

    const [totalSupply, maxSupply] = await getSupply(myWeb3, contractAddress);
    const balance = await getBalance(myWeb3, contractAddress);

    setState({
      ...state,
      balance: balance,
      totalSupply: totalSupply,
      maxSupply: maxSupply,
    });
  };

  const init = async (web3) => {
    const [acc] = await web3.eth.getAccounts();
    const balance = await getBalance(web3, contractAddress);

    setState({
      ...state,
      wallet: acc,
      balance: balance,
    });

  };

  const t = (word) => {
    return translate[lang][word];
  };

  const changeAmount = (val) => {
    let arr = val.split('');
    let letters = /^[0-9\.]+$/;
    let index = arr.indexOf('.');
    let count = 0;
    let countAfter = arr.length - index;
    for (let i = 0; i <= arr.length; i++) {
      if (arr[i] === '.') count++;
    }

    if ((count > 1 || countAfter > 3) && index !== -1) {
      return;
    }

    if (!val.match(letters) && val.length > 0) {
      return;
    }

    if (+val < 0) {
      setAmount(0);
    }
    else {
      setAmount(val)
    }
  };

  return (
    <>
      <div id="popup" className={`popup agreement ${modal.popupChain ? "open" : ''}`}>
        <div className="popup__body">
          <div className="popup__content">
            <div className="popup__title" style={{ margin: '0' }}>{t('popChain')}</div>
            <div className="popup__text" style={{ margin: '0' }}>
              {/* <p>{t('popRules1')}</p> */}
            </div>
          </div>
        </div>
      </div>
      <Header changeLang={changeLang} lang={lang} t={t} />
      <Routes>
        {
          state.wallet
            ?
            <Route
              path="/"
              element={
                <HomeLogin
                  web3={myWeb3}
                  t={t}
                  changeModal={changeModal}
                  modal={modal}
                  dis={dis}
                  buyTokens={buyTokens}
                  amount={amount}
                  changeAmount={changeAmount}
                  state={state}
                  approveBUSD={approveBUSD}
                  buyed={buyed}
                  setBuyed={setBuyed}
                />}>
            </Route>
            :
            <Route
              path="/"
              element={
                <Home
                  web3={myWeb3}
                  connectWallet={connectWallet}
                  t={t}
                  changeModal={changeModal}
                  modal={modal}
                  state={state}
                />}>
            </Route>
        }


        <Route
          path="/documentation"
          element={
            <Documentation t={t} />
          }>
        </Route>

        <Route
          path="/faq"
          element={
            <Faq t={t} />
          }>
        </Route>

      </Routes>
    </>
  );
}

export default App;
