System.register(['angular2/core', './new-task'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1, new_task_1;
    var TaskListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    var _this = this;
                    this.tasks = [];
                    this._taskService.getTasks().then(function (tasks) { return _this.tasks = tasks; });
                };
                TaskListComponent.prototype.deleteTask = function (task) {
                    this._taskService.deleteTask(task).then(function () {
                        return;
                    });
                };
                TaskListComponent = __decorate([
                    core_1.Component({
                        selector: 'tasks',
                        templateUrl: 'scripts/tasks/task-list.html',
                        directives: [new_task_1.NewTaskComponent]
                    })
                ], TaskListComponent);
                return TaskListComponent;
            }());
            exports_1("TaskListComponent", TaskListComponent);
        }
    }
});
