import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage implements OnInit {
  notifications: any = [];
  
  date: string;
  time: any = [];
  myTime: Date;
  myDate: any;
  offset: number;
  me: any;
  constructor(private dataService: DataService, private router: Router,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

        this.dataService.getLikesNotis(this.me).subscribe(res => {
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
