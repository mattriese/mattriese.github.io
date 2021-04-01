"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */
function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

/** Create card for every color in colors (each will appear twice) **/
function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    //create outer card container
    const card = document.createElement('div');
    card.classList.add('card');
    //create inner card container with state data-attribute
    const cardInner = document.createElement('div');
    cardInner.classList.add('cardInner', 'is-flipped');
    cardInner.dataset.state = 'faceDown';
    //create card front face
    const front = document.createElement('div');
    front.classList.add('cardFace', 'front');
    //create card back face and add color
    const back = document.createElement('div');
    back.classList.add('cardFace', 'back');
    back.classList.add(`${color}`);
    cardInner.addEventListener("click", handleCardClick);
    //stack card layers and add to gameboard
    cardInner.appendChild(back);
    cardInner.appendChild(front);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);
  }
}


/** Flip a card face-up. */
function flipCard(card) {
  card.parentNode.classList.toggle('is-flipped');
  card.parentNode.dataset.state = 'faceUpUnmatched';
}


/** Flip a card face-down. */
function unFlipCard(card) {
  card.classList.toggle('is-flipped');
  card.dataset.state = 'faceDown';
}


/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(e) {
  // if this card is already matched or is temporarily face-up, don't do anything
  if(e.target.parentNode.dataset.state === 'faceUpMatched' || e.target.parentNode.dataset.state === 'faceUpUnmatched' || document.querySelectorAll('[data-state="faceUpUnmatched"]').length >= 2){
    return;
  }
  // if it is an eligible card, flip it over
  else{
    flipCard(e.target);
  }
  let currentFaceUpUnmatched = document.querySelectorAll('[data-state="faceUpUnmatched"]');
  // if this is the second of a potential pair to be clicked, compare their colors
  if(currentFaceUpUnmatched.length === 2){
    const cardXColor = currentFaceUpUnmatched[0].firstChild.classList[2];
    const cardYColor = currentFaceUpUnmatched[1].firstChild.classList[2];
    if(cardXColor === cardYColor){ //if the colors match...
      currentFaceUpUnmatched[0].dataset.state = 'faceUpMatched';
      currentFaceUpUnmatched[1].dataset.state = 'faceUpMatched';
    }
    else{ //if their colors are different
    setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, currentFaceUpUnmatched[0]);
    setTimeout(unFlipCard, FOUND_MATCH_WAIT_MSECS, currentFaceUpUnmatched[1]);
    }
  }
}


/*
1. Create cards by looping over the pre-shuffled colors[] array, assigning each color to the class attribute of each card.
2. Add event listener to cards
3. Add cards to DOM (need to know flexbox or bootstrap? or just use CSS GRID?), set class to 'down'
4. When tempCardCounter < 2, when click on a card, change background color to the color of its class. add class='up',
      tempCardCounter++, and add class of 'temp', and pause event listener, or make listener only work when class is 'down'
5. When tempCardCounter === 2, (pause eventlisteners), select all(both) elements with class 'up' and compare their class(color),
      if same, just reset tempCardCounter = 0, remove class 'temp'. if different, wait one second and change BOTH of their
      classes back to 'down' and remove 'temp' class.
6. On each card click, after 'flipping' the card, if 10 cards have class 'up' then display 'You win!' banner and 'new game' button.
7. If click on new game button, refresh page? or reset all classes to 'down'

// Players will be shown a collection of cards, face down, and can click on a card to reveal what’s underneath.
// After clicking on two cards, the game should check to see whether they match. If they do, they will remain facing up.
// If not, the cards should remain displayed to the player for one second, and then flip back down.
// The goal of the game is to match up all the pairs.

// Part One: Reading the code
// We have an array of colors which we shuffle and then loop over to create 10 <div> elements on the page and give them a class of
// the color we loop over. We then append the <div> elements to the DOM and add an event listener for a “click” for each of the elements.

// Part Two: Implementing clicks and matches
// Clicking a card should change the background color to be the color of the class it has.
// Users should only be able to change at most two cards at a time.
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again.
// You should make sure to use a setTimeout so that you can execute code after one second.

// Part Three: Gotchas
// Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)
// Make sure that you can not click too quickly and guess more than two cards at a time. */
