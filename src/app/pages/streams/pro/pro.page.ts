import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit, OnDestroy {
  streams: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  private topLimit: number = 15;
  public dataList: any = [];
  public dataL: Array<object> = [];
  me: string;
  constructor(private dataService: DataService, private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.dataService.getProStreams().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.streams = res.message;

      this.dataList = this.streams.slice(0, this.topLimit);

    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.streams.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }
  stream(twitch, userID, username) {
    console.log(twitch);
    window.open('twitch://stream/' + twitch);

    let data = {
      "username": username,
      "userID": userID,
      "me": this.me

    };

    this.http.post('https://ggs.tv/api/v1/visit.php', JSON.stringify(data)).subscribe(res => {

    });
  }
}
