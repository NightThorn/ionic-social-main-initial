import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  activeStoredUserSubscription$;
  me: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public dataL: Array<object> = [];
  groups: any = [];
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];

  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.dataService.getDiscoverGroups(this.me).subscribe(res => {
          this.groups = res.message;
          this.dataList = this.groups.slice(0, this.topLimit);

        }

        )};
      this.setFilteredItems();

    });
  }
  loadData(event) {
    if (this.searchTerm == "") {
      setTimeout(() => {
        this.topLimit += 10;
        this.dataList = this.groups.slice(0, this.topLimit);
        event.target.complete();
        if (this.dataList.length == this.dataL.length)
          event.target.disabled = true;

      }, 500);

    } else {
      
      event.target.complete();

    }
  }
  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);

  }
  filterItems(searchTerm) {
    return this.groups.filter(item => {

      return item.group_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

    });
    
  }
  goToGroup(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };

    this.router.navigate(['group'], navigationExtras);
  }


}
