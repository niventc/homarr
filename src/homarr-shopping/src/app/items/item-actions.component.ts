import { Component, Input } from '@angular/core';

@Component({
    selector: 'item-actions',
    templateUrl: './item-actions.component.html'
})
export class ItemActionsComponent {

    @Input() item: any;

}