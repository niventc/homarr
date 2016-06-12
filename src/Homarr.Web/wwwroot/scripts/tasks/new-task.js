System.register(['angular2/core', './task.service'], function(exports_1, context_1) {
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
    var core_1, task_service_1;
    var NewTaskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (task_service_1_1) {
                task_service_1 = task_service_1_1;
            }],
        execute: function() {
            NewTaskComponent = (function () {
                function NewTaskComponent(_taskService) {
                    this._taskService = _taskService;
                    this.newTask = "";
                }
                NewTaskComponent.prototype.addTask = function () {
                    this._taskService.addTask(this.newTask);
                    this.newTask = "";
                };
                NewTaskComponent = __decorate([
                    core_1.Component({
                        selector: 'new-task',
                        templateUrl: 'scripts/tasks/new-task.html'
                    }), 
                    __metadata('design:paramtypes', [task_service_1.TaskService])
                ], NewTaskComponent);
                return NewTaskComponent;
            }());
            exports_1("NewTaskComponent", NewTaskComponent);
        }
    }
});
//# sourceMappingURL=new-task.js.map