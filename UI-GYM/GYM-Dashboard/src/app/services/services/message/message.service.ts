import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private message: NzMessageService) {}

  createSuccessMessage(message: string): void {
    this.message.success(message, {
      nzDuration: 4000
    });
  }

  createErrorMessage(message: string): void {
    this.message.error(message, {
      nzDuration: 4000
    });
  }

  createWarningMessage(message: string): void {
    this.message.warning(message, {
      nzDuration: 4000
    });
  }

  createInfoMessage(message: string): void {
    this.message.info(message, {
      nzDuration: 4000
    });
  }
}