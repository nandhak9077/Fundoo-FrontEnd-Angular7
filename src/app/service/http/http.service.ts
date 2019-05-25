import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
// import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: "root"
})
export class HttpService {
  url: string;
  constructor(public http: HttpClient) { }
  apiBaseurl = environment.baseUrl;

  postUser(user, url) {
    var httpOptions = {
      headers: new HttpHeaders({
        //creat HTTP headers which allow the client and the server to pass additional information with the request or the response.
        "Content-Type": "application/json"
      })
    };
    // set header in your http request
    return this.http.post(this.apiBaseurl + url, user, httpOptions);
  }

  resetpassword(data, purpose: string) {
    let headers = new HttpHeaders({
      "content-Type": "application/json", //shows the type of content
      token: localStorage.getItem("token") //grabbing the token from localstorage
    });
    // set header in your http request
    return this.http.post(this.apiBaseurl + purpose, data, {
      headers: headers
    });
  }
  postWithToken(options) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('reset')
      })
    };

    console.log("httpoptions at service ",httpOptions);
    
    return this.http.post(this.apiBaseurl + options.url, options.body, httpOptions);
  }


  postJSON(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body, httpOptions);
  }
  put(url: string, body: any): any {
    //const uid = localStorage.getItem('userid')
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
       "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.put(url, body, httpOptions);
  }
  putpic(url: string, body: any): any {
    const uid = localStorage.getItem('userid')
    url = this.apiBaseurl + url +'/'+ uid;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body);
  }



  getHttp(url) {
    const userid=localStorage.getItem('userid');
    const httpTocken = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiBaseurl + url+'/'+userid, httpTocken);
  }
  getHttpLabel(url) {
    const userid=localStorage.getItem('userid');
    const httpTocken = {
      headers: new HttpHeaders({
        "content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.get(this.apiBaseurl + url+'/'+userid, httpTocken);
  }
  postJSONLabel(url: string, body: any): any {
    url = this.apiBaseurl + url;
    const httpOptions = {
      headers: new HttpHeaders({
        // "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };
    return this.http.post(url, body, httpOptions);
  }
    noteimage(image:File,noteID){
    // this.fileToUpload = image; 
    console.log("immm",image);
    // let formData = new FormData(); 
    const formData = new FormData();
    formData.append('image',image);
    // formData.append('noteimage', this.fileToUpload, this.fileToUpload.name);
    return this.http.post(this.apiBaseurl + 'noteimage' + '/' + noteID, formData);
    }
    userimage(image:File,userID){
      // this.fileToUpload = image; 
      console.log("immm",image);
      // let formData = new FormData(); 
      const formData = new FormData();
      formData.append('image',image);
      // formData.append('noteimage', this.fileToUpload, this.fileToUpload.name);
      return this.http.post(this.apiBaseurl + 'userimage' + '/' + userID, formData);
      }

      sequence(data){
        const userID=localStorage.getItem('userid') 
        console.log("immm",data);
        const httpOptions = {
          headers: new HttpHeaders({
            // "Content-Type": "application/json",
            token: localStorage.getItem("token")
          })
        };
       
        // formData.append('noteimage', this.fileToUpload, this.fileToUpload.name);
        return this.http.post(this.apiBaseurl + 'sequence' + '/' + userID, data,httpOptions);
        }


        postWithoutToken(options) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          };
          return this.http.post(this.apiBaseurl + options.url, options.body, httpOptions);
        }
        postWitToken(options) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              token: localStorage.getItem("token")
            })
          };
          return this.http.post(this.apiBaseurl + options.url, options.body, httpOptions);
        }




     
}
