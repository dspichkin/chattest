import { Injectable, EventEmitter } from "@angular/core";



@Injectable()
export class ErrorService {
    errors = {};
    errors_update: EventEmitter<any> = new EventEmitter();

    messages = [];
    messages_update: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
}