
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
  data: any;
  user: any;

  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

        this.dataService.getRandomUser(storedUser.UserID).subscribe(res => {
          this.user = res.message;
          this.data = res.message['0']['user_id'];

          console.log("igasdiehjgbakgjags:groups", this.user);
          console.log("igasdiehjgbakgjags:data", this.data);


          this.profileService.fetchUser(this.data);

          this.profileService.fetchPosts(this.data);
          this.profileService.fetchGroups(this.data).subscribe(res => {
            this.groups = res.message;
            console.log("PROFILEPAGE:fetch posts and groups", this.groups);

          });
          this.profileService.fetchPictures(this.data).subscribe(res => {
            this.pictures = res.message;
            this.dataList = this.pictures.slice(0, this.topLimit);

          });
          this.fetchedProfileSubscription$ = this.profileService.fetchedProfile.subscribe((profile: ProfileModel) => {
            this.fetchedProfile = profile;
            const newDate = new Date(this.fetchedProfile.user_birthdate);
            this.bday = newDate.toDateString();
            console.log("PROFILEPAGE:FETCHED_PROFILE_SUB:GOT", this.fetchedProfile);
          });

          this.fetchedPostsSub = this.profileService.fetchedPosts.subscribe((data: Post) => {
            this.fetchedPosts = data;
            console.log("PROFILEPAGE:FETCHED_Posts_SUB:GOT", this.fetchedPosts);

          })
          // this.data = this.profileService.fetchProfile(this.x);
          this.events = this.dataService.getEvents();
        });
      }
    });
  }

  async openModal(imgUrl) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      cssClass: 'modal-container',
      componentProps: {
        data: imgUrl,
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
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

        this.dataService.getRandomUser(storedUser.UserID).subscribe(res => {
          this.user = res.message;
          this.data = res.message['0']['user_id'];

          console.log("igasdiehjgbakgjags:groups", this.user);
          console.log("igasdiehjgbakgjags:data", this.data);


          this.profileService.fetchUser(this.data);

          this.profileService.fetchPosts(this.data);
          this.profileService.fetchGroups(this.data).subscribe(res => {
            this.groups = res.message;
            console.log("PROFILEPAGE:fetch posts and groups", this.groups);

          });
          this.profileService.fetchPictures(this.data).subscribe(res => {
            this.pictures = res.message;
            this.dataList = this.pictures.slice(0, this.topLimit);

          });
          this.fetchedProfileSubscription$ = this.profileService.fetchedProfile.subscribe((profile: ProfileModel) => {
            this.fetchedProfile = profile;
            const newDate = new Date(this.fetchedProfile.user_birthdate);
            this.bday = newDate.toDateString();
            console.log("PROFILEPAGE:FETCHED_PROFILE_SUB:GOT", this.fetchedProfile);
          });

          this.fetchedPostsSub = this.profileService.fetchedPosts.subscribe((data: Post) => {
            this.fetchedPosts = data;
            console.log("PROFILEPAGE:FETCHED_Posts_SUB:GOT", this.fetchedPosts);

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

