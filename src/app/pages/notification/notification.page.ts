import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { TimeagoModule } from 'ngx-timeago';
import moment from 'moment';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})

export class NotificationPage implements OnInit {

  notifications: any = [];
  date: string;
  time: any = [];
  myTime: Date;
  myDate: any;
  offset: number;
  me: string;

  constructor(private dataService: DataService, private router: Router,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

        this.dataService.getNotis(this.me).subscribe(res => {
          this.notifications = res.message;
          for (let i = 0; i < this.notifications.length; i++) {
            this.offset = moment().utcOffset();

            this.notifications[i]['time'] = moment.utc(this.notifications[i]['time']).fromNow();
          }
        });
      
  }



  notification(url) {
   
    this.router.navigateByUrl('/' + url);
  }
}

