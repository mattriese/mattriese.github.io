const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // create container div
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.margin = "15px";

  // create image element and append to container div
  const image = document.createElement('img');
  image.src = document.querySelector('#imgurl').value;
  image.style.width = '100%';
  //image.style.position = 'absolute';
  //image.style.textAlign = 'center';
  //image.style.margin = '0 auto';
  container.appendChild(image);

  // function calls to add top and bottom text
  appendText('top');
  appendText('bottom');

   //create remove button
  const btn = document.createElement('button');
  btn.innerText = 'x';
  btn.style.position = 'absolute';
  btn.style.right = '1%';
  btn.addEventListener('click', (evt) => evt.target.parentNode.remove());
  container.appendChild(btn);

  // append whole elemnt and reset form
  document.body.appendChild(container);
  form.reset();

  function appendText(position) {
    const text = document.createElement('div');
    text.innerText = document.getElementById(`${position}`).value;
    text.style.position = 'absolute';
    text.style[position] = 0;
    text.style.textAlign = 'center';
    text.style.fontFamily = 'Impact,Charcoal,sans-serif';
    text.style.textShadow = '0 0 7px black';
    text.style.color = 'white';
    text.style.fontSize = "2rem";
    text.style.width = '100%';
    text.style.margin = '15px auto;';
    container.appendChild(text);
  }
});

// function takes in the value of the input from either top or bottom and creates a h1 with that text and
// positions it at the top or bottom (can use name variable string for position). Do these h1's need unique
// attributes? no, they're styled the same. everything is the same expect the position and the text.

// How do I make the font scale to fit proper width?

// <!-- . Meme Generator»
// ::::::::::::::::::::::BASIC PIECES:::::::::::::::::::
// 1. a form with 3 fields and a submit button
// 2. downloading the image from the inputed url
// 3. creating a new place for the image to go
// 4. adding the text to the image
// 5. clearing the form
// 6. making a button that can delete a meme

// ::::::::::::::::::::::THINGS TO LEARN::::::::::::::::::::::
// 1. how to download and store an image( I guess just display it directly from the url)
// 2. how to listen for submit event
// 3. how to create new div with sub-divs displayed on top
// 4. how to determine the font/sizing of the words and photo
// 5. how to make a button that can delete a div

// queryselect the input from a specific element - attribute syntax: input[name='brandname']
// form submit, then that input.value is how you get the actual user's input (inside eventListener callback (usually?))

// For this assignment, you’ll be building a meme generator in the browser using HTML, CSS, and JavaScript.

// Your generator should consist of a form that accepts a link to an image, text for the top of the meme,
// and text for the bottom of the meme. When the user submits the form,
// use JavaScript to append to the DOM a div which contains the meme, including the image and its text.

// Requirements

// User should be able to submit a form on the page to generate a new meme on the page,
// and should be able to add multiple memes to the page by submitting the form multiple times.
// Users should be able to click on a button to remove a meme from the page.
// When the meme form is submitted, values in the form inputs should be cleared.
// Be sure to style your meme generator! It should be functional but also look nice.

// Want a hint on how to get the meme text over the image?
// Approach
// You could do this by:
// Add a div around your img and text and give it a position: relative.
// To position text divs, give them each a position: absolute and set their positioning by using the
// properties of top, right, bottom and left.
// If you need help on positioning, check out our free resources.

// Want a hint on handling the form submit to add a meme?
// Approach
// The standard way to handle a form submit is to include an input in the form with a type attribute of “submit”.
// In JavaScript, you should then listen for “submit” events on the form element rather than click events on
// the button (form submits are triggered not only by clicking on the submit button, but also by hitting “enter”
// when you’re inside the form).
// After submission, if you see the page refresh, it’s because this is the default behavior of HTML forms!
// To stop the page from refreshing, you need to call e.preventDefault() on the event object e.
// To learn more about the event object, check out our free resources: Introduction to Events and Events Continued.

// Want a hint on deleting a meme?
// Approach
// Just like with submitting a new meme, to delete a meme you may need access to the event object.
// When you click on delete, take a look at what the e.target is.
// Using JavaScript, can you navigate from the target to the meme, and then remove the meme from the DOM? -->
