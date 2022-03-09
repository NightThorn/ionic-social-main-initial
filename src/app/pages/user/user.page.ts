import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from "../../services/authentication.service";
import { ProfileModel } from "../../models/profile-model";
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

  tabType = 'posts';
  Users: any = [];
  feeds: any;
  events: any;
  groups: any;

  public dataL: Array<object> = [];
  public blocked: number = 0;
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  pictures: any = [];
  profile: any;
  storage: any;
  subscription1$: Subscription
  subscription2$: Subscription
  subscriptions: Subscription[] = []
  fetchedProfileSubscription$;
  fetchedProfile: ProfileModel;
  fetchedPosts: any = [];
  bday: string;
  fetchedPostsSub;
  user_id: any;
  data: any;
  id: any;
  special: any;
  userBadges: any;
  badgeCount: any;
  userFriends: any = [];
  friendCount: any;
  me: any;
  isFollowing: any;
  isFriends: any;
  storedUser: any;
  following: any = [];
  follow: number;
  reported: string;
  added: string;
  public friend = "Friends";
  public addfriend = "Add Friend";
  public ifollow = "Follow";
  public iunfollow = "Unfollow";
  offset: number;
  subscription3$: Subscription;
  subscription7$: Subscription;
  subscription6$: Subscription;
  subscription5$: Subscription;
  subscription4$: Subscription;
  subscription8$: Subscription;
  subscription9$: Subscription;
  subscription10$: Subscription;
  subscription11$: Subscription;
  subscription12$: Subscription;
  subscription13$: Subscription;
  subscription14$: Subscription;
  private onDestroy$: Subject<void> = new Subject<void>();
  groupID: any;
  friendslist: any;
  userinfo: any;
  posts: any;
  badgeslist: any;
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private postsService: PostsService,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    public nav: NavController,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {

  }
  // x = localStorage.getItem("user_id");

  async ngOnInit() {

    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.me = localStorage.getItem("myID");
    if (this.me === id) {

      this.router.navigate(['/tabs/profile']);

    } else {
      this.subscription1$ = this.profileService.checkFollow(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.following = res.message;
        var follow = this.following.find(message => message.following_id == id)

        if (follow) {
          this.isFollowing = true;
        }

      });





      await this.profileService.getProfile(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        console.log(res);
        this.groups = res.groups;
        this.badgeslist = res.badges;
        this.badgeCount = this.badgeslist.length;

        this.pictures = res.media;
        this.dataList = this.pictures.slice(0, this.topLimit);
        this.userinfo = res.userinfo[0];

        this.friendslist = res.friends;
        this.friendCount = this.friendslist.length;
        var target = this.friendslist.find(message => message.user_id == this.me)

        if (target) {
          this.isFriends = "1";
        } else {

          this.isFriends = "0";
        }
        const newDate = new Date(this.userinfo.user_birthdate);
        this.bday = newDate.toDateString();



      });
      await this.profileService.fetchPosts(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.posts = res.message;
        for (let i = 0; i < this.posts.length; i++) {
          this.offset = moment().utcOffset();
          this.posts[i]['total'] = +this.posts[i]['reaction_love_count'] + +this.posts[i]['reaction_like_count'] + +this.posts[i]['reaction_haha_count'] + +this.posts[i]['reaction_wow_count'];

          this.posts[i]['time'] = moment.utc(this.posts[i]['time']).fromNow();
        }

      });
    }
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

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  badges(id) {

    this.router.navigate(['/userbadges/' + id]);
  }
  goToGroup(id) {
    this.router.navigate(['/group/' + id]);
  }
  friends(id) {


    this.router.navigate(['/userfriends/' + id]);
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
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.pictures.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }
  getTagGroup(tag) {

    this.dataService.getGroupFromTag(tag).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;
      this.groupID = this.groups[0]['group_id'];



      this.router.navigate(['/group/' + this.groupID]);
    });

  }
  add(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.addfriend = "Requested";

    this.subscription8$ = this.http.post('https://ggs.tv/api/v1/user.php?action=add', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    });
  }

  remove(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.isFriends = "0";

    this.subscription9$ = this.http.post('https://ggs.tv/api/v1/user.php?action=remove', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    });
  }
  boost(id) {

    let data = {
      "post": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.subscription10$ = this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    });
  }
  block(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.subscription11$ = this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    });
  }
  report(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.subscription12$ = this.http.post('https://ggs.tv/api/v1/user.php?action=report', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.reported = "./assets/images/ggsgray.png";

    });
  }
  _follow(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.subscription13$ = this.http.post('https://ggs.tv/api/v1/user.php?action=follow', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.ifollow = "Following";

    });
  }
  unfollow(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.subscription14$ = this.http.post('https://ggs.tv/api/v1/user.php?action=unfollow', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.iunfollow = "Follow";

    });
  }


}


