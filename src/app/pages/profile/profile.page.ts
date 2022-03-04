import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from "../../services/authentication.service";
import { PostsService } from 'src/app/services/posts.service';
import { ModalPage } from '../modal/modal.page';
import moment from 'moment';
import { EditprofilePage } from '../editprofile/editprofile.page';
import { interval, Subject } from 'rxjs';
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
  groupID: any;
  posts: any;
  media: any;
  userinfo: any;
  friendslist: any;
  badgeslist: any;
  postsRefresh: any;
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router,
    public nav: NavController,
  ) {

  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");


    this.profileService.getProfile(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      console.log(res);
      this.groups = res.groups;
      this.badgeslist = res.badges;
      this.badgeCount = this.badgeslist.length;

      this.posts = res.posts;
      for (let i = 0; i < this.posts.length; i++) {
        this.offset = moment().utcOffset();
        this.posts[i]['total'] = +this.posts[i]['reaction_love_count'] + +this.posts[i]['reaction_like_count'] + +this.posts[i]['reaction_haha_count'] + +this.posts[i]['reaction_wow_count'];

        this.posts[i]['time'] = moment.utc(this.posts[i]['time']).fromNow();
      }
      this.pictures = res.media;
      this.dataList = this.pictures.slice(0, this.topLimit);
      this.userinfo = res.userinfo[0];

      this.friendslist = res.friends;
      this.friendCount = this.friendslist.length;
      const newDate = new Date(this.userinfo.user_birthdate);
      this.bday = newDate.toDateString();



    });


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
    this.router.navigate(['/group/' + id]);
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
      this.groupID = this.groups[0]['group_id'];



      this.router.navigate(['/group/' + this.groupID]);
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


