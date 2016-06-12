/// <reference path="../../typings/main.d.ts" />
System.register(['angular2/core', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, Rx_1;
    var TaskService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            TaskService = (function () {
                function TaskService() {
                    var _this = this;
                    this.observableTasks = new Rx_1.Observable(function (observer) { _this._tasksObserver = observer; _this.ngOnInit(); }).share();
                    console.log(this._tasksObserver);
                    console.log(this.observableTasks);
                    //this.ngOnInit();
                }
                TaskService.prototype.ngOnInit = function () {
                    console.log(this._tasksObserver);
                    var tasksJson = localStorage.getItem("tasks");
                    console.log("Found localStorage: ");
                    console.log(tasksJson);
                    this._tasks = JSON.parse(tasksJson) || [];
                    console.log(this._tasks);
                    this._tasksObserver.next(this._tasks);
                };
                TaskService.prototype.addTask = function (task) {
                    if (!task || task.length === 0) {
                        return Rx_1.Observable.of(false);
                    }
                    this._tasks.push(task);
                    this._tasksObserver.next(this._tasks);
                    return this.save();
                };
                TaskService.prototype.deleteTask = function (task) {
                    if (!task || task.length === 0) {
                        return Rx_1.Observable.of(false);
                    }
                    this._tasks = _(this._tasks).without(task);
                    this._tasksObserver.next(this._tasks);
                    return this.save();
                };
                TaskService.prototype.getTasks = function () {
                    return this.observableTasks;
                };
                TaskService.prototype.save = function () {
                    localStorage.setItem("tasks", JSON.stringify(this._tasks));
                    return Rx_1.Observable.of(true);
                };
                TaskService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TaskService);
                return TaskService;
            }());
            exports_1("TaskService", TaskService);
        }
    }
});
//# sourceMappingURL=task.service.js.map