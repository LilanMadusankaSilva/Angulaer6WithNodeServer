
import { Url } from "../config/common";
import { BookController } from "../controllers/book-controller";

export class BookRoutes {

    public bookController: BookController = new BookController();
    url: string = `${Url.BaseUrl}books/`;

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