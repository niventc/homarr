import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class ItemService {

    private authPromise;

    constructor(
        private angularFire: AngularFire
    ) {
        this.authPromise = angularFire.auth.login();
    }

    getItems() {
        return this.authPromise
                    .then(() => {
                        return this.angularFire.database.list('/items');               
                    });
    }

}