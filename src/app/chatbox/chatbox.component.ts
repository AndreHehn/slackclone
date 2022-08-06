import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
      ['link']                         // link and image, video
    ]
  };
  preview: string;
  message: string = '';
  currentFile = null;
  loading: boolean = false;
  uploaded: boolean = false;
  uploadPercent: Observable<number>;
  saved: boolean = false;


  constructor(private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.uploaded && !this.saved) { this.deleteLastUpload(); }
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
    this.uploadPercent = task.percentageChanges();    // observe percentage changes
    task.snapshotChanges().pipe(
      finalize(() => this.saveUrl(fileRef))
    ).subscribe();
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
    console.log(this.message);
    // write code to save it in firestore later.
  }


  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.message = event['editor']['root']['innerHTML'];
  }
}
