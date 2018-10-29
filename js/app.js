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

// Function: Strips card elements of all classes except for 'card', adds id by index, and pushes to cardListArray

let cleaned = cardList => {
  for (let [key, card] of cardList.entries()) {
    card.setAttribute('class', 'card');
    card.id = key;
    cardListArray.push(card);
  }
};

// Function: Loads cards into document fragment

const cardLoader = deck => {
  deck.forEach(item => deckLoader.appendChild(item));
};

// Timer functionality
let startTime;
let endTime;
let hour = 0;
let minute = 0;
let second = 0;
let hr = hour < 10 ? `0${hour}` : hour;
let min = minute < 10 ? `0${minute}` : minute;
let sec = second < 10 ? `0${second}` : second;
let timeElapsed = `${hr}:${min}:${sec}`;

const startClock = () => {
  if (second === 60) {
    second = 0;
    minute++;
  }
  if (minute === 60) {
    minute = 0;
    hour++;
  }
  let elapsing = document.querySelector('#elapsing');
  elapsing.innerHTML = timeElapsed;
  second++;
  startTime = setTimeout(startClock, 1000);
};

const timeReset = () => {
  second = 0;
  minute = 0;
  hour = 0;
  sec = `0${second}`;
  min = `0${minute}`;
  hr = `0${hour}`;
};

const endClock = () => {
  endTime = timeElapsed;
  let elapsing = document.querySelector('#elapsing');
  endTime = timeElapsed;
  elapsing.innerHTML = timeElapsed;
  timeReset();
  clearTimeout(startTime);
};

// Function: Initializes the game

const startGame = () => {
  cleaned(cardList);
  shuffle(cardListArray);
  cardLoader(cardListArray);
  document.querySelector('.deck').appendChild(deckLoader);
  // Starting timer...
  startClock();
};

// Calling start function...

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

const deckList = document.querySelectorAll('.card'); // card items
const deck = document.querySelector('.deck'); // card deck container
let revealedCards = []; // Hold 2 clicked cards for comparison
let matchedCards = []; // Holds matched cards
let movesCounter = 0; // Tracks moves made
let moves = document.querySelector('.moves'); // moves display on the page
moves.innerText = movesCounter; // Sets tracked moves to 'Moves' on the page

// Function: opens card

const displayCard = card => {
  card.classList.add('show', 'open');
  card.dataset.cardView = 'open';
};

// Function: closes card

const hideCard = card => {
  card.classList.remove('show', 'open');
  card.dataset.cardView = 'hidden';
};

// Function: adds match class

const matchCard = card => {
  card.classList.add('match');
};

// Function: tracks moves

const movesTrack = card => {
  movesCounter++;
  moves.innerText = movesCounter;
};

// Function: resets board values

const clearBoard = () => {
  cardListArray = [];
  revealedCards = [];
  movesCounter = 0;
  moves.innerText = movesCounter;
  matchedCards = [];
  stars.firstElementChild.removeAttribute('style');
  stars.lastElementChild.removeAttribute('style');
};

// Function: restart game

const restart = () => {
  clearBoard();
  startGame();
};

let board = document.querySelector('.container');
let page = document.querySelector('body');
let stars = document.querySelector('.stars');
let starsCount = 0;

// Function: updates star ranking count

const starsCountDisplay = () => {
  if (movesCounter >= 55) {
    starsCount = 1;
  } else if (movesCounter >= 35 && movesCounter <= 54) {
    starsCount = 2;
  } else {
    starsCount = stars.childElementCount;
  }
};
// Function: displays win condition page

const congrats = () => {
  let congratsContainer = document.createElement('DIV');
  congratsContainer.classList.toggle('congrats');
  starsCountDisplay();
  congratsContainer.innerHTML = `<div class="congratsModal"><h1>Congratulations, you won!!</h1><p>You made ${movesCounter} moves and finished with a time of ${endTime} and with a star rating of ${starsCount}.</p><br><button id="congratsButton">Play Again?</button></div>`;
  board.classList.toggle('hide');
  page.appendChild(congratsContainer);
};

// Function: click listener for button

const playAgain = () => {
  let congratsButton = document.querySelector('.congratsModal button');
  congratsButton.addEventListener('click', function(e) {
    document.querySelector('.congrats').classList.toggle('hide');
    document.querySelector('.congrats').classList.toggle('congrats');
    board.classList.toggle('hide');
    restart();
  });
};

// Function: calls congrats(), sets click handler on congrats button, restarts game

const winGame = () => {
  congrats();
  playAgain();
};

// Set data attribute to each card

for (let item of deckList) {
  item.dataset.cardView = 'hidden';
}

// Sets click listener on deck

deck.addEventListener(
  'click',
  function(e) {
    let clickedCard = e.target;
    if (!clickedCard.matches('[data-card-view]')) return;

    // Condition:  if card is not open, proceed
    if (
      !clickedCard.classList.contains('open') ||
      !clickedCard.classList.contains('match')
    ) {
      displayCard(clickedCard); // open card and register move
      revealedCards.push(clickedCard);
      movesTrack(clickedCard);
      console.log(matchedCards.length);
      // Condition:  if opened cards match...

      if (revealedCards.length == 2) {
        let revCardType1 = revealedCards[0].firstElementChild.classList.item(1);
        let revCardType2 = revealedCards[1].firstElementChild.classList.item(1);
        if (
          revCardType1 == revCardType2 &&
          revealedCards[0].id != revealedCards[1].id
        ) {
          matchCard(revealedCards[0]);
          matchCard(revealedCards[1]);
          matchedCards.push(revealedCards);
          revealedCards = [];
        }
        setTimeout(() => {
          for (let card of revealedCards) {
            hideCard(card); // close cards
          }
          revealedCards = []; // reset opened card array
        }, 850);
      }

      // Condition:  win condition - if all cards are matched...

      if (matchedCards.length == 8) {
        winGame(); // call endgame function
        endClock();
      }

      // Condition: updates star rank

      if (movesCounter >= 35 && movesCounter <= 54) {
        stars.firstElementChild.style = 'visibility: hidden';
      } else if (movesCounter >= 55) {
        stars.lastElementChild.style = 'visibility: hidden';
      } else {
        return;
      }
    }
  },
  false
);

// Add click functionality for restart button

let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function(e) {
  restart();
});
