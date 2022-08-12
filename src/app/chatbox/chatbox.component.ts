import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { Channel } from 'src/models/channel.class';
import { Answer } from 'src/models/answer.class';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  @Input() parentName: string;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link']                         // link and image, video
    ]
  };
  preview: string;
  messageValue: string = '';
  currentFile = null;
  loading: boolean = false;
  uploaded: boolean = false;
  saved: boolean = false;
  channelId: string = '';
  userId: string = '';
  message: Message = new Message();
  channel: Channel = new Channel();
  answer: Answer = new Answer();
  idOfMessage;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }


  ngOnInit(): void {
    this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; })
    this.userId = JSON.parse(localStorage.getItem('slackCloneUser'));
    this.loadChannel();
  }


  ngOnDestroy(): void {
    if (this.uploaded && !this.saved) this.deleteLastUpload();
  }

  /**
   * deletes the last Upload to save space at backend.
   */
  deleteLastUpload() {
    if (this.currentFile !== null) {
      const storageRef = this.currentFile;
      storageRef.delete();
      this.preview = '';
      this.currentFile = null;
    }
  }

  /**
   * 
   * Uploads picture to the fire storage.
   */
  uploadFile(event) {
    this.loading = true;
    const file = event.target.files[0];
    const filePath = 'message_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.saveUrl(fileRef))).subscribe();
  }

  /**
   *  saves url of image to a variable
   *
   */
  saveUrl(fileRef) {
    fileRef.getDownloadURL().subscribe(url => { this.preview = url; });
    this.loading = false;
    this.uploaded = true;
  }


  saveAndSend() {
    this.fillObject();
    this.loading = true;
    this.firestore
      .collection('channel')
      .doc(this.channelId)
      .update(this.channel.toJson())
      .then(() => {
        this.loading = false;
        location.reload();// andere Option überlegen um Inhalt von Quill zu löschen und Bild zurückzusetzen;
      });
  }


  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.messageValue = event['editor']['root']['innerHTML'];
  }


  fillObject() {
    if (this.parentName == 'channel') this.fillMessage();
    if (this.parentName == 'thread') this.fillAnswer();
  }


  fillMessage() {
    this.message.creatorId = this.userId;
    if (this.messageValue) this.message.message = this.messageValue;
    if (this.preview != null) this.message.pictureUrl = this.preview;
    this.message.timestamp = Date.now();
    this.message.messageId = '' + Math.floor(Math.random() * 1000000000);
    this.channel.messages.push(JSON.stringify(this.message));
  }


  fillAnswer() {//not sure if works. Has to be tested in Thread-component.
    this.route.firstChild.paramMap.subscribe(paramMap => { this.idOfMessage = paramMap['params']['id2']; })
    this.answer.creatorId = this.userId;
    this.answer.timestamp = Date.now();
    if (this.preview != null) this.answer.pictureUrl = this.preview;
    if (this.messageValue) this.answer.message = this.messageValue;
    let channelToPushIn = this.channel.messages;
    for (let i = 0; i < channelToPushIn.length; i++) {
      const element = channelToPushIn[i];
      if (element['messageId'] = this.idOfMessage) element[this.idOfMessage]['answers'].push(this.answer);
    }
    this.channel.messages.push(JSON.stringify(channelToPushIn));
  }


  loadChannel() {
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((changes: any) => {
      let dataFromChannel = changes;
      if (dataFromChannel.messages.length > 0) this.channel.messages = dataFromChannel.messages;
      if (dataFromChannel.users.length > 0) this.channel.users = dataFromChannel.users;
      if (dataFromChannel.channelId) this.channel.channelId = dataFromChannel.chanelId;
      if (dataFromChannel.channelName) this.channel.channelName = dataFromChannel.channelName;
    });
  }

}
