import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BarcodeDetectedEvent } from '../shared/barcode-scanner.component';

import { ItemService } from './item.service';

@Component({
    selector: 'item-lookup',
    templateUrl: './item-lookup.component.html',
    //styleUrls: ['./lookup-item.component.scss']
})
export class ItemLookupComponent {

    barcode: string;
    name: string;

    isLookupComplete: boolean;
    items: Observable<any[]>;

    doAddNewItem: boolean;

    constructor(
        private itemService: ItemService
    ) {
        //this.name = new Subject<string>();
    }

    onBarcodeDetected(event: BarcodeDetectedEvent): void {        
        this.barcode = event.barcode;

        Observable.fromPromise(this.itemService.findItemsByBarcode(event.barcode))
                  .subscribe(data => {
                      this.items = data;

                      this.isLookupComplete = true;
                  });
    }

    public startAddNewItem(): void {
        console.log("Adding new item");

        this.doAddNewItem = true;
    }
    

}
