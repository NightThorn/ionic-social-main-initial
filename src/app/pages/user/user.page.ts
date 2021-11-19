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
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    this.profileService.fetchUser(this.data);
    this.profileService.fetchPosts(this.data);
    this.profileService.fetchGroups(this.data).subscribe(res => {
      this.groups = res.message;
      console.log("PROFILEPAGE:groups", this.groups);

    });
    this.profileService.fetchPictures(this.data).subscribe(res => {
      this.pictures = res.message;

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

  };

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
}


