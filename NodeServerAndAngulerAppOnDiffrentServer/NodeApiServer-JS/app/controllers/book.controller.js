
const Book = require('../models/book.model.js');

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Create a Book
    const book = new Book(req.body);

    // Save Book in the database
    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Book."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single nook with a id
exports.findOne = (req, res) => {
    Book.findById(req.params.id)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving book with id " + req.params.id
        });
    });
};

// Update a nook identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Book content can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating book with id " + req.params.id
        });
    });
};

// Delete a nook with the specified id in the request
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.id)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete book with id " + req.params.id
        });
    });
};