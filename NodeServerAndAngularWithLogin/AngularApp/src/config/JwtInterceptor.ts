
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // // add authorization header with jwt token if available
        // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        // if (currentUser && currentUser.token) {
          if (request.url !== "http://localhost:3000/api/users/signin") {
            const tt = request.headers.keys.length;
            // tslint:disable-next-line:max-line-length
            request.headers.append("Authorization", "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzMyODk4NDgsInVzZXJuYW1lIjoibGlsYW4ifQ.wWrYT2mCsMXcVz3HiGnOAhYojJuVKhrFfirCr-VO32Q");

            const pp = request.headers.keys.length;
          }
        // }

        return next.handle(request);
    }
}
