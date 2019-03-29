import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemAddedEvent } from './add-item.component';
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
    selectedItem: any;

    doAddNewItem: boolean;

    doAddNewItemInstance: boolean;

    constructor(
        private itemService: ItemService
    ) {
        //this.name = new Subject<string>();
    }

    public onBarcodeDetected(event: BarcodeDetectedEvent): void {        
        this.barcode = event.barcode;

        this.items = this.itemService.findItemsByBarcode(event.barcode);
    }

    public selectItem(item: any): void {
        this.selectedItem = item;

        this.doAddNewItem = false;
        this.doAddNewItemInstance = true;
    }

    public isItemSelected(item: any): boolean {
        return this.selectedItem && this.selectedItem.$key === item.$key;
    }

    public onItemAdded(event: ItemAddedEvent): void {
        this.doAddNewItem = false;

        this.doAddNewItemInstance = true;
    }

    public startAddNewItem(): void {
        this.doAddNewItem = true;

        this.selectedItem = undefined;
    }
    

}
