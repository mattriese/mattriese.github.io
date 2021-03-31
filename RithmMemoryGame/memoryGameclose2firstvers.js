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

/** Create card for every color in colors (each will appear twice)
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click listener for each card to handleCardClick */
function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement('div');
    card.classList.add('white');
    card.style.backgroundImage = 'white';
    card.classList.add(`${color}`);
    card.dataset.temp = false;
    card.dataset.matched = false;
    card.addEventListener("click", handleCardClick);

    gameBoard.appendChild(card);
  }
}


/** Flip a card face-up. */
function flipCard(card) {
  card.style.backgroundColor = `${card.classList[1]}`;
  card.dataset.temp = true;
}


/** Flip a card face-down. */
function unFlipCard(card) {
  card.style.backgroundColor = 'white';
  card.dataset.temp = false;
}


/** Handle clicking on a card: this could be first-card or second-card. */
function handleCardClick(e) {
  // if this card is already matched or is temporarily face-up, don't do anything
  if(e.target.dataset.matched === true || e.target.dataset.temp === true || document.querySelectorAll('[data-temp="true"]').length >= 2){
    return;
  }
  // if it is an eligable card, flip it over
  else{
    flipCard(e.target);
  }
  let currentTemps = document.querySelectorAll('[data-temp="true"]')
  // if this is the second of a potential pair to be clicked, compare their colors
  if(currentTemps.length === 2){
    //if the colors match...
    if(currentTemps[0].classList[1] === currentTemps[1].classList[1]){
      currentTemps[0].dataset.matched = true;
      currentTemps[1].dataset.matched = true;
      currentTemps[0].dataset.temp = false;
      currentTemps[1].dataset.temp = false;
    }
    else{ //if their colors are different
    setTimeout(unFlipCard, 1000, currentTemps[0]);
    setTimeout(unFlipCard, 1000, currentTemps[1]);
    }
  }
}


      //if temps now === 2, then then compare their classlist[1]'s, if same,
      //set both of their matched=true and temp=false.
      // if(temps === 2){ //replace with is temp undefined
      //   let currentTemps = document.querySelectorAll('[data-temp=true]')
      //   if(currentTemps[0].classList[1] === currentTemps[1].classList[1]){
      //     currentTemps[0].dataset.matched = true;
      //     currentTemps[1].dataset.matched = true;
      //     //currentTemps[0].dataset.temp = false;
      //     //currentTemps[1].dataset.temp = false;

 //if temps !== 2, then wait one second, and flip both temps over (set background to white), reset temp cound in game, change each of their
      //temp values to false.

      // Since there's only ever 1 temp, plus an e.target to work with as 'temps', maybe just set a variable 'temp' to mean the first
      //      temp clicked on. so on each click, first check if temp is undefined, if yes, then set current e.target to temp. if not
      //      undefined, then compare temp.classList[1] to e.target.classList[1]. if they are ===, then change their matched properies,
      //      reset temp to undefined, and increment gameboard.dataset.totalMatched by 2. If they are not the same colors, then

      // const gameChildren = document.querySelector('#game').children;
      // let temps = 0;
      // for(let i = 0; i < gameChildren.length; i++ ){
      //   if(gameChildren[i].temp === true){
      //     temps++;
      //   }
      // }
      // if(temps === 2){
      //   if()

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
