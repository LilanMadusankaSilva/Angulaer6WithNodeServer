import { Component, OnInit } from "@angular/core";
import { BookService } from "../../service/book.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"]
})
export class BookDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: BookService, private router: Router) { }

  book = {};

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params["id"]);
  }

  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }

  deleteBook(id) {
    this.api.deleteBook(id)
      .subscribe(res => {
          this.router.navigate(["/books"]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
