import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  tournaments: any=[];
  date: Date;
  public dataL: Array<object> = [];
  public friends: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTournaments().subscribe(res => {
      this.tournaments = res.message;
      
      console.log("PROFILEPAGE:tourneys", this.tournaments);
      this.dataList = this.tournaments.slice(0, this.topLimit);

    });
    this.setFilteredItems();

  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.tournaments.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.tournaments.filter(item => {
      return item.about.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
