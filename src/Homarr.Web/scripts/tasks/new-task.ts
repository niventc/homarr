import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteConfig, RouterOutlet} from 'angular2/router';

import {TaskService} from './task.service';

@Component({
    selector: 'new-task',
    templateUrl: 'scripts/tasks/new-task.html'
})
export class NewTaskComponent {

    public newTask: string = "";

    constructor(
        private _taskService: TaskService
    ) { }

    addTask(): void {
        this._taskService.addTask(this.newTask);

        this.newTask = "";
    }
}