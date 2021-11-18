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

  tabType = 'posts';
  Users: any = [];
  feeds: any;
  events: any;
  groups: any;



  pictures = [
    'https://images.unsplash.com/photo-1592486058517-36236ba247c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1588774069410-84ae30757c8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592431698394-e5ed80f2c0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592486058552-8d1dde97d1cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592483648228-b35146a4330c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592452320159-21d39c1ffd80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1592431690191-c74f7e004198?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/photo-1587613990444-68fe88ee970a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
  ];
  profile: any;
  storage: any;
  activeStoredUserSubscription$;
  fetchedProfileSubscription$;
  fetchedProfile: ProfileModel;
  fetchedPosts: any = [];
  bday: string;
  fetchedPostsSub;
  user_id: any;

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

    this.activeRoute.params.subscribe(params => {
      console.log("PROFILEPAGE:ACTIVEROUTESUB:PARAMS", params);

      this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
        if (storedUser !== null) {
          console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
          console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

          console.log("PROFILEPAGE:ACTIVE_TOKEN_SUB:INVOKING FETCH PROFILE");
          this.profileService.fetchProfile(storedUser.UserID);
          this.profileService.fetchPosts(storedUser.UserID);
          this.profileService.fetchGroups(storedUser.UserID).subscribe(res => {
            this.groups = res.message;
            console.log("PROFILEPAGE:groups", this.groups);

          });
        }
        
      })
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





  ngOnDestroy() {
    this.activeStoredUserSubscription$.unsubscribe();
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
}


