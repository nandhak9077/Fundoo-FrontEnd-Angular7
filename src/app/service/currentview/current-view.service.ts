import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentViewService {

  view = new BehaviorSubject(true);
  currentView=this.view.asObservable();

  viewValue: boolean;
  
  viewChange()
  {
    this.currentView.subscribe(
      response=>this.viewValue=response
    )
    this.view.next(!this.viewValue)
  }
}
