import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  message = '';
  constructor() { }

  ngOnInit(): void {
  }

  print() {
    console.log(this.message);
    // write code to save it in firestore later.
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.message = event['editor']['root']['innerHTML'];
  }
}
