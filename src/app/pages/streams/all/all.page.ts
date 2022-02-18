
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit, OnDestroy {
  streams: any = [];
  private topLimit: number = 15;
  private onDestroy$: Subject<void> = new Subject<void>();
  public dataList: any = [];
  public dataL: Array<object> = [];
  constructor(private dataService: DataService, private router: Router,
  ) { }


  ngOnInit() {
    this.dataService.getAllStreams().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.streams = res.message;

      this.dataList = this.streams.slice(0, this.topLimit);

    });
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
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  stream(twitch) {
    console.log(twitch);
    window.open('twitch://stream/' + twitch);
  }
}
