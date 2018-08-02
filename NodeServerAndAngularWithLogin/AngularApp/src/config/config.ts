
import * as SessionStorage from "./../config/session-storage";

import { HttpHeaders } from "@angular/common/http";
import { SettingClass, HttpOptionsClass } from "../models/config";

export const Setting: SettingClass = {
  WebApiUrl: "http://localhost:3000/api/"
};

export const HttpOptions: HttpOptionsClass = {
  Headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": SessionStorage.default.getToken()
  })
};
