const myLibrary = [
  {
    title: "1984",
    author: "George Orwell",
    numPages: 328,
    read: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    numPages: 281,
    read: true,
  }, 
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    numPages: 180,
    read: false,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numPages: 310,
    read: true,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    numPages: 268,
    read: false,
  },
];
const addBook = document.querySelector(".add-button");
const modal = document.querySelector("#bookModal");
const Close = document.querySelector(".close-button");
const cancel = document.querySelector(".cancel");
const form = document.getElementById("bookForm")
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const pages = document.querySelector("#bookPages");
const Toggle = document.querySelector("#readToggle");
const totalBook = document.querySelector("#books-num");
const readBooks = document.querySelector("#read-num")
const unreadBooks = document.querySelector("#unread-num")

function count () {
  let readCount = 0;
  let unreadCount = 0;
  myLibrary.forEach(book => {
    if (book.read) {
      readCount++;
    } else {
      unreadCount++;
    }
  });
  totalBook.textContent = myLibrary.length;
  readBooks.textContent = readCount;
  unreadBooks.textContent = unreadCount;
}

addBook.addEventListener("click", () => {
    modal.showModal();
});
Close.addEventListener("click", () => {
    modal.close();
    form.reset();
});
cancel.addEventListener("click", () => {
    modal.close();
    form.reset();
});



let title, author, numPages, read;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  title = bookTitle.value;
  author = bookAuthor.value;
  numPages = pages.value;
  if(Toggle.classList.contains("active")) {
    read = true;
  } else {
    read = false;
  }
  addBookToLibrary(title, author, numPages, read);
  displayBooks();
  count()
})

Toggle.addEventListener("click", () => {
  Toggle.classList.toggle("active");
})

function Book (title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    };
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = crypto.randomUUID();
};

function toggleRead(book) {
    book.read = !book.read;
};

function addBookToLibrary (title, author, numPages, read ) {
    const book = new Book(title, author, numPages, read);
    myLibrary.push(book);
}

function displayBooks() {
  // Get the cards container
  const cardsContainer = document.querySelector('.cards');
     
  // Clear old cards (optional, but prevents duplicates)
  cardsContainer.innerHTML = '';
    
  // Loop through each book in your myLibrary array
  myLibrary.forEach(book => {
    // Create an HTML string with the book data
      const cardHTML = `
        <div class="card" data-id="${book.id}">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>${book.numPages} pages</p>
          <div class="status ${book.read ? 'read' : 'unread'}">
            ${book.read ? 'Read' : 'Unread'}
          </div>
          <div class="buttons">
            <button class="card-button" id= "toggle" type="button">
              <span class="material-icons">loop</span> Toggle
            </button>
            <button class="card-button" id ="delete" type="button">
              <span class="material-icons-outlined">delete</span> Remove
            </button>
          </div>
        </div>
      `;
      
      // Insert the HTML into the container
      cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}
const cardsContainer = document.querySelector(".cards");
cardsContainer.addEventListener("click", (e) => {
  if(e.target.closest('#toggle')) {
    const card = e.target.closest('.card');
    const bookId = card.dataset.id;
    const book = myLibrary.find((object)=> {
        return object.id === bookId
      });
    toggleRead(book);
    displayBooks();
    count();
    } else if (e.target.closest('#delete')) {
      const card = e.target.closest('.card');
      const bookId = card.dataset.id;
      const bookIndex = myLibrary.findIndex(book => book.id === bookId);
      myLibrary.splice(bookIndex, 1);
      displayBooks();
      totalBook.textContent = myLibrary.length;
      count();
    }
  })

count ()
displayBooks();