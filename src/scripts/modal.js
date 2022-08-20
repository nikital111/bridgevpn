
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