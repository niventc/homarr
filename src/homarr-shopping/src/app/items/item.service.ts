import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { defaultCredentials } from '../../environments/firebase-config';

export interface FirebaseObject {
    $key: string;
}

@Injectable()
export class ItemService {

    private authPromise;

    constructor(
        private angularFire: AngularFire
    ) {
        this.authPromise = angularFire.auth.login(defaultCredentials);
    }

    getItems(): Promise<Observable<any[]>> {
        return this.authPromise
                    .then(() => {
                        return this.angularFire.database.list('/items', );               
                    });
    }

    findItemsByBarcode(barcode: string): Promise<Observable<any[]>> {
        let query = {
            query: {
                orderByChild: 'barcode',
                equalTo: barcode
            }
        };

        return this.authPromise
                   .then(() => {
                       return this.angularFire.database.list('/items', query)
                   });
    }

    addItem(item): Promise<string> {
        return this.authPromise
            .then(() => {
                return this.angularFire.database.list('/items').push(item).key;
            });
    }

}