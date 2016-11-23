import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { BarcodeDetectedEvent } from '../shared/barcode-scanner.component';
import { ImageUploadedEvent } from '../shared/image-upload/image-upload.component';

import { ItemService } from './item.service';

export interface ItemAddedEvent {
    key: string;
}

@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

    @Input() barcode: string;
    @Output() onItemAdded: EventEmitter<ItemAddedEvent> = new EventEmitter<ItemAddedEvent>();

    item: { [key: string]: string } = {};

    constructor(
        private itemService: ItemService
    ) {
    }

    ngOnInit(): void {
        this.item["barcode"] = this.barcode;
    }

    onImageUploaded(event: ImageUploadedEvent): void {
        this.item["picture"] = event.key;
    }

    addItem(): void {
        this.itemService.addItem(this.item)
                         .then(key => {
                             this.onItemAdded.emit({ key: key });
                         });
    }
}
