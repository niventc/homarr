import { Component, OnInit, NgZone, ViewChild, ElementRef, Input, Output, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import * as Quagga from 'quagga';
import { Logger } from './logging/logger.service';

interface DetectionResult {
  angle: number;
  box: any[];
  boxes: any[];
  codeResult: CodeResult;
}

interface CodeResult {
  code: string;
  codeset: string;
  decodedCodes: any[];
  direction: number;
  end: number;
  format: string;
  start: number;
  startInfo: StartInfo;
}

interface StartInfo {
  code: number;
  end: number;
  error: number;
  start: number;
}

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

  static barcodeAccuracyThreshold = 5;
  static minimumLength: number = 6;

  @ViewChild("scanBtn") scanBtn: ElementRef;
  quaggaObservable: Subscription;
  detectionSubject: Subject<DetectionResult> = new Subject<DetectionResult>();
  isScanning: boolean;

  @ViewChild("barcode") barcodeInput: ElementRef;

  @Input() initialValue: string;
  @Output() onDetected: EventEmitter<BarcodeDetectedEvent> = new EventEmitter<BarcodeDetectedEvent>();

  title = 'app works!';

  constructor(
    private logger: Logger,
    private lifecycle: NgZone
  ) {
    this.handleDetection = this.handleDetection.bind(this);
    this.detectedBarcode = this.detectedBarcode.bind(this);
  }

  ngOnInit() {
    this.quaggaObservable = Observable
      .fromEvent(this.scanBtn.nativeElement, 'click')
      .startWith(false)
      .scan((acc, value, index) => acc = !acc)
      .subscribe((x: boolean) => {
        this.isScanning = x;
        if(x) {
          this.startScanning();
        } else {
          this.stopScanning();
        }
      });

    Observable
      .fromEvent(this.barcodeInput.nativeElement, 'keyup')
      .debounceTime(500)
      .pluck('target', 'value')
      .filter((text: string) => text.length > BarcodeScanner.minimumLength)
      .subscribe(this.detectedBarcode);

    this.detectionSubject
      .map(codeResult => {
        return {
          barcode: codeResult.codeResult.code,
          count: 1
        };
      })
      .scan((acc, value, index) => {
        // If the barcode matches the previous barcode, increase the count
        if(acc.barcode === value.barcode) {
          acc.count++;
          return acc;
        }
        // Otherwise return the new value with a count of 1
        return value;
      })
      .filter(result => result.count > BarcodeScanner.barcodeAccuracyThreshold)
      .pluck('barcode')
      .subscribe(this.detectedBarcode);
  }

  private startScanning(): void {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#quagga')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader", "ean_reader"],
        multiple: false
      },
      locator: {
        debug: {
          showCanvas: false
        }
      }
    }, (err) => {
        if (err) {
            this.logger.error(err);
            return
        }
        this.logger.info("Initialization finished. Ready to start");
        Quagga.start();
        this.logger.info("Quagga started successfully");
    });

    Quagga.onDetected(this.handleDetection);
  }

  private stopScanning(): void {
    try {
      Quagga.stop();
      this.logger.info("Quagga stopped successfully");    
    } catch (error) {
      this.logger.warn("Unable to stop Quagga, maybe it hasn't started yet.");
    }
  }

  private detectedBarcode(barcode: string): void {
    this.logger.info("Found barcode: " + barcode);
    
    this.barcodeInput.nativeElement.value = barcode;
    
    this.onDetected.emit({
        barcode: barcode
    });
  }

  private handleDetection(data: DetectionResult) {    
    this.detectionSubject.next(data);
  }
}
