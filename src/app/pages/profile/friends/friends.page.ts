import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
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

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.profileService.fetchFriends(this.data).subscribe(res => {
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
    this.router.navigate(['/user/'], navigationExtras);

  }


}
