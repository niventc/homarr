import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { ItemService } from './item.service';
import { ImageService } from '../shared/image-upload/image.service';
import { FirebaseImageService } from '../shared/image-upload/firebase-image.service';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss'],
    providers: [
        {
            provide: ImageService,
            useClass: FirebaseImageService
        }
    ]
})
export class ItemListComponent implements OnInit {
    title = 'app works!';

    items: Observable<any[]>;

    constructor(
        private itemService: ItemService,
        private imageService: ImageService
    ) {
    }

    ngOnInit(): void {
        this.itemService.getItems().then(data => {
            this.items = data;
        });
    }

    public getImageUrl(item: any): string {
        return item.picture;
        //return this.imageService.getImageUrl(item.picture);
    }
}
