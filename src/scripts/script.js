
let counter = true;

let signatures = {
    "uk": { "days": [{ "text": "Діб", "time": [0, "5-14"] }, { "text": "Доби", "time": ["2-4"] }, { "text": "Доба", "time": [1] }], "hours": [{ "text": "Години", "time": ["2-4", 22, 23] }, { "text": "Година", "time": [1, 21] }, { "text": "Годин", "time": [0, "5-20"] }], "minutes": [{ "text": "Хвилин", "time": [0, "5-20", "25-30", "35-40", "45-50", "55-59"] }, { "text": "Хвилини", "time": ["2-4", "22-24", "32-34", "42-44", "52-54"] }, { "text": "Хвилина", "time": [1, 21, 31, 41, 51] }] }, "ru": { "days": [{ "text": "Дней", "time": [0, "5-14"] }, { "text": "Дня", "time": ["2-4"] }, { "text": "День", "time": [1] }], "hours": [{ "text": "Часа", "time": ["2-4", 22, 23] }, { "text": "Час", "time": [1, 21] }, { "text": "Часов", "time": [0, "5-20"] }], "minutes": [{ "text": "Минут", "time": [0, "5-20", "25-30", "35-40", "45-50", "55-59"] }, { "text": "Минуты", "time": ["2-4", "22-24", "32-34", "42-44", "52-54"] }, { "text": "Минута", "time": [1, 21, 31, 41, 51] }] }
}
export function setCounterData(countDownSeconds) {
    if (!counter) return;
    let lang = document.documentElement.lang;
    if (countDownSeconds <= 1) countDownSeconds = 0;
    let days = Math.floor(countDownSeconds / (3600 * 24));
    let hours = Math.floor((countDownSeconds % (60 * 60 * 24)) / (3600));
    let minutes = Math.floor((countDownSeconds % (60 * 60)) / 60);
    let seconds = Math.floor(countDownSeconds % 60);

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const cont = document.querySelector('.content__timer');
    if (cont) {
        document.querySelector('.content__timer .days .amount').innerText = days;
        document.querySelector('.content__timer .hours .amount').innerText = hours;
        document.querySelector('.content__timer .minutes .amount').innerText = minutes;
        document.querySelector('.content__timer .seconds .amount').innerText = seconds;

        let daysSignature = getSignature("days", days, lang);
        let hoursSignature = getSignature("hours", hours, lang);
        let minutesSignature = getSignature("minutes", minutes, lang);

        document.querySelector('.content__timer .days .signature').innerText = daysSignature;
        document.querySelector('.content__timer .hours .signature').innerText = hoursSignature;
        document.querySelector('.content__timer .minutes .signature').innerText = minutesSignature;
    }

    if (countDownSeconds <= 1) {

        let translation = {
            "uk": 'Час закінчення буде визначено<br>після збору Мінімальної мети',
            "ru": 'Время окончания будет определено<br>после сбора Минимальной цели'
        }
        document.querySelector(".content__counter").innerHTML = '<p class="content_no-timer">' + translation[lang] + '</p>';
        counter = false;
    }
}

function getSignature(unitTime, unit, lang) {
    for (let element of signatures[lang][unitTime]) {
        let res = false;
        for (let i of element.time) {
            if (!isNaN(i)) {
                if (Number(i) == unit) res = true;
            } else {
                i = i.split("-").map(Number);
                if (unit >= i[0] && unit <= i[1]) {
                    res = true;
                }
            }
            if (res) return element.text;
        }
        if (res) return element.text;
    }
}

