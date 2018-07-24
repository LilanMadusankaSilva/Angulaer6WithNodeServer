
import { BookRoutes } from "./book-routes";

export class Routes {
    public routeBook: BookRoutes = new BookRoutes();

    public routes(app: any): void {
        this.routeBook.routes(app);
    }
}