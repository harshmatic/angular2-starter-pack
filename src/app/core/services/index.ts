// app
import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { RouterExtensions } from './router-extensions.service';
import { WindowService } from './window.service';
import { AppService } from './app.service';
import { UserService } from './user.service';
import {MessageService} from './message.service';
import {NotifyService} from './notify.service'
export const CORE_PROVIDERS: any[] = [
  AppService,
  ConsoleService,
  LogService,
  RouterExtensions,
  WindowService,
  UserService,
  MessageService,
  NotifyService
];

export * from './app.service';
export * from './console.service';
export * from './log.service';
export * from './router-extensions.service';
export * from './window.service';
export * from './base.service';
export * from './message.service';
export * from './notify.service';
