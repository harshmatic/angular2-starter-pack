import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogService } from './log.service';
import * as StackTrace from 'stacktrace-js';
import { MessageService } from './message.service';

export class GlobalErrorHandler implements ErrorHandler {
    private notificationService: MessageService;
    constructor( @Inject(MessageService) notificationService: MessageService) {
        this.notificationService = notificationService;
    }
    handleError(error: any): void {
        try {
            var errorObj = JSON.parse(error.rejection.message);
        } 
        catch (e) {
            throw new Error(error)
        }
        
        var stack = "";
        if (errorObj.stacktrace) {
            stack = error.rejection.stack;
        }
        if (errorObj && errorObj.level ) {
            switch (errorObj.level) {
                case "high":
                    break;
                case "medium":
                    alert("Your code has error:" + errorObj.message + "  " + stack + ". Please resolve to continue");
                    break;
                case "low":
                    if (errorObj.type) {
                        switch (errorObj.type) {
                            case "warn":
                                this.notificationService.addMessage(
                                    {
                                        severity: 'warn',
                                        summary: 'Wanring',
                                        detail: errorObj.message + stack
                                    }
                                );
                                break;
                            case "info":
                                this.notificationService.addMessage(
                                    {
                                        severity: 'info',
                                        summary: 'Info',
                                        detail: errorObj.message + stack
                                    }
                                );
                                break;
                            case "error":
                                this.notificationService.addMessage(
                                    {
                                        severity: 'error',
                                        summary: 'error',
                                        detail: errorObj.message + stack
                                    }
                                );
                                break;
                            default:
                                this.notificationService.addMessage(
                                    {
                                        severity: 'error',
                                        summary: 'error',
                                        detail: errorObj.message + stack
                                    }
                                );
                        }
                    } else {
                        this.notificationService.addMessage(
                            {
                                severity: 'error',
                                summary: 'error',
                                detail: errorObj.message + stack
                            }
                        );

                    }
            }
        } else {
            console.group("Error Log");
            console.dir("Error Object Incorrect");
            console.groupEnd();
        }
        this.showErrorInConsole(errorObj.message, stack);


    }

    private showErrorInConsole(error: any, stack: any): void {
        if (console && console.group && console.error) {
            console.group("Error Log");
            console.log(error + "  " + stack);
            console.groupEnd();
        }
    }

}