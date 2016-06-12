System.register(['angular2/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var core_1;
    var TaskService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TaskService = (function () {
                function TaskService() {
                    var tasksJson = localStorage.getItem("tasks");
                    this._tasks = JSON.parse(tasksJson) || [];
                }
                TaskService.prototype.addTask = function (task) {
                    if (!task || task.length === 0) {
                        return false;
                    }
                    this._tasks.push(task);
                    localStorage.setItem("tasks", JSON.stringify(this._tasks));
                    return true;
                };
                TaskService.prototype.deleteTask = function (task) {
                    if (!task || task.length === 0) {
                        return false;
                    }
                    _(this._tasks);
                };
                TaskService.prototype.getTasks = function () {
                    return Promise.resolve(this._tasks);
                };
                TaskService = __decorate([
                    core_1.Injectable()
                ], TaskService);
                return TaskService;
            }());
            exports_1("TaskService", TaskService);
        }
    }
});
