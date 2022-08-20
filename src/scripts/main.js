let counter = false;
let lang = document.documentElement.lang;
var dateNow = (!isset(dateNow)) ? new Date('2022-07-29\T22:49:22') : dateNow;
// "dateTo" is date format. Countdown will work by this time.
var dateTo = (!isset(dateTo)) ? new Date('2022-07-29\T22:49:22') : dateTo;

window.onload = function() {
    //modal

    const popupLinks = document.querySelectorAll(".popup-link");
    const body = document.querySelector("body");
    //const lockPadding = document.querySelectorAll(".lock-padding");

    let unlock = true;

    const timeout = 650;

    if(popupLinks.length > 0) {
        for(let i=0;i<popupLinks.length;i++) {
            const popupLink = popupLinks[i];
            popupLink.addEventListener("click", function(e) {
                const popupName = popupLink.getAttribute("href").replace("#", "");
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault();
            })
        }
    }

    const popupCloseIcon = document.querySelectorAll(".popup__close");
    if(popupCloseIcon.length > 0) {
        for(let i=0;i<popupCloseIcon.length;i++) {
            const el = popupCloseIcon[i];
            el.addEventListener("click", function(e) {
                popupClose(el.closest(".popup"));
                e.preventDefault();
            })
        }
    }

    function popupOpen(currentPopup) {
        console.log(currentPopup);
        if(currentPopup && unlock) {
            const popupActive = document.querySelector(".popup.open");
            if(popupActive) {
                popupClose(popupActive, false);
            } else {
                
                bodyLock();
            }
            currentPopup.classList.add(".open");
            currentPopup.addEventListener("click", function (e) {
                if(!e.target.closest(".popup_content")) {
                    popupClose(e.target.closest(".popup"));
                }
            });
        }
    }
    // function popupOpen(currentPopup) {
    //     if(currentPopup && unlock) {
    //         const popupActive = document.querySelector(".popup.open");
    //         if(popupActive) {
                
    //             popupClose(popupActive, false);
    //         } else {
    //             bodyLock();
    //         }
    //         currentPopup.classList.add("open");
    //         currentPopup.addEventListener("click", function (e) {
    //             if(!e.target.closest(".popup__content")) {
    //                 popupClose(e.target.closest(".popup"));
    //             }
    //         });
    //     }
    // }

    function popupClose(popupActive, doUnlock = true) {
        if(unlock) {
            popupActive.classList.remove("open");
            if(doUnlock) {
                bodyUnlock();
            }
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector("body").offsetWidth + "px";

        /* for(let i=0;i<lockPadding.length;i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        } */
        body.style.paddingRight = lockPaddingValue;
        body.classList.add("lock");

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnlock() {
        setTimeout(function () {
            /* if(lockPadding.length > 0) {
                for(let i=0;i<lockPadding.length;i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = "0px";
                }
            } */
            body.style.paddingRight = "0px";
            body.classList.remove("lock");
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    

    // Menu
    document.querySelector(".header__burger").addEventListener("click", function(event) {
        document.querySelector(".header__burger").classList.toggle("active");
        document.querySelector(".header__menu").classList.toggle("active");
        document.querySelector("body").classList.toggle("lockNav");
    });
    // Countdown
    if(document.querySelector(".content__timer")!=null) {
        (() => {
            let signatures = {"uk":{"days":[{"text":"Діб","time":[0,"5-14"]},{"text":"Доби","time":["2-4"]},{"text":"Доба","time":[1]}],"hours":[{"text":"Години","time":["2-4",22,23]},{"text":"Година","time":[1,21]},{"text":"Годин","time":[0,"5-20"]}],"minutes":[{"text":"Хвилин","time":[0,"5-20","25-30","35-40","45-50","55-59"]},{"text":"Хвилини","time":["2-4","22-24","32-34","42-44","52-54"]},{"text":"Хвилина","time":[1,21,31,41,51]}]},"ru":{"days":[{"text":"Дней","time":[0,"5-14"]},{"text":"Дня","time":["2-4"]},{"text":"День","time":[1]}],"hours":[{"text":"Часа","time":["2-4",22,23]},{"text":"Час","time":[1,21]},{"text":"Часов","time":[0,"5-20"]}],"minutes":[{"text":"Минут","time":[0,"5-20","25-30","35-40","45-50","55-59"]},{"text":"Минуты","time":["2-4","22-24","32-34","42-44","52-54"]},{"text":"Минута","time":[1,21,31,41,51]}]}
            }
            function setCounterData(countDownSeconds) {
                if (countDownSeconds <= 1) countDownSeconds = 0;
                let days = Math.floor(countDownSeconds / (3600 * 24));
                let hours = Math.floor((countDownSeconds % (60 * 60 * 24)) / (3600));
                let minutes = Math.floor((countDownSeconds % (60 * 60)) / 60);
                let seconds = Math.floor(countDownSeconds % 60);
                
                let daysSignature = getSignature("days", days, lang);
                let hoursSignature = getSignature("hours", hours, lang);
                let minutesSignature = getSignature("minutes", minutes, lang);

                days = days < 10 ? "0" + days : days;
                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
            
                document.querySelector('.content__timer .days .amount').innerText = days;
                document.querySelector('.content__timer .hours .amount').innerText = hours;
                document.querySelector('.content__timer .minutes .amount').innerText = minutes;
                document.querySelector('.content__timer .seconds .amount').innerText = seconds;

                document.querySelector('.content__timer .days .signature').innerText = daysSignature;
                document.querySelector('.content__timer .hours .signature').innerText = hoursSignature;
                document.querySelector('.content__timer .minutes .signature').innerText = minutesSignature;

                if (countDownSeconds <= 1) {
                    let translation = {
                        "uk": 'Час закінчення буде визначено<br>після збору Мінімальної мети',
                        "ru": 'Время окончания будет определено<br>после сбора Минимальной цели'
                    }
                    document.querySelector(".content__counter").innerHTML = '<p class="content_no-timer">'+translation[lang]+'</p>';
                    counter = false;
                }
            }
            
            function getSignature(unitTime, unit, lang) {
                for(let element of signatures[lang][unitTime]) {
                    let res = false;
                    for(let i of element.time) {
                        if(!isNaN(i)) {
                            if(Number(i)==unit) res = true;
                        } else {
                            i = i.split("-").map(Number);
                            if(unit>=i[0] && unit<=i[1]) {
                                res = true;
                            }
                        }
                        if(res) return element.text;
                    }
                    if(res) return element.text;
                }
            }

            if(document.querySelector(".content__timer")==null) return;

            let countDownSeconds = (dateTo-dateNow)/1000;

            if (countDownSeconds <= 1) counter = false;
            else counter = true;

            let timer = setInterval(function() {
                countDownSeconds--;
            if (countDownSeconds <= 1) {
                clearInterval(timer);
            }
            setCounterData(countDownSeconds);
            }, 1000);
        })();
    }
    // Agreement modal buttons 
    if(document.querySelector(".popup.agreement")!=null) {
        document.querySelector(".agreement .popup__button__agree").addEventListener("click", function(event) {
            document.querySelector("#accept-privacy").checked = true;
            popupClose(event.target.closest(".popup"));
            event.preventDefault();
        });
        document.querySelector(".agreement .popup__button__disagree").addEventListener("click", function(event) {
            document.querySelector("#accept-privacy").checked = false;
            popupClose(event.target.closest(".popup"));
            event.preventDefault();
        });
    }
    // Notifications modal buttons 
    if(document.querySelector(".popup.notification")!=null) {
        let closeNotificationError = document.querySelectorAll(".notification .popup__button__agree");
        for(let i=0;i<closeNotificationError.length;i++) {
            const el = closeNotificationError[i];
            el.addEventListener("click", function(event) {
                popupClose(event.target.closest(".popup"));
                event.preventDefault();
            });
        }
    }
    // Redirect
    if(document.querySelector(".content__connect__button")!=null) {
        document.querySelector(".content__connect__button").addEventListener("click", function(event) {
            if(document.querySelector("#accept-privacy").checked) window.location.href = "buy.html";
            else popupOpen(document.getElementById("popupErrorAgreement"));
        });
    }
    // Buy button
    if(document.querySelector(".content__buy__button")!=null) {
        let minTokenQuantity = 10;
        let maxTokenQuantity = 1000;
        let tokenAvailable = 123456.78;
        document.querySelector(".content__buy__button").addEventListener("click", function(event) {
            if(!counter) {
                let tokenVal = document.querySelector(".content__buy__input").value;
                tokenVal = Number(tokenVal.replace(",","."));
                if((isNaN(tokenVal)) || (tokenVal=="")) popupOpen(document.getElementById("popupErrorTokenEmpty"));
                else if(tokenVal<minTokenQuantity) popupOpen(document.getElementById("popupErrorTokenLess"));
                else if(tokenVal>maxTokenQuantity) popupOpen(document.getElementById("popupErrorTokenMore"));
                else alert(tokenVal);
            } else {
                popupOpen(document.getElementById("popupErrorNotStartedSale"));
            }
        });
        document.querySelector(".content__buy_available span.amount").innerText = tokenAvailable;
    }
    // Turn off the wallet.
    if(document.querySelector(".popup.notification#popupTurnOffWallet .popup__button__agree")!=null) {
        document.querySelector(".popup.notification#popupTurnOffWallet .popup__button__agree").addEventListener("click", function(event) {
            // Something to do.
            // In the end we need to close modal.
            popupClose(event.target.closest(".popup"));
        });
    }
    // Input validate
    if(document.querySelector(".content__buy__input")!=null) {
        let inputTag = document.querySelector(".content__buy__input"); 
        inputTag.addEventListener("input", function(event) {
            let val = inputTag.value.replace(/[^\d,.]/g, '');

            let posComma = val.indexOf(',');
            let posDot = val.indexOf('.');
            if(((posComma != -1) && (posDot != -1)) || (((val.match(/\,/g) || []).length>1) || ((val.match(/\./g) || []).length>1))) val = val.slice(0, -1);
            if(posComma != -1 || posDot != -1){
                if((val.length-((posComma==-1) ? posDot : posComma))>3){
                    val = val.slice(0, -1);
                }
            }
            inputTag.value = val;
        });
    }
    // Print out user balance.
    if(document.querySelector(".content__info__balance-total")!=null) {
        (() => {
            let userBalance = 634.78;
            document.querySelector(".content__info__balance-total .amount").innerText = userBalance;
        })();
    }
    // Print out collected value.
    if(document.querySelector(".content__money__heading")!=null) {
        (() => {
            let collectedValue = 111.22;
            let leftValue = 50000 - collectedValue;
            document.querySelector(".content__money__heading .amount").innerText = collectedValue;
            document.querySelector(".content__money__heading .amountLeft").innerText = leftValue;
        })();
    }
};

function isset(variable) {
    return typeof variable !== 'undefined';
}