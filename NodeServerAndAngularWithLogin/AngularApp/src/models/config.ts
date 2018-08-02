
import { HttpHeaders } from "@angular/common/http";

export class SettingClass {
  WebApiUrl: String;
}

export class HttpOptionsClass {
  Headers: HttpHeaders | {
    [header: string]: string | string[];
  };
}
