const LibContainer = document.querySelector("#LibContainer")

//Creating divs w/ a class inside #container
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
  newDiv.appendChild(deleteBook);
  deleteBook.id = `${classDiv.length - 1}`;
  deleteBook.name = "erase";
  deleteBook.classList.add('deleteBookClass') ;
  deleteBookClass = document.getElementsByName('erase'); //NodeList and live

  deleteBookClass.forEach((btn, index) => {
    if (deleteBook.id == index) { //To only add one event at a time
      btn.addEventListener('click', function eliminate(e) {
        myLibrary.splice(e.currentTarget.id, 1)
        deleteBookClass[e.currentTarget.id].remove()
        classDiv[e.currentTarget.id].remove()
        reassignIDs()
      })
    }
  })

  //Creates an image element dynamically(trash bin)
  let btnImg = new Image(24,24);
  btnImg.src = './imgs/trash-can-outline.png';
  deleteBook.appendChild(btnImg)
};

// After elimination of btn, it reassign ids for remaining buttons
function reassignIDs() {
  console.log(deleteBookClass)
  for (let i = 0; i < deleteBookClass.length; i++) {
    deleteBookClass[i].id = i
  }
}

// Constructor function
function Book(title, author, genre, originallyPublished, numberOfPages, readIt) {
  this.title = title
  this.author = author
  this.genre = genre
  this.published = originallyPublished
  this.pages = numberOfPages
  this.readIt = readIt
}

// Creates a JS object
const bookExample1 = new Book("Lord of the flies", "William Golding", "Allegorical novel", "September 17, 1954",  224)
const bookExample2 = new Book("aaa", "William Golding", "Aaa", "1954",  224)

// Imports inputs
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const genre = document.querySelector("#genre")
const published = document.querySelector("#published")
const pages = document.querySelector("#pages")
const readIt = document.querySelector("#readIt")

// Imports form
const form = document.querySelector(".formClass")

// Collects user book info, creating a new object
form.addEventListener("submit", bookInfo)
function bookInfo(e) {
  e.preventDefault(); //To prevent submission of the form
  userBook = new Book(`${title.value}`, `${author.value}`, `${genre.value}`, `${published.value}`, `${pages.value}`, `${readIt.checked}`)
  clear()
}

// It clears all inputs and hides it
function clear() {
  title.value = ''
  author.value = ''
  genre.value = ''
  published.value = ''
  pages.value = ''
  // readIt.value = ''
  nav.style.display = "none"
}

// Creates an empty array
let myLibrary = [];

// Saves user book in my myLibrary
form.addEventListener("submit", addBookToLibrary)
function addBookToLibrary() {
  myLibrary.push(userBook)
}

// Imports spans(Node-list)
classSpan = document.querySelectorAll(".classSpan")

// To display user book
form.addEventListener("submit", displayUserBooks)
function displayUserBooks() {
  createCard()
  classSpan[0+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[myLibrary.length - 1].title)) 
  classSpan[1+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[myLibrary.length - 1].author))
  classSpan[2+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Genre: ${myLibrary[myLibrary.length - 1].genre}`)) 
  classSpan[3+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Published: ${myLibrary[myLibrary.length - 1].published}`)) 
  classSpan[4+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(`Number of Pages: ${myLibrary[myLibrary.length - 1].pages}`)) 
  classSpan[5+((classDiv.length - 1) * 6)].appendChild(document.createTextNode(myLibrary[myLibrary.length - 1].readIt)) 
}

/////////////////////
// Open/close form
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
///////////////////

