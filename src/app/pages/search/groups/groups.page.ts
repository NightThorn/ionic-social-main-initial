import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  data: any;
  href: string;
  results: any;
  offset: number;
  @ViewChild('myvideo') myVideo: ElementRef;
  @ViewChildren('player') videoPlayers: QueryList<any>;
  currentPlaying = null;
  feeds: any;
  latest: any;
  storiesConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.8,
  };
  public dataL: Array<object> = [];

  usersConfig = {
    initialSlide: 0,
    spaceBetween: 2,
    slidesPerView: 5,
  };
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  followConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.6,
  };
  
  searchQuery: any;






  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthenticationService, private modalController: ModalController, private dataService: DataService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      } else {
        this.data = 'null';

      }
    });
  }

  ngOnInit() {

    this.dataService.getSearchGroups(this.data).subscribe(res => {
      this.results = res.message;
      for (let i = 0; i < this.results.length; i++) {
        this.offset = moment().utcOffset();

        this.results[i]['time'] = moment.utc(this.results[i]['time']).fromNow();
      }
      this.dataList = this.results.slice(0, this.topLimit);

    });



  }

  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.results.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  goToGroup(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['group'], navigationExtras);

  }

  search(event) {
    var searchQuery = event.target.value as HTMLInputElement
    this.data = searchQuery;
    this.dataService.getSearchGroups(this.data).subscribe(res => {
      this.results = res.message;
      for (let i = 0; i < this.results.length; i++) {
        this.offset = moment().utcOffset();

        this.results[i]['time'] = moment.utc(this.results[i]['time']).fromNow();
      }
      this.dataList = this.results.slice(0, this.topLimit);

    });
  }
 

}
