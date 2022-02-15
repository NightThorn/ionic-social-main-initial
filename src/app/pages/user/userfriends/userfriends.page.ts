import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-userfriends',
  templateUrl: './userfriends.page.html',
  styleUrls: ['./userfriends.page.scss'],
})
export class UserfriendsPage implements OnInit {

  private onDestroy$: Subject<void> = new Subject<void>();
  res: any = [];
  public dataL: Array<object> = [];
  public friends: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  navCtrl: any;
  id;
  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {

    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.profileService.fetchFriends(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.friends = res.message;
      this.dataList = this.friends.slice(0, this.topLimit);

    });
    this.setFilteredItems();

  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.friends.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.friends.filter(item => {
      return item.user_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['user'], navigationExtras)

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
