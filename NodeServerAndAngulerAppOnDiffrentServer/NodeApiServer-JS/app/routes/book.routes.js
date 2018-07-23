
var { BaseUrl } = require('./base.routes.js');

module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    // Create a new Note
    app.post(`${BaseUrl}books`, books.create);

    // Retrieve all books
    app.get(`${BaseUrl}books`, books.findAll);

    // Retrieve a single Note with noteId
    app.get(`${BaseUrl}books/:id`, books.findOne);

    // Update a Note with noteId
    app.put(`${BaseUrl}books/:id`, books.update);

    // Delete a Note with noteId
    app.delete(`${BaseUrl}books/:id`, books.delete);
}