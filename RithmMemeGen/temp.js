const form = document.querySelector('form');

form.addEventListener('submit', function(e){
  e.preventDefault();

  // create container div
  const container = document.createElement("div");
  container.style.position = "relative";

  // create image element
  const image = document.createElement("img");
  image.src = document.querySelector('#imgurl').value;
  image.width = 400;

  // append image to div
  container.appendChild(image);

  // function call to add top text
  appendText(top);

  // function call to add bottom text
  appendText(bottom);

  // append whole elemnt
  document.body.appendChild(container);
})

function appendText(position){
  const text = document.createElement('h1');
  text.innerText = document.querySelector(`#${position}`).value;
  text.style.position = "absolute";
  text.style.[position] = 0;
  text.style.textAlign = center;
  container.appendChild(text);
}




const form = document.querySelector('form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const image = document.createElement("img");
  const container = document.createElement("div");
  image.src = document.querySelector('#imgurl').value;
  image.width = 400;
  container.style.position = "relative";
  container.appendChild(image);
  const topText = document.createElement('h1');
  topText.style.position = "absolute";
   topText.style.top = 0;
//   topText.style.zIndex = 2;
  topText.innerText = document.querySelector('#top').value;
  container.appendChild(topText);
  document.body.appendChild(container);
})
