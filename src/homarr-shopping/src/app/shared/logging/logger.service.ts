// Base required for DI
export abstract class Logger {
    abstract info(message: any, ...args: any[]): void;
    abstract warn(message: any, ...args: any[]): void;
    abstract error(message: any, ...args: any[]): void;
}