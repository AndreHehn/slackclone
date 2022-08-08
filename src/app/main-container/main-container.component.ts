import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  title = 'slackclone';
  connected = false;
  showSearch = false;

  constructor(private router: Router) { }


  public ngOnInit() {

  }



}
