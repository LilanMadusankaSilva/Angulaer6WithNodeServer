
import { BookRoutes } from "./book-routes";
import { AuthRoutes } from "./auth-routes";

export class Routes {
    public routeBook: BookRoutes = new BookRoutes();
    public routeAuth: AuthRoutes = new AuthRoutes();

    public routes(app: any): void {
        this.routeBook.routes(app);
        this.routeAuth.routes(app);
    }
}