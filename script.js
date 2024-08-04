document.addEventListener("DOMContentLoaded", () => {
    const bookForm = document.getElementById('book-form');
    const bookList = document.getElementById('book-list');

    // Load books from local storage
    loadBooks();

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting the traditional way

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (title && author && isbn) {
            const book = { title, author, isbn };
            addBook(book);
            saveBook(book);
            bookForm.reset(); // Reset the form fields
        } else {
            alert('All fields are required.');
        }
    });
});

function addBook(book) {
    const bookList = document.getElementById('book-list');
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author} (ISBN: ${book.isbn})`;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteBook(book.isbn); // Use ISBN to delete
        li.remove();
    });

    li.appendChild(deleteButton);
    bookList.appendChild(li);
}

function saveBook(book) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(addBook);
}

function deleteBook(isbn) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.isbn !== isbn);
    localStorage.setItem('books', JSON.stringify(books));
}
