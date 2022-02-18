import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from "../../services/authentication.service";
import { StoredUser } from "../../models/stored-user";
import { ProfileModel } from "../../models/profile-model";
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ModalPage } from '../modal/modal.page';
import moment from 'moment';
import { EditprofilePage } from '../editprofile/editprofile.page';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  cover = {
    backgroundImage:
      'url(https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/photos/2021/08/gg_baec4903318d885d14ce76fdda9bfecb_cropped.png)',
  };
  public dataL: Array<object> = [];

  tabType = 'posts';
  Users: any = [];
  feeds: any;
  events: any;
  groups: any;
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();

  pictures: any = [];
  profile: any;
  storage: any;
  fetchedProfileSubscription$;
  fetchedProfile: ProfileModel;
  fetchedPosts: any = [];
  bday: string;
  fetchedPostsSub;
  user_id: any;
  value = 0;
  userBadges: any;
  badgeCount: any;
  friendCount: any;
  userFriends: any;
  offset: number;
  me: any;
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private postsService: PostsService,
    private modalController: ModalController,
    private router: Router,
    public nav: NavController,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");
    console.log("this me on profile", this.me);
    this.profileService.fetchProfile(this.me);
    this.profileService.fetchPosts(this.me);

    this.profileService.fetchGroups(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;

    });
    this.profileService.fetchFriends(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userFriends = res.message;
      this.friendCount = this.userFriends.length;
    });
    this.profileService.fetchBadges(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userBadges = res.message;
      this.badgeCount = this.userBadges.length;
    });
    this.profileService.fetchPictures(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.pictures = res.message;
      this.dataList = this.pictures.slice(0, this.topLimit);

    });
    this.profileService.fetchedProfile.pipe(takeUntil(this.onDestroy$)).subscribe((profile: ProfileModel) => {
      this.fetchedProfile = profile;
      console.log(this.fetchedProfile);
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

  };



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
  async navigateToModal(source) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'source': source
      }
    });
    modal.present();
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  goToSettings() {
    this.router.navigate(['settings']);
  }

  badges(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['badges'], navigationExtras);
  }

  friends(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['friends'], navigationExtras);
  }
  goToGroup(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };

    this.router.navigate(['group'], navigationExtras);
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


  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

    });
    modal.present();
  }
  group(tag) {

    this.dataService.getGroupFromTag(tag).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.groups[0]['group_id'])
        }
      };
      this.router.navigate(['group'], navigationExtras);

    });

  }
  async editProfile(id) {

    const modal = await this.modalController.create({
      component: EditprofilePage,
      componentProps: {
        'me': id,

      },
    });
    return await modal.present();
  }




}


