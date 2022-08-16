import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageDataService {

  thread : boolean = false;
  messageId : string = '';
  creatorsId : string = '';
  threadData: string = '';
  private idSource = new BehaviorSubject<string>(this.getLastChannelId())
  currentId = this.idSource.asObservable();


  private threadToggle = new BehaviorSubject<boolean>(this.thread)
  currentToggle = this.threadToggle.asObservable()

  private threadData$ = new BehaviorSubject<String>(this.threadData)
  currentThread = this.threadData$.asObservable()



  constructor() { 
    
  }

  changeId(id : string) {
    this.idSource.next(id)
  }

  openThread(threadData:any) {
    this.toggleThread()
    //console.error(threadData)
    this.updateThread(threadData)
  }

  toggleThread() {
    this.threadToggle['_value']? this.threadToggle.next(false) : this.threadToggle.next(true) 
  }

  toggleThreadOff() {
    this.threadToggle.next(false)
  }

  updateThread(threadData:string) {
   this.threadData$.next(threadData)  
   console.warn(this.threadData$['_value'])
  }

  getLastChannelId() {
    return localStorage.getItem('channelId')
  }
}
