import { Component, ViewChild, OnInit, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2';

import { Logger } from '../logging/logger.service';

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

    static folderName: string = 'images/';

    @ViewChild('file') file: ElementRef;
    imageUrl: string;
    isImageUploadComplete: boolean;

    constructor(
        private logger: Logger,
        @Inject(FirebaseApp) private firebaseApp: firebase.app.App
    ) {
        this.uploadImage = this.uploadImage.bind(this);
        
        // this.authPromise().then(() => {            
        //     this.imagesFolder = this.firebaseApp.storage().ref().child('images');
        // });
    }

    ngOnInit(): void {

        Observable.fromEvent(this.file.nativeElement, 'change')
                  .pluck('target', 'files')
                  .map((fileList: FileList) => fileList[0])
                  .subscribe(this.uploadImage);
    }

    private uploadImage(file: File): void {
        this.logger.info("Uploading file: " + file.name, file);

        // TODO this needs to be unique
        // TODO metadata?
        let imageReference = this.firebaseApp.storage()
                                             .ref(ImageUploadComponent.folderName + file.name);
        let uploadTask = imageReference.put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot: firebase.storage.UploadTaskSnapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.logger.info("Upload is " + progress + "% complete...");
            },
            (error: Error) => {

            },
            () => {
                this.logger.info("Upload complete!");

                imageReference.getDownloadURL()
                              .then(url => {
                                  this.imageUrl = url;
                                  this.isImageUploadComplete = true;
                              });
            });
    }

}