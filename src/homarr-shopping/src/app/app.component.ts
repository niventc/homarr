import { Component, OnInit, NgZone } from '@angular/core';
import * as Quagga from 'quagga';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  barcodes: Array<string>;

  constructor(private lifecycle: NgZone) {
    this.barcodes = new Array<string>();

    this.handleDetection = this.handleDetection.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  ngOnInit() {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#quagga')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader", "ean_reader"],
        multiple: false
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected(this.handleDetection);
    
  }

  handleDetection(data: DetectionResult) {
    this.lifecycle.run(() => {
      this.barcodes.push(data.codeResult.code);
    });
  }

  addItem(item: string) {
    this.barcodes.push(item);
  }

}
