import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Notification, NotificationType } from '../models/notification';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  private notification$: Subject<Notification> = new Subject();

  alert(message: string) {
    this.notification$.next(new Notification(message, NotificationType.ALERT));
  }

  error(message: string) {
    this.notification$.next(new Notification(message, NotificationType.ERROR));
  }

  getNotification(): Observable<Notification> {
    return this.notification$.asObservable();
  }
}
