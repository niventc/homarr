import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {Observable} from 'rxjs/Rx';

import {TaskService} from './task.service';

import {NewTaskComponent} from './new-task';

@Component({
    selector: 'tasks',
    templateUrl: 'scripts/tasks/task-list.html',
    directives: [NewTaskComponent]
})
export class TaskListComponent implements OnInit {

    public tasks: Observable<string[]>;

    constructor(private _taskService: TaskService) { }

    ngOnInit() {
        this.tasks = this._taskService.observableTasks;
    }

    public deleteTask(task: string): void {
        this._taskService.deleteTask(task);       
    }
    
}
