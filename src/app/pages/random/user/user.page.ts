
import { Component, OnInit } from '@angular/core';

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
  id: any;
  special: any;
  userBadges: any;
  badgeCount: any;
  userFriends: any;
  friendCount: any;
  data: any;
  user: any;
  me: number;
  public addfriend = "Add Friend";
  public blocked = 0;

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
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      console.log("khdsgfasfasdfsfdasdfkasfd", this.me);

      this.me = storedUser.UserID;
      console.log("khdsgfasfasdfsfdasdfkasfd", this.me);

        this.dataService.getRandomUser(this.me).subscribe(res => {
          this.user = res.message;
          console.log("khdsgfasfasdfsfdasdfkasfd", this.user);

          this.data = this.user['0']['user_id'];
          console.log("khdsgfkasfd", this.data);


          this.profileService.fetchUser(this.data);

          this.profileService.fetchPosts(this.data);
          this.profileService.fetchGroups(this.data).subscribe(res => {
            this.groups = res.message;

          });
          this.profileService.fetchPictures(this.data).subscribe(res => {
            this.pictures = res.message;
            this.dataList = this.pictures.slice(0, this.topLimit);

          });
          this.profileService.fetchFriends(this.data).subscribe(res => {
            this.userFriends = res.message;
            this.friendCount = this.userFriends.length;
          });
          this.profileService.fetchBadges(this.data).subscribe(res => {
            this.userBadges = res.message;
            this.badgeCount = this.userBadges.length;
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
        });
      
    });
  }
  add(id) {
    console.log("testttt");
    let data = {
      "user": id,
      "me": this.me,
    };
    this.addfriend = "Requested";

    this.http.post('https://ggs.tv/api/v1/user.php?action=add', JSON.stringify(data)).subscribe(res => {

    });
  }
  report(id) {
    console.log("testttt");
    let data = {
      "user": id,
      "me": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/user.php?action=report', JSON.stringify(data)).subscribe(res => {

    });
  }
  block(id) {
    console.log("testttt");
    let data = {
      "user": id,
      "me": this.me,
    };
    this.blocked = 1;

    this.http.post('https://ggs.tv/api/v1/user.php?action=block', JSON.stringify(data)).subscribe(res => {
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
    this.router.navigate(['friends'], navigationExtras);
  }

  doRefresh(event) {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {


        this.dataService.getRandomUser(storedUser.UserID).subscribe(res => {
          this.user = res.message;
          this.data = res.message['0']['user_id'];



          this.profileService.fetchUser(this.data);
          this.profileService.fetchFriends(this.data).subscribe(res => {
            this.userFriends = res.message;
            this.friendCount = this.userFriends.length;
          });
          this.profileService.fetchBadges(this.data).subscribe(res => {
            this.userBadges = res.message;
            this.badgeCount = this.userBadges.length;
          });
          this.profileService.fetchPosts(this.data);
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
        });
      }
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


