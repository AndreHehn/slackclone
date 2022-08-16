import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-anwser-card',
  templateUrl: './thread-anwser-card.component.html',
  styleUrls: ['./thread-anwser-card.component.scss']
})
export class ThreadAnwserCardComponent implements OnInit {
  @Input() anwser:any = '';
  constructor() { }

  ngOnInit(): void {
    console.log(this.anwser, 'HERRRRRE')
  }

}
