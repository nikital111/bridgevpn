import '../index.css';
import Logo from "../images/logo.svg";
import { useState } from 'react';
import Timer from '../Components/Timer';
import Money from '../Components/Money';
// import "../scripts/main.js";
// import "../scripts/modal.js";

function Home({ web3, connectWallet, t, changeModal, modal, state }) {

    const [checkedRules, setCheckedRules] = useState(false);
    const check = () => {
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
                <Timer t={t} state={state} />
                <div className="container">
                    <div className="content__connect__wallet">
                        <button className="content__connect__button" onClick={() => {
                            if (!checkedRules) {
                                changeModal('errorAgreement', true);
                            }
                            else {
                                connectWallet();
                            }
                        }}>{t('connectW')}</button>
                        <div className="content__connect__terms">
                            <div className="content__connect__terms__checkbox">
                                <input type="checkbox" id="accept-privacy" checked={checkedRules} onChange={check} />
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
                <Money t={t} state={state} />
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
