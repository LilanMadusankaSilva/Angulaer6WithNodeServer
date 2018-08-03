
import * as SessionStorage from "./../config/session-storage";

import { HttpHeaders } from "@angular/common/http";
import { SettingClass } from "../models/config";

class Common {

  public getHttpHeaders() {
    let headers =  new HttpHeaders();

    // allow access control orgin
    // headers = headers.append("Pragma", "no-cache");
    // headers = headers.append("Content-Type", "application/json");

    // If token exsists add that token to request
    const token = SessionStorage.default.getToken();
    if (token !== null) {
      headers = headers.append("Authorization", token);
    }

    return {
      headers: headers
    };
  }

}

export const Setting: SettingClass = {
  WebApiUrl: "http://localhost:3000/api/"
};

export const Config = new Common();
