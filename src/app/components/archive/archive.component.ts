
import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../service/http/http.service';
import {NoteServiceService} from '../../service/noteService/note-service.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
card=[];
archivedCard=[];
archived=[];
more='archive';

  constructor(public http: HttpService, private noteService: NoteServiceService) { }
  cards: any = [];
  wrap:string="wrap";
  direction
  view
  layout

  ngOnInit() {
    this.getArchiveNotes()
    this.noteService.getView().subscribe((res:any)=>{
     
        this.view = res;
        this.direction = this.view.data;
        this.layout = this.direction + " " + this.wrap;
    });
  }
  getArchiveNotes(){
    this.http.getHttp("getNotes").subscribe(data => {
      this.card=data['data']
      console.log(this.card)
      for(let i=0;i<this.card.length;i++){
        if(this.card[i].archive){
          console.log("Entered");
          this.archivedCard.push(this.card[i]);
          console.log(this.archivedCard);
        }
      }
    }),err=>{
      console.log(err)
    }
    
}
}