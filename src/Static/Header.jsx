import '../index.css';
import Arrow from "../images/arrow-down.svg";
import { NavLink } from "react-router-dom";

function Header({ changeLang, lang, t }) {

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__body">
                        <div className="header__burger">
                            <span></span>
                        </div>

                        <nav className="header__menu">
                            <ul className="header__list">
                                <li>
                                    <NavLink
                                        to='/documentation'
                                        className="header__link"
                                    >
                                        {t('doc')}
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/faq'
                                        className="header__link"
                                    >
                                        {t('faq')}
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className="header__lang">
                            <div>
                                {
                                    lang !== "ru" ?
                                        <a className="header__link">Українська мова</a>
                                        :
                                        <a className="header__link">Русский язык</a>
                                }
                                <span className="header__arrow"><img src={Arrow} /></span>
                            </div>
                            <div className="header__lang__menu">
                                {
                                    lang === "ru" ?
                                        <a className="header__link" onClick={() => changeLang('uk')}>Українська мова</a>
                                        :
                                        <a className="header__link" onClick={() => changeLang('ru')}>Русский язык</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
