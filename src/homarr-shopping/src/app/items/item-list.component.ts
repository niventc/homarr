import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { ItemService } from './item.service';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    title = 'app works!';

    items: Observable<any[]>;

    constructor(
        private itemService: ItemService
    ) {
    }

    ngOnInit(): void {
        this.itemService.getItems().then(data => {
            this.items = data;
        });
    }
}
