
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output
} from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatDialog, } from "@angular/material";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';
import { DOCUMENT } from '@angular/common';
import { ImagecropperComponent } from '../imagecropper/imagecropper.component'
import { DataserviceService } from 'src/app/service/dataservice/dataservice.service';
import { LabelseditComponent } from '../labelsedit/labelsedit.component'
import { from } from 'rxjs';
// import { ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  message: string = "Keep";
  Search: string;
  labelList: any;
  email: any;
  username: string;
  img: string;
  labelsList: any
  private _mobileQueryListener: () => void;

  constructor(
    @Inject(DOCUMENT) private document: any,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private notes: NoteServiceService,
    private data: DataserviceService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
  }

  ngOnInit() {
    this.getLabels()
    this.islist = true;
    this.isClicked = false;
    this.img = localStorage.getItem('profilepic');
  }
  islist;
  isClicked;
  changeview() {
    
    if (this.islist) {
      this.islist = false;
      console.log("list", this.islist);
      this.isClicked = true;
    }

    else {

      this.isClicked = false;
      console.log("grid", this.isClicked);
      this.islist = true;
    }
    this.notes.gridview();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isclick() {
    return false;
  }

  refresh(): void {
    window.location.reload();
  }
  note() {
    this.message = "Keep"
    this.router.navigate(['dashboard/note']);
  }
  reminders() {

    this.message = "Reminders"
    this.router.navigate(['dashboard/reminders'])
  }
  signout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  archive() {
    this.message = "Archive"
    this.router.navigate(['dashboard/archive']);
  }
  trashBox() {
    this.message = "Trash"
    this.router.navigate(['dashboard/trash']);
  }
  startSearch() {
    this.router.navigate(['dashboard/search']);
  }
  editlabes() {
    this.router.navigate(['dashboard/labels'])
  }
  lookfor() {
    // this.changeMessage(this.Search)
    this.data.changeMessage(this.Search)
  }

  sidenav() {
    console.log('sidenav');

  }
  fileUpload($event) {
    console.log("fileupload", $event);

    this.setProfilePic($event)
  }
  setProfilePic($event) {
    const dialogRef = this.dialog.open(ImagecropperComponent, {
      width: '600px',
      data: $event
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      } this.img = result.data;
      localStorage.setItem('image', this.img)
    })
  }

  openSnackBar() {
    this.snackBar.open('Signed out successfully', 'Ok', { duration: 2000 })
  }
  goToUrl(): void {
    this.document.location.href = 'https://www.google.com';
  }
  goToUrl1(): void {
    this.document.location.href = 'https://www.google.com/intl/en-GB/drive';
  }
  goToUrl2(): void {
    this.document.location.href = 'https://www.google.com/maps';
  }
  goToUrl3(): void {
    this.document.location.href = 'https://www.youtube.com';
  }
  goToUrl4(): void {
    this.document.location.href = 'https://www.google.com/intl/en-GB/gmail/about';
  }
  goToHelpUrl() : void {
    this.document.location.href = 'https://support.google.com/keep/#topic=6262468';
  }
  openLabel() {
    {
      try {
        const dialogRef = this.dialog.open(LabelseditComponent, {
          width: 'auto',
          data: {}

        })

      } catch (error) {
        console.log("error occured");
      }
    }
  }

  getLabels() {
    try {
      var userid = localStorage.getItem("userid")
      this.notes.getLableList().subscribe(data => {
        console.log("labels in labels edit comp==>", data);

        this.labelsList = data['data'];
        this.labelsList = this.labelsList.reverse()
        console.log("svg", this.labelsList);

      })
    } catch (error) {
      console.log("error at getting labels in dashboard");
    }
  }

  sendLable(lable) {
    this.data.sendLable(lable)
  }
}
