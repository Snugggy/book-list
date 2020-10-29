// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor 
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // insert cols
    row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href ="#" class="delete">X</a></td>
    `;

    // Add row to list 
    list.appendChild(row);

}

// Clear form inputs 
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

}

// Show alert 
UI.prototype.showAlert = function(msg, msgType) {
    // Create div
    const div = document.createElement('div');
    // Add class
    div.className = `alert ${msgType}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);

    // Remove message after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
        UI.prototype.showAlert('Book deleted', 'success');
    }
    
}



// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {

        // Add book
        ui.addBookToList(book);

        ui.showAlert('Book added!', 'success');

        ui.clearFields();
    }

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();
    // Delete book
    ui.deleteBook(e.target);
    // Show message
    
    
    e.preventDefault();
});
