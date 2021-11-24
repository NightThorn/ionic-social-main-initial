import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { TimeagoModule } from 'ngx-timeago';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications: any;
  activeStoredUserSubscription$;
  date: string;
  time: any;

  newDate: Date;
  today = new Date();
  constructor(private dataService: DataService, private router: Router,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
        this.dataService.getNotis(storedUser.UserID).subscribe(res => {
          this.notifications = res.message;
          this.time = moment.utc(this.notifications.time).fromNow();


          console.log(moment(this.time).fromNow());


          console.log(this.notifications);
        });        
      }});
  }

}

