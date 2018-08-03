import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { BookComponent } from "./book/book.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
import { BookCreateComponent } from "./book-create/book-create.component";
import { BookEditComponent } from "./book-edit/book-edit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";


const appRoutes: Routes = [
  {
    path: "books",
    component: BookComponent,
    data: { title: "Book List" }
  },
  {
    path: "book-details/:id",
    component: BookDetailComponent,
    data: { title: "Book Details" }
  },
  {
    path: "book-create",
    component: BookCreateComponent,
    data: { title: "Create Book" }
  },
  {
    path: "book-edit/:id",
    component: BookEditComponent,
    data: { title: "Edit Book" }
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" }
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
