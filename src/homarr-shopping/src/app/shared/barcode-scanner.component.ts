import { Component, OnInit, NgZone, ViewChild, ElementRef, Input, Output, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  static minimumLength: number = 6;

  @ViewChild("scanBtn") scanBtn: ElementRef;
  quaggaObservable: Subscription;
  isScanning: boolean;

  @ViewChild("barcode") barcodeInput: ElementRef;

  @Input() initialValue: string;
  @Output() onDetected: EventEmitter<BarcodeDetectedEvent> = new EventEmitter<BarcodeDetectedEvent>();

  title = 'app works!';

  barcodes: Array<string>;

  constructor(
    private logger: Logger,
    private lifecycle: NgZone
  ) {
    this.barcodes = new Array<string>();

    this.handleDetection = this.handleDetection.bind(this);
    this.addItem = this.addItem.bind(this);
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
      .pluck('target', 'value')
      .filter((text: string) => text.length > BarcodeScanner.minimumLength)
      .debounceTime(500)
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

    this.onDetected.emit({
        barcode: barcode
    });
  }

  handleDetection(data: DetectionResult) {
    this.lifecycle.run(() => {
      let barcode = data.codeResult.code;

      this.barcodes.push(barcode);

      this.barcodeInput.nativeElement.value = barcode;
      
      this.detectedBarcode(barcode);
    });
  }

  addItem(item: string) {
    this.barcodes.push(item);
  }

}
