
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../../image-modal/image-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileModel } from "../../../models/profile-model";
import { Post } from 'src/app/models/post';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoredUser } from 'src/app/models/stored-user';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit, OnDestroy {

  cover = {
    backgroundImage:
      'url(https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/photos/2021/08/gg_baec4903318d885d14ce76fdda9bfecb_cropped.png)',
  };
  private onDestroy$: Subject<void> = new Subject<void>();
  tabType = 'posts';
  Users: any = [];
  feeds: any;
  events: any;
  groups: any;
  public dataL: Array<object> = [];
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  pictures: any = [];
  profile: any;
  storage: any;
  fetchedProfileSubscription$;
  fetchedProfile: ProfileModel;
  fetchedPosts: any = [];
  bday: string;
  fetchedPostsSub;
  user_id: any;
  id: any;
  special: any;
  userBadges: any;
  badgeCount: any;
  userFriends: any;
  friendCount: any;
  data: any;
  user: any;
  me: any;
  public addfriend = "Add Friend";
  public blocked = 0;
  offset: number;

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");


    this.dataService.getRandomUser(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.user = res.message;

      this.data = this.user['0']['user_id'];


      this.profileService.fetchUser(this.data);

      this.profileService.fetchPosts(this.data);
      this.profileService.fetchGroups(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.groups = res.message;

      });
      this.profileService.fetchPictures(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.pictures = res.message;
        this.dataList = this.pictures.slice(0, this.topLimit);

      });
      this.profileService.fetchFriends(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userFriends = res.message;
        this.friendCount = this.userFriends.length;
      });
      this.profileService.fetchBadges(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userBadges = res.message;
        this.badgeCount = this.userBadges.length;
      });
      this.fetchedProfileSubscription$ = this.profileService.fetchedProfile.pipe(takeUntil(this.onDestroy$)).subscribe((profile: ProfileModel) => {
        this.fetchedProfile = profile;
        const newDate = new Date(this.fetchedProfile.user_birthdate);
        this.bday = newDate.toDateString();
      });

      this.fetchedPostsSub = this.profileService.fetchedPosts.pipe(takeUntil(this.onDestroy$)).subscribe((data: Post) => {
        this.fetchedPosts = data;
        for (let i = 0; i < this.fetchedPosts.length; i++) {
          this.offset = moment().utcOffset();
          this.fetchedPosts[i]['total'] = +this.fetchedPosts[i]['reaction_love_count'] + +this.fetchedPosts[i]['reaction_like_count'] + +this.fetchedPosts[i]['reaction_haha_count'] + +this.fetchedPosts[i]['reaction_wow_count'];

          this.fetchedPosts[i]['time'] = moment.utc(this.fetchedPosts[i]['time']).fromNow();
        }

      })
      // this.data = this.profileService.fetchProfile(this.x);
    });


  }
  add(id) {
    let data = {
      "user": id,
      "me": this.me,
    };
    this.addfriend = "Requested";

    this.http.post('https://ggs.tv/api/v1/user.php?action=add', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    });
  }
  report(id) {
    let data = {
      "user": id,
      "me": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/user.php?action=report', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    });
  }
  block(id) {
    let data = {
      "user": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }
  async openModal(source) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      cssClass: 'modal-container',
      componentProps: {
        'source': source
      },
    });
    return await modal.present();
  }

  badges(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['badges'], navigationExtras);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  goToGroup(id) {
    this.router.navigate(['/group/' + id]);
  }
  friends(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['friends'], navigationExtras);
  }
  chat(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: item,
        me: this.me
      },
    };
    this.router.navigate(['newchat'], navigationExtras);
  }
  doRefresh(event) {

    this.me = localStorage.getItem("myID");

    this.dataService.getRandomUser(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.user = res.message;
      this.data = res.message['0']['user_id'];


      this.addfriend = "Add Friend";

      this.profileService.fetchUser(this.data);
      this.profileService.fetchFriends(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userFriends = res.message;
        this.friendCount = this.userFriends.length;
      });
      this.profileService.fetchBadges(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.userBadges = res.message;
        this.badgeCount = this.userBadges.length;
      });
      this.profileService.fetchPosts(this.data);
      this.profileService.fetchGroups(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.groups = res.message;

      });
      this.profileService.fetchPictures(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.pictures = res.message;
        this.dataList = this.pictures.slice(0, this.topLimit);

      });
      this.fetchedProfileSubscription$ = this.profileService.fetchedProfile.pipe(takeUntil(this.onDestroy$)).subscribe((profile: ProfileModel) => {
        this.fetchedProfile = profile;
        const newDate = new Date(this.fetchedProfile.user_birthdate);
        this.bday = newDate.toDateString();
      });

      this.fetchedPostsSub = this.profileService.fetchedPosts.pipe(takeUntil(this.onDestroy$)).subscribe((data: Post) => {
        this.fetchedPosts = data;

      })
      // this.data = this.profileService.fetchProfile(this.x);
    });


    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  presentToast(msg: string) {
    throw new Error('Method not implemented.');
  }

  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.pictures.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }
}


