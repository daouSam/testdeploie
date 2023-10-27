import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class NotificationService {

  constructor(
    private _notifications: NotificationsService,
  ) { }

  success(title: String, message: string) {
    this._notifications.success(title, message, {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  alert(title: String, message: string) {
    this._notifications.alert(title, message, {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  warning(title: String, message: string) {
    this._notifications.warn(title, message, {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  error(title: String, message: string) {
    this._notifications.error(title, message, {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }
}