import { Component, ViewChild, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Logger } from '../logging/logger.service';
import { ImageService } from './image.service';
import { FirebaseImageService } from './firebase-image.service';

export interface ImageUploadedEvent {
    key: string;
}

@Component({
    selector: 'image-upload',
    templateUrl: './image-upload.component.html',
    providers: [
        {
            provide: ImageService,
            useClass: FirebaseImageService
        }
    ]
})
export class ImageUploadComponent implements OnInit {

    @ViewChild('file') file: ElementRef;
    imageUrl: Observable<string>;
    isImageUploadComplete: boolean;

    @Output() onImageUploaded: EventEmitter<ImageUploadedEvent> = new EventEmitter<ImageUploadedEvent>();

    constructor(
        private logger: Logger,
        private imageService: ImageService
    ) { 
        this.handleImageUpload = this.handleImageUpload.bind(this);
    }

    ngOnInit(): void {
        Observable.fromEvent(this.file.nativeElement, 'change')
                  .pluck('target', 'files')
                  .map((fileList: FileList) => fileList[0])
                  .subscribe(this.handleImageUpload);
    }

    private handleImageUpload(file: File): void {
        this.imageService.uploadImage(file)
                         .subscribe((key: string) => {
                             this.isImageUploadComplete = true;
 
                             this.onImageUploaded.emit({
                                 key: key
                             });

                             this.imageUrl = this.imageService.getImageUrl(key);
                         });
    }
}