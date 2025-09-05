 const myLibrary = [];


function Book(name, author, pages, read, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

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
        `;
        container.appendChild(card);
    });
}

addBookToLibrary("The Hobbit", "Tolkien", 295, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayBooks();
