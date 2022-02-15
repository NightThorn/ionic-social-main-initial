import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { VideoModalPage } from '../video-modal/video-modal.page';
import moment from 'moment';
import { XpmodalPage } from '../xpmodal/xpmodal.page';
import { Plugins } from '@capacitor/core';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const { Filesystem } = Plugins;
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  @ViewChild('myvideo') myVideo: ElementRef;
  @ViewChild('yt') yt: ElementRef;

  @ViewChildren('player') videoPlayers: QueryList<any>;
  @ViewChild(IonContent) content: IonContent;
  private onDestroy$: Subject<void> = new Subject<void>();

  currentPlaying = null;
  feeds = [];
  latest: any;
  storiesConfig = {
    initialSlide: 0,
    spaceBetween: 5,
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
  offset: number;
  xp: any;
  myXP: any;
  myWallet: any;
  me: any;
  filter = "all";
  boosted: any;
  points: number;
  wallet: number;
  subscribed: number;
  mod: number;
  staff: number;
  banned: number;
  boost: any;
  total: any;
  userXP: any;
  isShown: boolean;


  constructor(private router: Router, private authService: AuthenticationService, public modalController: ModalController, private storage: Storage, private dataService: DataService) { }



  ngOnInit() {
    this.me = localStorage.getItem("myID");

    console.log("idk ey", this.me);
    this.filter = localStorage.getItem("filter");
    this.dataService.getXP(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.xp = res.message;
      console.log(this.xp);

      this.userXP = this.xp[0]['user_points'];
      this.myWallet = this.numFormatter(this.xp[0]['user_wallet_balance']);

    });
    if (this.filter = "all") {
      this.dataService.getAllPosts(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.feeds = res.message;

        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();
          this.feeds[i]['total'] = +this.feeds[i]['reaction_love_count'] + +this.feeds[i]['reaction_like_count'] + +this.feeds[i]['reaction_haha_count'] + +this.feeds[i]['reaction_wow_count'];
          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);
      });
    } else {

      this.dataService.getFeed(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.feeds = res.message;
        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();
          this.feeds[i]['total'] = +this.feeds[i]['reaction_love_count'] + +this.feeds[i]['reaction_like_count'] + +this.feeds[i]['reaction_haha_count'] + +this.feeds[i]['reaction_wow_count'];

          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);
      });

    }
    this.dataService.getLatestVid(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.latest = res.message;
      console.log(this.latest);
    });
    this.dataService.getBoosted().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.boost = res.message;
      for (let i = 0; i < this.boost.length; i++) {
        this.offset = moment().utcOffset();
        this.boost[i]['total'] = +this.boost[i]['reaction_love_count'] + +this.boost[i]['reaction_like_count'] + +this.boost[i]['reaction_haha_count'] + +this.boost[i]['reaction_wow_count'];

        this.boost[i]['time'] = moment.utc(this.boost[i]['time']).fromNow();
      }
    });

    window.onbeforeunload = () => this.ionViewWillLeave();


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
  scrollStart(event) {
    this.isShown = false;
  }
  scrollStop(event) {
    this.isShown = true;
  }
  doRefresh(event) {
    this.dataService.getXP(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.xp = res.message;
      console.log(this.xp);

      this.userXP = this.xp[0]['user_points'];
      this.myWallet = this.numFormatter(this.xp[0]['user_wallet_balance']);

    });
    if (this.filter = "all") {
      this.dataService.getAllPosts(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.feeds = res.message;
        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();

          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);

      });
    } else {

      this.dataService.getFeed(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.feeds = res.message;
        for (let i = 0; i < this.feeds.length; i++) {
          this.offset = moment().utcOffset();

          this.feeds[i]['time'] = moment.utc(this.feeds[i]['time']).fromNow();
        }
        this.dataList = this.feeds.slice(0, this.topLimit);
      });
    };
    this.dataService.getBoosted().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.boosted = res.message;
      for (let i = 0; i < this.feeds.length; i++) {
        this.offset = moment().utcOffset();

        this.boosted[i]['time'] = moment.utc(this.boosted[i]['time']).fromNow();
      }
    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
    this.content.scrollToTop(2000);

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
    modal.onDidDismiss().then((data) => {
      console.log(data);
      const dataXP = data['data'];
      if (dataXP === "good") {
        this.userXP = 0;
      }
    });
    return await modal.present();
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
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  didScroll() {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) return;
    else if (this.currentPlaying && !this.isElementInViewport(this.currentPlaying)) {

      this.currentPlaying.pause();
      this.currentPlaying = null;

    }
  }

  ionViewWillLeave() {
    const iframe = (document.getElementById('youtube') as HTMLIFrameElement);

    iframe.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');

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
