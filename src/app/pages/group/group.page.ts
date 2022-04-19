import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ApplicationsPage } from '../applications/applications.page';
import { ApplyPage } from '../apply/apply.page';
import { EditgroupPage } from '../editgroup/editgroup.page';
import { GrindingPage } from '../grinding/grinding.page';
import { GroupadminsPage } from '../groupadmins/groupadmins.page';
import { GrouppostPage } from '../grouppost/grouppost.page';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit, OnDestroy {
  data: any;
  tabType = 'posts';

  group: any;
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
  group_tag: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  category: any;
  constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private router: Router, private authService: AuthenticationService, private modalController: ModalController, private dataService: DataService) { }



  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.me = localStorage.getItem("myID");


    this.dataService.getGroup(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.group = res.message[0];
      this.category = res.message[0]['group_category'];

      if (this.me == res.message[0]['group_admin']) {
        this.admin = 1;
      } else {

        this.admin = 0;
      }
    });

    this.dataService.getJoinedGroups(this.me).subscribe(res => {
      this.joinedGroups = res.message;
      var target = this.joinedGroups.find(message => message.group_id == id);

      
      if (target) {
        this.joined = 1;
      } else {

        this.joined = 0;
      }

    });

    this.dataService.getGroupFeed(id).subscribe(res => {
      this.feed = res.message;
      for (let i = 0; i < this.feed.length; i++) {
        this.offset = moment().utcOffset();
        this.feed[i]['total'] = +this.feed[i]['reaction_love_count'] + +this.feed[i]['reaction_like_count'] + +this.feed[i]['reaction_haha_count'] + +this.feed[i]['reaction_wow_count'];

        this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
      }

    });

    this.dataService.getGroupMedia(id).subscribe(res => {
      this.media = res.message;

    });

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  groupmembers(id) {



    this.router.navigate(['/members/' + id]);

  }
  join(user) {
    let data = {
      "userid": user,
    };
    this.joined = 2;

    this.http.post('https://ggs.tv/api/v1/group.php?action=join&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {
    });
  }
  leave(user) {
    let data = {
      "userid": user,
    };
    this.joined = 0;

    this.http.post('https://ggs.tv/api/v1/group.php?action=leave&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {
    });
  }
  async openModalPost() {
    const id = this.activeRoute.snapshot.paramMap.get('id');

    const modal = await this.modalController.create({
      component: GrouppostPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'group': id
      },

    });
    modal.present();
  }
  async admins(id) {

    const modal = await this.modalController.create({
      component: GroupadminsPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'group_id': id
      },

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
  async apply(id) {

    const modal = await this.modalController.create({
      component: ApplyPage,
      cssClass: 'modal-container',
      componentProps: {
        'group_id': id,

      },
    });
    return await modal.present();
  }
  async editgroup(id, group_picture, group_cover, group_title, group_name, group_admin, group_privacy, group_description, group_tag) {

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
        'group_description': group_description,
        'group_tag': group_tag,




      },
    });
    return await modal.present();
  }
  async applications(group_id) {

    const modal = await this.modalController.create({
      component: ApplicationsPage,
      componentProps: {
        'group_id': group_id,
        'user_id': this.me

      },
    });
    return await modal.present();
  }

  async grinding(id) {

    const modal = await this.modalController.create({
      component: GrindingPage,
      cssClass: 'modal-container',
      componentProps: {
        'group_id': id,

      },
    });
    return await modal.present();
  }

}
