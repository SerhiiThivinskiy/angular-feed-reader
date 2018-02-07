import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  displayTime = 5;

  notification: Notification;

  display = 'invisible';
  private timerId;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.getNotification().subscribe(
      (notification: Notification) => {
        this.notification = notification;
        this.display = 'visible';
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => this.display = 'invisible', this.displayTime * 1000);
      }
    )
  }

  close() {
    this.display = 'invisible';
    clearTimeout(this.timerId);
  }

}
