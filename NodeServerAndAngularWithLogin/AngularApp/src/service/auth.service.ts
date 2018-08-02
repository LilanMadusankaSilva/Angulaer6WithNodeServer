
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Setting } from "./../config/config";

const apiUrl = `${Setting.WebApiUrl}users`;

import * as SessionStorage from "./../config/session-storage";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    // "Authorization": SessionStorage.default.getToken()
  })
};
const httpOptionsSignin = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient) {
   }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  signupUser(data): Observable<any> {
    return this.http.post(`${apiUrl}/signup`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  signinUser(data): Observable<any> {
    return this.http.post(`${apiUrl}/signin`, data, httpOptionsSignin)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<any> {
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getUser(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postUser(data): Observable<any> {
    return this.http.post(apiUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(id, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
