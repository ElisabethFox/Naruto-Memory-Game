const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;


const flipCard = (event) => {
    if (boardLocked) return;

    const target = event.target.parentElement;

    if (target === firstCard) return;

    target.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = target;
    } else {
        hasFlippedCard = false;
        secondCard = target;
        checkForMatch();
    }
};

const checkForMatch = () => {
    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
    isEqual ? disabledCards() : unflipCards();
};

const disabledCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
};

const unflipCards = () => {
    boardLocked = true;

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1000);
};

const resetBoard = () => {
    hasFlippedCard = boardLocked = false;
    firstCard = secondCard = null;
};

cards.forEach((card) => {
    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
});

const soundClick = () => {
    const soundButton = document.querySelector('.sound');
    const audio = new Audio('./Toshiro Masuda - Naruto Main Theme.mp3');
    let state = false;
    
    soundButton.addEventListener('click', () => {
        if (state) {
            audio.pause();
            state = !state;
        } else {
            audio.play();
            state = !state;
        }
    })
}

soundClick();