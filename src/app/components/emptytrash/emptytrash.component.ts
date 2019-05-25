import { Component, OnInit } from '@angular/core';
//import { UserService } from 'src/app/service/userService/user.service';
import { NoteServiceService } from 'src/app/service/noteService/note-service.service';

@Component({
  selector: 'app-emptytrash',
  templateUrl: './emptytrash.component.html',
  styleUrls: ['./emptytrash.component.scss']
})
export class EmptytrashComponent implements OnInit {
  cards:any[];trash : Boolean
  constructor(private noteService : NoteServiceService) { }

  ngOnInit() {
  }

  emptybin(){
    console.log("adei");
  
   
   const requestBody = {
   
     trash : true
   }
    this.noteService.emptyTrash(requestBody)
    .subscribe(data => {
        console.log('data', data);
        this.cards=data['result'];
    }, (error) => {
        console.log('error', error);
    })
  }
  refresh(): void {
    window.location.reload();
  }


}
