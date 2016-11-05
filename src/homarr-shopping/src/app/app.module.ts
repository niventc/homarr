import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Logger } from './shared/logging/logger.service';
import { ConsoleLogger } from './shared/logging/console-logger.service';

import { AppComponent } from './app.component';
import { BarcodeScanner } from './shared/barcode-scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    BarcodeScanner
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    {
      provide: Logger,
      useClass: ConsoleLogger
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
