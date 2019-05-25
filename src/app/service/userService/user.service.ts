import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, "login");
  }
  register(body: any) {
    return this.service.postUser(body, "register");
  }
  forgotpassword(body: any) {
    return this.service.postUser(body, "forgot");
  }
  resetpassword(requestBody) {
    const token = requestBody.token;
    // console.log('reset pass');
    const option = {
      url: 'reset',
      body: requestBody
    };
    return this.service.postWithToken(option);
  }
  profilePic(body: any) {
    console.log("res @ user service===>",body);
    return this.service.putpic("userimage",body)
  }
}
