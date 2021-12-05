import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  @ViewChild('video') myVideo: ElementRef;

  articles: any;
  users: any;
  feeds: any;
  stories: any;
  follow: any;
  events: any;
  latest: any;
  storiesConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.8,
  };

  usersConfig = {
    initialSlide: 0,
    spaceBetween: 2,
    slidesPerView: 5,
  };

  followConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.6,
  };
  activeStoredUserSubscription$;



  constructor(private router: Router, private authService: AuthenticationService, private modalController: ModalController, private storage: Storage, private dataService: DataService) { }



  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
        this.articles = this.dataService.getArticles();
        this.users = this.dataService.getSeenFirtsHistories();
        this.feeds = this.dataService.getFeed();
        this.follow = this.dataService.getFollow();
        this.events = this.dataService.getEvents();

        this.dataService.getLatestVid(storedUser.UserID).subscribe(res => {
          this.latest = res.message;
        });

      }
    });
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


  videoSet() {
    if (this.myVideo.nativeElement.paused) {
      this.myVideo.nativeElement.play();
    } else {

      this.myVideo.nativeElement.pause();

    }
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
