import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { ProfileModel } from 'src/app/models/profile-model';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { PostsService } from 'src/app/services/posts.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-mentionuser',
  templateUrl: './mentionuser.page.html',
  styleUrls: ['./mentionuser.page.scss'],
})
export class MentionuserPage implements OnInit {


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
  username: any;

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient,
    public nav: NavController,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {

  }
  // x = localStorage.getItem("user_id");

  ngOnInit() {

    this.activeRoute.queryParams.subscribe(params => {
      this.username = params.username;
    });

    this.dataService.getUserID(this.username).subscribe(res => {
      this.data = res.message[0]['user_id'];

      this.me = localStorage.getItem("myID");

     

      this.subscription2$ = this.profileService.fetchFriends(this.data).subscribe(res => {
        this.userFriends = res.message;

        this.friendCount = this.userFriends.length;
        var target = this.userFriends.find(message => message.user_id == this.me)

        if (target) {
          this.isFriends = "1";
        } else {

          this.isFriends = "0";
        }
      });

      this.profileService.fetchUser(this.data);
      this.profileService.fetchPosts(this.data);
      this.subscription3$ = this.profileService.fetchBadges(this.data).subscribe(res => {
        this.userBadges = res.message;
        this.badgeCount = this.userBadges.length;
      });


      this.subscription4$ = this.profileService.fetchGroups(this.data).subscribe(res => {
        this.groups = res.message;

      });
      this.subscription5$ = this.profileService.fetchPictures(this.data).subscribe(res => {
        this.pictures = res.message;
        this.dataList = this.pictures.slice(0, this.topLimit);

      });
      this.subscription6$ = this.profileService.fetchedProfile.subscribe((profile: ProfileModel) => {
        this.fetchedProfile = profile;
        const newDate = new Date(this.fetchedProfile.user_birthdate);
        this.bday = newDate.toDateString();
      });

      this.fetchedPostsSub = this.profileService.fetchedPosts.subscribe((data: Post) => {
        this.fetchedPosts = data;
        for (let i = 0; i < this.fetchedPosts.length; i++) {
          this.offset = moment().utcOffset();
          this.fetchedPosts[i]['total'] = +this.fetchedPosts[i]['reaction_love_count'] + +this.fetchedPosts[i]['reaction_like_count'] + +this.fetchedPosts[i]['reaction_haha_count'] + +this.fetchedPosts[i]['reaction_wow_count'];

          this.fetchedPosts[i]['time'] = moment.utc(this.fetchedPosts[i]['time']).fromNow();
        }

      });
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
    this.router.navigate(['/mentionuserbadges'], navigationExtras);
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
    this.router.navigate(['/mentionuserfriends'], navigationExtras).then(() => {
      window.location.reload();
    });
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

    this.dataService.getGroupFromTag(tag).subscribe(res => {
      this.groups = res.message;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(this.groups[0]['group_id'])
        }
      };
      this.router.navigate(['group'], navigationExtras);

    });

  }
  add(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.addfriend = "Requested";

    this.subscription8$ = this.http.post('https://ggs.tv/api/v1/user.php?action=add', JSON.stringify(data)).subscribe(res => {


    });
  }

  remove(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.isFriends = "0";

    this.subscription9$ = this.http.post('https://ggs.tv/api/v1/user.php?action=remove', JSON.stringify(data)).subscribe(res => {


    });
  }
  boost(id) {

    let data = {
      "post": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.subscription10$ = this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).subscribe(res => {


    });
  }
  block(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.subscription11$ = this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).subscribe(res => {


    });
  }
  report(id) {

    let data = {
      "user": id,
      "me": this.me,
    };
    this.subscription12$ = this.http.post('https://ggs.tv/api/v1/user.php?action=report', JSON.stringify(data)).subscribe(res => {

      this.reported = "./assets/images/ggsgray.png";

    });
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}