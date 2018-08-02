
import { GeneralClass, MongoDbClass, UrlClass, SessionClass } from "models/model";

export const Url: UrlClass = {
    BaseUrl: "/api/",
    CrossOriginUrl: "http://localhost:4200",
    SignInUrlPrefix : "/api/users/signin"
};

export const MongoDb: MongoDbClass = {
    Url: "mongodb://localhost:27017/LilanTest"
};

export const General: GeneralClass = {
    Secret: "ogA9ppB$S!dy!hu3Rauvg!L96"
};

export const Session: SessionClass = {
    User: "user"
};

export class Common {
    public getToken (headers: any): void {
        if (headers && headers.authorization) {
          const parted: any = headers.authorization.split(" ");
          if (parted.length === 2) {
            return parted[1];
          } else {
            return null;
          }
        } else {
          return null;
        }
    }
}