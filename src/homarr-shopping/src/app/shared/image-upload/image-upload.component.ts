import { Component, ViewChild, OnInit, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseApp } from 'angularfire2';
//import * as firebase from 'firebase';

import { Logger } from '../logging/logger.service';

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html'
})
export class ImageUploadComponent implements OnInit {

    @ViewChild('file') file: ElementRef;

    constructor(
        private logger: Logger,
        @Inject(FirebaseApp) private firebaseApp: firebase.app.App
    ) {
        this.uploadImage = this.uploadImage.bind(this);
    }

    ngOnInit(): void {

        Observable.fromEvent(this.file.nativeElement, 'change')
                  .pluck('target', 'files')
                  .map((fileList: FileList) => fileList[0])
                  .subscribe(this.uploadImage);
    }

    private uploadImage(file: File): void {
        this.logger.info("Uploading file: " + file.name, file);


    }

}