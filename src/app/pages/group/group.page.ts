import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { EditgroupPage } from '../editgroup/editgroup.page';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  data: any;
  tabType = 'posts';

  group: any;
  activeStoredUserSubscription$;
  me: any;
  admin: any;
  joined: any;
  joinedGroups: any;
  group_id: any;
  feed: any;
  members: any;
  offset: number;
  media: any;
  group_picture: any;
  group_cover: any;
  group_description: any;
  group_title: any;
  group_admin: any;
  group_name: any;
  group_privacy: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router
    , private authService: AuthenticationService, private modalController: ModalController,
    private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {

      this.me = storedUser.UserID;
    });
    this.dataService.getGroup(this.data).subscribe(res => {
      this.group = res.message;
      console.log(this.group);
      this.group_picture = res.message[0]['group_picture'];
      this.group_cover = res.message[0]['group_cover'];
      this.group_description = res.message[0]['group_description'];
      this.group_title = res.message[0]['group_title'];
      this.group_admin = res.message[0]['group_admin'];
      this.group_name = res.message[0]['group_name'];
      this.group_privacy = res.message[0]['group_privacy'];
      this.group_id = res.message[0]['group_id'];
      if (this.me == res.message[0]['group_admin']) {
        this.admin = 1;
      } else {

        this.admin = 0;
      }
    });

    this.dataService.getJoinedGroups(this.me).subscribe(res => {
      this.joinedGroups = res.message;
      var target = this.joinedGroups.find(message => message.group_id == this.group_id)

      if (target) {
        this.joined = 1;
      } else {

        this.joined = 0;
      }


    });

    this.dataService.getGroupFeed(this.data).subscribe(res => {
      this.feed = res.message;
      for (let i = 0; i < this.feed.length; i++) {
        this.offset = moment().utcOffset();

        this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
      }

    });

    this.dataService.getGroupMedia(this.data).subscribe(res => {
      this.media = res.message;

    });

  }

  groupmembers(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/members'], navigationExtras).then(() => {
      window.location.reload();
    });
  }
  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

    });
    modal.present();
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

  async editgroup(id, group_picture, group_cover, group_title, group_name, group_admin, group_privacy, group_description) {

    const modal = await this.modalController.create({
      component: EditgroupPage,
      cssClass: 'modal-container',
      componentProps: {
        'group_id': id,
        'group_picture': group_picture,
        'group_cover': group_cover,
        'group_title': group_title,
        'group_name': group_name,
        'group_admin': group_admin,
        'group_privacy': group_privacy,
        'group_description': group_description



      },
    });
    return await modal.present();
  }

}
