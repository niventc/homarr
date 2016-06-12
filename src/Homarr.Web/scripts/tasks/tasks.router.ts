import {Component} from 'angular2/core';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {TaskService} from './task.service';

import {TaskListComponent} from './task-list';

@Component({
    template: '<router-outlet></router-outlet>',
    directives: [RouterOutlet, TaskListComponent],
    providers: [TaskService]
})
@RouteConfig([
    {
        path: '/',
        name: 'TaskList',
        component: TaskListComponent,
        useAsDefault: true
    }
])
export class TaskRouterComponent { }