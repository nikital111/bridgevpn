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
const contractAddress = "0x4E117b36127D85255AF49A758c2a4766cC017433";
const BUSDaddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
let timer;
let myWeb3;
function App() {
  const [state, setState] = useState({
    wallet: '',
    min: 0,
    max: 0,
    totalSupply: 0,
    maxSupply: 0,
    start: 0,
    end: 0
  });
  const [lang, setLang] = useState('ru');
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

  const changeModal = (name, bool) => {
    setModal({ ...modal, [name]: bool });
  };

  const changeLang = (l) => {
    setLang(l);
    document.documentElement.lang = l;
  };

  const connectWallet = async () => {
    try {
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
        cacheProvider: false, 
        providerOptions 
      });

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
            wallet: '',
            min: 0,
            max: 0,
            totalSupply: 0,
            maxSupply: 0,
            start: 0,
            end: 0
          }
        );
        myWeb3 = new Web3();
      });

      provider.on("accountsChanged", async (accounts) => {
        if (accounts[0]) {
          const [start, end] = await getTime(myWeb3, contractAddress);
          const [min, max] = await getMinMax(myWeb3, contractAddress);
          const [totalSupply, maxSupply] = await getSupply(myWeb3, contractAddress);
          const balance = await getBalance(myWeb3, contractAddress);

          setState({
            wallet: accounts[0],
            balance: balance,
            min: min,
            max: max,
            totalSupply: totalSupply,
            maxSupply: maxSupply,
            start: start,
            end: end
          });
        }
        else {
          changeModal('popupChain', false);
          setState(
            {
              wallet: '',
              min: 0,
              max: 0,
              totalSupply: 0,
              maxSupply: 0,
              start: 0,
              end: 0
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
      wallet: '',
      balance: 0,
      min: 0,
      max: 0,
      totalSupply: 0,
      maxSupply: 0,
      start: 0,
      end: 0
    });
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
      if (approved >= amount) BuyTokens(myWeb3, contractAddress, amount);
      else changeModal('popupApprove', true);
    }
    catch (err) {
      console.log(err);
      changeModal('canceledPurchase', true);
    }
  };

  const init = async (web3) => {
    const [start, end] = await getTime(web3, contractAddress);
    const [acc] = await web3.eth.getAccounts();
    const [min, max] = await getMinMax(web3, contractAddress);
    const [totalSupply, maxSupply] = await getSupply(web3, contractAddress);
    const balance = await getBalance(web3, contractAddress);

    setState({
      wallet: acc,
      balance: balance,
      min: min,
      max: max,
      totalSupply: totalSupply,
      maxSupply: maxSupply,
      start: start,
      end: end
    })
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
    }, 1000)

  };

  const t = (word) => {
    return translate[lang][word];
  };

  const changeAmount = (val) => {
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
