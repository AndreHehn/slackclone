import { Component, Input, OnInit, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/models/message.class';
import { Channel } from 'src/models/channel.class';
import { Answer } from 'src/models/answer.class';
import { MessageDataService } from '../message-data-service/message-data.service';
import { FormControl, FormGroup } from '@angular/forms';

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
      ['link']
    ]
  };

  modulesSmall = {
    "toolbar": false
  }
  previewChannel: string;
  previewThread: string;
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
  showPreview: boolean = false;
  sendable: boolean = false;
  form!: FormGroup;
  @Input() parent: string;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    public messageService: MessageDataService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'text': new FormControl()
    });
    if (this.route.firstChild) this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; });
    if (this.route.firstChild) this.route.firstChild.paramMap.subscribe(paramMap => { if (paramMap['params']['id2']) this.idOfMessage = paramMap['params']['id2']; });
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
      this.previewThread = '';
      this.previewChannel = '';
      this.currentFile = null;
    }
  }

  /**
   * 
   * Uploads picture to the fire storage.
   * Unfortunately, i only got it work by splitting the upload events that way
   */
  uploadFileThread(event) {
    this.sendable = false;
    const file = event.target.files[0];
    const filePath = 'message_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.saveUrlThread(
      fileRef))).subscribe();
    this.sendable = true;
    this.showPreview = true;
  }

  uploadFileChannel(event) {
    this.sendable = false;
    const file = event.target.files[0];
    const filePath = 'message_images' + Math.floor(Math.random() * 1000000000);
    const fileRef = this.storage.ref(filePath);
    this.currentFile = fileRef;
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.saveUrlChannel(
      fileRef))).subscribe();
    this.sendable = true;
    this.showPreview = true;
  }

  /**
   *  saves url of image to a variable
   *
   */
  saveUrlThread(fileRef) {
    fileRef.getDownloadURL().subscribe(url => { this.previewThread = url; });
    this.uploaded = true;
  }

  saveUrlChannel(fileRef) {
    fileRef.getDownloadURL().subscribe(url => { this.previewChannel = url; });
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
    this.showPreview = false;
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    if (event) { this.messageValue = event['editor']['root']['innerHTML']; }
    if (this.route.firstChild) this.route.firstChild.paramMap.subscribe(paramMap => { this.channelId = paramMap['params']['id1']; });
    if (this.route.firstChild) this.route.firstChild.paramMap.subscribe(paramMap => { this.idOfMessage = paramMap['params']['id2']; });
    this.loadChannel();
  }

  fillObject() {
    if (this.parent == 'channel') this.fillMessage(), this.scrollChannel();
    if (this.parent == 'thread') this.fillAnswer(), this.scrollThread();
  }

  fillMessage() {
    this.message.creatorId = this.userId;
    this.message.timestamp = Date.now();
    if (this.messageValue) this.message.message = this.messageValue;
    if (this.previewChannel != null) this.message.pictureUrl = this.previewChannel;
    this.message.messageId = '' + Math.floor(Math.random() * 1000000000);
    this.channel.messages.push(JSON.stringify(this.message));
  }

  fillAnswer() {
    this.answer.creatorId = this.userId;
    this.answer.timestamp = Date.now();
    if (this.previewThread != null) this.answer.pictureUrl = this.previewThread;
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
    if (this.channelId) {
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
