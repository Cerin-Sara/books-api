// // const express = require('express');
// // const app = express();
// // const port = 4567;
// // const books = [
// //     { name: 'Spike', id: 11, breed: 'German Shepherd' },
// //      { name: 'Rex', id: 12, breed: 'Pitbull' },
// //     { name: 'Fido', id: 13, breed: 'Labrador' }, 
// //     { name: 'Buddy', id: 14, breed: 'Golden Retriever' },
// //     { name: 'Spot', id: 15, breed: 'Poodle' },
// // ]
// // app.get('/', (req, res) => {
// //     res.json(books);
// // });
// // app.get('/book/:idi', (req, res) => {
// //     res.json(books[parseInt(req.params.idi)]);
// // });
// // app.listen(port, () => console.log(`Listening on port ${port}`));



// const express = require('express')
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 4678;

// // Where we will keep books
// let books = [];

// app.use(cors());

// // Configuring body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.post('/book', (req, res) => {
//     app.post('/book', (req, res) => {
//         const book = req.body;
    
//         // Output the book to the console for debugging
//         console.log(book);
//         books.push(book);
    
//         res.send('Book is added to the database');
//     });
// });
// app.get('/books', (req, res) => {
//     res.json(books);
// });

// app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

const express = require('express');
const app = express();
const port = 4567;
const bodyParser = require('body-parser');

let books = [
    {id: 1, title: 'Book 1', author: 'Author 1'},
    {id: 2, title: 'Book 2', author: 'Author 2'},
    {id: 3, title: 'Book 3', author: 'Author 3'},
];


// Route to get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to get a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }
    res.json(book);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Route to add a new book
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
    };
    books.push(newBook);
    res.send(newBook);
});

// Route to update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }
    book.title = req.body.title;
    book.author = req.body.author;
    res.send(book);
});

// Route to delete a book by ID
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }
    const index = books.indexOf(book);
    books = [...books.slice(0, index), ...books.slice(index + 1)];
    res.send(book);
});

// Start the server
app.listen(port, () => {
    console.log(`Book API listening at http://localhost:${port}`);
});
