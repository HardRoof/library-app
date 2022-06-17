// USing class instead of plain constructors.
class Book {
  constructor(title, author, genre, originallyPublished, numberOfPages, readIt) {
    this.title = title
    this.author = author
    this.genre = genre
    this.published = originallyPublished
    this.pages = numberOfPages
    this.readIt = readIt
  }
}

// Imports inputs
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const genre = document.querySelector("#genre")
const published = document.querySelector("#published")
const pages = document.querySelector("#pages")
const readIt = document.querySelector("#readIt")

// Imports form/Creates an empty array
const form = document.querySelector(".formClass")
let myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];

// Collects user book info, creating a new object
form.addEventListener("submit", bookInfo)
function bookInfo(e) {
  e.preventDefault(); //To prevent submission of the form
  userBook = new Book(`${title.value}`, `${author.value}`, `${genre.value}`, `${published.value}`, `${pages.value}`, `${readIt.checked}`)
  myLibrary.push(userBook) // Saves user's new book in my myLibrary
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  clear()
}

// It clears all inputs and hides form
function clear() {
  title.value = ''
  author.value = ''
  genre.value = ''
  published.value = ''
  pages.value = ''
  readIt.checked = 'false'
  nav.style.display = "none"
}

// Imports "spans"
classSpan = document.querySelectorAll(".classSpan")

// To display user's book
form.addEventListener("submit", displayUserBooks)
function displayUserBooks() {
  createCard()
  classSpan[0+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[myLibrary.length - 1].title)) 
  classSpan[1+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[myLibrary.length - 1].author))
  classSpan[2+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Genre: ${myLibrary[myLibrary.length - 1].genre}`)) 
  classSpan[3+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Published: ${myLibrary[myLibrary.length - 1].published}`)) 
  classSpan[4+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Number of Pages: ${myLibrary[myLibrary.length - 1].pages}`)) 
  if ((myLibrary[myLibrary.length - 1].readIt) == "true"){
    classSpan[5+((classDiv.length - 1) * 6)].appendChild(document.createTextNode("Read: ✔")) 
  }
  if ((myLibrary[myLibrary.length - 1].readIt) == "false"){
    classSpan[5+((classDiv.length - 1) * 6)].appendChild(document.createTextNode("Read: ✖")) 
  }
}

// Imports "LibContainer"
const LibContainer = document.querySelector("#LibContainer")

//Creates a div(card) with 6 spans and 2 buttons
function createCard() {
  newDiv = document.createElement('div');
  LibContainer.appendChild(newDiv);
  newDiv.classList.add('classDiv');
  classDiv = document.getElementsByClassName('classDiv');
  for (let j = 0; j < 6; j++) {
    newSpan = document.createElement('SPAN')
    newDiv.appendChild(newSpan)
    newSpan.classList.add('classSpan')
  }
  classSpan = document.querySelectorAll(".classSpan");

  //Creates delete book btn / Adds event listener to it
  deleteBook = document.createElement("button");
  deleteBook.textContent = "Delete"
  newDiv.appendChild(deleteBook);
  deleteBook.id = `${classDiv.length - 1}`; // id based in amount of cards
  deleteBook.name = "erase";
  deleteBook.classList.add('deleteBookClass');
  deleteBookClass = document.getElementsByName('erase'); //PS: NodeList and live

  deleteBookClass.forEach((btn, index) => {
    if (deleteBook.id == index) { // important: To only add one event in the newly created button
      btn.addEventListener('click', function eliminate(e) {
        myLibrary.splice(e.currentTarget.id, 1) //Deletes of library
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary)) //Delete of LS
        deleteBookClass[e.currentTarget.id].remove() //Deletes button of DOM
        classDiv[e.currentTarget.id].remove() //Deletes card of DOM
        reassignIDs()
      })
    }
  });

  //Creates an image element (trash bin)
  const btnImg = new Image(20, 20);
  btnImg.src = './imgs/trash-can-outline.png';
  deleteBook.appendChild(btnImg);

  //Creates toggle btn(read?) / Adds event listener to it
  toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Status ✎"
  newDiv.appendChild(toggleBtn);
  toggleBtn.id = `${classDiv.length - 1}`;
  toggleBtn.name = "switch";
  toggleBtn.classList.add('toggleBtnClass');
  toggleBtnClass = document.getElementsByName('switch'); //NodeList and live

  toggleBtnClass.forEach((btn, index) => {
    const spanIndex = (5+((classDiv.length - 1) * 6))
    if (toggleBtn.id == index) { // important: To only add one event in the newly created button
      btn.addEventListener('click', (e) => { //Toggle function(display and library info)
        if (classSpan[spanIndex].textContent == "Read: ✔") {
          classSpan[spanIndex].textContent = "Read: ✖";
          myLibrary[e.currentTarget.id].readIt = "false"
          localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        } else {
          classSpan[spanIndex].textContent = "Read: ✔";
          myLibrary[e.currentTarget.id].readIt = "true"
          localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        }
      })
    }
  })
};

// After elimination of a delete button, it reassigns IDs for remaining buttons
function reassignIDs() {
  for (let i = 0; i < deleteBookClass.length; i++) {
    deleteBookClass[i].id = i
  }
}

// Show/hide form
nav = document.querySelector("main nav")
openButton = document.querySelector(".open-button")
closeButton = document.querySelector(".closeButton") 

formClass = document.querySelector(".formClass")

openButton.addEventListener("click", openForm)
function openForm() {
  nav.style.display = "block"
}

closeButton.addEventListener("click", () => {
  clear()
})

//Fires event during page load  
window.addEventListener("load", loadSaved)
function loadSaved() {
  if (myLibrary.length != 0) { 
    for (let i = 0; i < myLibrary.length; i++) {
      createLibrary(i)
    }
  }
}

//Creates and displays localStorage library
function createLibrary(i) {
  createCard()
  classSpan[0+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[i].title)) 
  classSpan[1+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[i].author))
  classSpan[2+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Genre: ${myLibrary[i].genre}`)) 
  classSpan[3+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Published: ${myLibrary[i].published}`)) 
  classSpan[4+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Number of Pages: ${myLibrary[i].pages}`)) 
  if ((myLibrary[i].readIt) == "true"){
    classSpan[5+((classDiv.length - 1) * 6)].appendChild(document.createTextNode("Read: ✔")) 
  }
  if ((myLibrary[i].readIt) == "false"){
    classSpan[5+((classDiv.length - 1) * 6)].appendChild(document.createTextNode("Read: ✖")) 
  }
}