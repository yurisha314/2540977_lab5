const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

let booksArr = [];
let newbookID = 1;
let detailsID = 1;

app.get('/whoami', (req, res) => {
    res.json({ studentnumber: "2540977" });
});

app.get('/books', (req, res) => {
    res.json(booksArr);
});

app.get('/books/:id', (req, res) => {
    const book = booksArr.find(book => book.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).json({ error: "Book Not Found" });
    } else {
        res.json(book);
    }
});

app.post('/books', (req, res) => {
    const { title, details} = req.body;
    if (!title ||!details) {
        res.status(400).json({ error: "Bad Request" });
    } 

    const newBook = {
        id: newbookID,
        title,
        details
        };
    booksArr.push(newBook);
    newbookID++;
});


app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = booksArr.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    } 
    const { title, details} = req.body;
    if (!title || !details) {
        return res.status(400).json({ error: "Bad Request" });
    }
    booksArr[bookIndex] = {
        id: bookId,
        title,
        details
    };
     
});

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = booksArr.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    }
    booksArr.splice(bookIndex, 1);
       
    
});

app.post('/books/:id/details', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = booksArr.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    } 

    const detailKey = Object.keys(req.body)[0];
    const detailValue = req.body[detailKey];
    if (!detailKey || !detailValue) {
        return res.status(400).json({ error: "Bad Request" });
    }
    if (!booksArr[bookIndex].details) {
        booksArr[bookIndex].details = {};
    }
            
    booksArr[bookIndex].details[detailKey] = detailValue;
    res.json(booksArr[bookIndex]);
        
});

app.delete('/books/:id/details/:detailId', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = booksArr.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: "Book Not Found" });
    } 
    const detailId = req.params.detailId;
    if (!booksArr[bookIndex].details || !booksArr[bookIndex].details[detailId]) {
            return res.status(404).json({ error: "Book Not Found" });
    }
        delete booksArr[bookIndex].details[detailId];
            
});

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
