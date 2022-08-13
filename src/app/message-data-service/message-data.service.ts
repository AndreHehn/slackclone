import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageDataService {


  private idSource = new BehaviorSubject<string>(this.getLastChannelId())
  currentId = this.idSource.asObservable();

  constructor() { 
    
  }

  changeId(id : string){
    this.idSource.next(id)
  }

  getLastChannelId(){
    return localStorage.getItem('channelId')
  }
}
