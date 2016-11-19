import { Injectable } from '@angular/core';

import { Logger } from './logger.service';

@Injectable()
export class ConsoleLogger implements Logger {

    public info(message: any, ...args: any[]): void {
        if(this.checkConsoleMethodExists(console.info)) {
            if(args.length > 0) {
                console.info(message, args);
            } else {
                console.info(message);
            }
        }
    }

    public warn(message: any, ...args: any[]): void {
        if(this.checkConsoleMethodExists(console.warn)) {            
            if(args.length > 0) {
                console.warn(message, args);
            } else {
                console.warn(message);
            }
        }
    }

    public error(message: any, ...args: any[]): void {
        if(this.checkConsoleMethodExists(console.error)) {            
            if(args.length > 0) {
                console.error(message, args);
            } else {
                console.error(message);
            }
        }
    }

    private checkConsoleMethodExists(method): boolean {
        return typeof(console) != 'undefined' && typeof(method) === 'function';
    }

}
