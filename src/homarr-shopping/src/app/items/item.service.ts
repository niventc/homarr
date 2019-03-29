import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { catchError, share, switchMap, tap } from "rxjs/operators";
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

export interface FirebaseObject {
    $key: string;
}

@Injectable()
export class ItemService {

    private user$: Observable<firebase.auth.UserCredential>;

    private imagesFolder;

    constructor(
        private firebaseAuth: AngularFireAuth,
        private firestore: AngularFireDatabase
    ) {
        this.user$ = from(firebaseAuth.auth.signInWithEmailAndPassword("test@sparkes.co", "testtest")).pipe(
            tap(x => console.log(x)),
            share()
        );
    }

    public getItems(): Observable<any[]|any> {
        return this.user$
            .pipe(
                switchMap(() => this.firestore.list('items').valueChanges()
                    .pipe(catchError(x => { console.error(x); return of(); }))
                )
            );
    }

    public findItemsByBarcode(barcode: string): Observable<any[]> {
        return this.firestore
            .list('items', ref => ref.orderByChild('barcode').equalTo(barcode))
            .valueChanges();
    }

    public addItem(item): Promise<any> {
        return this.firestore.list('items').push(item);
    }

}