// Get Qoutes from API
const qouteContainer = document.querySelector('#qoute-container')
const qouteText = document.querySelector('#qoute')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const newQouteBtn = document.querySelector('#new-qoute')
const loader = document.getElementById('loader');
let data = []

function loading() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

function complete() {
    if (!loader.hidden) {
        loader.hidden = true;
        qouteContainer.hidden = false;
    }
}

function newQoute() {
    loading()
    const qoute = data[Math.floor(Math.random() * data.length)];

    if (!qoute.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = qoute.author;
    }

    if (qoute.text.length > 120) {
        qouteText.classList.add('long-qoute')
    } else {
        qouteText.classList.remove('long-qoute')
    }

    qouteText.textContent = qoute.text
    complete()
}
async function getQoutes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        data = await response.json()
        newQoute()

    } catch (error) {
        console.log(error);
    }
}

function tweetQoute() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}
newQouteBtn.addEventListener('click', newQoute);
twitterBtn.addEventListener('click', tweetQoute)

getQoutes()

