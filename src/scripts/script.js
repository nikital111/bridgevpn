
let counter = false;


 export function setCounterData(countDownSeconds) {
            if (countDownSeconds <= 1) countDownSeconds = 0;
            let days = Math.floor(countDownSeconds / (3600 * 24));
            let hours = Math.floor((countDownSeconds % (60 * 60 * 24)) / (3600));
            let minutes = Math.floor((countDownSeconds % (60 * 60)) / 60);
            let seconds = Math.floor(countDownSeconds % 60);

            days = days < 10 ? "0" + days : days;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
        
            document.querySelector('.content__timer .days .amount').innerText = days;
            document.querySelector('.content__timer .hours .amount').innerText = hours;
            document.querySelector('.content__timer .minutes .amount').innerText = minutes;
            document.querySelector('.content__timer .seconds .amount').innerText = seconds;

            if (countDownSeconds <= 1) {
                let lang = document.documentElement.lang;
                let translation = {
                    "uk": 'Час закінчення буде визначено<br>після збору Мінімальної мети',
                    "ru": 'Время окончания будет определено<br>после сбора Минимальной цели'
                }
                document.querySelector(".content__counter").innerHTML = '<p class="content_no-timer">'+translation[lang]+'</p>';
                counter = false;
            }
        }
        
