import '../index.css';
function Timer({t, state}) {


    return (
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
    );
}

export default Timer;
