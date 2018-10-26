/*
* Create a list that holds all of your cards
*/
let cardList = document.querySelectorAll('.card');
let cardListArray = [];
let deckLoader = document.createDocumentFragment();
/*
* Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let cleaned = cardList => {
  for (let card of cardList) {
    card.setAttribute('class', 'card');
    cardListArray.push(card);
  }
};

const cardLoader = deck => {
  deck.forEach(item => deckLoader.appendChild(item));
};
const startGame = () => {
  cleaned(cardList);
  shuffle(cardListArray);
  cardLoader(cardListArray);
  document.querySelector('.deck').appendChild(deckLoader);
};

startGame();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const deckList = document.querySelectorAll('.card');
let revealedCards = [];
let matchedCards = [];
let movesCounter = 0;
let moves = document.querySelector('.moves');
moves.innerText = movesCounter;

const movesTrack = card => {
  movesCounter++;
  moves.innerText = movesCounter;
};

const displayCard = card => {
  card.classList.add('show', 'open');
};

const hideCard = card => {
  card.classList.remove('show', 'open');
};

const matchCard = card => {
  card.classList.add('match');
};

const clearBoard = () => {
  cardListArray = [];
  revealedCards = [];
  movesCounter = 0;
  moves.innerText = movesCounter;
  matchedCards = [];
};

const restart = () => {
  clearBoard();
  startGame();
};

let board = document.querySelector('.container');
let page = document.querySelector('body');
let stars = document.querySelector('.stars');
let starsCount = 0;

const starsCountDisplay = () => {
  if (movesCounter >= 11) {
    starsCount = 1;
  } else if (movesCounter <= 5 && movesCounter >= 10) {
    starsCount = 2;
  } else {
    starsCount = stars.childElementCount;
  }
};

const congrats = () => {
  let congratsContainer = document.createElement('DIV');
  congratsContainer.classList.toggle('congrats');
  starsCountDisplay();
  congratsContainer.innerHTML = `<div class="congratsModal"><h1>Congratulations, you won!!</h1><p>You made ${movesCounter} moves and finished with a star rating of ${starsCount}.</p><br><button id="congratsButton">Play Again?</button></div>`;
  board.classList.toggle('hide');
  page.appendChild(congratsContainer);
};

const winGame = () => {
  congrats();
  let congratsButton = document.querySelector('.congratsModal button');
  congratsButton.addEventListener('click', function(e) {
    document.querySelector('.congrats').classList.toggle('hide');
    document.querySelector('.congrats').classList.toggle('congrats');
    board.classList.toggle('hide');
    restart();
  });
};

for (let item of deckList) {
  item.addEventListener('click', function(e) {
    displayCard(item);
    revealedCards.push(item);
    if (
      item.hasAttribute('open') ||
      item.hasAttribute('show') ||
      item.hasAttribute('match')
    ) {
      return;
      // } else if (item.hasAttribute('open') && item.hasAttribute('show')) {
    } else {
      movesTrack(item);
    }

    if (revealedCards.length == 2) {
      let revCardType1 = revealedCards[0].firstElementChild.classList.item(1);
      let revCardType2 = revealedCards[1].firstElementChild.classList.item(1);
      if (revCardType1 == revCardType2) {
        matchCard(revealedCards[0]);
        matchCard(revealedCards[1]);
        matchedCards.push(revealedCards);
        revealedCards = [];
      }
      setTimeout(() => {
        for (let card of revealedCards) {
          hideCard(card);
        }
        revealedCards = [];
      }, 850);
    }

    if (matchedCards.length == 8) {
      winGame();
    }

    if (movesCounter >= 5 && movesCounter <= 10) {
      stars.firstElementChild.style = 'display: none';
    } else if (movesCounter >= 11) {
      stars.lastElementChild.style = 'display: none';
    } else {
      return;
    }
  });
}

let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function(e) {
  restart();
});
