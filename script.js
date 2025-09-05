const myLibrary = [];


function Book(name, author, pages, read, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

}
Book.prototype.toggleRead = function () {
    this.read = !this.read;
}


function addBookToLibrary(name, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(name, author, pages, read, id);
    myLibrary.push(newBook);

}


function displayBooks() {
    const container = document.getElementById("library");
    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const card = document.createElement("article");
        card.className = "book-card";

        card.innerHTML = `
        <h3>${book.name}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
         <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? 'Already read' : 'Not read yet'}</p>
      <p><small>ID: ${book.id}</small></p>
      <button class="toggle-btn" data-id="${book.id}">
        ${book.read ? 'Mark as unread' : 'Mark as read'}
      </button>
      <button class="remove-btn" data-id="${book.id}">Remove</button>
        `;

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeBook(book.id);
        });

        const toggleBtn = card.querySelector(".toggle-btn");
        toggleBtn.addEventListener("click", (e) => {
            toggleBookRead(e.currentTarget.dataset.id);
        })

        container.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayBooks();



const newBookBtn = document.getElementById("new-book-btn");
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
    setTimeout(() => document.getElementById('book-name').focus(), 0);
});

cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

// Intercetta il submit per evitare il refresh/pagina che tenta di inviare a un server
form.addEventListener('submit', (event) => {
    event.preventDefault(); // <<-- fondamentale

    const name = document.getElementById('book-name').value.trim();
    const author = document.getElementById('book-author').value.trim();
    const pages = parseInt(document.getElementById('book-pages').value, 10);
    const read = document.getElementById('book-read').checked;

    if (!name || !author || !pages || pages < 1) {
        // piccola validazione extra lato JS
        alert('Please fill all fields correctly.');
        return;
    }

    addBookToLibrary(name, author, pages, read);
    displayBooks();

    form.reset();
    dialog.close();
});



function removeBook(id) {
    // cerca l'indice del libro con quell'id
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1); // rimuove 1 elemento dall'array
        displayBooks(); // aggiorna la vista
    }
}

function toggleBookRead(id) {
    const book = myLibrary.find(b => b.id === id);
    if (!book) return;
    book.toggleRead();  // usa il metodo del prototype
    displayBooks();     // ridisegna la lista
}
