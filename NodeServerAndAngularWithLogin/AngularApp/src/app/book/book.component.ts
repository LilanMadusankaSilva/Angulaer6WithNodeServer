import { Component, OnInit } from "@angular/core";
import { BookService } from "../../service/book.service";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.css"]
})
export class BookComponent implements OnInit {

  constructor(private api: BookService) { }

  books: any;
  displayedColumns = ["isbn", "title", "author"];
  dataSource = new BookDataSource(this.api);

  ngOnInit() {
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }

}

export class BookDataSource extends DataSource<any> {
  constructor(private api: BookService) {
    super();
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}
