import { Component, OnInit, NgModule, Inject } from "@angular/core";
import { ImageCropperModule } from "ngx-image-cropper";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { UserService } from "../../service/userService/user.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { from } from "rxjs";
import { HttpService } from 'src/app/service/http/http.service';

@Component({
  selector: "app-imagecropper",
  templateUrl: "./imagecropper.component.html",
  styleUrls: ["./imagecropper.component.scss"]
})
export class ImagecropperComponent implements OnInit {
  imagecroped: any;
  response: any;
  img: any;
  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialog,
    private userService: UserService,
    private http: HttpService
  ) { }

  ngOnInit() { }

  imageCropped($event) {
    console.log("data", this.data);

    console.log("cropper==>", $event);

    this.img = $event.file;
    console.log("kdsghfdsghfdsakljidfhsifhdkaishihf", this.img);
  }

  close() {
    this.dialogRef.close();
  }
  submit() {
    var formData = new FormData();
    formData.append("image", this.img);
    this.userService.profilePic(formData).subscribe(data => {
      console.log("------------------------------", data.message.userimage);
      localStorage.setItem("profilepic", data.message.userimage);
      this.dialogRef.close(data);
      this.response = data;
      // localStorage.setItem("image", this.response.userimage);
    });
  }

  fileChangeEvent(event: any) {
    // this.imageChangedEvent = event;
    const image = event.target.files[0];
    const userID = localStorage.getItem('userid')
    // console.log("file ",file);
    // console.log("file... ",this.fileToUpload);
    const data = {
      'image': image,
      'userID': userID
    }
    console.log("created image object", data);
    this.http.userimage(image, userID).subscribe(data => {
      console.log(data);
    },
      error => {
        console.log("error message");

        console.log(error);
      });
  }

}
