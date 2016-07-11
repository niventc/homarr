import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    templateUrl: 'scripts/app.html',
    directives: [ 
        ROUTER_DIRECTIVES
    ],
    providers: [
        ROUTER_PROVIDERS
    ]
})

export class AppComponent implements OnInit {

    public date: Date;

    constructor() { }

    ngOnInit() {

        let timer = (<any>Observable).timer(0, 1000);
        timer.subscribe(t => {
            this.date = new Date();
        });
    }
}