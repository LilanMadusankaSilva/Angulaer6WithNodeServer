
import { Url } from "../config/common";
import { AuthController } from "../controllers/auth-controller";

export class AuthRoutes {

    public authController: AuthController = new AuthController();
    url: string = `${Url.BaseUrl}users/`;

    public routes(app: any): void {
        // users
        app.route(this.url)
        .post((req: Request, res: Response) => {
            const tt: number = 10;
        });

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
        // update spesific user
        .put(this.authController.updateUser.bind(this.authController))
        // delete spesific user
        .delete(this.authController.deleteUser.bind(this.authController));
    }
}