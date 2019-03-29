import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription, Subject, fromEvent } from 'rxjs';
import { debounceTime, filter, map, pluck, startWith, scan } from 'rxjs/operators';
import { Logger } from './logging/logger.service';

export interface BarcodeDetectedEvent {
  barcode: string;
}

@Component({
  selector: 'barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarcodeScanner implements OnInit {

  static barcodeAccuracyThreshold: number = 3;
  static minimumLength: number = 6;

  @ViewChild("scanBtn") scanBtn: ElementRef;
  quaggaObservable: Subscription;
  public detectionSubject: Subject<string> = new Subject<string>();
  public isScanning: boolean;

  @ViewChild("barcode") barcodeInput: ElementRef;

  @Input() initialValue: string;
  @Output() onDetected: EventEmitter<BarcodeDetectedEvent> = new EventEmitter<BarcodeDetectedEvent>();

  public devices: MediaDeviceInfo[] = [];
  public chosenDevice: MediaDeviceInfo = null;

  constructor(
    private logger: Logger
  ) {
    this.handleDetection = this.handleDetection.bind(this);
    this.detectedBarcode = this.detectedBarcode.bind(this);
  }

  public onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.devices = devices;
    this.chosenDevice = devices[0];
  }

  public logEvent(event): void {
    console.log(event)
  }

  public ngOnInit(): void {
    this.quaggaObservable = fromEvent(this.scanBtn.nativeElement, 'click')
      .pipe(
        startWith(false),
        scan((acc, value, index) => acc = !acc)
      )
      .subscribe(x => this.isScanning = !!x);

    fromEvent(this.barcodeInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),        
        pluck('target', 'value'),        
        filter((text: string) => text.length > BarcodeScanner.minimumLength)
      )
      .subscribe(this.detectedBarcode);

    this.detectionSubject
      .pipe(
        map(codeResult => {
          return {
            barcode: codeResult,
            count: 1
          };
        }),
        scan((acc, value, index) => {
          // If the barcode matches the previous barcode, increase the count
          if(acc.barcode === value.barcode) {
            acc.count++;
            return acc;
          }
          // Otherwise return the new value with a count of 1
          return value;
        }),
        filter(result => result.count > BarcodeScanner.barcodeAccuracyThreshold),
        pluck('barcode')
      )
      .subscribe(this.detectedBarcode);
  }  

  private detectedBarcode(barcode: string): void {
    this.logger.info("Found barcode: " + barcode);
    
    this.barcodeInput.nativeElement.value = barcode;
    this.isScanning = false;
    
    this.onDetected.emit({
        barcode: barcode
    });
  }

  private handleDetection(barcode: string) {    
    this.detectionSubject.next(barcode);
  }
}
