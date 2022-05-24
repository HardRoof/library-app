const LibContainer = document.querySelector("#LibContainer")

let myLibrary = [];

//Creating divs w/ a class inside #container
function createCard() {
  newDiv = document.createElement('div');
  LibContainer.appendChild(newDiv)
  newDiv.classList.add("classDiv")
  classDiv = document.querySelector(".classDiv");
  for (let j = 0; j < 5; j++) {
    newSpan = document.createElement('SPAN')
    newDiv.appendChild(newSpan)
    newSpan.classList.add(`classSpan${j+1}`)
    classSpan = document.querySelectorAll(".newSpan")
  }
};
createCard()
createCard()
createCard()

// Constructor function
function Book(title, author, genre, originallyPublished, numberOfPages) {
  this.title = title
  this.author = author
  this.genre = genre
  this.published = originallyPublished
  this.pages = numberOfPages
  this.readIt = true
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

// Imports submit button
const submitButton = document.querySelector(".formButton")

// Collects user book info, creating a new object
submitButton.addEventListener("click", bookInfo)
function bookInfo(e) {
  if ((`${title.value}` != '') && (`${author.value}` != '') && (`${genre.value}` != '') && (`${published.value}` != '') && (`${pages.value}` != '')) {
    e.preventDefault(); //If all required inputs are filled we prevent submission of the form
  }
  userBook = new Book(`${title.value}`, `${author.value}`, `${genre.value}`, `${published.value}`, `${pages.value}`, `${readIt.value}`)
  clear()
}

// It clears all inputs and hides it
function clear() {
  title.value = ''
  author.value = ''
  genre.value = ''
  published.value = ''
  pages.value = ''
  readIt.value = ''
  nav.style.display = "none"
}

// Saves user book in my myLibrary
submitButton.addEventListener("click", addBookToLibrary)
function addBookToLibrary() {
  myLibrary.push(userBook)
}



/////////////////////
// Open/close form
nav = document.querySelector("main nav")
openButton = document.querySelector(".open-button")
cancelButton = document.querySelector(".cancelButton") 

formClass = document.querySelector(".formClass")

openButton.addEventListener("click", openForm)
function openForm() {
  nav.style.display = "block"
}

cancelButton.addEventListener("click", () => {
  nav.style.display = "none"
})
///////////////////