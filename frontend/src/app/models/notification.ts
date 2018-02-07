export class Notification {
  constructor(public message: string, public type: NotificationType) {
  }
}

export enum NotificationType {
  ALERT = 'alert-success',
  ERROR = 'alert-danger'
}
