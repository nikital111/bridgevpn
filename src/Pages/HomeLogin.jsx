import '../index.css';
import Logo from "../images/logo.svg";
import Copy from "../images/copy.png";
import Exit from "../images/exit.png";
import { useEffect } from 'react';
import Timer from '../Components/Timer';
import Money from '../Components/Money';
import { TOKEN_NAME } from '../config/consts';
const contractAddress = "0x4E117b36127D85255AF49A758c2a4766cC017433";
const BUSDaddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";

function HomeLogin({ web3, t, changeModal, modal, dis, buyTokens, amount, changeAmount, state, approveBUSD, buyed, setBuyed }) {
    useEffect(() => {
        const part = (state.totalSupply / state.maxSupply) * 100;
        const st = part.toString();
        const bar = document.querySelector('.content__money__bar');
        bar.style.setProperty('--sq-width', st + '%')
    }, [])

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
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >{formatAddress(state.wallet)}
                                    <div className='tooltip'>
                                        <img src={Copy} onClick={() => copyText(state.wallet)} style={{ width: '20px', marginLeft: '5px', cursor: 'pointer' }} />
                                        <span className="tooltiptext">{t('copy')}</span>
                                    </div>
                                    <div className='tooltip'>
                                        <img src={Exit} onClick={() => changeModal('exit', true)} style={{ width: '20px', marginLeft: '5px', cursor: 'pointer' }} />
                                        <span className="tooltiptext">{t('exit')}</span>
                                    </div>
                                </a>
                            </div>
                            <p className="content__info__balance">Ваш баланс <span className="content__info__balance-total"><span className="amount"></span>{state.balance} {TOKEN_NAME}</span></p>
                        </div>
                    </div>
                </div>
                <Timer t={t} state={state} />
                <div className="container">
                    <div className="content__buy">
                        <input className="content__buy__input" placeholder="100.00" value={amount} onChange={(e) => changeAmount(e.target.value)} />
                        <div className="content__buy_available"><p>Доступно для покупки <span className="amount"></span>{state.maxSupply - state.totalSupply} МТМКМ</p></div>
                        <button className="content__buy__button" onClick={buyTokens}>{t('buy')}</button>
                    </div>
                </div>
                <Money t={t} state={state} />
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
                            <p>{t('popSuccess')} {buyed} токенов</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                                onClick={() => {
                                    changeModal('successPurchase', false);
                                    setBuyed(0);
                                }}
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
                                justifyContent: 'center'
                            }}
                        >
                            <button className="popup__button__agree"
                                onClick={() => {
                                    approveBUSD(web3, BUSDaddress, amount, contractAddress, changeModal);
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
