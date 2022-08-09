import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread',
  template: `
  <child-component parentName="'thread'" />
`,
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
