import '../index.css';
import { TOKEN_NAME } from '../config/consts';
function Money({ t, state }) {


    return (
        <div className="content__highliter-fluid">
            <div className="container">
                <div className="content__money">
                    <p className="content__money__heading heading">{t('collected')} {state.totalSupply}<span className="amount"></span> BUSD, {t('left')} {state.maxSupply - state.totalSupply}<span className="amountLeft"></span> {TOKEN_NAME}:</p>
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
    );
}

export default Money;
