import { Component } from '@angular/core';

import { ItemService } from './item.service';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

    item: { [key: string]: string } = {};

    constructor(
        private itemService: ItemService
    ) {
    }

    addItem(): void {
        this.itemService.addItem(this.item);
    }
}
