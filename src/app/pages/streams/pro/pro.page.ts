import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit {
  streams: any = [];
  private topLimit: number = 15;
  public dataList: any = [];
  public dataL: Array<object> = [];
  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.dataService.getProStreams().subscribe(res => {
      this.streams = res.message;

      console.log("PROFILEPAGE:streams", this.streams);
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
}
