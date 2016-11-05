import { Component } from '@angular/core';

import { ItemService } from './item.service';

@Component({
    selector: 'add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
    constructor(
        private itemService: ItemService
    ) {
    }
}
