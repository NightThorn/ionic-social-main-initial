import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VideoModalPage } from '../video-modal/video-modal.page';
import moment from 'moment';
import { InViewportMetadata } from 'ng-in-viewport';
import { XpmodalPage } from '../xpmodal/xpmodal.page';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
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
  searchQuery: any;

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
  activeStoredUserSubscription$;
  offset: number;
  xp: any;
  myXP: any;
  myWallet: any;
  filter = "all";
  me: any;
  boosted: any;
  points: number;
  wallet: number;
  subscribed: number;
  mod: number;
  staff: number;
  banned: number;
  boost: any;


  constructor(private router: Router, private authService: AuthenticationService, private modalController: ModalController, private storage: Storage, private dataService: DataService) { }



  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.points = storedUser.Points;
        this.wallet = storedUser.Wallet;
        this.subscribed = storedUser.Subscribed;
        this.mod = storedUser.Mod;
        this.staff = storedUser.Staff;
        this.banned = storedUser.Banned;

       

        this.filter = localStorage.getItem("filter");
        this.dataService.getXP(storedUser.UserID).subscribe(res => {
          this.xp = res.message;
          for (let i = 0; i < this.xp.length; i++) {

            this.myXP = this.numFormatter(this.xp[i]['user_points']);
            this.myWallet = this.numFormatter(this.xp[i]['user_wallet_balance']);
          }
        });
        if (this.filter = "all") {
          this.dataService.getAllPosts(storedUser.UserID).subscribe(res => {
            this.feeds = res.message;

            for (let i = 0; i < this.feeds.length; i++) {
              this.offset = moment().utcOffset();

              this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
            }
            this.dataList = this.feeds.slice(0, this.topLimit);

          });
        } else {

          this.dataService.getFeed(storedUser.UserID).subscribe(res => {
            this.feeds = res.message;
            for (let i = 0; i < this.feeds.length; i++) {
              this.offset = moment().utcOffset();

              this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
            }
            this.dataList = this.feeds.slice(0, this.topLimit);

          });

        }
        this.dataService.getLatestVid(storedUser.UserID).subscribe(res => {
          this.latest = res.message;
        });
        this.dataService.getBoosted().subscribe(res => {
          this.boost = res.message;
          for (let i = 0; i < this.boost.length; i++) {
            this.offset = moment().utcOffset();

            this.boost[i]['time'] = moment.utc(this.boost[i]['time']).fromNow();
          }
        });
        
      }
    });

  }
  loadData(event) {

    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.feeds.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }
  viewStory(index) {
    this.router.navigate(['story', index]);
  }

  navigateToDetail() {
    this.router.navigate(['post-detail']);
  }

  goToNotifications() {
    this.router.navigate(['notifications']);
  }
  goToSettings() {
    this.router.navigate(['settings']);
  }
  gotoSearch() {
    this.router.navigate(['search/posts']);
  }
  gotoShop() {
    this.router.navigate(['shop']);
  }
  
  doRefresh(event) {
    if (this.filter = "all") {
      this.dataService.getAllPosts(this.me).subscribe(res => {
        this.feeds = res.message;
        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();

          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);

      });
    } else {

      this.dataService.getFeed(this.me).subscribe(res => {
        this.feeds = res.message;
        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();

          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);

      });
    };
    this.dataService.getBoosted().subscribe(res => {
      this.boosted = res.message;
      for (let i = 0; i < this.feeds.length; i++) {
        this.offset = moment().utcOffset();

        this.boosted[i]['time'] = moment.utc(this.boosted[i]['time']).fromNow();
      }
    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  eventDetail(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: item,
      },
    };
    this.router.navigate(['event-detail'], navigationExtras);
  }

  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

    });
    modal.present();
  }
  async openXPModal(xp) {

    const modal = await this.modalController.create({
      component: XpmodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'xp': xp
      }

    });
    modal.present();
  }

  numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

  }

  didScroll() {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) return;
    else if (this.currentPlaying && !this.isElementInViewport(this.currentPlaying)) {

      this.currentPlaying.pause();
      this.currentPlaying = null;
    }
    this.videoPlayers.forEach(player => {
    });





  }


  async openVideoModal(source) {
    const modal = await this.modalController.create({
      component: VideoModalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'source': source
      }
    });
    modal.present();
  }
}
