import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.page.html',
  styleUrls: ['./connections.page.scss'],
})
export class ConnectionsPage implements OnInit, OnDestroy {

  notifications: any = [];

  date: string;
  time: any = [];
  myTime: Date;
  myDate: any;
  offset: number;
  me: any;
  public accepted = "Accept";
  public declined = "Decline";
  private onDestroy$: Subject<void> = new Subject<void>();
  requests: any;
  constructor(private dataService: DataService, private router: Router,
    private authService: AuthenticationService, private http: HttpClient,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.dataService.getRequests(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.requests = res.message;
    });

    Observable.interval(10000).pipe(takeUntil(this.onDestroy$)).subscribe(x => {
      this.dataService.getRequests(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.requests = res.message;
        this.declined = "Decline";

        this.accepted = "Accept";

      });
    });

  }



  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  user(id) {

    this.router.navigate(['/user/' + id]);
  }
  decline(user) {
    let data = {
      "user": user,
      "me": this.me
    };
    this.declined = "Declined";
    this.http.post('https://ggs.tv/api/v1/friendrequests.php?action=decline', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    });

  }
  accept(user) {
    let data = {
      "user": user,
      "me": this.me
    };
    this.accepted = "Accepted"
    this.http.post('https://ggs.tv/api/v1/friendrequests.php?action=accept', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    });

  }
}

