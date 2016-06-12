System.register(['angular2/core', './task.service', './new-task'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, task_service_1, new_task_1;
    var TaskListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            },
            function (new_task_1_1) {
                new_task_1 = new_task_1_1;
            }],
        execute: function() {
            TaskListComponent = (function () {
                function TaskListComponent(_taskService) {
                    this._taskService = _taskService;
                }
                TaskListComponent.prototype.ngOnInit = function () {
                    this.tasks = this._taskService.observableTasks;
                };
                TaskListComponent.prototype.deleteTask = function (task) {
                    this._taskService.deleteTask(task);
                };
                TaskListComponent = __decorate([
                    core_1.Component({
                        selector: 'tasks',
                        templateUrl: 'scripts/tasks/task-list.html',
                        directives: [new_task_1.NewTaskComponent]
                    }), 
                    __metadata('design:paramtypes', [task_service_1.TaskService])
                ], TaskListComponent);
                return TaskListComponent;
            }());
            exports_1("TaskListComponent", TaskListComponent);
        }
    }
});
//# sourceMappingURL=task-list.js.map