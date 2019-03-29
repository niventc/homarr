import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from '@angular/fire';
// https://console.firebase.google.com/project/homarr-43b89/authentication/users
import { firebase } from '../environments/firebase-config';

import { Logger } from './shared/logging/logger.service';
import { ConsoleLogger } from './shared/logging/console-logger.service';

import { ItemService } from './items/item.service'; 

import { AppComponent } from './app.component';
import { ItemListComponent } from './items/item-list.component';
import { ItemLookupComponent } from './items/item-lookup.component';
import { AddItemComponent } from './items/add-item.component';
import { ItemActionsComponent } from './items/item-actions.component';
import { ItemCardComponent } from './items/item-card.component';

import { BarcodeScanner } from './shared/barcode-scanner.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { MatToolbarModule, MatCardModule, MatSidenavModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemLookupComponent,
    AddItemComponent,
    ItemActionsComponent,
    ItemCardComponent,
    
    BarcodeScanner,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ZXingScannerModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: Logger,
      useClass: ConsoleLogger
    },
    {
      provide: ItemService,
      useClass: ItemService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
