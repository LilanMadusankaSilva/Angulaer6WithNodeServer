
import * as SessionStorage from "./../../config/session-storage";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./../../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: UserService) { }

  userName: string;
  passWord: string;

  ngOnInit() {
    if (SessionStorage.default.getToken()) {
      this.router.navigate(["/books"]);
    }
  }

  onSubmit(): void {
    const userInfo = {
      username: this.userName,
      password: this.passWord
    };

    this.api.signinUser(userInfo)
    .subscribe(res => {
          SessionStorage.default.setToken(res["token"]);
          this.router.navigate(["/books"]);
        }, (err) => {
          alert("Login failed wrong user credentials");
          console.log(err);
        });
  }
}
