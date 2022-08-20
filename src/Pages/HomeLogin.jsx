import '../index.css';
import Logo from "../images/logo.svg";
import Copy from "../images/copy.png";
import Exit from "../images/exit.png";
import { useEffect } from 'react';
const contractAddress = "0x4E117b36127D85255AF49A758c2a4766cC017433";
const BUSDaddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

function HomeLogin({ web3, t, changeModal, modal, dis, buyTokens,amount, changeAmount, state, approveBUSD }) {
    useEffect(()=>{
        const part = (state.totalSupply/state.maxSupply)*100;
        const st = part.toString();
        const bar = document.querySelector('.content__money__bar');
        bar.style.setProperty('--sq-width', st+'%')
    },[])

    const formatAddress = (address) => {
        let formatAddress = address.split('');
        formatAddress.splice(5, 33, '.', '.', '.');
        let res = formatAddress.join('');
        return res;
      }

      const copyText = (text) => {
        navigator.clipboard.writeText(text);
      }
    return (
        <>
            <main className="content">
                <div className="container">
                    <div className="content__hero">
                        <img src={Logo} width="244" height="145" title="Logo" alt="Logo" />
                        <div className="content__info">
                            <div className="content__info__address">
                                <a className="popup-link"
                                    style={{
                                        display:'flex',
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                >{formatAddress(state.wallet)} 
                                <img src={Copy} onClick={() => copyText(state.wallet)} style={{width:'20px',marginLeft:'5px',cursor:'pointer'}}/>
                                <img src={Exit} onClick={() => changeModal('exit', true)} style={{width:'20px',marginLeft:'5px',cursor:'pointer'}}/>
                                </a>
                            </div>
                            <p className="content__info__balance">Ваш баланс <span className="content__info__balance-total"><span className="amount"></span>{state.balance} токенов</span></p>
                        </div>
                    </div>
                </div>
                <div className="content__highliter-fluid">
                    <div className="container">
                        <div className="content__counter">
                            <p className="content__timer__heading heading">
                                {
                                    Date.now() < state.start ? t('startAfter') : t('endAfter')
                                }
                        :</p>
                            <div className="content__timer">
                                <div className="days">
                                    <div className="amount">00</div>
                                    <div className="signature">{t('day')}</div>
                                </div>
                                <div className="hours">
                                    <div className="amount">00</div>
                                    <div className="signature">{t('hour')}</div>
                                </div>
                                <div className="minutes">
                                    <div className="amount">00</div>
                                    <div className="signature">{t('min')}</div>
                                </div>
                                <div className="seconds">
                                    <div className="amount">00</div>
                                    <div className="signature">{t('sec')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="content__buy">
                        <input type="number" className="content__buy__input" placeholder="100.00" value={amount} onChange={(e) => changeAmount(e.target.value)} />
                        <div className="content__buy_available"><p>Доступно для покупки <span className="amount"></span>{state.maxSupply - state.totalSupply} МТМКМ</p></div>
                        <button className="content__buy__button" onClick={buyTokens}>{t('buy')}</button>
                    </div>
                </div>
                <div className="content__highliter-fluid">
                    <div className="container">
                        <div className="content__money">
                            <p className="content__money__heading heading">{t('collected')} {state.totalSupply}<span className="amount"></span> BUSD, {t('left')} {state.maxSupply - state.totalSupply}<span className="amountLeft"></span>&nbsp;МТМКМ:</p>
                            <div className="content__money__collected">
                                <div className="content__money__bar"
                                ></div>
                            </div>
                            <div className="content__money__goals">
                                <div className="content__money__goal_min">
                                    <p>{t('minimal')}</p>
                                    <p className="goal">Soft Cap</p>
                                </div>
                                <div className="content__money__goal_max">
                                    <p>{t('max')}</p>
                                    <p className="goal">Hard Cap</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div id="popupTurnOffWallet" className={`popup notification ${modal.exit ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <a className="popup__close closeSymbol"
                            onClick={() => changeModal('exit', false)}
                            style={{
                                cursor: 'pointer'
                            }}
                        ><span></span></a>
                        <div className="popup__title">{t('popExit')}</div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => {
                                    dis();
                                    changeModal('exit', false);
                                }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorTokenMore" className={`popup notification error ${modal.tokenMore ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popMoreTokens')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('tokenMore', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorTokenLess" className={`popup notification error ${modal.tokenLess ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popMinTokens')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('tokenLess', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorCanceledPurchase" className={`popup notification error ${modal.canceledPurchase ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popCancel')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('canceledPurchase', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorEndSale" className={`popup notification error ${modal.errorEndSale ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popEnd')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('errorEndSale', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorTokenEmpty" className={`popup notification error ${modal.tokenEmpty ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popEmpty')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('tokenEmpty', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorNotStartedSale" className={`popup notification error ${modal.notStartedSale ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popNotStart')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('notStartedSale', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popupErrorSuccessPurchase" className={`popup notification success ${modal.successPurchase ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popSuccess')} 586.14&nbsp;токенов</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => { changeModal('successPurchase', false) }}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popup" className={`popup agreement ${modal.popupApprove ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <a
                            className="popup__close closeSymbol"
                            onClick={() => changeModal('popupApprove', false)}
                            style={{
                                cursor: 'pointer'
                            }}
                        ><span></span></a>
                        <div className="popup__title">{t('popApprove')}</div>
                        <div className="popup__text">
                            {/* <p>{t('popRules1')}</p> */}
                        </div>
                        <div className="popup__agreement"
                        style={{
                            justifyContent:'center'
                        }}
                        >
                            <button className="popup__button__agree"
                            onClick={() => {
                                approveBUSD(web3,BUSDaddress,amount,contractAddress,changeModal);
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                            ><span>{t('approve')}</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeLogin;
