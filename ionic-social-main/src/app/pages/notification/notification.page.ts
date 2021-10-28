import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: unknown;
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.notifications = this.dataService.getNotifications();
  }

}
