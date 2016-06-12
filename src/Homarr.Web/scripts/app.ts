import {TaskRouterComponent} from './tasks/tasks.router';
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

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
@RouteConfig([
    {
        path: '/tasks/...',
        name: 'Tasks',
        component: TaskRouterComponent,
        useAsDefault: true
    }
])
export class AppComponent { }