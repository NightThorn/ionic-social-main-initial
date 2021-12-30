import { Component, OnInit } from '@angular/core';

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
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

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

  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  pictures: any = [];
  profile: any;
  storage: any;
  activeStoredUserSubscription$;
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
  // x = localStorage.getItem("user_id");

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.profileService.checkFollow(this.me).subscribe(res => {
          this.following = res.message;
          var follow = this.following.find(message => message.following_id == this.data)

          if (follow) {
            this.isFollowing = true;
          }
          
        });


        this.profileService.fetchFriends(this.data).subscribe(res => {
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
        this.profileService.fetchBadges(this.data).subscribe(res => {
          this.userBadges = res.message;
          this.badgeCount = this.userBadges.length;
        });

        this.profileService.fetchGroups(this.data).subscribe(res => {
          this.groups = res.message;

        });
        this.profileService.fetchGroups(this.data).subscribe(res => {
          this.groups = res.message;

        });
        this.profileService.fetchPictures(this.data).subscribe(res => {
          this.pictures = res.message;
          this.dataList = this.pictures.slice(0, this.topLimit);

        });
        this.fetchedProfileSubscription$ = this.profileService.fetchedProfile.subscribe((profile: ProfileModel) => {
          this.fetchedProfile = profile;
          const newDate = new Date(this.fetchedProfile.user_birthdate);
          this.bday = newDate.toDateString();
        });

        this.fetchedPostsSub = this.profileService.fetchedPosts.subscribe((data: Post) => {
          this.fetchedPosts = data;

        })
        // this.data = this.profileService.fetchProfile(this.x);
        this.events = this.dataService.getEvents();
      }
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

  badges(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/userbadges'], navigationExtras);
  }
  goToGroup(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['group'], navigationExtras);

  }
  friends(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/userfriends'], navigationExtras).then(() => {
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
}


