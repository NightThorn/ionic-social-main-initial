import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  background = {
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
  constructor(
    private dataService: DataService,
    private profileService: ProfileService,
    private modalController: ModalController,
    private router: Router
  ) {}
  x = localStorage.getItem("user_id");

  ngOnInit() {
    this.profile = this.profileService.fetchProfile(this.x);
    this.feeds = this.dataService.getFeed();
    this.events = this.dataService.getEvents();
    this.groups = this.dataService.getGroups();
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
}
