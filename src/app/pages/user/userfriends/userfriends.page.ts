import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-userfriends',
  templateUrl: './userfriends.page.html',
  styleUrls: ['./userfriends.page.scss'],
})
export class UserfriendsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

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



  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.profileService.fetchFriends(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.friends = res.message;
      this.dataList = this.friends.slice(0, this.topLimit);
      console.log(this.dataList);
    });
    this.setFilteredItems();

  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 20;
      this.dataList = this.friends.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 100);

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

    this.router.navigate(['/user/' + id]);

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
