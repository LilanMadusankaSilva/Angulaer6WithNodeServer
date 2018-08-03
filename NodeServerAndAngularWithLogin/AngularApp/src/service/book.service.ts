import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Setting, Config } from "./../config/config";

const apiUrl = `${Setting.WebApiUrl}books`;

@Injectable({
  providedIn: "root"
})
export class BookService {

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

  getBooks(): Observable<any> {
    return this.http.get(apiUrl, Config.getHttpHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getBook(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get(url, Config.getHttpHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postBook(data): Observable<any> {
    return this.http.post(apiUrl, data, Config.getHttpHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBook(id, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data, Config.getHttpHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBook(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url, Config.getHttpHeaders())
      .pipe(
        catchError(this.handleError)
      );
  }
}
