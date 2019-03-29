import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';

import { Logger } from '../logging/logger.service';
import { ImageService } from './image.service';

@Injectable()
export class FirebaseImageService implements ImageService {
    
    static folderName: string = 'images/';

    constructor(
        private logger: Logger,
        @Inject(FirebaseApp) private firebaseApp: FirebaseApp
    ) {

    }

    public getImageUrl(key: string): Observable<string> {
        let subject = new Subject<string>();
        this.firebaseApp.storage()
                        .ref(`${FirebaseImageService.folderName}${key}`)
                        .getDownloadURL().then((url: string) => {
                            subject.next(url);
                        });
        return subject;
    }

    public uploadImage(file: File): Observable<string> {        
        this.logger.info("Uploading file: " + file.name, file);
        
        // TODO metadata?
        let fileName = this.getFileKey(file.name);
        let imageReference = this.firebaseApp.storage()
                                             .ref(`${FirebaseImageService.folderName}${fileName}`);
        let uploadTask = imageReference.put(file);

        let subject = new Subject<string>();
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
            (snapshot: firebase.storage.UploadTaskSnapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.logger.info("Upload is " + progress + "% complete...");
            },
            (error: Error) => {

            },
            () => {
                this.logger.info("Upload complete!");
                
                subject.next(fileName);
            });
            
        return subject;
    }

    private getFileKey(fileName: string): string {
        let randomArray = new Uint16Array(4);
        window.crypto.getRandomValues(randomArray);

        let randomString = `${randomArray[0].toString(16)}${randomArray[1].toString(16)}${randomArray[2].toString(16)}${randomArray[3].toString(16)}`;

        return `${randomString}.${this.getFileExtension(fileName)}`;
    }

    private getFileExtension(filename: string): string {
        return filename.substr(filename.lastIndexOf('.')+1);
    }

}
