import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {
  tournaments: any = [];
  date: Date;
  public dataL: Array<object> = [];
  public friends: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  private topLimit: number = 15;
  public dataList: any = [];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getTournaments().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.tournaments = res.message;

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
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.tournaments.filter(item => {
      return item.about.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  details(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['tournaments/tournament-details'], navigationExtras)

  }
}
