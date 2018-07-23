import { Request, Response } from "express";
import { Url } from "./../constants/url";

export class Routes {
    public routes(app: any): void {
        app.route(`${Url.BaseUrl}`)
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
    }
}