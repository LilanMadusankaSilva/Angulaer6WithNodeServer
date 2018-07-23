import {Request, Response} from "express";
import { Url } from "./../constants/url";
import { BookController } from "../controllers/book-controller";

export class Routes {

    public bookController: BookController = new BookController();
    url: string = `${Url.BaseUrl}book/`;

    public routes(app: any): void {

        // book
        app.route(this.url)
        // gET endpoint
        .get(this.bookController.getBooks)
        // pOST endpoint
        .post(this.bookController.addNewBook);

        // book detail
        app.route(`${this.url}:id`)
        // get specific book
        .get(this.bookController.getBookWithId)
        // update spesific book
        .put(this.bookController.updateBook)
        // delete spesific book
        .delete(this.bookController.deleteBook);
    }
}