

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
const deckdiv = document.querySelector('.deckdiv');
const noMatch = document.querySelectorAll('.hidden');
const moveNum = document.querySelector('.move');
const refresh = document.querySelector('.restart');
const time = document.querySelector('.timer');


let toggleCards = [];
let matchedCards = [];

let move = 0;
let sec = 1;


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
           "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
           "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

function shuffleCards() {
    const cardsArray = Array.from(document.querySelectorAll('.deck li'));
    const cardsAny = shuffle(cardsArray);
    for (card of cardsAny) {
        deck.appendChild(card);
    };
}


function flipCards() {
    deck.addEventListener('click', event => {
        const clickTarget = event.target;
        if (
            clickTarget.classList.contains('card') &&
            toggleCards.length < 2 &&
            !toggleCards.includes(clickTarget) &&
            !clickTarget.classList.contains('match')
        ) {

            toggleCards.push(clickTarget);
            clickTarget.classList.toggle('open');
            clickTarget.classList.toggle('show');
            compareCards();
        }
    });
} 


function compareCards() {
    if (
        toggleCards[0].firstElementChild.className ===
        toggleCards[1].firstElementChild.className
    ) {
        toggleCards[0].classList.toggle('match');
        toggleCards[1].classList.toggle('match');

        matchedCards.push(toggleCards[0]);
        matchedCards.push(toggleCards[1]);

        toggleCards = [];
    } else {
        //if cards don't match, flip them over after 1 second
        setTimeout(function() {
            toggleCards.forEach(function(card) {
                card.classList.remove('open', 'show');

                toggleCards = [];
            });
        }, 1000);
    }
    moveCounter();
}


function moveStar() {
    const star = document.querySelectorAll('.star li');
    const move = moveNum.innerHTML;

    if (move === '10') {
        star[1].style.display = 'none';
    }

    if (move === '15') {
        star[2].style.display = 'none';
    }
}


function moveCounter() {
    move++;
    moveNum.innerHTML = move;
    moveStar();
}


function startTimer() {
    $('.deckdiv').one('click', function() {
        let sec = 0;
        let min = 0;
        let timer = setInterval(function() {

            time.innerHTML = min + ':' + 0 + sec;
            sec++;

            if (sec <= 9) {
                time.innerHTML = min + ':' + 0 + sec;
            }

            if (sec > 9) {
                time.innerHTML = min + ':' + sec;
            }

            if (sec === 60) {
                min++;
                sec = 0;
                time.innerHTML = min + ':' + 0 + sec;
            }

            if (matchedCards.length == 16) {
                clearInterval(timer);
                modal();
                displayModal();
                modalClicks(); //
            }
            $('.restart').on('click', function() {
                clearInterval(timer);
                let min = 0;
                let sec = 0;
                time.innerHTML = min + ':' + 0 + sec;
                sec++;
            });
        }, 1000);
    });

}

function updateCards() {
    deck = shuffle(deck);
    var index = 0;
    $.each($(".card i"), function(){
      $(this).attr("class", "fa " + deck[index]);
      index++;
    });
    resetTimer();
};

function modal() {
    const starScore = document.querySelector('.star-modal');
    const moveScore = document.querySelector('.move-modal');
    const timeScore = document.querySelector('.time-modal');
    const starData = document.querySelector('.star').children.length;
    const moveData = move;
    const timeData = document.querySelector('.timer').innerHTML;

    starScore.innerHTML = starData;
    moveScore.innerHTML = moveData;
    timeScore.innerHTML = timeData;
}


function displayModal() {
    const modalShow = document.querySelector('.modal');
    const modalBoxShow = document.querySelector('.modal-box');
    modalShow.classList.toggle('modal-display');
    modalBoxShow.classList.toggle('modal-display');
}

 
function modalClicks() {
    const yesButton = document.querySelector('.yes');
    const noButton = document.querySelector('.no');

    yesButton.addEventListener('click', function() {
        resetAll();
        displayModal();
    });

    noButton.addEventListener('click', function() {
        displayModal();
    });
}


function refreshButton() {
    refresh.addEventListener('click', function() {
        resetAll();
    });
}


function resetAll() {
    refreshStar();
    refreshMove();
    startTimer();
    refreshMatched();
    let toggleCards = [];
    matchedCards.length = 0;
    shuffleCards();
}


function refreshStar() {
    const star = document.querySelectorAll('.star li');

    if (star[1].style.display = 'none') {
        star[1].style.display = 'inline-block';
    }
    if (star[2].style.display = 'none') {
        star[2].style.display = 'inline-block';
    }
}


function refreshMove() {
    move = 0;
    moveNum.innerHTML = 0;
    flipCards();
}


function refreshMatched() {
    const matched = document.querySelectorAll('.deck li');
    matched.forEach(function(item) {
        if (item.classList.contains('match')) {
            item.classList.remove('match');
            item.classList.remove('open');
            item.classList.remove('show');
        }
    });
}


displayModal();
refreshButton();

startTimer();
flipCards();
