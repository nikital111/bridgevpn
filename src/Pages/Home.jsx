import '../index.css';
import Logo from "../images/logo.svg";
import { useState } from 'react';
// import "../scripts/main.js";
// import "../scripts/modal.js";

function Home({ web3, connectWallet, t, changeModal, modal }) {

    const [checkedRules,setCheckedRules] = useState(false);
    const check = ()=>{
        setCheckedRules(!checkedRules);
    };

    return (
        <>
            <main className="content">
                <div className="container">
                    <div className="content__hero">
                        <img src={Logo} width="244" height="145" title="Logo" alt="Logo" />
                    </div>
                </div>
                <div className="content__highliter-fluid">
                    <div className="container">
                        <div className="content__counter">
                            <p className="content__timer__heading heading">{t('startAfter')}:</p>
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
                    <div className="content__connect__wallet">
                        <button className="content__connect__button" onClick={()=>{
                            if(!checkedRules){
                                changeModal('errorAgreement', true);
                            }
                            else{
                                connectWallet();
                            }
                        }}>{t('connectW')}</button>
                        <div className="content__connect__terms">
                            <div className="content__connect__terms__checkbox">
                                <input type="checkbox" id="accept-privacy" checked={checkedRules} onChange={check}/>
                                <label htmlFor="accept-privacy"></label>
                            </div>
                            <div className="content__connect__terms__text">
                                <p>{t('accept')} <a className="popup-link" 
                                onClick={() => changeModal('popupAgreement', true)}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                >{t('rules')}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content__highliter-fluid content__highliter-fluid-last">
                    <div className="container">
                        <div className="content__money">
                            <p className="content__money__heading heading">{t('collected')} <span className="amount"></span> BUSD, {t('left')} <span className="amountLeft"></span>&nbsp;МТМКМ:</p>
                            <div className="content__money__collected">
                                <div className="content__money__bar"></div>
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
            <div id="popupErrorAgreement" className={`popup notification error ${modal.errorAgreement ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="operationSymbol"><span></span></div>
                        <div className="popup__text">
                            <p>{t('popErrAgr')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                            onClick={() => changeModal('errorAgreement', false)}
                            ><span>Ок</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="popup" className={`popup agreement ${modal.popupAgreement ? "open" : ''}`}>
                <div className="popup__body">
                    <div className="popup__content">
                        <a
                            className="popup__close closeSymbol"
                            onClick={() => changeModal('popupAgreement', false)}
                            style={{
                                cursor: 'pointer'
                            }}
                        ><span></span></a>
                        <div className="popup__title">{t('rules')}</div>
                        <div className="popup__text">
                            <p>{t('popRules1')}</p><br />
                            <p>{t('popRules2')}</p><br />
                            <p>{t('popRules3')}</p>
                        </div>
                        <div className="popup__agreement">
                            <button className="popup__button__agree"
                            onClick={() => {
                                setCheckedRules(true);
                                changeModal('popupAgreement', false);
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                            ><span>{t('accept')}</span></button>
                            <button className="popup__button__disagree"
                            onClick={() => {
                                setCheckedRules(false);
                                changeModal('popupAgreement', false);
                            }}
                            style={{
                                cursor: 'pointer'
                            }}
                            ><span>{t('notAccept')}</span></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <script src="../js/main.js"></script>
            <script src="../js/modal.js"></script> */}
        </>
    );
}

export default Home;
