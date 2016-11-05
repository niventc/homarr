import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { defaultCredentials } from '../../environments/firebase-config';

@Injectable()
export class ItemService {

    private authPromise;

    constructor(
        private angularFire: AngularFire
    ) {
        this.authPromise = angularFire.auth.login(defaultCredentials);
    }

    getItems() {
        return this.authPromise
                    .then(() => {
                        return this.angularFire.database.list('/items');               
                    });
    }

}