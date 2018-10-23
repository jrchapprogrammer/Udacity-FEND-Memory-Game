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

let shuffled = list => {
  shuffle(list);
};
const cardLoader = deck => {
  deck.forEach(item => deckLoader.appendChild(item));
};
cleaned(cardList);
console.log(cardListArray);
shuffle(cardListArray);
console.log(cardlistArray);
cardLoader(cardListArray);
console.log(deckLoader);
document.querySelector('.deck').appendChild(deckLoader);
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

for (let item of deckList) {
  item.addEventListener('click', function(e) {
    item.classList.toggle('show');
    item.classList.toggle('open');
  });
}
