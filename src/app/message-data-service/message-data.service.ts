import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageDataService {

  thread : boolean = false;
  threadS: boolean = false;
  threadB: boolean = false;
  messageId : string = '';
  creatorsId : string = '';
  threadData: any = '';
  anwsers: Array<any> = [];


  private idSource = new BehaviorSubject<string>(this.getLastChannelId())
  currentId = this.idSource.asObservable();

  private threadToggle = new BehaviorSubject<boolean>(this.thread)
  currentToggle = this.threadToggle.asObservable()

  private threadData$ = new BehaviorSubject<Array<any>>(this.threadData)
  currentThread = this.threadData$.asObservable()

  private threadIndex = new BehaviorSubject<Number>(0)
  currentIndex = this.threadIndex.asObservable()

  constructor() { 
    
  }

  changeId(id : string) {
    this.idSource.next(id)
    console.log(this.currentId)
  }

  openThread(threadData:any, index:Number) {
    this.toggleThread()
    this.updateThread(threadData, index)
  }

  toggleThread() {
    this.threadToggle['_value']? this.threadToggle.next(false) : this.threadToggle.next(true) 
  }

  toggleThreadOff() {
    this.threadToggle.next(false)
  }

  updateThread(threadData:any, index:Number) {
   this.threadData$.next(threadData)  
   this.updateIndex(index)
   console.warn(this.threadData$)
  }

  updateIndex(index:Number){
    this.threadIndex.next(index)
  }
  getLastChannelId() {
    return localStorage.getItem('channelId')
  }
}
