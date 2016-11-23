import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ImageService } from '../shared/image-upload/image.service';
import { FirebaseImageService } from '../shared/image-upload/firebase-image.service';

@Component({
    selector: 'item-card',
    templateUrl: './item-card.component.html',
    providers: [
        {
            provide: ImageService,
            useClass: FirebaseImageService
        }
    ]
})
export class ItemCardComponent implements OnInit {

    @Input() item: any;
    itemPictureUrl: Observable<string>;

    constructor(
        private imageService: ImageService        
    ) {}

    ngOnInit(): void {
        this.itemPictureUrl = this.imageService.getImageUrl(this.item.picture);
    }
}