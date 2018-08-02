
import { Url } from "../config/common";
import { AuthController } from "../controllers/auth-controller";

export class AuthRoutes {

    public authController: AuthController = new AuthController();
    url: string = `${Url.BaseUrl}users/`;

    public routes(app: any): void {
        // users
        // book
        app.route(this.url)
        // gET endpoint
        .get(this.authController.getUsers);

        // user signup
        app.route(`${this.url}signup`)
        // pOST endpoint
        .post(this.authController.signup.bind(this.authController));

        // user signin
        app.route(`${this.url}signin`)
        // post endpoint
        .post(this.authController.signin.bind(this.authController));

        // user detail
        app.route(`${this.url}:id`)
        // get user
        .get(this.authController.getUser)
        // update spesific user
        .put(this.authController.updateUser)
        // delete spesific user
        .delete(this.authController.deleteUser);
    }
}