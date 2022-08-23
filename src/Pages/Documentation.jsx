import '../index.css';
import Logo from "../images/logo.svg";
import { NavLink } from 'react-router-dom';
function Documentation({ t }) {


    return (
        <>
            <main className="content">
                <div className="container">
                    <div className="content__hero">
                        <img src={Logo} width="244" height="145" title="Logo" alt="Logo" />
                    </div>
                </div>
                <div className="content__highliter-fluid content__highliter-fluid-last button-return">
                    <div className="container">
                        <p className="content__documentation__heading heading">{t('doc')}</p>
                        <div className="content__documentation__text">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!</p><br />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!</p><br />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa sint pariatur in nostrum adipisci. Dignissimos laboriosam iusto magnam alias autem nihil, numquam rerum? Similique et repellat optio harum? Maxime, praesentium!</p>
                        </div>
                    </div>
                </div>
                <div className="content__button__return">
                    <NavLink
                        to='/'
                    >
                        {t('backToHome')}
                    </NavLink>
                </div>
            </main>
            {/* <script src="../js/main.js"></script> */}
        </>
    );
}

export default Documentation;
