import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel',
  template: `
    <child-component parentName="'channel'" />
  `,
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
