
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
  streams: any = [];
  private topLimit: number = 15;
  public dataList: any = [];
  public dataL: Array<object> = [];
  constructor(private dataService: DataService, private router: Router,
) { }


  ngOnInit() {
    this.dataService.getAllStreams().subscribe(res => {
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

  stream(twitch) {
    console.log(twitch);
  window.open('twitch://stream/' + twitch);
  }
}
