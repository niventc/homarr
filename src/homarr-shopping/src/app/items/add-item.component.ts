import { Component, Input, OnInit } from '@angular/core';

import { BarcodeDetectedEvent } from '../shared/barcode-scanner.component';

import { ItemService } from './item.service';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

    @Input() barcode: string;

    item: { [key: string]: string } = {};

    constructor(
        private itemService: ItemService
    ) {
    }

    ngOnInit(): void {
        this.item["barcode"] = this.barcode;
    }

    addItem(): void {
        this.itemService.addItem(this.item);
    }
}
