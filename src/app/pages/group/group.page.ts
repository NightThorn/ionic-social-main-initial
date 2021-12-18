import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
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

  constructor(private activeRoute: ActivatedRoute, private router: Router
    , private authService: AuthenticationService, private modalController: ModalController,
    private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log("uhhhhh huh", this.data);
      }
    });
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
      this.me = storedUser.UserID;
      console.log(this.me);

      console.log(this.joined);
      this.dataService.getGroup(this.data).subscribe(res => {
        this.group = res.message;
        this.group_id = res.message[0]['group_id'];
        console.log("asd", res.message[0]['group_admin']);
        if (this.me == res.message[0]['group_admin']) {
          this.admin = 1;
        } else {

          this.admin = 0;
        }
        console.log(this.admin);
      });

      this.dataService.getJoinedGroups(this.me).subscribe(res => {
        this.joinedGroups = res.message;
        var target = this.joinedGroups.find(message => message.group_id == this.group_id)

        if (target) {
          this.joined = 1;
        } else {

          this.joined = 0;
        }

        console.log(this.group_id);
        console.log(this.joined);
      });

      this.dataService.getGroupFeed(this.data).subscribe(res => {
        this.feed = res.message;
        console.log(this.feed);
        for (let i = 0; i < this.feed.length; i++) {
          this.offset = moment().utcOffset();

          this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
        }

      });
      
      this.dataService.getGroupMedia(this.data).subscribe(res => {
        this.media = res.message;

      });

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
}
