import { Component, Input, OnInit, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { Channel } from 'src/models/channel.class';
import { Answer } from 'src/models/answer.class';
import { ChannelComponent } from '../channel/channel.component';
import { ThreadComponent } from '../thread/thread.component';
import { MessageDataService } from '../message-data-service/message-data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  template: '{{parentName.comp}}',
  styleUrls: ['./chatbox.component.scss']
})

export class ChatboxComponent implements OnInit {

  @Input() parentName: string;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link']
    ]
  };
  preview: string;
  messageValue: string = '';
  currentFile: AngularFireStorageReference = null;
  cleared: boolean = true;
  uploaded: boolean = false;
  saved: boolean = false;
  channelId: string = '';
  userId: string = '';
  message: Message = new Message();
  channel: Channel = new Channel();
  answer: Answer = new Answer();
  idOfMessage: string;
  sendable: boolean = false;
  form!: FormGroup;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public messageService: MessageDataService,
    @Optional() public parentIsChannel?: ChannelComponent,
    @Optional() public parentIsThreadl?: ThreadComponent,
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'text': new FormControl()
    });
    this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; });
    this.route.firstChild.paramMap.subscribe(paramMap => { if (paramMap['params']['id2']) this.idOfMessage = paramMap['params']['id2']; });
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
    this.sendable = false;
    const file = event.target.files[0];
    const filePath = 'message_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.saveUrl(fileRef))).subscribe();
    this.sendable = true;
  }

  /**
   *  saves url of image to a variable
   *
   */
  saveUrl(fileRef) {
    fileRef.getDownloadURL().subscribe(url => { this.preview = url; });
    this.uploaded = true;
  }

  saveAndSend() {
    this.fillObject();
    this.firestore
      .collection('channel')
      .doc(this.channelId)
      .update(this.channel.toJson())
      .then(() => {
        this.form = new FormGroup({
          'text': new FormControl()
        });
      });
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.messageValue = event['editor']['root']['innerHTML'];
    this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; });
    this.route.firstChild.paramMap.subscribe(paramMap => { this.idOfMessage = paramMap['params']['id2']; });
    this.loadChannel();
  }

  fillObject() {
    if (this.parentIsChannel) this.fillMessage(), this.scrollChannel();
    if (this.parentIsThreadl) this.fillAnswer(), this.scrollThread();
  }

  fillMessage() {
    this.message.creatorId = this.userId;
    if (this.messageValue) this.message.message = this.messageValue;
    if (this.preview != null) this.message.pictureUrl = this.preview;
    this.message.timestamp = Date.now();
    this.message.messageId = '' + Math.floor(Math.random() * 1000000000);
    this.channel.messages.push(JSON.stringify(this.message));
  }

  fillAnswer() {
    this.answer.creatorId = this.userId;
    this.answer.timestamp = Date.now();
    if (this.preview != null) this.answer.pictureUrl = this.preview;
    if (this.messageValue) this.answer.message = this.messageValue;
    for (let i = 0; i < this.channel.messages.length; i++) {
      const message = this.channel.messages[i];
      let wantedMessage = JSON.parse(message);
      if (wantedMessage.messageId == this.idOfMessage) {
        wantedMessage.answers.push(this.answer);
        this.channel.messages[i] = JSON.stringify(wantedMessage);
      }
    }
  }

  loadChannel() { //d2
    this.sendable = false;
    this.channel = new Channel();
    // console.warn(this.channelId)
    this.firestore.collection('channel').doc(this.channelId).valueChanges().subscribe((changes: any) => {
      let dataFromChannel = changes;
      if (dataFromChannel.messages.length > 0) this.channel.messages = dataFromChannel.messages;
      if (dataFromChannel.users.length > 0) this.channel.users = dataFromChannel.users;
      if (dataFromChannel.channelId) this.channel.channelId = dataFromChannel.channelId;
      if (dataFromChannel.channelName) this.channel.channelName = dataFromChannel.channelName;
      if (dataFromChannel.type) this.channel.type = dataFromChannel.type;
      this.sendable = true;
    });
  }

  scrollChannel() {
    setTimeout(() => {
      let messageContainer = document.getElementById('messageContainer');
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 50);
  }

  scrollThread() {
    setTimeout(() => {
      let answerContainer = document.getElementById('answerContainer');
      answerContainer.scrollTop = answerContainer.scrollHeight;
    }, 50);
  }

}
