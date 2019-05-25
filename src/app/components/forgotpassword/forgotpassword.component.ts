import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { UserService } from 'src/app/service/userService/user.service';
import { MatSnackBar } from '@angular/material';

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
  selector: "app-forgotpassword",
  templateUrl: "./forgotpassword.component.html",
  styleUrls: ["./forgotpassword.component.scss"]
})
export class ForgotpasswordComponent implements OnInit {
  constructor(private userService: UserService,private router: Router,private snackBar: MatSnackBar) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
 
  onsubmit() {
    console.log(this.email.value);

    const requestBody = {
      email: this.email.value
    };

    console.log(requestBody);
    this.userService.forgotpassword(requestBody).subscribe(data => {
      console.log("At forget password comp: ",data);
      this.snackBar.open("Check your mail now", "ok", { duration: 5000 });
    },
      error => {
        console.log("error at forget comp: ",error);
        this.snackBar.open("Interupt occurs , invalid mailID", "ok", { duration: 5000 });
      });
  }
  
  
  ngOnInit() {}

  login() {
    this.router.navigate(["login"]);
  }
}
