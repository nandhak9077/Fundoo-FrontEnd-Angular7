import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { HttpService } from "../../service/http/http.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { UserService } from "../../service/userService/user.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  response: any;
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {}
  model = {};
  hide = true;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]); //Formcontrol for binding the value.
  password = new FormControl("", [Validators.required]);

  //method to show email error message

  login() {
    try {
      if (this.emailFormControl.value == "" || this.password.value == "")
        throw "fields cannot be empty";

      var reqbody = {
        email: this.emailFormControl.value,
        password: this.password.value
      };
      console.log(reqbody);

      this.userService.login(reqbody).subscribe(
        (data:any) => {
          console.log("AAAAAAAAAAA",data);
          this.response = data;
          console.log("BBBBBB",data.data[0]._id);
          localStorage.removeItem("token");
          localStorage.setItem("token", this.response.token);
          localStorage.removeItem("userid");
          localStorage.setItem("userid", data.data[0]._id);
          localStorage.removeItem("email");
          localStorage.setItem("email", this.emailFormControl.value);
          localStorage.removeItem("name");
          localStorage.setItem("name", data.data[0].firstname);
          localStorage.removeItem("image");
          localStorage.setItem("image",  data.data[0].userimage);
          // localStorage.setItem('lname',this.response.lname)
          //snackbar to show messages.
          this.snackBar.open("Logged in successfully!!", "ok", {
            duration: 5000
          });
          this.router.navigate(["dashboard"]);
        },
        err => {
          console.log("err", err);
          this.snackBar.open("Logged in failed!!", "ok", { duration: 5000 });
        }
      );
    } catch {
      this.snackBar.open("Email or Password can not be empty!", "", {
        duration: 5000
      });
    }
  }
  register() {
    this.router.navigate(["register"]);
  }
  forgotpassword() {
    this.router.navigate(["forgotpassword"]);
  }
  matcher = new MyErrorStateMatcher();
}
