
var { BaseUrl } = require('./base.routes.js');

module.exports = (app) => {
    const phones = require('../controllers/book.controller.js');

    // Create a new Note
    app.post(`${BaseUrl}phones`, phones.create);

    // Retrieve all phones
    app.get(`${BaseUrl}phones`, phones.findAll);

    // Retrieve a single Note with noteId
    app.get(`${BaseUrl}phones/:id`, phones.findOne);

    // Update a Note with noteId
    app.put(`${BaseUrl}phones/:id`, phones.update);

    // Delete a Note with noteId
    app.delete(`${BaseUrl}phones/:id`, phones.delete);
}